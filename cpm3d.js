// ============================================================
// 3D Critical Path Network view — orbitable version of the CPM
// diagram. Reuses computeCPM() from planner.js (attached to window
// as a normal top-level function in a classic script) so the 3D view
// is always mathematically identical to the 2D one, never a separate
// re-derivation that could drift out of sync.
// ============================================================
import * as THREE from 'three';
import { OrbitControls } from './vendor/three/examples/jsm/controls/OrbitControls.js';

const CAT_COLOR = { fye: 0xCFB991, major: 0xCFB991, support: 0x7C9AAB, elective: 0x6b6558 };
const GOLD_BRIGHT = 0xE7CD8C;

let scene, camera, renderer, controls, group, container, tooltip;
let raycaster, mouse, hoverables = [];
let ready = false;
let running = false;
let resizeObs;

function ensureInit() {
  if (ready) return;
  container = document.getElementById('cpmDiagram3D');
  if (!container) return;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(50, 1, 0.1, 500);
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.minDistance = 3;
  controls.maxDistance = 80;

  group = new THREE.Group();
  scene.add(group);

  const ambient = new THREE.AmbientLight(0xffffff, 0.9);
  scene.add(ambient);
  const dir = new THREE.DirectionalLight(0xffffff, 0.6);
  dir.position.set(4, 8, 6);
  scene.add(dir);

  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2(-10, -10);

  tooltip = document.createElement('div');
  tooltip.className = 'cpm3d-tooltip';
  container.appendChild(tooltip);

  renderer.domElement.addEventListener('pointermove', onPointerMove);
  renderer.domElement.addEventListener('pointerleave', () => { tooltip.style.opacity = 0; });

  resizeObs = new ResizeObserver(resize);
  resizeObs.observe(container);

  ready = true;
  animate();
}

function onPointerMove(e) {
  const rect = renderer.domElement.getBoundingClientRect();
  mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const hits = raycaster.intersectObjects(hoverables, false);
  if (hits.length) {
    const d = hits[0].object.userData;
    tooltip.innerHTML = `<b>${d.id}</b> — ${d.name}<br>ES ${d.es} · EF ${d.ef} · LS ${d.ls} · LF ${d.lf} · slack ${d.slack}`;
    tooltip.style.left = (e.clientX - rect.left + 14) + 'px';
    tooltip.style.top = (e.clientY - rect.top + 10) + 'px';
    tooltip.style.opacity = 1;
  } else {
    tooltip.style.opacity = 0;
  }
}

function resize() {
  if (!container) return;
  const w = container.clientWidth, h = container.clientHeight || 480;
  renderer.setSize(w, h, false);
  camera.aspect = w / (h || 1);
  camera.updateProjectionMatrix();
}

function clearGroup() {
  while (group.children.length) {
    const obj = group.children.pop();
    if (obj.geometry) obj.geometry.dispose();
    if (obj.material) {
      if (obj.material.map) obj.material.map.dispose();
      obj.material.dispose();
    }
  }
  hoverables = [];
}

function makeLabel(text, color) {
  const size = 128;
  const c = document.createElement('canvas');
  c.width = size; c.height = 40;
  const ctx = c.getContext('2d');
  ctx.font = '600 22px "IBM Plex Mono", monospace';
  ctx.fillStyle = color;
  ctx.textAlign = 'center';
  ctx.fillText(text, size / 2, 26);
  const tex = new THREE.CanvasTexture(c);
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false });
  const sprite = new THREE.Sprite(mat);
  sprite.scale.set(1.5, 0.47, 1);
  return sprite;
}

