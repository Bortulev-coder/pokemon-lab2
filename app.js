const STAGE = { width: 1880, height: 3380 };

const nodes = [
  { id:'Main', x:100, y:170, w:320, h:185, kind:'external', stereo:'', pkg:'lab2', body:['+ main(String[]): void'], text:'Точка входа. Создаёт объект Battle, формирует две команды и запускает бой методом go().', relations:['зависит от Battle','создаёт объекты покемонов'] },
  { id:'Battle', x:470, y:170, w:300, h:205, kind:'external', stereo:'«external»', pkg:'ru.ifmo.se.pokemon', body:['+ addAlly(Pokemon)','+ addFoe(Pokemon)','+ go(): void'], text:'Готовый класс симулятора боя из Pokemon.jar. Принимает покемонов в команды и управляет ходами.', relations:['используется классом Main'] },
  { id:'Pokemon', x:830, y:140, w:430, h:290, kind:'external', stereo:'«external»', pkg:'ru.ifmo.se.pokemon', body:['+ Pokemon(name, level)','# setType(Type...)','# setStats(hp, atk, def, spAtk, spDef, speed)','# setMove(Move...)'], text:'Базовый класс для всех покемонов. Внутри хранит имя, уровень, типы, характеристики и набор атак.', relations:['родитель для Phione, Shellder и Lotad'] },
  { id:'Effect', x:1320, y:170, w:370, h:235, kind:'external', stereo:'«external»', pkg:'ru.ifmo.se.pokemon', body:['+ stat(Stat, int): Effect','+ condition(Status): Effect','+ turns(int): Effect','+ static freeze(Pokemon)'], text:'Объект, описывающий дополнительный эффект атаки: изменение характеристики, сон, заморозку или длительность.', relations:['используется статусными атаками','используется IceBeam и Blizzard'] },
  { id:'Move', x:690, y:500, w:410, h:195, kind:'external abstract', stereo:'«abstract, external»', pkg:'ru.ifmo.se.pokemon', body:['+ Move(Type, power, accuracy)','# describe(): String'], text:'Абстрактная основа любой атаки. Хранит тип, силу и точность, а также задаёт общий контракт поведения.', relations:['родитель трёх категорий атак'] },
  { id:'PhysicalMove', x:280, y:755, w:320, h:145, kind:'external abstract', stereo:'«abstract, external»', pkg:'ru.ifmo.se.pokemon', body:['physical damage'], text:'База физической атаки. Урон рассчитывается через обычные Attack и Defense.', relations:['наследуется от Move','родитель PoisonJab'], parent:'Move' },
  { id:'SpecialMove', x:730, y:755, w:320, h:145, kind:'external abstract', stereo:'«abstract, external»', pkg:'ru.ifmo.se.pokemon', body:['special damage'], text:'База специальной атаки. Урон зависит от Special Attack и Special Defense.', relations:['наследуется от Move','родитель специальных атак'], parent:'Move' },
  { id:'StatusMove', x:1180, y:755, w:320, h:145, kind:'external abstract', stereo:'«abstract, external»', pkg:'ru.ifmo.se.pokemon', body:['status effect'], text:'База статусной атаки. Обычно не наносит прямой урон, а изменяет состояние или характеристики.', relations:['наследуется от Move','родитель AquaRing, Rest, Swagger, Withdraw'], parent:'Move' },
  { id:'Type', x:1540, y:485, w:220, h:95, kind:'enum', stereo:'«enum»', pkg:'ru.ifmo.se.pokemon', body:['WATER · ICE · …'], text:'Перечисление типов покемонов и атак: WATER, ICE, FAIRY, POISON и другие.' },
  { id:'Stat', x:1540, y:605, w:220, h:95, kind:'enum', stereo:'«enum»', pkg:'ru.ifmo.se.pokemon', body:['ATTACK · DEFENSE · …'], text:'Перечисление характеристик, которые можно повысить или понизить.' },
  { id:'Status', x:1540, y:725, w:220, h:95, kind:'enum', stereo:'«enum»', pkg:'ru.ifmo.se.pokemon', body:['SLEEP · FREEZE · …'], text:'Перечисление состояний покемона, например сон или заморозка.' },

  { id:'PokemonBase', label:'Pokemon', x:760, y:1125, w:360, h:120, kind:'external abstract', stereo:'«external»', pkg:'ru.ifmo.se.pokemon', body:['базовый класс'], text:'Ссылка на внешний класс Pokemon. Все собственные виды покемонов расширяют его прямо или через промежуточного родителя.' },
  { id:'Phione', x:120, y:1370, w:350, h:205, kind:'pokemon', stereo:'«final»', pkg:'lab2.pokemons', body:['+ Phione(name)','IceBeam · AquaRing','DazzlingGleam · Blizzard'], text:'Водный покемон без эволюционной ветви в проекте. Получает четыре специальные и статусные атаки.', relations:['наследуется от Pokemon'], parent:'PokemonBase' },
  { id:'Shellder', x:590, y:1370, w:350, h:205, kind:'pokemon', stereo:'', pkg:'lab2.pokemons', body:['+ Shellder(name)','# Shellder(name, level)','Rest · Withdraw · HydroPump'], text:'Базовый класс своей эволюционной ветви. Защищённый конструктор позволяет Cloyster передать нужный уровень.', relations:['наследуется от Pokemon','родитель Cloyster'], parent:'PokemonBase' },
  { id:'Cloyster', x:590, y:1680, w:350, h:185, kind:'pokemon', stereo:'«final»', pkg:'lab2.pokemons', body:['+ Cloyster(name)','+ PoisonJab'], text:'Эволюция Shellder. Сохраняет унаследованные атаки и добавляет Poison Jab.', relations:['наследуется от Shellder'], parent:'Shellder' },
  { id:'Lotad', x:1060, y:1370, w:350, h:185, kind:'pokemon', stereo:'', pkg:'lab2.pokemons', body:['+ Lotad(name)','# Lotad(name, level)','Blizzard · Swagger'], text:'Начало трёхступенчатой ветви эволюции. Общая настройка передаётся потомкам через наследование.', relations:['наследуется от Pokemon','родитель Lombre'], parent:'PokemonBase' },
  { id:'Lombre', x:1060, y:1610, w:350, h:185, kind:'pokemon', stereo:'', pkg:'lab2.pokemons', body:['+ Lombre(name)','# Lombre(name, level)','+ Bubble'], text:'Эволюция Lotad. Получает всё поведение родителя и добавляет атаку Bubble.', relations:['наследуется от Lotad','родитель Ludicolo'], parent:'Lotad' },
  { id:'Ludicolo', x:1060, y:1850, w:350, h:165, kind:'pokemon', stereo:'«final»', pkg:'lab2.pokemons', body:['+ Ludicolo(name)','+ FocusBlast'], text:'Финальная форма ветви. Наследует атаки Lotad и Lombre, затем добавляет Focus Blast.', relations:['наследуется от Lombre'], parent:'Lombre' },

  { id:'PhysicalMoveBase', label:'PhysicalMove', x:80, y:2250, w:320, h:135, kind:'external abstract', stereo:'«external»', pkg:'ru.ifmo.se.pokemon', body:['физический урон'], text:'Внешний базовый класс физической атаки.' },
  { id:'PoisonJab', x:80, y:2500, w:320, h:205, kind:'physical', stereo:'«final»', pkg:'lab2.moves', body:['POISON · 80 · 100%','# applyOppEffects(Pokemon)','# describe(): String'], text:'Физическая ядовитая атака. Имеет шанс отравить противника через дополнительный эффект.', relations:['наследуется от PhysicalMove','используется Cloyster'], parent:'PhysicalMoveBase' },

  { id:'SpecialMoveBase', label:'SpecialMove', x:670, y:2250, w:400, h:135, kind:'external abstract', stereo:'«external»', pkg:'ru.ifmo.se.pokemon', body:['специальный урон'], text:'Внешний базовый класс специальных атак.' },
  { id:'IceBeam', x:510, y:2500, w:330, h:205, kind:'special', stereo:'«final»', pkg:'lab2.moves', body:['ICE · 90 · 100%','# applyOppEffects(Pokemon)','# describe(): String'], text:'Специальная ледяная атака. С заданной вероятностью вызывает Effect.freeze(pokemon).', relations:['наследуется от SpecialMove','используется Phione'], parent:'SpecialMoveBase' },
  { id:'Blizzard', x:880, y:2500, w:330, h:205, kind:'special', stereo:'«final»', pkg:'lab2.moves', body:['ICE · 110 · 70%','# applyOppEffects(Pokemon)','# describe(): String'], text:'Мощная, но менее точная ледяная атака. Может заморозить цель.', relations:['наследуется от SpecialMove','используется Phione, Lotad и потомками'], parent:'SpecialMoveBase' },
  { id:'Bubble', x:510, y:2760, w:330, h:205, kind:'special', stereo:'«final»', pkg:'lab2.moves', body:['WATER · 40 · 100%','# applyOppEffects(Pokemon)','# describe(): String'], text:'Водная специальная атака. Может понизить скорость противника.', relations:['наследуется от SpecialMove','используется Lombre и Ludicolo'], parent:'SpecialMoveBase' },
  { id:'DazzlingGleam', x:880, y:2760, w:330, h:205, kind:'special', stereo:'«final»', pkg:'lab2.moves', body:['FAIRY · 80 · 100%','# describe(): String'], text:'Специальная атака типа FAIRY — «волшебный» или «фейный». Наносит урон без дополнительного эффекта.', relations:['наследуется от SpecialMove','используется Phione'], parent:'SpecialMoveBase' },
  { id:'FocusBlast', x:510, y:3020, w:330, h:205, kind:'special', stereo:'«final»', pkg:'lab2.moves', body:['FIGHTING · 120 · 70%','# applyOppEffects(Pokemon)','# describe(): String'], text:'Очень мощная, но менее точная атака. Может понизить Special Defense цели.', relations:['наследуется от SpecialMove','используется Ludicolo'], parent:'SpecialMoveBase' },
  { id:'HydroPump', x:880, y:3020, w:330, h:185, kind:'special', stereo:'«final»', pkg:'lab2.moves', body:['WATER · 110 · 80%','# describe(): String'], text:'Сильная водная специальная атака без дополнительного эффекта.', relations:['наследуется от SpecialMove','используется Shellder и Cloyster'], parent:'SpecialMoveBase' },

  { id:'StatusMoveBase', label:'StatusMove', x:1370, y:2250, w:340, h:135, kind:'external abstract', stereo:'«external»', pkg:'ru.ifmo.se.pokemon', body:['изменение состояния'], text:'Внешний базовый класс статусных атак.' },
  { id:'AquaRing', x:1320, y:2500, w:245, h:185, kind:'status', stereo:'«final»', pkg:'lab2.moves', body:['WATER · 0 · 100%','# applySelfEffects()'], text:'Накладывает на использовавшего покемона длительное восстановление здоровья.', relations:['наследуется от StatusMove','используется Phione'], parent:'StatusMoveBase' },
  { id:'Rest', x:1585, y:2500, w:210, h:185, kind:'status', stereo:'«final»', pkg:'lab2.moves', body:['PSYCHIC · 0 · 100%','# applySelfEffects()'], text:'Восстанавливает здоровье и переводит самого покемона в состояние сна.', relations:['наследуется от StatusMove','используется Shellder и Cloyster'], parent:'StatusMoveBase' },
  { id:'Swagger', x:1320, y:2760, w:245, h:205, kind:'status', stereo:'«final»', pkg:'lab2.moves', body:['NORMAL · 0 · 85%','# applyOppEffects()'], text:'Повышает атаку противника, но одновременно вызывает замешательство.', relations:['наследуется от StatusMove','используется Lotad и потомками'], parent:'StatusMoveBase' },
  { id:'Withdraw', x:1585, y:2760, w:210, h:185, kind:'status', stereo:'«final»', pkg:'lab2.moves', body:['WATER · 0 · 100%','# applySelfEffects()'], text:'Повышает защиту самого покемона через модификатор характеристики.', relations:['наследуется от StatusMove','используется Shellder и Cloyster'], parent:'StatusMoveBase' }
];

