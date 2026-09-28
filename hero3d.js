// ============================================================
// Smart Course Planner — 3D hero visualization
// The REAL Industrial Engineering critical-path network (same
// computeCPM() math and layout the planner's orbitable 3D view uses),
// rendered as an ambient, auto-orbiting background — nodes as glowing
// points rather than labeled boxes, since this is a decorative preview,
// not the interactive planner. Degrades silently to the existing
// blurred-SVG hero background if WebGL / three.js is unavailable.
//
// The course list below is a trimmed, standalone copy of PROGRAMS.ie
// from planner.js (kept separate so the homepage doesn't have to load
// all seven majors' data just to draw a background). It only needs to
// stay roughly in sync — this is real IE plan-of-study data, but this
// view is cosmetic, not the source of truth for scheduling.
// ============================================================
import * as THREE from 'three';

// Generic elective / gen-ed placeholders (no real prerequisite structure)
// are left out here — they'd all pile up with zero prereqs and unbalance
// the shape without adding anything meaningful to look at.
const IE_COURSES = [
  {id:'ENGR131',cat:'fye',prereq:[]},
  {id:'MA161',cat:'fye',prereq:[]},
  {id:'CHM115',cat:'fye',prereq:[]},
  {id:'ENGR132',cat:'fye',prereq:['ENGR131']},
  {id:'MA162',cat:'fye',prereq:['MA161']},
  {id:'PHYS172',cat:'fye',prereq:['MA161']},
  {id:'CS159',cat:'fye',prereq:[]},
  {id:'MA261',cat:'support',prereq:['MA162']},
  {id:'ME270',cat:'support',prereq:['PHYS172','MA162']},
  {id:'IE200',cat:'major',prereq:[]},
  {id:'IE230',cat:'major',prereq:['MA162']},
  {id:'IE343',cat:'major',prereq:[]},
  {id:'IE330',cat:'major',prereq:['IE230']},
  {id:'MA265',cat:'support',prereq:['MA162']},
  {id:'ME200',cat:'support',prereq:[]},
  {id:'NUCL273',cat:'support',prereq:['ME270']},
  {id:'PHYS241',cat:'support',prereq:['PHYS172','MA162']},
  {id:'IE335',cat:'major',prereq:['MA265','IE230']},
  {id:'IE336',cat:'major',prereq:['IE330']},
  {id:'MA266',cat:'support',prereq:['MA162']},
  {id:'ECE201',cat:'support',prereq:['PHYS241']},
  {id:'IE332',cat:'major',prereq:['IE335']},
  {id:'IE370',cat:'major',prereq:[]},
  {id:'IE383',cat:'major',prereq:['IE335','IE336']},
  {id:'IE386',cat:'major',prereq:['IE330']},
  {id:'IE474',cat:'major',prereq:['IE332']},
  {id:'IE486',cat:'major',prereq:['IE386']},
  {id:'IE431',cat:'major',prereq:['IE383','IE386','IE474']},
  {id:'IETR1',cat:'major',prereq:['IE370']},
  {id:'IETR2',cat:'major',prereq:['IE370']},
];

// same critical-path method the planner's 2D/3D CPM views use
function computeCPM(courses) {
  const byId = {};
  courses.forEach(c => { byId[c.id] = c; });
  const ES = {}, EF = {};
  function calcEF(id) { if (EF[id] !== undefined) return EF[id]; calcES(id); return EF[id]; }
  function calcES(id) {
    if (ES[id] !== undefined) return ES[id];
    const c = byId[id];
    ES[id] = c.prereq.length === 0 ? 0 : Math.max(...c.prereq.map(p => calcEF(p)));
    EF[id] = ES[id] + 1;
    return ES[id];
  }
  courses.forEach(c => calcES(c.id));
  const duration = Math.max(0, ...Object.values(EF));

  const dependentsOf = {};
  courses.forEach(c => { c.prereq.forEach(p => { (dependentsOf[p] = dependentsOf[p] || []).push(c.id); }); });

  const LF = {}, LS = {};
  function calcLS(id) { if (LS[id] !== undefined) return LS[id]; calcLF(id); return LS[id]; }
  function calcLF(id) {
    if (LF[id] !== undefined) return LF[id];
    const deps = dependentsOf[id] || [];
    LF[id] = deps.length === 0 ? duration : Math.min(...deps.map(d => calcLS(d)));
    LS[id] = LF[id] - 1;
    return LF[id];
  }
  courses.forEach(c => calcLF(c.id));

  const slack = {};
  courses.forEach(c => { slack[c.id] = LS[c.id] - ES[c.id]; });
  return { ES, EF, LS, LF, slack, duration };
}

const mount = document.getElementById('hero3d');
if (mount && !window.matchMedia('(prefers-reduced-motion: reduce)').matches && window.WebGLRenderingContext) {
  try {
    initHero3D(mount);
  } catch (e) {
    console.warn('[hero3d] falling back to static background:', e);
  }
}

