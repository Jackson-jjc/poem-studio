const { looks, picks } = window.wardrobe;
const page = document.body.dataset.page;
const chosenId = new URLSearchParams(location.search).get('id');
const viewLabels = ['正面', '侧面', '背面'];

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}
function link(label, href, className) {
  const node = element('a', className, label);
  node.href = href;
  return node;
}
function photo(path, alt) {
  const image = new Image();
  image.src = 'assets/' + path + '.webp';
  image.alt = alt;
  return image;
}
function itemUrl(kind, item) {
  return kind + '.html?id=' + encodeURIComponent(item.id);
}
function showPicks() {
  const grid = document.getElementById('pickGrid');
  for (const item of picks) {
    const card = link('', itemUrl('piece', item), 'card');
    const frame = element('div', 'card-photo');
    frame.append(photo('piece-' + item.id, item.zh));
    card.append(frame, element('h2', '', item.zh), element('p', '', item.type));
    const tile = element('article');
    tile.append(card);
    productLink(item, tile);
    grid.append(tile);
  }
}
function showLooks() {
  const grid = document.getElementById('lookGrid');
  for (const [index, look] of looks.entries()) {
    const card = link('', itemUrl('look', look), 'look-sheet');
    const heading = element('div', 'sheet-heading');
    heading.append(element('span', 'mini-caption', 'LOOK ' + String(index + 1).padStart(2, '0')),
      element('h2', '', look.name));
    const board = element('div', 'outfit-board');
    const lineup = element('ol', 'lineup');
    // A jacket and its base layer share one flat lay. The other rows show the bottom and shoes.
    const names = [look.items.slice(0, -2).join('＋'), ...look.items.slice(-2)];
    ['top', 'bottom', 'shoes'].forEach((part, position) => {
      const row = element('li');
      row.append(photo('look-cutouts/flats/' + look.id + '-' + part, ''), element('span', '', names[position]));
      lineup.append(row);
    });
    const worn = photo('look-cutouts/' + look.id + '-0', look.zh + '的全身造型');
    worn.className = 'worn';
    board.append(lineup, worn);
    const caption = element('div', 'sheet-footer');
    caption.append(element('span', '', look.zh), element('span', '', '看搭配 ↗'));
    card.append(heading, board, caption);
    grid.append(card);
  }
}
function productLink(pick, container) {
  const { nickname, profileUrl, showcaseUrl } = window.wardrobe.douyin;
  const candidates = [
    [pick?.url, '去抖音看这件商品'],
    [showcaseUrl, '逛' + nickname + '的抖音橱窗'],
    [profileUrl, '去抖音看' + nickname + '的主页'],
    ['https://www.douyin.com/search/' + encodeURIComponent(nickname) + '?type=user', '去抖音找' + nickname]
  ];
  const [href, label] = candidates.find(([address]) => {
    if (!address || !URL.canParse(address)) return false;
    const url = new URL(address);
    return url.protocol === 'https:' && /(^|\.)(douyin\.com|jinritemai\.com)$/.test(url.hostname);
  });
  const buy = link(label + ' ↗', href, 'douyin-link');
  buy.target = '_blank';
  buy.rel = 'noopener noreferrer';
  container.append(buy);
}
function addAngles(look, image, container) {
  if (look.views <= 1) return;
  const controls = element('div', 'angle-buttons');
  viewLabels.slice(0, look.views).forEach((label, index) => {
    const button = element('button', '', label);
    button.type = 'button';
    button.setAttribute('aria-pressed', String(index === 0));
    button.onclick = () => {
      image.src = 'assets/look-cutouts/' + look.id + '-' + index + '.webp';
      image.alt = look.zh + '，' + label;
      for (const other of controls.children) other.setAttribute('aria-pressed', String(other === button));
    };
    controls.append(button);
  });
  container.append(controls);
}
function showEntry(isLook) {
  const entry = document.getElementById('entry');
  const collection = isLook ? looks : picks;
  const item = collection.find(candidate => candidate.id === chosenId);
  if (!item) {
    entry.append(element('h1', '', '未找到这条穿搭记录'));
    return;
  }
  const look = isLook ? item : looks[item.look];
  const image = photo(isLook ? 'look-cutouts/' + look.id + '-0' : 'piece-' + item.id, item.zh);
  const info = element('div', 'entry-copy');
  const title = isLook ? item.name : item.zh;
  document.title = title + ' · 小点昕 | DIANXIN STUDIO';
  info.append(element('p', 'eyebrow', isLook ? item.zh : item.type));
  info.append(element('h1', '', title), element('p', '', isLook ? look.desc : item.txt));
  if (isLook) {
    addAngles(look, image, info);
    info.append(element('h2', 'list-heading', '本套单品'));
    const list = element('ul', 'piece-list');
    for (const name of look.items) {
      const row = element('li');
      const piece = picks.find(pick => looks[pick.look] === look && pick.zh === name);
      if (piece) {
        row.append(link(name + ' ↗', itemUrl('piece', piece), 'text-link'));
        if (piece.url) productLink(piece, row);
      } else row.textContent = name;
      list.append(row);
    }
    info.append(list);
    productLink(null, info);
  } else {
    info.append(link('看整套搭配 · ' + look.name + ' ↗', itemUrl('look', look), 'cover-link'));
    productLink(item, info);
  }
  info.append(element('small', 'credit', 'AI 造型示意'));
  entry.append(image, info);
}
if (page === 'looks') showLooks();
else if (page === 'picks') showPicks();
else showEntry(page === 'look');
