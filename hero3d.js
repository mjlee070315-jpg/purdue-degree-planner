// ============================================================
// Smart Course Planner — 3D hero visualization
// A generative "degree constellation": nodes arranged in 8 columns
// (one per semester) connected by prerequisite-style edges, with one
// highlighted critical path — a decorative but thematically accurate
// stand-in for the real per-major dependency graphs the planner solves.
// Degrades silently to the existing blurred-SVG hero background if
// WebGL / three.js is unavailable (slow connection, old browser, etc).
// ============================================================
import * as THREE from 'three';

const mount = document.getElementById('hero3d');
if (mount && !window.matchMedia('(prefers-reduced-motion: reduce)').matches && window.WebGLRenderingContext) {
  try {
    initHero3D(mount);
  } catch (e) {
    console.warn('[hero3d] falling back to static background:', e);
  }
}

function initHero3D(mount) {
  const COLUMNS = 8;
  const ROWS_PER_COL = 7;
  const GOLD = 0xCFB991;
  const GOLD_BRIGHT = 0xE7CD8C;
  const MUTED = [0x7C9AAB, 0x7FA97F, 0x6b6558, 0xB5502F];

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 0.6, 15);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  mount.appendChild(renderer.domElement);

  const group = new THREE.Group();
  scene.add(group);

  // ---- build a deterministic pseudo-random DAG so the shape is stable
  // across reloads (nicer than a jittery new layout every visit) ----
  let seed = 42;
  function rnd() {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return (seed / 0x7fffffff);
  }

  const colWidth = 11 / (COLUMNS - 1);
  const nodes = [];
  for (let c = 0; c < COLUMNS; c++) {
    const rows = ROWS_PER_COL - Math.floor(Math.abs(c - COLUMNS / 2) * 0.6);
    for (let r = 0; r < rows; r++) {
      const x = -5.5 + c * colWidth;
      const y = (r - (rows - 1) / 2) * 1.05 + (rnd() - 0.5) * 0.35;
      const z = (rnd() - 0.5) * 3.2;
      nodes.push({ col: c, x, y, z, critical: false });
    }
  }

  // pick one node per column to form the "critical path"
  const critNodes = [];
  for (let c = 0; c < COLUMNS; c++) {
    const inCol = nodes.filter(n => n.col === c);
    const pick = inCol[Math.floor(rnd() * inCol.length)];
    pick.critical = true;
    critNodes.push(pick);
  }

  // edges: each node (except last column) connects to 1-2 nodes in the next column
  const edges = [];
  for (let c = 0; c < COLUMNS - 1; c++) {
    const from = nodes.filter(n => n.col === c);
    const to = nodes.filter(n => n.col === c + 1);
    from.forEach(f => {
      const count = 1 + (rnd() < 0.35 ? 1 : 0);
      for (let k = 0; k < count; k++) {
        const t = to[Math.floor(rnd() * to.length)];
        edges.push({ a: f, b: t, critical: f.critical && t.critical });
      }
    });
  }
  // ensure the critical path is fully connected column to column
  for (let c = 0; c < COLUMNS - 1; c++) {
    edges.push({ a: critNodes[c], b: critNodes[c + 1], critical: true });
  }

  // ---- edges as line segments ----
  const normalPositions = [];
  const critPositions = [];
  edges.forEach(e => {
    const arr = e.critical ? critPositions : normalPositions;
    arr.push(e.a.x, e.a.y, e.a.z, e.b.x, e.b.y, e.b.z);
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
  nodes.forEach(n => {
    const isCrit = n.critical;
    const color = isCrit ? GOLD_BRIGHT : MUTED[Math.floor(rnd() * MUTED.length)];
    const mat = new THREE.SpriteMaterial({
      map: spriteTex, color, transparent: true,
      opacity: isCrit ? 0.95 : 0.55, depthWrite: false, blending: THREE.AdditiveBlending
    });
    const sprite = new THREE.Sprite(mat);
    const scale = isCrit ? 0.42 : 0.24 + rnd() * 0.1;
    sprite.scale.set(scale, scale, 1);
    sprite.position.set(n.x, n.y, n.z);
    group.add(sprite);
    n.sprite = sprite;
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
    curRotY += (targetRotY + Math.sin(t * 0.08) * 0.12 - curRotY) * 0.03;
    curRotX += (targetRotX - curRotX) * 0.03;
    group.rotation.y = curRotY;
    group.rotation.x = curRotX;

    // gentle critical-path pulse
    const pulse = 0.85 + Math.sin(t * 1.4) * 0.15;
    critNodes.forEach(n => { if (n.sprite) n.sprite.material.opacity = pulse; });

    renderer.render(scene, camera);
  }
  animate();

  mount.classList.add('is-ready');
}