const nodeRoot = document.getElementById('nodes');
const svg = document.getElementById('edges');
const ns = 'http://www.w3.org/2000/svg';

function makeNode(n) {
  const el = document.createElement('button');
  el.type = 'button';
  el.className = `uml-node ${n.kind}`;
  el.dataset.node = n.id;
  el.style.left = `${n.x}px`;
  el.style.top = `${n.y}px`;
  el.style.width = `${n.w}px`;
  el.style.height = `${n.h}px`;
  el.setAttribute('aria-label', `Класс ${n.label || n.id}`);
  const head = document.createElement('span');
  head.className = 'node-head';
  if (n.stereo) {
    const stereo = document.createElement('span');
    stereo.className = 'stereo';
    stereo.textContent = n.stereo;
    head.append(stereo);
  }
  const name = document.createElement('span');
  name.className = 'node-name';
  name.textContent = n.label || n.id;
  head.append(name);
  const body = document.createElement('span');
  body.className = 'node-body';
  n.body.forEach(line => { const row = document.createElement('span'); row.textContent = line; body.append(row); });
  const chip = document.createElement('i');
  chip.className = 'kind-chip';
  el.append(head, body, chip);
  el.addEventListener('click', () => inspectNode(n));
  nodeRoot.append(el);
}

function addEdge(child, parent, type='inheritance') {
  const startX = child.x + child.w / 2;
  const startY = child.y;
  const endX = parent.x + parent.w / 2;
  const endY = parent.y + parent.h;
  const midY = endY + Math.max(34, (startY - endY) * .45);
  const path = document.createElementNS(ns, 'path');
  path.setAttribute('class', `edge ${type}`);
  path.dataset.from = child.id;
  path.dataset.to = parent.id;
  path.setAttribute('d', `M ${startX} ${startY} V ${midY} H ${endX} V ${endY}`);
  svg.append(path);
}

