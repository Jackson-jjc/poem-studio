function renderProjectStory(content, work) {
  const plates = [];
  function figure(stem, title, caption, lead = false) {
    const index = plates.push({src: portfolioImage(stem), title, caption}) - 1;
    return `<figure class="plate"><a class="plate-image" href="${portfolioImage(stem)}" data-plate="${index}" aria-label="放大查看 · ${title}"><img src="${portfolioImage(stem)}" alt="${caption}" ${lead ? 'fetchpriority="high"' : 'loading="lazy"'}></a><figcaption><strong>${title}</strong><span>${caption}</span></figcaption></figure>`;
  }
  const lead = figure(work.lead[0], work.name, work.lead[1], true);
  const chapters = work.chapters.map((chapter, i) => `
    <section class="story-chapter" id="chapter-${i+1}">
      <header><span class="chapter-no">/ 0${i+1}</span><h2>${chapter.title}</h2><p>${chapter.intro}</p></header>
      <div class="plate-grid plates-${chapter.plates.length}">${chapter.plates.map(([src, title, caption]) => figure(src,title,caption)).join('')}</div>
    </section>`).join('');
  const links = (work.links || []).map(([name, url]) => `<a class="text-link" href="${url}">${name}</a>`).join('');
  const chapterNav = work.chapters.map((chapter, i) => `<a href="#chapter-${i+1}"><span>0${i+1}</span> ${chapter.title}</a>`).join('');
  const motion = work.id === 'shenwan' ? '<button class="motion-switch" type="button" aria-pressed="false">播放标志动效</button>' : '';
  content.innerHTML = `<article class="project-story story-${work.id}"><div class="story-heading"><div class="story-kicker">${work.type}</div><h1>${work.name}</h1></div>
    <div class="story-opening"><div class="story-brief"><h2>${work.title}</h2><p>${work.description}</p>${work.award ? `<p class="story-credit">${work.award}</p>` : ''}${work.edition ? `<small>${work.edition}</small>` : ''}<div class="story-links">${links}</div></div>
    <div class="lead-plate">${lead}${motion}</div></div>
    <nav class="chapter-nav" aria-label="本项目章节">${chapterNav}</nav>${chapters}
    <a href="works.html" class="return-index">← 返回作品目录</a></article>
    <dialog class="plate-viewer" aria-label="作品大图"><div class="viewer-bar"><strong></strong><a class="viewer-original" target="_blank" rel="noopener">打开原图 ↗</a><button type="button" aria-label="关闭大图">关闭 ×</button></div><img alt=""><div class="viewer-bottom"><button type="button" aria-label="上一张">←</button><p></p><button type="button" aria-label="下一张">→</button></div></dialog>`;
  const motionButton = content.querySelector('.motion-switch');
  if (motionButton) {
    motionButton.addEventListener('click', () => {
      const playing = motionButton.getAttribute('aria-pressed') !== 'true';
      motionButton.setAttribute('aria-pressed', String(playing));
      motionButton.textContent = playing ? '停止动效' : '播放标志动效';
      content.querySelector('.lead-plate img').src = playing ? 'assets/portfolio/shenwan-motion.gif' : plates[0].src;
    });
  }
  const viewer = content.querySelector('.plate-viewer');
  const [close, prev, next] = viewer.querySelectorAll('button');
  let selected = 0;
  function show(index) {
    selected = (index + plates.length) % plates.length;
    const {src, title, caption} = plates[selected];
    const image = viewer.querySelector('img');
    image.src = src;
    image.alt = caption;
    viewer.querySelector('.viewer-original').href = src;
    viewer.querySelector('strong').textContent = `${selected+1} / ${plates.length}　${title}`;
    viewer.querySelector('p').textContent = caption;
  }
  content.addEventListener('click', event => {
    const link = event.target.closest('[data-plate]');
    if (!link || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || typeof viewer.showModal !== 'function') return;
    event.preventDefault();
    show(Number(link.dataset.plate));
    viewer.showModal();
  });
  close.onclick = () => viewer.close();
  prev.onclick = () => show(selected-1);
  next.onclick = () => show(selected+1);
  viewer.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') show(selected-1);
    if (event.key === 'ArrowRight') show(selected+1);
  });
}
