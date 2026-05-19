// Shared data + helpers across all 6 variations.
// Exposed to window so each variation script can read it.

const PLAYERS = [
  { id: 'osimhen',    name: 'Victor Osimhen',     short:'Osimhen',  initials:'VO', club:'Napoli',          league:'Serie A',  pos:'ST', age:27, price:85, tag:'linked',  nat:'NGA',
    stats:{ goals:26, xg:0.71, shots:3.2, aerial:68, sprint:91, assists:11, dribbles:2.8, press:2.1 },
    radar:{ Finishing:94, Pace:88, Aerial:90, Press:72, Creativity:62, Passing:58 },
    reason:'Klassískur 9 sem United hefur saknað síðan á dögum van Persie — alvöru í teignum, sterkur í lofti og með sprett til að nýta bolta frá Bruno.' },
  { id: 'neves',      name: 'João Neves',         short:'Neves',    initials:'JN', club:'PSG',             league:'Ligue 1', pos:'CM', age:21, price:70, tag:'linked',  nat:'POR',
    stats:{ goals:3, xg:0.06, tackles:3.4, intercepts:2.1, pass:91, prog:8.4, duels:62, mins:2740 },
    radar:{ Tackling:92, Press:90, Passing:84, Stamina:95, Creativity:70, Pace:74 },
    reason:'Sá box-to-box sem hefur vantað í tank-staðan. 21 árs með 95% leikvit eins og 30 ára. Pep-legur takkur, City myndi kaupa hann strax.' },
  { id: 'branthwaite',name: 'Jarrad Branthwaite', short:'Branthwaite', initials:'JB', club:'Everton',     league:'Premier', pos:'CB', age:23, price:60, tag:'linked',  nat:'ENG',
    stats:{ blocks:1.8, clears:4.2, aerial:74, pass:88, duels:67, intercepts:1.9, tackles:2.0, mins:3120 },
    radar:{ Aerial:90, Tackling:84, Passing:78, Pace:80, Press:70, Composure:86 },
    reason:'Vinstri-fóts CB, ungur, breskur, þungur, hávaxinn. Hentar hvaða back-fjórum sem er, og ódýrari en Branthwaite verður á næsta ári.' },
  { id: 'nico',       name: 'Nico Williams',      short:'N. Williams', initials:'NW', club:'Athletic Club', league:'La Liga', pos:'LW', age:23, price:55, tag:'leaving', nat:'ESP',
    stats:{ goals:9, assists:14, dribbles:5.6, prog:9.1, xa:0.42, shots:2.1, mins:2890, aerial:34 },
    radar:{ Pace:96, Dribble:92, Creativity:84, Finishing:74, Stamina:80, Press:62 },
    reason:'Burðarmaður Euro-sigursins. Hraði, einleikur, dirfska — vantar á vinstri vænginn. Frýji eftir lausnar-clause endurnýjun.' },
  { id: 'eze',        name: 'Eberechi Eze',       short:'Eze',      initials:'EE', club:'Crystal Palace',  league:'Premier', pos:'AM', age:27, price:45, tag:'leaving', nat:'ENG',
    stats:{ goals:11, assists:9, dribbles:4.3, prog:7.8, xa:0.31, shots:2.9, mins:2780, keypass:2.4 },
    radar:{ Creativity:90, Dribble:88, Finishing:78, Pace:82, Passing:80, Press:64 },
    reason:'Ten-Hag-style #10 sem virkar bæði sem AM og vinstri inverti. Premier-tested, ódýr ef Palace fellur. Sá sem allir gleyma — ekki vinirnir þínir.' },
  { id: 'semenyo',    name: 'Antoine Semenyo',    short:'Semenyo',  initials:'AS', club:'Bournemouth',     league:'Premier', pos:'RW', age:26, price:38, tag:'gem',     nat:'GHA',
    stats:{ goals:12, assists:6, dribbles:3.9, prog:6.4, xa:0.22, shots:2.6, mins:3010, duels:54 },
    radar:{ Pace:92, Power:90, Dribble:80, Finishing:78, Press:84, Stamina:88 },
    reason:'Líkamlegt skrímsli sem hefur þrefaldast verðlega á ári. Vinstri-fót hægri kantmaður — innleikur tilbúinn. Iraola verkefnaður, klár-fyrir-prem.' },
  { id: 'wirtz',      name: 'Florian Wirtz',      short:'Wirtz',    initials:'FW', club:'Bayer Leverkusen',league:'Bundesliga', pos:'AM', age:22, price:142, tag:'young', nat:'GER',
    stats:{ goals:14, assists:18, dribbles:3.6, prog:8.9, xa:0.51, shots:2.7, mins:2950, keypass:3.1 },
    radar:{ Creativity:96, Dribble:88, Passing:92, Finishing:84, Stamina:80, Pace:78 },
    reason:'Drauma-leikmaðurinn. Of dýr, of mikill draumur, en það er einmitt málið. Allir vinir þínir vita að hann gerist ekki — en þú reyndir.' },
  { id: 'inacio',     name: 'Gonçalo Inácio',     short:'Inácio',   initials:'GI', club:'Sporting CP',     league:'Liga Portugal', pos:'CB', age:24, price:40, tag:'gem',  nat:'POR',
    stats:{ blocks:1.4, clears:3.1, aerial:69, pass:91, duels:64, intercepts:2.3, tackles:1.8, mins:2640 },
    radar:{ Passing:90, Composure:88, Pace:82, Tackling:80, Aerial:78, Press:74 },
    reason:'Ball-playing CB sem getur leyst bolta út úr eigin teig — það sem Maguire hefur aldrei kunnað. Sporting-skólinn, klausula gild.' },
  { id: 'guirassy',   name: 'Serhou Guirassy',    short:'Guirassy', initials:'SG', club:'Dortmund',        league:'Bundesliga', pos:'ST', age:30, price:50, tag:'leaving', nat:'GUI',
    stats:{ goals:24, xg:0.74, shots:3.6, aerial:71, sprint:84, assists:5, dribbles:1.4, press:2.4 },
    radar:{ Finishing:92, Aerial:88, Press:80, Pace:78, Stamina:82, Creativity:54 },
    reason:'Ódýrara Osimhen-plan B. 30 ára er rauður fáni en mörk eru mörk. Backup-plan sem allir vinir þínir myndu sætta sig við.' },
  { id: 'doku',       name: 'Jérémy Doku',        short:'Doku',     initials:'JD', club:'Man City',        league:'Premier', pos:'LW', age:23, price:75, tag:'gem',     nat:'BEL',
    stats:{ goals:6, assists:8, dribbles:7.8, prog:9.4, xa:0.28, shots:1.9, mins:1980, duels:48 },
    radar:{ Pace:94, Dribble:98, Creativity:78, Finishing:64, Stamina:74, Press:60 },
    reason:'City varamaður sem væri stjarna annars staðar. Engin í Premier dripplar betur. Pep selur kannski.' },
  { id: 'zinch',      name: 'Oleksandr Zinchenko', short:'Zinchenko', initials:'OZ', club:'Arsenal',       league:'Premier', pos:'LB', age:29, price:18, tag:'leaving', nat:'UKR',
    stats:{ pass:92, prog:9.2, tackles:1.6, duels:58, intercepts:1.4, mins:1620, assists:2, dribbles:1.2 },
    radar:{ Passing:92, Creativity:84, Composure:88, Tackling:62, Pace:70, Aerial:54 },
    reason:'Inverti-bakvörður á 18 milljón. Reynsla og PL-prufaður. Bridge-kaup á meðan þú leitar að framtíðar-LB.' },
  { id: 'baleba',     name: 'Carlos Baleba',      short:'Baleba',   initials:'CB', club:'Brighton',        league:'Premier', pos:'CM', age:22, price:65, tag:'gem',     nat:'CMR',
    stats:{ tackles:3.1, intercepts:2.4, pass:87, prog:7.2, duels:64, mins:2540, goals:2, dribbles:2.4 },
    radar:{ Tackling:90, Press:88, Passing:80, Pace:84, Stamina:88, Creativity:68 },
    reason:'Brighton-skólinn — alltaf rétti tíminn að kaupa. Tank með bolta. 22 ára. Næsti Caicedo á þriggja-fjórða verð.' },
];