nodes.forEach(makeNode);
nodes.filter(n => n.parent).forEach(n => addEdge(n, nodes.find(p => p.id === n.parent)));

// Ненаследуемые зависимости Main от готовых классов.
addEdge(nodes.find(n => n.id === 'Main'), nodes.find(n => n.id === 'Battle'), 'dependency');

const inspector = {
  icon: document.getElementById('inspectorIcon'),
  title: document.getElementById('inspectorTitle'),
  pkg: document.getElementById('inspectorPackage'),
  text: document.getElementById('inspectorText'),
  relations: document.getElementById('inspectorRelations')
};

function inspectNode(n) {
  document.querySelectorAll('.uml-node.selected').forEach(el => el.classList.remove('selected'));
  const el = document.querySelector(`[data-node="${n.id}"]`);
  el.classList.add('selected');
  inspector.icon.textContent = (n.label || n.id).slice(0, 1).toUpperCase();
  inspector.icon.style.color = getComputedStyle(el).getPropertyValue('--node-color');
  inspector.title.textContent = n.label || n.id;
  inspector.pkg.textContent = n.pkg;
  inspector.text.textContent = n.text;
  inspector.relations.replaceChildren();
  (n.relations || []).forEach(rel => { const s = document.createElement('span'); s.textContent = rel; inspector.relations.append(s); });
}

