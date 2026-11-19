const projects = [
  { id: 'luma', name: 'LUMA HEALTH', category: 'health', type: '医疗品牌 / HEALTHCARE IDENTITY', image: 'assets/poem-health.webp', title: '让专业的关怀，拥有清晰的形状。', description: '一组医疗健康品牌概念：将包装、品牌识别与官网放进同一套视觉系统，用清楚的信息层级表达专业与亲近。', scope: '品牌识别、包装系统、信息层级、响应式官网', approach: '以钴蓝建立稳定的识别，以荧光圆弧形成记忆点。包装侧面、品牌卡与网站延续同一网格和字体关系。', deliverable: '品牌视觉方向、纸盒与瓶身包装概念、官网视觉与组件示意。' },
  { id: 'forme', name: 'FORME', category: 'brand', type: '品牌视觉 / BRAND IDENTITY', image: 'assets/poem-brand.webp', title: '从一杯咖啡，建立一种记忆。', description: '以钴蓝色、器物的曲线和克制的字标，为一家概念咖啡品牌探索完整的视觉语言。', scope: '品牌策略、标志与字体、色彩体系、包装应用', approach: '从杯子的圆弧中提取图形，让同一套视觉规则延伸到包装、印刷物和数字触点。', deliverable: '品牌识别系统、包装设计与应用规范。' },
  { id: 'offgrid', name: 'OFFGRID', category: 'web', type: '网页设计 / WEB EXPERIENCE', image: 'assets/poem-web.webp', title: '让作品占据舞台中央。', description: '为独立建筑与文化平台构思的编辑式网站。大图、醒目的标题与轻量导航，让内容拥有自己的节奏。', scope: '内容架构、网页 UI、响应式布局、交互原型', approach: '把杂志的阅读节奏转化为网页结构，用清晰的内容层级串联首页、作品列表和文章详情。', deliverable: '桌面与移动端界面、交互原型及组件规范。' },
  { id: 'pulse', name: 'PULSE', category: 'app', type: 'App 设计 / DIGITAL PRODUCT', image: 'assets/poem-app.webp', title: '把喜欢的声音，带进日常。', description: '围绕音乐发现与收藏设计的移动端概念。用有温度的色彩和清晰的操作路径，连接探索、播放与保存。', scope: '用户流程、App UI、组件库、动态反馈', approach: '围绕发现、试听、收藏三个核心动作组织信息，让每一次点击都能自然进入下一步。', deliverable: '核心用户流程、界面原型和产品设计系统。' }
];
const page = document.body.dataset.page;
if (page === 'home') import('./poem-motion.js?v=3').catch(() => document.querySelector('.hero-3d')?.classList.add('motion-fallback'));
const nav = [['index.html','Home','home'],['works.html','Works','works'],['services.html','Services','services'],['about.html','Studio','about']];
document.querySelector('.site-header').innerHTML = `<a class="logo" href="index.html" aria-label="Poem Studio 首页"><span class="logo-symbol" aria-hidden="true">✳</span><span>POEM<br>STUDIO</span></a><nav aria-label="主导航">${nav.map(([url,label,key])=>`<a href="${url}" ${page===key?'aria-current="page"':''}>${label}</a>`).join('')}</nav><a class="header-link" href="contact.html">聊聊你的项目</a>`;
document.querySelector('.site-footer').innerHTML = '<p>POEM STUDIO · 品牌 / 网页 / APP</p><a href="contact.html">开始一个项目</a><p>© 2026 POEM STUDIO</p>';
function projectCard(project) {
  return `<a class="work-card" data-category="${project.category}" href="project.html?id=${project.id}"><div class="work-visual"><img src="${project.image}" alt="${project.name} ${project.type}概念设计展示" width="1536" height="1024" loading="lazy"><span class="concept">CONCEPT / 概念练习</span></div><h3>${project.name}</h3><div class="work-meta"><span>${project.type}</span><span>2026</span></div><p>${project.title}</p></a>`;
}
document.querySelectorAll('.work-grid').forEach(grid=>{grid.innerHTML=projects.map(projectCard).join('')});
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('[data-filter]').forEach(other=>other.setAttribute('aria-pressed',String(other===button)));
  document.querySelectorAll('.work-card').forEach(card=>{card.hidden=button.dataset.filter!=='all' && card.dataset.category!==button.dataset.filter});
}));
if (document.querySelector('#case-content')) {
  const project = projects.find(item=>item.id===new URLSearchParams(location.search).get('id'));
  const content = document.querySelector('#case-content');
  if (project) {
    document.title = project.name + ' · Poem Studio';
    content.innerHTML = `<div class="case-hero"><img src="${project.image}" alt="${project.name} 概念设计全图"><div><p class="work-meta">${project.type} · CONCEPT</p><h1>${project.name}</h1><h2>${project.title}</h2><p>${project.description}</p><dl><dt>设计范围</dt><dd>${project.scope}</dd><dt>设计思路</dt><dd>${project.approach}</dd><dt>呈现内容</dt><dd>${project.deliverable}</dd></dl><p class="help">这是用于呈现工作室视觉方向的概念练习。</p><a class="button" href="contact.html?service=${project.category}">讨论类似项目</a></div></div>`;
if (project.id === 'luma') content.insertAdjacentHTML('beforeend', `<section class="luma-system"><div class="luma-identity"><span class="eyebrow">THE VISUAL LANGUAGE</span><strong>LUMA<br>HEALTH<span class="luma-dot"></span></strong><p>钴蓝、圆弧与清晰的网格，连接品牌与每个触点。</p><div class="palette"><i></i><i></i><i></i></div></div><div class="luma-notes"><h2>一套规则，<br>两种阅读距离。</h2><p>包装：先识别品牌，再读取产品类别与信息。</p><p>网页：先理解品牌方向，再进入产品与内容。</p><p>相同的字体、色彩与圆弧图形，让线下与线上彼此呼应。</p></div></section><div class="case-gallery"><figure><img src="assets/poem-health.webp" alt="LUMA 包装体系细节"><figcaption>PACKAGING / 包装与材质</figcaption></figure><figure><img src="assets/poem-health.webp" alt="LUMA 官网视觉细节"><figcaption>WEB EXPERIENCE / 官网视觉</figcaption></figure></div>`);  } else content.innerHTML = '<div class="empty"><h1>这个项目还未收录。</h1><a class="text-link" href="works.html">浏览全部项目</a></div>';
}
const brief = document.querySelector('.brief');
if (page === 'services') {
  const openService = () => {
    const section = document.getElementById(location.hash.slice(1));
    if (section instanceof HTMLDetailsElement) section.open = true;
  };
  openService();
  window.addEventListener('hashchange', openService);
}
if (brief) {
  const service = new URLSearchParams(location.search).get('service');
  if (['brand','web','app','health'].includes(service)) brief.elements.service.value=service;
  brief.addEventListener('submit', event=>{
    event.preventDefault();
    const data=new FormData(brief);
    const category=brief.elements.service.selectedOptions[0].textContent;
    const text=`Poem Studio 项目简报\n\n称呼：${data.get('name')}\n联系方式：${data.get('contact')}\n项目类型：${category}\n项目说明：${data.get('description')}\n`;
    const url=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));
    const download=document.createElement('a');download.href=url;download.download='Poem-Studio-项目简报.txt';download.click();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
    document.querySelector('.form-status').textContent='项目简报已生成，可保存后发送给工作室。';
  });
}
