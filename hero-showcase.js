export function mountShowcase() {
  const poster = document.querySelector('.work-poster');
  if (!poster) return;
  const field = poster.querySelector('.object-field');
  const frame = field.querySelector('.object-focus');
  const caption = poster.querySelector('.caption-entry');
  const photo = poster.querySelector('.caption-photo');
  const link = poster.querySelector('.caption-link');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const controls = poster.querySelector('.poster-controls');
  const items = [...field.querySelectorAll('.specimen')].map(anchor => {
    const control = document.createElement('button');
    control.type = 'button';
    control.className = anchor.className;
    const title = anchor.getAttribute('aria-label');
    control.setAttribute('aria-label', '查看' + title + '的说明');
    const mount = document.createElement('span');
    mount.className = 'piece-mount';
    mount.append(...anchor.childNodes);
    const mosaic = new Image();
    mosaic.className = 'mosaic-print';
    mosaic.alt = '';
    mosaic.onload = () => control.classList.add('has-mosaic');
    mosaic.src = 'assets/cover/mosaic-' + new URL(anchor.href).searchParams.get('id') + '.webp';
    mount.append(mosaic);
    control.append(mount);
    anchor.replaceWith(control);
    return {control, mount, title, url:anchor.href, ...anchor.dataset};
  });
  let current = 0;
  let timer;
  let screenTimer;
  const screenNames = ['图案目录','绣样详情','绣线配色','针法分类'];
  const focusDetail = frame.querySelector('.focus-detail');
  function showScreen(step) {
    const phone = items[current].control;
    phone.dataset.screen = step;
    focusDetail.textContent = screenNames[step];
    if (!motion.matches && step < screenNames.length-1) {
      screenTimer = setTimeout(() => showScreen(step+1),1700);
    }
  }
  let visible = true;
  function placeFrame(previous) {
    const {mount} = items[current];
    mount.append(frame);
    frame.getAnimations().forEach(animation => animation.cancel());
    const fieldRect = field.getBoundingClientRect();
    const base = mount.getBoundingClientRect();
    const art = mount.querySelector('.object-art').getBoundingClientRect();
    const pad = Math.max(3, Math.min(10, fieldRect.width * .007));
    const bounds = {left:art.left-base.left-pad+'px',top:art.top-base.top-pad+'px',
      width:art.width+2*pad+'px',height:art.height+2*pad+'px'};
    Object.assign(frame.style,bounds);
    if (previous && !motion.matches) {
      frame.animate([{left:previous.left-base.left+'px', top:previous.top-base.top+'px',
        width:previous.width+'px',height:previous.height+'px'},bounds],
        {duration:550,easing:'cubic-bezier(.2,.72,.2,1)'});
    }
  }
  function schedule() {
    clearTimeout(timer);
    if (visible && !document.hidden && !motion.matches && !poster.querySelector(':focus-visible')) {
      timer = setTimeout(() => select(current+1), items[current].control.classList.contains('phone-art') ? 7100 : 4900);
    }
  }
  function select(index) {
    clearTimeout(screenTimer);
    const previous = frame.hidden ? null : frame.getBoundingClientRect();
    current = (index+items.length)%items.length;
    const item = items[current];
    items.forEach(({control},i) => {
      control.classList.toggle('is-current',i===current);
      control.setAttribute('aria-pressed', String(i===current));
      delete control.dataset.screen;
    });
    const number = String(current+1).padStart(2,'0');
    poster.querySelector('.caption-count b').textContent = number;
    frame.querySelector('.focus-tag').textContent = number+' / '+(item.short || item.title);
    focusDetail.textContent = item.detail;
    if (item.control.classList.contains('phone-art')) showScreen(0);
    caption.querySelector('h2').textContent = item.title;
    caption.querySelector('p span').textContent = item.caption;
    photo.src = portfolioImage(item.photo);
    photo.alt = item.alt;
    link.href = item.url;
    link.setAttribute('aria-label','查看'+item.title+'项目');
    placeFrame(previous);
    caption.classList.remove('is-entering');
    void caption.offsetWidth;
    if (poster.classList.contains('is-ready')) caption.classList.add('is-entering');
    schedule();
  }
  items.forEach(({control},i) => control.addEventListener('click',() => select(i)));
  const [previous,next] = controls.querySelectorAll('button');
  previous.addEventListener('click',() => select(current-1));
  next.addEventListener('click',() => select(current+1));
  field.addEventListener('keydown',event => {
    if (!['ArrowLeft','ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    select(current + (event.key==='ArrowRight' ? 1 : -1));
    items[current].control.focus();
  });
  poster.addEventListener('focusin',schedule);
  poster.addEventListener('focusout',() => requestAnimationFrame(schedule));
  document.addEventListener('visibilitychange',schedule);
  motion.addEventListener('change',schedule);
  new IntersectionObserver(([entry]) => {visible=entry.isIntersecting;schedule();}).observe(poster);
  new ResizeObserver(() => placeFrame()).observe(field);
  controls.hidden = false;
  select(Math.max(0,items.findIndex(item => 'opening' in item)));
  frame.hidden = false;
  requestAnimationFrame(() => poster.classList.add('is-ready'));
}