const viewport = document.getElementById('viewport');
const stage = document.getElementById('diagramStage');
const zoomValue = document.getElementById('zoomValue');
let transform = { scale: .38, x: 20, y: 22 };
let dragging = false;
let dragStart = null;

function applyTransform() {
  stage.style.transform = `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`;
  zoomValue.value = `${Math.round(transform.scale * 100)}%`;
  zoomValue.textContent = zoomValue.value;
}

function fitAll() {
  const rect = viewport.getBoundingClientRect();
  const scale = Math.min((rect.width - 34) / STAGE.width, (rect.height - 34) / STAGE.height);
  transform.scale = Math.max(.16, Math.min(.9, scale));
  transform.x = (rect.width - STAGE.width * transform.scale) / 2;
  transform.y = 18;
  applyTransform();
}

function zoomAt(factor, px = viewport.clientWidth / 2, py = viewport.clientHeight / 2) {
  const old = transform.scale;
  const next = Math.max(.16, Math.min(1.45, old * factor));
  const worldX = (px - transform.x) / old;
  const worldY = (py - transform.y) / old;
  transform.scale = next;
  transform.x = px - worldX * next;
  transform.y = py - worldY * next;
  applyTransform();
}

document.getElementById('zoomIn').addEventListener('click', () => zoomAt(1.2));
document.getElementById('zoomOut').addEventListener('click', () => zoomAt(1 / 1.2));
document.getElementById('fitDiagram').addEventListener('click', fitAll);
document.getElementById('printPage').addEventListener('click', () => window.print());
document.getElementById('fullScreen').addEventListener('click', async () => {
  if (!document.fullscreenElement) await viewport.requestFullscreen?.();
  else await document.exitFullscreen?.();
  setTimeout(fitAll, 120);
});

