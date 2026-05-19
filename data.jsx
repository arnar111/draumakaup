// Shared data + helpers across all 6 variations.
// Exposed to window so each variation script can read it.

const PLAYERS = [
  { id: 'osimhen',    name: 'Victor Osimhen',     short:'Osimhen',  initials:'VO', club:'Napoli',          league:'Serie A',  pos:'ST', age:27, price:90, tag:'linked',  nat:'NGA', wiki:'Victor_Osimhen',
    stats:{ goals:26, xg:0.71, shots:3.2, aerial:68, sprint:91, assists:11, dribbles:2.8, press:2.1 },
    radar:{ Finishing:94, Pace:88, Aerial:90, Press:72, Creativity:62, Passing:58 },
    reason:'Klassískur 9 sem United hefur saknað síðan á dögum van Persie — alvöru í teignum, sterkur í lofti og með sprett til að nýta bolta frá Bruno.' },
  { id: 'neves',      name: 'João Neves',         short:'Neves',    initials:'JN', club:'PSG',             league:'Ligue 1', pos:'CM', age:21, price:85, tag:'linked',  nat:'POR', wiki:'João_Neves_(footballer,_born_2004)',
    stats:{ goals:3, xg:0.06, tackles:3.4, intercepts:2.1, pass:91, prog:8.4, duels:62, mins:2740 },
    radar:{ Tackling:92, Press:90, Passing:84, Stamina:95, Creativity:70, Pace:74 },
    reason:'Sá box-to-box sem hefur vantað í tank-staðan. 21 árs með 95% leikvit eins og 30 ára. Pep-legur takkur, City myndi kaupa hann strax.' },
  { id: 'branthwaite',name: 'Jarrad Branthwaite', short:'Branthwaite', initials:'JB', club:'Everton',     league:'Premier', pos:'CB', age:23, price:60, tag:'linked',  nat:'ENG', wiki:'Jarrad_Branthwaite',
    stats:{ blocks:1.8, clears:4.2, aerial:74, pass:88, duels:67, intercepts:1.9, tackles:2.0, mins:3120 },
    radar:{ Aerial:90, Tackling:84, Passing:78, Pace:80, Press:70, Composure:86 },
    reason:'Vinstri-fóts CB, ungur, breskur, þungur, hávaxinn. Hentar hvaða back-fjórum sem er, og ódýrari en hann verður á næsta ári.' },
  { id: 'konate',     name: 'Ibrahima Konaté',    short:'Konaté',   initials:'IK', club:'Liverpool',       league:'Premier', pos:'CB', age:27, price:50, tag:'linked',  nat:'FRA', wiki:'Ibrahima_Konaté',
    stats:{ blocks:1.2, clears:3.8, aerial:81, pass:90, duels:71, intercepts:1.6, tackles:1.7, mins:2580 },
    radar:{ Aerial:88, Tackling:82, Passing:80, Pace:88, Composure:78, Press:74 },
    reason:'Liverpool samningur að renna út — að mýla rivalinn er sport út af fyrir sig. Hraði og loft sem De Ligt skortir.' },
  { id: 'guehi',      name: 'Marc Guéhi',         short:'Guéhi',    initials:'MG', club:'Crystal Palace',  league:'Premier', pos:'CB', age:26, price:55, tag:'linked',  nat:'ENG', wiki:'Marc_Guéhi',
    stats:{ blocks:1.5, clears:4.5, aerial:69, pass:87, duels:64, intercepts:2.0, tackles:1.9, mins:3220 },
    radar:{ Tackling:88, Composure:88, Passing:80, Pace:80, Aerial:76, Press:78 },
    reason:'Enskur, premier-prufaður, leiðtogi á 26. Samningur að renna út — Palace verður að selja. Klassískur Southgate-CB.' },
  { id: 'nico',       name: 'Nico Williams',      short:'N. Williams', initials:'NW', club:'Athletic Club', league:'La Liga', pos:'LW', age:23, price:58, tag:'leaving', nat:'ESP', wiki:'Nico_Williams_(footballer,_born_2002)',
    stats:{ goals:9, assists:14, dribbles:5.6, prog:9.1, xa:0.42, shots:2.1, mins:2890, aerial:34 },
    radar:{ Pace:96, Dribble:92, Creativity:84, Finishing:74, Stamina:80, Press:62 },
    reason:'Burðarmaður Euro-sigursins. Hraði, einleikur, dirfska — vantar á vinstri vænginn. Frýji eftir lausnar-clause endurnýjun.' },
  { id: 'eze',        name: 'Eberechi Eze',       short:'Eze',      initials:'EE', club:'Crystal Palace',  league:'Premier', pos:'AM', age:27, price:55, tag:'leaving', nat:'ENG', wiki:'Eberechi_Eze',
    stats:{ goals:11, assists:9, dribbles:4.3, prog:7.8, xa:0.31, shots:2.9, mins:2780, keypass:2.4 },
    radar:{ Creativity:90, Dribble:88, Finishing:78, Pace:82, Passing:80, Press:64 },
    reason:'Ten-Hag-style #10 sem virkar bæði sem AM og vinstri inverti. Premier-tested, ódýr ef Palace fellur. Sá sem allir gleyma — ekki vinirnir þínir.' },
  { id: 'guirassy',   name: 'Serhou Guirassy',    short:'Guirassy', initials:'SG', club:'Dortmund',        league:'Bundesliga', pos:'ST', age:30, price:50, tag:'leaving', nat:'GUI', wiki:'Serhou_Guirassy',
    stats:{ goals:24, xg:0.74, shots:3.6, aerial:71, sprint:84, assists:5, dribbles:1.4, press:2.4 },
    radar:{ Finishing:92, Aerial:88, Press:80, Pace:78, Stamina:82, Creativity:54 },
    reason:'Ódýrara Osimhen-plan B. 30 ára er rauður fáni en mörk eru mörk. Backup-plan sem allir vinir þínir myndu sætta sig við.' },
  { id: 'zinch',      name: 'Oleksandr Zinchenko', short:'Zinchenko', initials:'OZ', club:'Arsenal',       league:'Premier', pos:'LB', age:29, price:18, tag:'leaving', nat:'UKR', wiki:'Oleksandr_Zinchenko',
    stats:{ pass:92, prog:9.2, tackles:1.6, duels:58, intercepts:1.4, mins:1620, assists:2, dribbles:1.2 },
    radar:{ Passing:92, Creativity:84, Composure:88, Tackling:62, Pace:70, Aerial:54 },
    reason:'Inverti-bakvörður á 18 milljón. Reynsla og PL-prufaður. Bridge-kaup á meðan þú leitar að framtíðar-LB.' },
  { id: 'tel',        name: 'Mathys Tel',         short:'Tel',      initials:'MT', club:'Tottenham',       league:'Premier', pos:'LW', age:20, price:40, tag:'leaving', nat:'FRA', wiki:'Mathys_Tel',
    stats:{ goals:7, assists:3, dribbles:3.2, prog:5.8, xa:0.18, shots:2.4, mins:1840, duels:46 },
    radar:{ Pace:90, Dribble:84, Finishing:78, Creativity:72, Stamina:74, Press:62 },
    reason:'Tottenham-tilraun ekki gengið upp. 20 árs, áður Bayern wonderkid. Klásula af því Spurs eru að deyja á 7. sætinu.' },
  { id: 'semenyo',    name: 'Antoine Semenyo',    short:'Semenyo',  initials:'AS', club:'Bournemouth',     league:'Premier', pos:'RW', age:26, price:42, tag:'gem',     nat:'GHA', wiki:'Antoine_Semenyo',
    stats:{ goals:12, assists:6, dribbles:3.9, prog:6.4, xa:0.22, shots:2.6, mins:3010, duels:54 },
    radar:{ Pace:92, Power:90, Dribble:80, Finishing:78, Press:84, Stamina:88 },
    reason:'Líkamlegt skrímsli sem hefur þrefaldast verðlega á ári. Vinstri-fót hægri kantmaður — innleikur tilbúinn. Iraola verkefnaður, klár-fyrir-prem.' },
  { id: 'inacio',     name: 'Gonçalo Inácio',     short:'Inácio',   initials:'GI', club:'Sporting CP',     league:'Liga Portugal', pos:'CB', age:24, price:50, tag:'gem',  nat:'POR', wiki:'Gonçalo_Inácio',
    stats:{ blocks:1.4, clears:3.1, aerial:69, pass:91, duels:64, intercepts:2.3, tackles:1.8, mins:2640 },
    radar:{ Passing:90, Composure:88, Pace:82, Tackling:80, Aerial:78, Press:74 },
    reason:'Ball-playing CB sem getur leyst bolta út úr eigin teig — það sem Maguire hefur aldrei kunnað. Sporting-skólinn, klausula gild.' },
  { id: 'doku',       name: 'Jérémy Doku',        short:'Doku',     initials:'JD', club:'Man City',        league:'Premier', pos:'LW', age:23, price:75, tag:'gem',     nat:'BEL', wiki:'Jérémy_Doku',
    stats:{ goals:6, assists:8, dribbles:7.8, prog:9.4, xa:0.28, shots:1.9, mins:1980, duels:48 },
    radar:{ Pace:94, Dribble:98, Creativity:78, Finishing:64, Stamina:74, Press:60 },
    reason:'City varamaður sem væri stjarna annars staðar. Engin í Premier dripplar betur. Pep selur kannski.' },
  { id: 'baleba',     name: 'Carlos Baleba',      short:'Baleba',   initials:'CB', club:'Brighton',        league:'Premier', pos:'CM', age:22, price:80, tag:'gem',     nat:'CMR', wiki:'Carlos_Baleba',
    stats:{ tackles:3.1, intercepts:2.4, pass:87, prog:7.2, duels:64, mins:2540, goals:2, dribbles:2.4 },
    radar:{ Tackling:90, Press:88, Passing:80, Pace:84, Stamina:88, Creativity:68 },
    reason:'Brighton-skólinn — alltaf rétti tíminn að kaupa. Tank með bolta. 22 ára. Næsti Caicedo á þriggja-fjórða verð.' },
  { id: 'lukeba',     name: 'Castello Lukeba',    short:'Lukeba',   initials:'CL', club:'RB Leipzig',      league:'Bundesliga', pos:'CB', age:23, price:45, tag:'gem', nat:'FRA', wiki:'Castello_Lukeba',
    stats:{ blocks:1.6, clears:3.6, aerial:72, pass:88, duels:66, intercepts:2.1, tackles:2.2, mins:2820 },
    radar:{ Pace:88, Tackling:86, Passing:82, Aerial:76, Composure:80, Press:78 },
    reason:'Vinstri-fót, hraður, agressíft pressing-CB. Leipzig-projektið, lágt prófíl, hár pottur. Future captain energy.' },
  { id: 'wharton',    name: 'Adam Wharton',       short:'Wharton',  initials:'AW', club:'Crystal Palace',  league:'Premier', pos:'CM', age:22, price:60, tag:'gem',     nat:'ENG', wiki:'Adam_Wharton',
    stats:{ pass:92, prog:8.8, tackles:2.4, intercepts:1.9, duels:58, mins:2680, keypass:1.8, goals:1 },
    radar:{ Passing:92, Composure:90, Creativity:84, Tackling:78, Pace:70, Stamina:82 },
    reason:'Pirlo-lega frá Lancashire. Deep-lying playmaker með bolta-controll sem fær fólk til að gleyma að Casemiro var nokkurn tímann til.' },
  { id: 'khannouss',  name: 'Bilal El Khannouss', short:'Khannouss', initials:'BK', club:'Stuttgart',      league:'Bundesliga', pos:'AM', age:21, price:35, tag:'gem',  nat:'MAR', wiki:'Bilal_El_Khannouss',
    stats:{ goals:6, assists:8, dribbles:4.4, prog:7.1, xa:0.28, shots:1.8, mins:2240, keypass:2.6 },
    radar:{ Creativity:88, Dribble:86, Passing:84, Finishing:74, Pace:78, Stamina:78 },
    reason:'Marokkó-WC stjarna í Stuttgart á underpriced samningi. AM með driblings-genin. Ódýr Brentford-mode.' },
  { id: 'mikau',      name: 'Georges Mikautadze', short:'Mikautadze', initials:'GM', club:'Villarreal',    league:'La Liga', pos:'ST', age:25, price:32, tag:'gem', nat:'GEO', wiki:'Georges_Mikautadze',
    stats:{ goals:18, xg:0.58, shots:2.8, aerial:46, sprint:78, assists:7, dribbles:2.6, press:1.8 },
    radar:{ Finishing:88, Composure:84, Passing:74, Press:72, Dribble:78, Aerial:62 },
    reason:'Falinn Georgíu-stjarna. Markmaður sem þú kaupir af því allir héldu hann væri bara Euro-flash. Backup með upside.' },
  { id: 'wirtz',      name: 'Florian Wirtz',      short:'Wirtz',    initials:'FW', club:'Liverpool',       league:'Premier', pos:'AM', age:22, price:140, tag:'young', nat:'GER', wiki:'Florian_Wirtz',
    stats:{ goals:14, assists:18, dribbles:3.6, prog:8.9, xa:0.51, shots:2.7, mins:2950, keypass:3.1 },
    radar:{ Creativity:96, Dribble:88, Passing:92, Finishing:84, Stamina:80, Pace:78 },
    reason:'Drauma-leikmaðurinn. Of dýr, of mikill draumur, en það er einmitt málið. Allir vinir þínir vita að hann gerist ekki — en þú reyndir.' },
  { id: 'yamal',      name: 'Lamine Yamal',       short:'Yamal',    initials:'LY', club:'Barcelona',       league:'La Liga', pos:'RW', age:18, price:250, tag:'young', nat:'ESP', wiki:'Lamine_Yamal',
    stats:{ goals:13, assists:16, dribbles:6.8, prog:9.6, xa:0.48, shots:2.4, mins:2780, keypass:2.9 },
    radar:{ Creativity:96, Dribble:96, Passing:88, Finishing:84, Pace:90, Stamina:78 },
    reason:'Aldrei að gerast. Þetta er bara til þess að vinirnir þínir sjái að þú lætir þig dreyma stórt. 18 árs Ballon d Or fastagestur.' },
  { id: 'cubarsi',    name: 'Pau Cubarsí',        short:'Cubarsí',  initials:'PC', club:'Barcelona',       league:'La Liga', pos:'CB', age:19, price:90, tag:'young', nat:'ESP', wiki:'Pau_Cubarsí',
    stats:{ blocks:1.1, clears:3.4, aerial:64, pass:94, duels:60, intercepts:2.6, tackles:1.6, mins:2480 },
    radar:{ Passing:94, Composure:96, Pace:80, Tackling:82, Aerial:74, Press:78 },
    reason:'19 ára með rólegheit Busquets. Barça lætur ekki einn í einu, en clause er til. Boltinn aldrei tapaður undir pressu.' },
  { id: 'doue',       name: 'Désiré Doué',        short:'Doué',     initials:'DD', club:'PSG',             league:'Ligue 1', pos:'AM', age:20, price:85, tag:'young', nat:'FRA', wiki:'Désiré_Doué',
    stats:{ goals:10, assists:11, dribbles:5.2, prog:8.2, xa:0.36, shots:2.5, mins:2580, keypass:2.4 },
    radar:{ Creativity:88, Dribble:90, Pace:86, Finishing:82, Passing:84, Stamina:78 },
    reason:'CL-finals stjarna á 20. Ræðir vinstra/hægra/AM. PSG yfirborð er sé en samkeppni mikil — pakka snýr.' },
  { id: 'estevao',    name: 'Estêvão Willian',    short:'Estêvão',  initials:'EW', club:'Chelsea',         league:'Premier', pos:'RW', age:18, price:90, tag:'young', nat:'BRA', wiki:'Estêvão_(footballer,_born_2007)',
    stats:{ goals:8, assists:5, dribbles:5.6, prog:7.4, xa:0.24, shots:2.6, mins:1980, duels:48 },
    radar:{ Dribble:92, Pace:88, Creativity:82, Finishing:80, Stamina:74, Press:64 },
    reason:'Næsti Brasilíu-stjarna. Chelsea-meginreglan = always-for-sale ef rétt verð. Skemmtilegasti leikmaður þú horfir á.' },
  { id: 'delap',      name: 'Liam Delap',         short:'Delap',    initials:'LD', club:'Chelsea',         league:'Premier', pos:'ST', age:22, price:55, tag:'young', nat:'ENG', wiki:'Liam_Delap',
    stats:{ goals:14, xg:0.52, shots:2.9, aerial:76, sprint:88, assists:3, dribbles:2.4, press:2.6 },
    radar:{ Finishing:82, Pace:88, Aerial:84, Press:82, Stamina:80, Composure:74 },
    reason:'Enskur, ungur, sterkur, ógnandi — það sem Højlund átti að verða. Chelsea á 4 ST. Plan A ef draumar bregðast.' },
];

