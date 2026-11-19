export function mountShowcase(projects) {
  const stage = document.querySelector('.project-showcase');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const themes = {
    luma: { label: '让关怀，清晰可见。', note: '包装、品牌与官网，使用同一种视觉语言。', tag: '医疗健康 / 品牌与官网' },
    forme: { label: '让品牌，被记住。', note: '从包装材质到色彩，建立可被记住的品牌。', tag: '品牌视觉 / 包装设计' },
    offgrid: { label: '给好内容，一个舞台。', note: '把编辑的节奏，转化为清楚的浏览路径。', tag: '网页设计 / 内容体验' },
    pulse: { label: '让体验，自然发生。', note: '用有温度的界面，让发现与收藏自然发生。', tag: '应用界面 / 数字体验' }
  };
  stage.innerHTML = `<div class="showcase-stage"><div class="hero-3d" aria-hidden="true"></div><div class="slide-deck">${projects.map((p,i)=>`<article class="project-slide" data-project="${p.id}" aria-hidden="${i!==0}" ${i?'inert':''}><div class="slide-copy"><span class="eyebrow">${themes[p.id].tag}</span><h2>${themes[p.id].label.replace('，','，<br>')}</h2><p>${p.title}</p><a class="slide-link" href="project.html?id=${p.id}">探索 ${p.name}</a><span class="slide-concept">概念设计 / CONCEPT</span></div><a class="slide-image" href="project.html?id=${p.id}" tabindex="${i?-1:0}"><img src="${p.image}" alt="${p.name} ${p.type}设计概念" ${i?'':'fetchpriority="high"'}><span class="image-label">${p.name}</span><span class="pixel-seam" aria-hidden="true">${Array.from({length:18},(_,n)=>`<i style="--n:${n};--size:${[12,24,36,18,48,14][n%6]}px"></i>`).join('')}</span></a></article>`).join('')}</div></div><div class="showcase-footer"><p class="showcase-note">${themes.luma.note}</p><div class="showcase-controls" aria-label="选择精选作品">${projects.map((p,i)=>`<button type="button" data-slide="${i}" aria-label="展示 ${p.name}" aria-pressed="${i===0}"><span>${p.type.split(' / ')[0]}</span><small>${p.name}</small><i></i></button>`).join('')}</div></div>`;
  const slides = [...stage.querySelectorAll('.project-slide')];
  stage.classList.add('is-initializing');
  setTimeout(()=>stage.classList.remove('is-initializing'),1550);
  const controls = [...stage.querySelectorAll('[data-slide]')];
  let active = 0, timer, busy = false, pending = null, visible = true, focused = false, hovering = false;
  stage.dataset.project = projects[0].id;
  stage.dataset.active = '0';
  function schedule() {
    clearTimeout(timer);
    stage.classList.remove('is-playing');
    if (!visible || document.hidden || focused || hovering || reduced.matches) return;
    requestAnimationFrame(()=>stage.classList.add('is-playing'));
    timer = setTimeout(()=>select((active+1)%projects.length),6200);
  }
  function select(index) {
    if (busy) { pending=index; return; }
    if (index===active) return;
    busy = true;
    stage.classList.remove('is-initializing');
    stage.classList.remove('is-playing');
    stage.classList.add('is-switching');
    const old = active;
    active = index;
    const p = projects[active];
    slides[old].classList.add('slide-out');
    slides[old].setAttribute('aria-hidden','true'); slides[old].inert=true;
    slides[old].querySelector('.slide-image').tabIndex=-1;
    slides[active].inert=false; slides[active].setAttribute('aria-hidden','false');
    slides[active].querySelector('.slide-image').tabIndex=0;
    stage.dataset.project=p.id; stage.dataset.active=String(active);
    controls.forEach((button,i)=>button.setAttribute('aria-pressed',String(i===active)));
    setTimeout(()=>{stage.querySelector('.showcase-note').textContent=themes[p.id].note;},reduced.matches?0:480);
    stage.dispatchEvent(new CustomEvent('showcasechange',{detail:{id:p.id,index:active}}));
    setTimeout(()=>{
      slides[old].classList.remove('slide-out');stage.classList.remove('is-switching');busy=false;
      const requested=pending;pending=null;
      if(requested!==null && requested!==active)select(requested);else schedule();
    },reduced.matches?0:1550);
  }
  controls.forEach((button,i)=>button.addEventListener('click',()=>select(i)));
  stage.addEventListener('keydown',event=>{
    if (event.key!=='ArrowRight'&&event.key!=='ArrowLeft') return;
    event.preventDefault(); const index=(active+(event.key==='ArrowRight'?1:-1)+projects.length)%projects.length;
    select(index); controls[index].focus();
  });
  stage.addEventListener('focusin',()=>{focused=true;schedule();});
  stage.addEventListener('focusout',()=>{focused=stage.contains(document.activeElement);setTimeout(()=>{focused=stage.contains(document.activeElement);schedule();},0);});
  stage.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse'){hovering=true;schedule();}});
  stage.addEventListener('pointerleave',()=>{hovering=false;schedule();});
  let touchStart;
  stage.addEventListener('touchstart',event=>{touchStart=event.touches[0].clientX;},{passive:true});
  stage.addEventListener('touchend',event=>{const dx=event.changedTouches[0].clientX-touchStart;if(Math.abs(dx)>55)select((active+(dx<0?1:-1)+projects.length)%projects.length);},{passive:true});
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;schedule();},{threshold:.2}).observe(stage);
  document.addEventListener('visibilitychange',schedule);
  reduced.addEventListener('change',schedule);
  schedule();
}