viewport.addEventListener('wheel', e => {
  e.preventDefault();
  const r = viewport.getBoundingClientRect();
  zoomAt(e.deltaY < 0 ? 1.1 : 1 / 1.1, e.clientX - r.left, e.clientY - r.top);
}, { passive:false });
viewport.addEventListener('pointerdown', e => {
  if (e.target.closest('.uml-node')) return;
  dragging = true;
  dragStart = { x:e.clientX, y:e.clientY, tx:transform.x, ty:transform.y };
  viewport.setPointerCapture(e.pointerId);
  viewport.classList.add('dragging');
});
viewport.addEventListener('pointermove', e => {
  if (!dragging) return;
  transform.x = dragStart.tx + e.clientX - dragStart.x;
  transform.y = dragStart.ty + e.clientY - dragStart.y;
  applyTransform();
});
viewport.addEventListener('pointerup', () => { dragging = false; viewport.classList.remove('dragging'); });
viewport.addEventListener('pointercancel', () => { dragging = false; viewport.classList.remove('dragging'); });

document.querySelectorAll('[data-focus-section]').forEach(button => {
  button.addEventListener('click', () => {
    const name = button.dataset.focusSection;
    const section = document.querySelector(`[data-section="${name}"]`);
    const y = parseFloat(getComputedStyle(section).top);
    const h = section.offsetHeight;
    const rect = viewport.getBoundingClientRect();
    const s = Math.min((rect.width - 50) / 1880, (rect.height - 50) / h);
    transform.scale = Math.min(.62, Math.max(.24, s));
    transform.x = (rect.width - 1880 * transform.scale) / 2;
    transform.y = (rect.height - h * transform.scale) / 2 - y * transform.scale;
    applyTransform();
  });
});

document.getElementById('classSearch').addEventListener('input', e => {
  const q = e.target.value.trim().toLowerCase();
  let first = null;
  nodes.forEach(n => {
    const match = !q || `${n.id} ${n.label || ''} ${n.pkg} ${n.body.join(' ')}`.toLowerCase().includes(q);
    const el = document.querySelector(`[data-node="${n.id}"]`);
    el.classList.toggle('dimmed', !match);
    if (q && match && !first) first = n;
  });
  if (first) inspectNode(first);
});

window.addEventListener('resize', () => { if (!document.fullscreenElement) fitAll(); });
requestAnimationFrame(fitAll);

