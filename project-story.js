function renderProjectStory(content, work) {
  const plates = [];
  function figure(stem, title, caption, lead = false) {
    const src = stem.endsWith('.gif') ? 'assets/portfolio/' + stem : portfolioImage(stem);
    const index = plates.push({src, title, caption}) - 1;
    return `<figure class="plate"><a class="plate-image" href="${src}" data-plate="${index}" aria-label="放大查看 · ${title}"><img src="${src}" alt="${caption}" ${lead ? 'fetchpriority="high"' : 'loading="lazy"'}></a><figcaption><strong>${title}</strong><span>${caption}</span></figcaption></figure>`;
  }
  const lead = work.film
    ? `<figure class="plate"><video class="story-film" controls playsinline preload="none" poster="assets/portfolio/${work.film.poster}" aria-label="${work.film.title}"><source src="assets/portfolio/${work.film.src}" type="video/mp4"></video><figcaption><strong>${work.film.title}</strong><span>${work.film.caption}</span></figcaption></figure>`
    : figure(work.lead[0], work.name, work.lead[1], true);
  const chapters = work.chapters.map((chapter, i) => `
    <section class="story-chapter" id="chapter-${i+1}">
      <header><span class="chapter-no">/ 0${i+1}</span><h2>${chapter.title}</h2><p>${chapter.intro}</p></header>
      <div class="plate-grid plates-${chapter.plates.length}">${chapter.plates.map(([src, title, caption]) => figure(src,title,caption)).join('')}</div>
    </section>`).join('');
  const links = (work.links || []).map(([name, url]) => `<a class="text-link" href="${url}">${name}</a>`).join('');
  const chapterNav = work.chapters.map((chapter, i) => `<a href="#chapter-${i+1}"><span>0${i+1}</span> ${chapter.title}</a>`).join('');
  content.innerHTML = `<article class="project-story story-${work.id}"><div class="story-heading"><div class="story-kicker">${work.type}</div><h1>${work.name}</h1></div>
    <div class="story-opening"><div class="story-brief"><h2>${work.title}</h2><p>${work.description}</p>${work.award ? `<p class="story-credit">${work.award}</p>` : ''}<div class="story-links">${links}</div></div>
    <div class="lead-plate">${lead}</div></div>
    <nav class="chapter-nav" aria-label="本项目章节">${chapterNav}</nav>${chapters}
    <a href="works.html" class="return-index">← 返回作品目录</a></article>
    <dialog class="plate-viewer" aria-label="作品大图"><div class="viewer-bar"><strong></strong><a class="viewer-original" target="_blank" rel="noopener">打开原图 ↗</a><button type="button" aria-label="关闭大图">关闭 ×</button></div><img alt=""><div class="viewer-bottom"><button type="button" aria-label="上一张">←</button><p></p><button type="button" aria-label="下一张">→</button></div></dialog>`;
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