const TAG_META = {
  linked:  { label:'Orðaður',     color:'#DA291C' },
  leaving: { label:'Á förum',     color:'#fbbf24' },
  gem:     { label:'Falinn perla', color:'#a78bfa' },
  young:   { label:'Ungstirni',   color:'#22c55e' },
};

const BUDGET_TOTAL = 350;
const SELECTED_IDS = ['osimhen','neves','branthwaite','eze','semenyo'];

// Current Manchester United squad (2025/26-ish).
const UNITED_SQUAD = [
  { id:'onana',    name:'André Onana',         short:'Onana',     initials:'AO', pos:'GK', age:30, nat:'CMR', rating:79, wiki:'André_Onana',
    radar:{ Reflexes:84, Distribution:88, Aerial:76, Command:70, Composure:78, Speed:74 } },
  { id:'dalot',    name:'Diogo Dalot',         short:'Dalot',     initials:'DD', pos:'RB', age:27, nat:'POR', rating:80, wiki:'Diogo_Dalot',
    radar:{ Pace:82, Tackling:74, Crossing:78, Stamina:88, Passing:76, Aerial:62 } },
  { id:'deligt',   name:'Matthijs de Ligt',    short:'De Ligt',   initials:'ML', pos:'CB', age:27, nat:'NED', rating:84, wiki:'Matthijs_de_Ligt',
    radar:{ Aerial:90, Tackling:84, Passing:80, Pace:72, Composure:84, Press:74 } },
  { id:'martinez', name:'Lisandro Martínez',   short:'L. Martínez', initials:'LM', pos:'CB', age:28, nat:'ARG', rating:83, wiki:'Lisandro_Martínez',
    radar:{ Aerial:74, Tackling:90, Passing:82, Pace:76, Composure:80, Press:86 } },
  { id:'shaw',     name:'Luke Shaw',           short:'Shaw',      initials:'LS', pos:'LB', age:30, nat:'ENG', rating:81, wiki:'Luke_Shaw',
    radar:{ Pace:80, Tackling:78, Crossing:82, Stamina:78, Passing:84, Aerial:68 } },
  { id:'ugarte',   name:'Manuel Ugarte',       short:'Ugarte',    initials:'MU', pos:'CDM', age:25, nat:'URU', rating:78, wiki:'Manuel_Ugarte_(footballer)',
    radar:{ Tackling:88, Press:90, Passing:74, Stamina:86, Pace:74, Composure:72 } },
  { id:'mainoo',   name:'Kobbie Mainoo',       short:'Mainoo',    initials:'KM', pos:'CM', age:21, nat:'ENG', rating:80, wiki:'Kobbie_Mainoo',
    radar:{ Passing:84, Composure:88, Pace:74, Tackling:76, Stamina:82, Creativity:80 } },
  { id:'bruno',    name:'Bruno Fernandes',     short:'Bruno',     initials:'BF', pos:'AM', age:31, nat:'POR', rating:87, wiki:'Bruno_Fernandes',
    radar:{ Creativity:92, Passing:90, Finishing:84, Dribble:74, Stamina:88, Pace:72 } },
  { id:'amad',     name:'Amad Diallo',         short:'Amad',      initials:'AD', pos:'RW', age:23, nat:'CIV', rating:79, wiki:'Amad_Diallo',
    radar:{ Dribble:88, Pace:84, Creativity:80, Finishing:76, Stamina:76, Press:70 } },
  { id:'garnacho', name:'Alejandro Garnacho',  short:'Garnacho',  initials:'AG', pos:'LW', age:22, nat:'ARG', rating:80, wiki:'Alejandro_Garnacho',
    radar:{ Pace:90, Dribble:88, Creativity:74, Finishing:76, Stamina:74, Press:64 } },
  { id:'hojlund',  name:'Rasmus Højlund',      short:'Højlund',   initials:'RH', pos:'ST', age:23, nat:'DEN', rating:78, wiki:'Rasmus_Højlund',
    radar:{ Finishing:78, Pace:86, Aerial:74, Press:78, Stamina:80, Creativity:60 } },
  { id:'mount',    name:'Mason Mount',         short:'Mount',     initials:'MM', pos:'AM', age:27, nat:'ENG', rating:78, wiki:'Mason_Mount',
    radar:{ Creativity:80, Passing:82, Finishing:74, Pace:74, Press:84, Stamina:80 } },
];