function initHero3D(mount) {
  const GOLD = 0xCFB991;
  const GOLD_BRIGHT = 0xE7CD8C;
  const CAT_COLOR = { fye: GOLD, major: GOLD, support: 0x7C9AAB, elective: 0x6b6558 };

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  const CAMERA_BASE_Z = 15;
  camera.position.set(0, 0.6, CAMERA_BASE_Z);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  mount.appendChild(renderer.domElement);

  const group = new THREE.Group();
  scene.add(group);

  // ---- real CPM layout: columns = earliest-start level, rows = index
  // within that level, depth = slack (0 = on the critical path) ----
  const cpm = computeCPM(IE_COURSES);
  const levels = {};
  IE_COURSES.forEach(c => { (levels[cpm.ES[c.id]] = levels[cpm.ES[c.id]] || []).push(c); });
  Object.values(levels).forEach(arr => arr.sort((a, b) => a.id.localeCompare(b.id)));

  const colWidth = 11 / Math.max(1, cpm.duration);
  const ROW_GAP = 1.05;
  const nodes = [];
  const posById = {};
  for (let lvl = 0; lvl <= cpm.duration; lvl++) {
    const arr = levels[lvl] || [];
    arr.forEach((c, i) => {
      const critical = cpm.slack[c.id] === 0;
      const n = {
        id: c.id,
        x: -5.5 + lvl * colWidth,
        y: (i - (arr.length - 1) / 2) * ROW_GAP,
        z: critical ? 0 : Math.min(cpm.slack[c.id], 4) * 0.7 - 1.2,
        critical,
        cat: c.cat,
      };
      nodes.push(n);
      posById[c.id] = n;
    });
  }

  // ---- edges from real prerequisite pairs ----
  const normalPositions = [], critPositions = [];
  IE_COURSES.forEach(c => {
    const b = posById[c.id];
    c.prereq.forEach(p => {
      const a = posById[p];
      if (!a || !b) return;
      const critical = a.critical && b.critical;
      const arr = critical ? critPositions : normalPositions;
      arr.push(a.x, a.y, a.z, b.x, b.y, b.z);
    });
  });

  const normalGeo = new THREE.BufferGeometry();
  normalGeo.setAttribute('position', new THREE.Float32BufferAttribute(normalPositions, 3));
  const normalMat = new THREE.LineBasicMaterial({ color: GOLD, transparent: true, opacity: 0.16 });
  group.add(new THREE.LineSegments(normalGeo, normalMat));

  const critGeo = new THREE.BufferGeometry();
  critGeo.setAttribute('position', new THREE.Float32BufferAttribute(critPositions, 3));
  const critMat = new THREE.LineBasicMaterial({ color: GOLD_BRIGHT, transparent: true, opacity: 0.85 });
  group.add(new THREE.LineSegments(critGeo, critMat));

  // ---- nodes as sprites (cheap glow via canvas-generated texture) ----
  const spriteTex = makeGlowTexture();
  const critNodes = [];
  nodes.forEach(n => {
    const isCrit = n.critical;
    const color = isCrit ? GOLD_BRIGHT : (CAT_COLOR[n.cat] || 0x948D78);
    const mat = new THREE.SpriteMaterial({
      map: spriteTex, color, transparent: true,
      opacity: isCrit ? 0.95 : 0.55, depthWrite: false, blending: THREE.AdditiveBlending
    });
    const sprite = new THREE.Sprite(mat);
    const scale = isCrit ? 0.42 : 0.3;
    sprite.scale.set(scale, scale, 1);
    sprite.position.set(n.x, n.y, n.z);
    group.add(sprite);
    n.sprite = sprite;
    if (isCrit) critNodes.push(n);
  });

  function makeGlowTexture() {
    const size = 128;
    const c = document.createElement('canvas');
    c.width = c.height = size;
    const ctx = c.getContext('2d');
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.35, 'rgba(255,255,255,0.55)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(c);
    return tex;
  }

  group.rotation.y = -0.18;
  group.rotation.x = 0.06;

  // ---- resize handling ----
  function resize() {
    const w = mount.clientWidth, h = mount.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  const ro = new ResizeObserver(resize);
  ro.observe(mount);
  resize();

  // ---- pointer parallax ----
  let targetRotY = -0.18, targetRotX = 0.06;
  let curRotY = targetRotY, curRotX = targetRotX;
  window.addEventListener('pointermove', (e) => {
    const nx = (e.clientX / window.innerWidth) - 0.5;
    const ny = (e.clientY / window.innerHeight) - 0.5;
    targetRotY = -0.18 + nx * 0.5;
    targetRotX = 0.06 + ny * 0.25;
  }, { passive: true });

  // ---- render loop ----
  let running = true;
  document.addEventListener('visibilitychange', () => { running = !document.hidden; });

  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    if (!running) return;
    const t = clock.getElapsedTime();
    // slow autonomous orbit + pointer parallax layered on top, so the
    // scene stays alive as a cinematic background even with no input
    curRotY += (targetRotY + Math.sin(t * 0.065) * 0.22 - curRotY) * 0.025;
    curRotX += (targetRotX + Math.sin(t * 0.05) * 0.05 - curRotX) * 0.025;
    group.rotation.y = curRotY;
    group.rotation.x = curRotX;

    // slow dolly breathing — a gentle push in/out for depth, plus a
    // faint vertical drift, like a camera on a very slow slider
    camera.position.z = CAMERA_BASE_Z + Math.sin(t * 0.09) * 0.9;
    camera.position.y = 0.6 + Math.sin(t * 0.07) * 0.35;
    camera.lookAt(0, 0, 0);

    // gentle critical-path pulse
    const pulse = 0.85 + Math.sin(t * 1.4) * 0.15;
    critNodes.forEach(n => { if (n.sprite) n.sprite.material.opacity = pulse; });

    renderer.render(scene, camera);
  }
  animate();

  mount.classList.add('is-ready');
}
