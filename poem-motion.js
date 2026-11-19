import * as THREE from './assets/three.module.min.js';

const host = document.querySelector('.hero-3d');
const stage = document.querySelector('.hero-collage');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
let renderer;
try {
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
} catch {
  host.classList.add('motion-fallback');
}
if (renderer) {
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  renderer.setClearColor(0xffffff, 0);
  host.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-500, 500, 250, -250, 1, 1600);
  camera.position.z = 800;
  scene.add(new THREE.HemisphereLight(0xffffff, 0x4b4264, 2.2));
  const key = new THREE.DirectionalLight(0xffffff, 3.5);
  key.position.set(-200, 400, 450);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xcbd2ff, 2);
  rim.position.set(300, -100, 200);
  scene.add(rim);
  const material = color => new THREE.MeshPhongMaterial({ color, specular: 0xffffff, shininess: 95 });
  const pink = material(0xf5229b), blue = material(0x2437df), silver = material(0xc5cbd8), lime = material(0xdfff00);
  const star = new THREE.Shape();
  for (let i = 0; i < 10; i++) {
    const angle = i * Math.PI / 5 + Math.PI / 2;
    const radius = i % 2 ? 20 : 47;
    const x = Math.cos(angle) * radius, y = Math.sin(angle) * radius;
    if (i === 0) star.moveTo(x, y); else star.lineTo(x, y);
  }
  star.closePath();
  const starGeometry = new THREE.ExtrudeGeometry(star, { depth: 15, bevelEnabled: true, bevelSegments: 5, steps: 1, bevelSize: 6, bevelThickness: 6, curveSegments: 16 });
  starGeometry.center();
  const objects = [];
  function add(geometry, mat, x, y, size, speed, tilt) {
    const mesh = new THREE.Mesh(geometry, mat);
    mesh.rotation.set(tilt, .3, -.2);
    scene.add(mesh);
    objects.push({ mesh, x, y, size, speed, tilt });
    return mesh;
  }
  add(new THREE.TorusGeometry(37, 12, 20, 64), blue, .14, .15, .9, .38, .55);
  add(starGeometry, pink, .73, .18, .87, .27, -.25);
  add(new THREE.SphereGeometry(23, 32, 24), silver, .35, .78, .9, .4, 0);
  add(new THREE.TorusGeometry(23, 7, 16, 48), silver, .90, .81, .85, -.32, .6);
  const capsule = new THREE.Group();
  const white = material(0xf7f6ef);
  for (const direction of [1, -1]) {
    const half = new THREE.Group();
    const cap = new THREE.Mesh(new THREE.SphereGeometry(13, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), direction === 1 ? lime : white);
    cap.position.y = 15;
    const body = new THREE.Mesh(new THREE.CylinderGeometry(13, 13, 15, 32), direction === 1 ? lime : white);
    body.position.y = 7.5;
    half.add(cap, body);
    if (direction === -1) half.rotation.z = Math.PI;
    capsule.add(half);
  }
  scene.add(capsule);
  objects.push({mesh:capsule,x:.94,y:.15,size:1.1,speed:.32,tilt:.8});
  add(new THREE.SphereGeometry(13, 24, 16), pink, .035, .60, .8, .5, 0);
  add(starGeometry, blue, .61, .90, .38, -.36, .3);
  const satellite = add(new THREE.SphereGeometry(8, 20, 14), pink, .14, .15, 1, .65, 0);
  const molecule = new THREE.Group();
  const points = [new THREE.Vector3(-26,0,0), new THREE.Vector3(0,19,5), new THREE.Vector3(27,3,-4), new THREE.Vector3(7,-22,10)];
  points.forEach((point, index) => {
    const atom = new THREE.Mesh(new THREE.SphereGeometry(index === 1 ? 11 : 8, 24, 16), index % 2 ? blue : silver);
    atom.position.copy(point); molecule.add(atom);
  });
  [[0,1],[1,2],[1,3]].forEach(([a,b]) => {
    const axis = points[b].clone().sub(points[a]);
    const bond = new THREE.Mesh(new THREE.CylinderGeometry(2.5,2.5,axis.length(),12), silver);
    bond.position.copy(points[a]).add(points[b]).multiplyScalar(.5);
    bond.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),axis.normalize());
    molecule.add(bond);
  });
  scene.add(molecule);
  objects.push({mesh:molecule,x:.055,y:.88,size:1,speed:.3,tilt:.2});
  let width = 1000, height = 500, scale = 1, elapsed = 0, last = null, running = false, inView = true, frame;
  function render(time) {
    objects.forEach((item, index) => {
      item.mesh.visible = width > 600 || ![3, 6, 8].includes(index);
      const phase = time * item.speed + index;
      item.mesh.scale.setScalar(item.size * scale);
      item.mesh.position.set((item.x - .5) * width + Math.cos(phase) * 5 * scale, (.5 - item.y) * height + Math.sin(phase) * 11 * scale, 0);
      item.mesh.rotation.x = item.tilt + Math.sin(phase * .7) * .18;
      item.mesh.rotation.y = [1, 6].includes(index) ? .3 + Math.sin(phase) * .65 : phase * .65;
      item.mesh.rotation.z = -.25 + Math.sin(phase * .6) * .12;
    });
    satellite.position.x += Math.cos(time * .6) * 63 * scale;
    satellite.position.y += Math.sin(time * .6) * 23 * scale;
    satellite.position.z = Math.sin(time * .6) * 50 * scale;
    renderer.render(scene, camera);
  }
  function tick(now) {
    if (!running) return;
    if (last !== null) elapsed += Math.min((now - last) / 1000, .05);
    last = now;
    render(elapsed);
    frame = requestAnimationFrame(tick);
  }
  function sync() {
    const shouldRun = inView && !document.hidden && !reduced.matches;
    if (running === shouldRun) return;
    running = shouldRun;
    last = null;
    if (running) frame = requestAnimationFrame(tick); else { cancelAnimationFrame(frame); render(elapsed); }
  }
  new ResizeObserver(() => {
    width = host.clientWidth; height = host.clientHeight;
    if (!width || !height) return;
    scale = Math.max(.45, Math.min(width / 1050, 1.15));
    camera.left = -width / 2; camera.right = width / 2; camera.top = height / 2; camera.bottom = -height / 2;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    render(elapsed);
  }).observe(host);
  new IntersectionObserver(entries => { inView = entries[0].isIntersecting; sync(); }).observe(stage);
  document.addEventListener('visibilitychange', sync);
  reduced.addEventListener('change', sync);
  renderer.domElement.addEventListener('webglcontextlost', event => { event.preventDefault(); running = false; cancelAnimationFrame(frame); host.classList.add('motion-fallback'); });
  renderer.domElement.addEventListener('webglcontextrestored', () => { host.classList.remove('motion-fallback'); sync(); });
  sync();
}