const fmt = (n) => '£' + n + 'm';
const sum = (ids, allPlayers) => ids.reduce((a,id) => a + ((allPlayers||PLAYERS).find(p=>p.id===id)?.price||0), 0);

// ---- Custom players: persisted in localStorage so they survive reload ----
const CUSTOM_KEY = 'dk:custom:v1';
const SIGNED_KEY = 'dk:signed:v1';

function loadCustomPlayers() {
  try {
    const raw = localStorage.getItem(CUSTOM_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch { return []; }
}

function saveCustomPlayers(list) {
  try { localStorage.setItem(CUSTOM_KEY, JSON.stringify(list)); } catch {}
}

function loadSigned(defaultIds) {
  try {
    const raw = localStorage.getItem(SIGNED_KEY);
    if (!raw) return defaultIds;
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : defaultIds;
  } catch { return defaultIds; }
}

function saveSigned(ids) {
  try { localStorage.setItem(SIGNED_KEY, JSON.stringify(ids)); } catch {}
}

function autoInitials(name) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '??';
  if (parts.length === 1) return parts[0].slice(0,2).toUpperCase();
  return (parts[0][0] + parts[parts.length-1][0]).toUpperCase();
}

function makeCustomPlayer({ name, club, pos, price, tag, nat }) {
  const id = 'c-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2,6);
  const initials = autoInitials(name);
  const POS_RADAR = {
    GK:  { Reflexes:78, Distribution:74, Aerial:74, Command:74, Composure:74, Speed:60 },
    CB:  { Aerial:80, Tackling:80, Passing:74, Pace:74, Composure:76, Press:72 },
    LB:  { Pace:80, Tackling:74, Crossing:74, Stamina:80, Passing:76, Aerial:60 },
    RB:  { Pace:80, Tackling:74, Crossing:74, Stamina:80, Passing:76, Aerial:60 },
    CDM: { Tackling:82, Press:80, Passing:78, Stamina:82, Pace:72, Composure:76 },
    CM:  { Passing:80, Stamina:80, Tackling:74, Creativity:76, Pace:74, Composure:76 },
    AM:  { Creativity:84, Passing:80, Dribble:80, Finishing:74, Pace:76, Stamina:74 },
    LW:  { Pace:86, Dribble:84, Creativity:76, Finishing:74, Stamina:74, Press:66 },
    RW:  { Pace:86, Dribble:84, Creativity:76, Finishing:74, Stamina:74, Press:66 },
    LM:  { Pace:82, Crossing:76, Stamina:82, Tackling:72, Passing:76, Press:70 },
    RM:  { Pace:82, Crossing:76, Stamina:82, Tackling:72, Passing:76, Press:70 },
    ST:  { Finishing:82, Pace:82, Aerial:76, Press:72, Stamina:74, Composure:76 },
  };
  const radar = POS_RADAR[pos] || POS_RADAR.CM;
  return {
    id, name, short: name.split(/\s+/).slice(-1)[0], initials,
    club, league:'—', pos, age:24, price: Math.max(0, parseInt(price,10)||0),
    tag, nat: (nat||'???').toUpperCase().slice(0,3),
    wiki: name.replace(/\s+/g,'_'),
    stats: { mins:0, goals:0, assists:0, dribbles:0 },
    radar,
    reason: 'Bætt við af stjóranum. Engin ítarleg gögn — þú veist væntanlega meira en Opta.',
    custom: true,
  };
}

window.DK = {
  PLAYERS, UNITED_SQUAD, TAG_META, BUDGET_TOTAL, SELECTED_IDS,
  fmt, sum, loadCustomPlayers, saveCustomPlayers,
  loadSigned, saveSigned, makeCustomPlayer,
};
