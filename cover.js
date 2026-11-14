const legacyPages = new Set(['about', 'looks', 'picks', 'contact']);
if (legacyPages.has(location.hash.slice(1))) location.replace(location.hash.slice(1) + '.html');

const stage = document.querySelector('.runway-window');
const figures = [...stage.querySelectorAll('figure')];
const decorSets = [...stage.querySelectorAll('.decor-set')];
const buttons = [...document.querySelectorAll('.look-tabs [aria-pressed]')];
const title = document.querySelector('.look-title');
const description = document.querySelector('.look-description');
const number = document.querySelector('.look-index');
const notes = [
  ['白针织与阔腿裤', '针织下摆收在腰间，让深咖色裤腿自然垂到鞋面。'],
  ['短绒与格纹裙', '外套下露出一截格纹，棕色长靴呼应裙子的暖色。'],
  ['宽袖与短裙', '侧面能看清宽袖的垂褶，窄短裙让上衣的轮廓更鲜明。']
];
const count = figures.length;
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const hold = 4900, travel = 1250;
let position = 0, target = 0, start = 0, moving = false, age = 0;
let frame, previous, selected = -1;
function render() {
  figures.forEach((figure, i) => {
    const angle = (position - i) * 2 * Math.PI / count;
    const depth = (1 + Math.cos(angle)) / 2;
    const x = Math.sin(angle) * stage.clientWidth * .34;
    const y = (1 - depth) * stage.clientHeight * .24;
    const scale = .60 + .40 * depth;
    figure.style.transform = 'translateX(-50%) translate(' + x + 'px,' + (-y) + 'px) scale(' + scale + ')';
    figure.style.zIndex = String(2 + Math.round(100 * depth));
    const focus = Math.max(0, (depth - .90) * 10);
    figure.querySelector('.look-detail').setAttribute('aria-hidden', String(focus < .99));
    figure.querySelectorAll('.focus-box').forEach((box, n) => {
      const appear = reduced.matches ? 1 : Math.max(0, Math.min(1, (age - n * 280 - 120) / 380));
      box.style.opacity = focus * (moving ? 0 : appear);
    });
  });
  const active = ((Math.round(position) % count) + count) % count;
  if (active === selected) return;
  selected = active;
  const activeLook = figures[active].dataset.look;
  for (const set of decorSets) {
    set.classList.toggle('is-current', set.dataset.forLook === activeLook);
  }
  title.textContent = notes[active][0];
  description.textContent = notes[active][1];
  number.textContent = 'LOOK 0' + (active + 1) + ' / 03';
  buttons.forEach((button,i)=>button.setAttribute('aria-pressed', String(i === active)));
}
function choose(next) {
  start = position;
  target = next;
  age = 0;
  moving = !reduced.matches && Math.abs(start - target) > .001;
  if (!moving) position = target;
  render();
}
function tick(now) {
  if (previous !== undefined) age += now - previous;
  previous = now;
  if (moving) {
    const t = Math.min(age / travel, 1);
    position = start + (target - start) * t * t * (3 - 2 * t);
    if (t === 1) { moving = false; age = 0; }
  } else if (age >= hold) choose(target + 1);
  render();
  frame = requestAnimationFrame(tick);
}
function resume() {
  cancelAnimationFrame(frame);
  previous = undefined;
  if (reduced.matches) choose(target);
  else if (!document.hidden) frame = requestAnimationFrame(tick);
}
buttons.forEach((button, i) => button.addEventListener('click', () => {
  choose(i + count * Math.round((position - i) / count));
}));
document.querySelectorAll('[data-step]').forEach(button => button.addEventListener('click', () => {
  choose(Math.round(position) + Number(button.dataset.step));
}));
new ResizeObserver(render).observe(stage);
reduced.addEventListener('change', resume);
document.addEventListener('visibilitychange', resume);
render();
Promise.allSettled(figures.map(f => f.querySelector('img').decode())).then(resume);
