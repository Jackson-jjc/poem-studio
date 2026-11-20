const projects = [
  { id: 'luma', name: 'LUMA HEALTH', category: 'health', type: '医疗品牌 / HEALTHCARE IDENTITY', image: 'assets/poem-health.webp', title: '让专业的关怀，拥有清晰的形状。', description: '一组医疗健康品牌概念：将包装、品牌识别与官网放进同一套视觉系统，用清楚的信息层级表达专业与亲近。', scope: '品牌识别、包装系统、信息层级、响应式官网', approach: '以钴蓝建立稳定的识别，以荧光圆弧形成记忆点。包装侧面、品牌卡与网站延续同一网格和字体关系。', deliverable: '品牌视觉方向、纸盒与瓶身包装概念、官网视觉与组件示意。' },
  { id: 'forme', name: 'FORME', category: 'brand', type: '品牌视觉 / BRAND IDENTITY', image: 'assets/poem-brand.webp', title: '从一杯咖啡，建立一种记忆。', description: '以钴蓝色、器物的曲线和克制的字标，为一家概念咖啡品牌探索完整的视觉语言。', scope: '品牌策略、标志与字体、色彩体系、包装应用', approach: '从杯子的圆弧中提取图形，让同一套视觉规则延伸到包装、印刷物和数字触点。', deliverable: '品牌识别系统、包装设计与应用规范。' },
  { id: 'offgrid', name: 'OFFGRID', category: 'web', type: '网页设计 / WEB EXPERIENCE', image: 'assets/poem-web.webp', title: '让作品占据舞台中央。', description: '为独立建筑与文化平台构思的编辑式网站。大图、醒目的标题与轻量导航，让内容拥有自己的节奏。', scope: '内容架构、网页 UI、响应式布局、交互原型', approach: '把杂志的阅读节奏转化为网页结构，用清晰的内容层级串联首页、作品列表和文章详情。', deliverable: '桌面与移动端界面、交互原型及组件规范。' },
  { id: 'pulse', name: 'PULSE', category: 'app', type: 'App 设计 / DIGITAL PRODUCT', image: 'assets/poem-app.webp', title: '把喜欢的声音，带进日常。', description: '围绕音乐发现与收藏设计的移动端概念。用有温度的色彩和清晰的操作路径，连接探索、播放与保存。', scope: '用户流程、App UI、组件库、动态反馈', approach: '围绕发现、试听、收藏三个核心动作组织信息，让每一次点击都能自然进入下一步。', deliverable: '核心用户流程、界面原型和产品设计系统。' }
];
const page = document.body.dataset.page;
if (page === 'home') {
  import('./hero-showcase.js?v=12').then(({mountShowcase}) => mountShowcase());
}
const nav = [['index.html','首页','home'],['works.html','作品','works'],['services.html','服务','services'],['about.html','关于','about']];
document.querySelector('.site-header').innerHTML = `<a class="logo" href="index.html" aria-label="Poem Studio 首页"><span class="logo-symbol" aria-hidden="true">✳</span><span>POEM<br>STUDIO</span></a><nav aria-label="主导航">${nav.map(([url,label,key])=>`<a href="${url}" ${page===key?'aria-current="page"':''}>${label}</a>`).join('')}</nav><a class="header-link" href="contact.html">聊聊你的项目</a>`;
document.querySelector('.site-footer').innerHTML = '<p>POEM STUDIO · 品牌 / 网页 / APP</p><a href="contact.html">开始一个项目</a><p>© 2026 POEM STUDIO</p>';
function projectCard(work) {
  const image = work.cover || work.image;
  return `<a class="work-card real-card" href="project.html?id=${work.id}"><div class="work-visual edit-${work.id}"><img src="${portfolioImage(image)}" alt="" loading="lazy"></div><div class="work-meta">${work.type}</div><h3>${work.name}</h3><p>${work.title}</p></a>`;
}
const directory = document.querySelector('.portfolio-directory');
if (directory) {
  const previews = {
    brand: ['diaozhuo', portfolioImage('diaozhuo-cover'), '开平碉楼造型的盆器与纸盒'],
    digital: ['meyou', portfolioImage('site-meyou'), 'MeYou 跨境医美信息核验网站首页'],
    objects: ['graduate', portfolioImage('graduate-magnets'), '五款毕业冰箱贴与南安普顿大学校徽背卡'],
    research: ['drawnwork', 'assets/cover/flower.webp', '潮汕抽纱的分形花样']
  };
  directory.innerHTML = `<figure class="index-preview"><a class="index-plate" href=""><img alt=""></a><figcaption><strong></strong><a class="index-case-link" href="">查看案例 ↗</a></figcaption></figure>
    <div class="index-rows">${portfolioSections.map(section => {
      const count = studioWorks.filter(work => section.categories.includes(work.category)).length;
      return `<div class="index-row"><button type="button" data-section="${section.id}" aria-label="预览${section.name}" aria-pressed="false"><strong>${section.name}</strong><small lang="en">${section.en}</small></button><a href="works.html?group=${section.id}" aria-label="浏览${section.name}，共 ${count} 个项目">${count} 项 <span aria-hidden="true">↗</span></a></div>`;
    }).join('')}</div>`;
  const figure = directory.querySelector('figure');
  const img = figure.querySelector('img');
  const buttons = directory.querySelectorAll('button');
  function preview(section) {
    const [id, src, alt] = previews[section];
    figure.dataset.section = section;
    img.src = src;
    img.alt = alt;
    figure.querySelector('strong').textContent = studioWorks.find(work => work.id === id).name;
    figure.querySelectorAll('a').forEach(a => a.href = 'project.html?id='+id);
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.section === section)));
  }
  buttons.forEach(button => button.addEventListener('click', () => preview(button.dataset.section)));
  preview(portfolioSections[0].id);
}
const catalogue = document.querySelector('.catalogue');
if (catalogue) {
  const key = new URLSearchParams(location.search).get('group');
  const selected = portfolioSections.some(s => s.id === key) ? key : 'all';
  document.querySelector('.filters').innerHTML = [{id:'all',name:'全部作品'}, ...portfolioSections].map(s =>
    `<a href="works.html${s.id === 'all' ? '' : '?group='+s.id}" ${s.id === selected ? 'aria-current="page"' : ''}>${s.name}</a>`).join('');
  catalogue.innerHTML = portfolioSections.filter(s => selected === 'all' || selected === s.id).map(section => {
    const projects = studioWorks.filter(work => section.categories.includes(work.category));
    return `<section class="catalogue-section"><header><h2>${section.name}</h2><small lang="en">${section.en}</small></header><div class="work-grid">${projects.map(projectCard).join('')}</div></section>`;
  }).join('');
}
document.querySelectorAll('.open-research').forEach(section => {
  section.innerHTML = `<header><small lang="en">RESEARCH NOTES</small><h2 id="research-title">研究手记</h2></header><div class="research-list">${researchNotes.map(note => `<article><small class="note-type">${note.type}</small><h3>${note.name}</h3><p class="note-credit">${note.credit}</p><p>${note.description}</p><div class="note-links">${note.links.map(([label,url]) => `<a href="${url}">${label}<span aria-hidden="true"> ↗</span></a>`).join('')}</div></article>`).join('')}</div>`;
});
if (document.querySelector('#case-content')) {
  const project = projects.find(item=>item.id===new URLSearchParams(location.search).get('id'));
  const content = document.querySelector('#case-content');
  const work = studioWorks.find(item => item.id === new URLSearchParams(location.search).get('id'));
  if (work) {
    document.title = work.name + ' · Poem Studio';
    renderProjectStory(content, work);
  } else if (project) {
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