export function updateCPM3D(courses) {
  ensureInit();
  if (!ready || typeof window.computeCPM !== 'function') return;
  clearGroup();

  const cpm = window.computeCPM(courses);
  const levels = {};
  courses.forEach(c => {
    const lvl = cpm.ES[c.id];
    (levels[lvl] = levels[lvl] || []).push(c);
  });
  Object.values(levels).forEach(arr => arr.sort((a, b) => a.id.localeCompare(b.id)));

  const COL_GAP = 2.6, ROW_GAP = 0.85;
  const pos = {};
  for (let lvl = 0; lvl <= cpm.duration; lvl++) {
    const arr = levels[lvl] || [];
    arr.forEach((c, i) => {
      pos[c.id] = {
        x: lvl * COL_GAP - (cpm.duration * COL_GAP) / 2,
        y: (i - (arr.length - 1) / 2) * ROW_GAP,
        z: (cpm.slack[c.id] === 0 ? 0 : Math.min(cpm.slack[c.id], 4) * 0.3)
      };
    });
  }

  // edges
  const critPts = [], normPts = [];
  courses.forEach(c => {
    c.prereq.forEach(p => {
      if (!pos[p] || !pos[c.id]) return;
      const isCrit = cpm.slack[p] === 0 && cpm.slack[c.id] === 0;
      const a = pos[p], b = pos[c.id];
      (isCrit ? critPts : normPts).push(a.x, a.y, a.z, b.x, b.y, b.z);
    });
  });
  if (normPts.length) {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(normPts, 3));
    group.add(new THREE.LineSegments(geo, new THREE.LineBasicMaterial({ color: 0x5F5A4B, transparent: true, opacity: 0.55 })));
  }
  if (critPts.length) {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(critPts, 3));
    group.add(new THREE.LineSegments(geo, new THREE.LineBasicMaterial({ color: GOLD_BRIGHT, linewidth: 2 })));
  }

  // nodes
  const boxGeo = new THREE.BoxGeometry(0.42, 0.42, 0.42);
  courses.forEach(c => {
    const p = pos[c.id];
    if (!p) return;
    const critical = cpm.slack[c.id] === 0;
    const color = critical ? GOLD_BRIGHT : (CAT_COLOR[c.cat] || 0x948D78);
    const mat = new THREE.MeshStandardMaterial({
      color, emissive: color, emissiveIntensity: critical ? 0.55 : 0.15,
      roughness: 0.45, metalness: 0.15
    });
    const mesh = new THREE.Mesh(boxGeo, mat);
    mesh.position.set(p.x, p.y, p.z);
    mesh.userData = { id: c.id, name: c.name, es: cpm.ES[c.id], ef: cpm.EF[c.id], ls: cpm.LS[c.id], lf: cpm.LF[c.id], slack: cpm.slack[c.id] };
    group.add(mesh);
    hoverables.push(mesh);

    const label = makeLabel(c.id, critical ? '#E7CD8C' : '#CFB991');
    label.position.set(p.x, p.y + 0.42, p.z);
    group.add(label);
  });

  // frame the camera on the graph with a 3/4 oblique angle so the
  // depth axis (built from CPM slack) reads as genuinely 3D right away
  const box = new THREE.Box3().setFromObject(group);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  const dist = Math.max(size.x, size.y, 6) * 0.95 + 4;
  camera.position.set(center.x - dist * 0.25, center.y + size.y * 0.55 + dist * 0.2, center.z + dist * 0.85);
  controls.target.copy(center);
  controls.update();

  resize();
}

function animate() {
  requestAnimationFrame(animate);
  if (!running || !ready) return;
  controls.update();
  renderer.render(scene, camera);
}

export function setCPM3DActive(active) {
  running = active;
  if (active) { ensureInit(); resize(); }
}

// ============================================================
// Self-wiring: toggle buttons + event delegation to keep the 3D view
// in sync with every user action, without needing to edit planner.js's
// render() at all. Delegated listeners on `document` naturally fire
// after the specific element's own listener (bubble phase), so by the
// time these run, planner.js has already updated `state` and the DOM.
// ============================================================
let threeActive = false;

function refresh() {
  if (!threeActive || typeof window.getCourses !== 'function') return;
  requestAnimationFrame(() => updateCPM3D(window.getCourses()));
}

function wire() {
  const btn2d = document.getElementById('cpmView2dBtn');
  const btn3d = document.getElementById('cpmView3dBtn');
  const el2d = document.getElementById('cpmDiagram').parentElement; // .cpm-scroll
  const el3d = document.getElementById('cpmDiagram3D');
  if (!btn2d || !btn3d || !el2d || !el3d) return;

  btn3d.addEventListener('click', () => {
    threeActive = true;
    btn3d.classList.add('active'); btn2d.classList.remove('active');
    el2d.style.display = 'none'; el3d.style.display = 'block';
    setCPM3DActive(true);
    if (typeof window.getCourses === 'function') updateCPM3D(window.getCourses());
  });
  btn2d.addEventListener('click', () => {
    threeActive = false;
    btn2d.classList.add('active'); btn3d.classList.remove('active');
    el3d.style.display = 'none'; el2d.style.display = '';
    setCPM3DActive(false);
  });

  document.addEventListener('input', (e) => { if (e.target && e.target.id === 'creditCap') refresh(); });
  document.addEventListener('click', (e) => {
    const t = e.target.closest && e.target.closest('.major-btn, #resetBtn, #runIlpBtn');
    if (t) refresh();
  });
  document.addEventListener('change', (e) => {
    if (e.target.matches && (e.target.matches('input[type=checkbox]') || e.target.matches('select.grade') || e.target.matches('select.predicted-grade'))) refresh();
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', wire);
} else {
  wire();
}