const TAG_META = {
  linked:  { label:'Orðaður',     color:'#DA291C' },
  leaving: { label:'Á förum',     color:'#fbbf24' },
  gem:     { label:'Falinn perla', color:'#a78bfa' },
  young:   { label:'Ungstirni',   color:'#22c55e' },
};

const BUDGET_TOTAL = 350;
const SELECTED_IDS = ['osimhen','neves','branthwaite','eze','semenyo'];

// Current Manchester United squad (2025/26-ish). Used as the existing
// roster the user fills the XI with, alongside their new signings.
const UNITED_SQUAD = [
  { id:'onana',    name:'André Onana',         short:'Onana',     initials:'AO', pos:'GK', age:30, nat:'CMR', rating:79,
    radar:{ Reflexes:84, Distribution:88, Aerial:76, Command:70, Composure:78, Speed:74 } },
  { id:'dalot',    name:'Diogo Dalot',         short:'Dalot',     initials:'DD', pos:'RB', age:27, nat:'POR', rating:80,
    radar:{ Pace:82, Tackling:74, Crossing:78, Stamina:88, Passing:76, Aerial:62 } },
  { id:'deligt',   name:'Matthijs de Ligt',    short:'De Ligt',   initials:'ML', pos:'CB', age:27, nat:'NED', rating:84,
    radar:{ Aerial:90, Tackling:84, Passing:80, Pace:72, Composure:84, Press:74 } },
  { id:'martinez', name:'Lisandro Martínez',   short:'L. Martínez', initials:'LM', pos:'CB', age:28, nat:'ARG', rating:83,
    radar:{ Aerial:74, Tackling:90, Passing:82, Pace:76, Composure:80, Press:86 } },
  { id:'shaw',     name:'Luke Shaw',           short:'Shaw',      initials:'LS', pos:'LB', age:30, nat:'ENG', rating:81,
    radar:{ Pace:80, Tackling:78, Crossing:82, Stamina:78, Passing:84, Aerial:68 } },
  { id:'ugarte',   name:'Manuel Ugarte',       short:'Ugarte',    initials:'MU', pos:'CDM', age:25, nat:'URU', rating:78,
    radar:{ Tackling:88, Press:90, Passing:74, Stamina:86, Pace:74, Composure:72 } },
  { id:'mainoo',   name:'Kobbie Mainoo',       short:'Mainoo',    initials:'KM', pos:'CM', age:21, nat:'ENG', rating:80,
    radar:{ Passing:84, Composure:88, Pace:74, Tackling:76, Stamina:82, Creativity:80 } },
  { id:'bruno',    name:'Bruno Fernandes',     short:'Bruno',     initials:'BF', pos:'AM', age:31, nat:'POR', rating:87,
    radar:{ Creativity:92, Passing:90, Finishing:84, Dribble:74, Stamina:88, Pace:72 } },
  { id:'amad',     name:'Amad Diallo',         short:'Amad',      initials:'AD', pos:'RW', age:23, nat:'CIV', rating:79,
    radar:{ Dribble:88, Pace:84, Creativity:80, Finishing:76, Stamina:76, Press:70 } },
  { id:'garnacho', name:'Alejandro Garnacho',  short:'Garnacho',  initials:'AG', pos:'LW', age:22, nat:'ARG', rating:80,
    radar:{ Pace:90, Dribble:88, Creativity:74, Finishing:76, Stamina:74, Press:64 } },
  { id:'hojlund',  name:'Rasmus Højlund',      short:'Højlund',   initials:'RH', pos:'ST', age:23, nat:'DEN', rating:78,
    radar:{ Finishing:78, Pace:86, Aerial:74, Press:78, Stamina:80, Creativity:60 } },
  { id:'mount',    name:'Mason Mount',         short:'Mount',     initials:'MM', pos:'AM', age:27, nat:'ENG', rating:78,
    radar:{ Creativity:80, Passing:82, Finishing:74, Pace:74, Press:84, Stamina:80 } },
];

const fmt = (n) => '£' + n + 'm';
const sum = (ids) => ids.reduce((a,id) => a + (PLAYERS.find(p=>p.id===id)?.price||0), 0);

window.DK = { PLAYERS, UNITED_SQUAD, TAG_META, BUDGET_TOTAL, SELECTED_IDS, fmt, sum };
