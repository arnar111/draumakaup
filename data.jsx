// Shared data + helpers across all 6 variations.
// Exposed to window so each variation script can read it.
//
// Players are linked to Manchester United based on transfer reports from
// Nov 2025 – May 2026 (Sky Sports, ESPN, Goal, FootballTransfers, Tribuna,
// UnitedInFocus, TeamTalk, FootballWhispers, Football365). Manager is
// Rúben Amorim. Senne Lammens is #1 GK. Casemiro is leaving as a free agent.
// Last summer (2025) United bought Cunha, Mbeumo, Sesko, Lammens, Dorgu;
// sold/loaned out Garnacho (Chelsea), Rashford (Barça loan), Onana (Trabzon loan).

const PLAYERS = [
  // ============================================================
  // LINKED — explicitly reported transfer targets for summer 2026
  // ============================================================

  // ---- Midfield (priority — Casemiro out, want 3 CMs) ----
  { id:'anderson', name:'Elliot Anderson', short:'Anderson', initials:'EA', club:'Nott Forest', league:'Premier', pos:'CM', age:23, price:80, tag:'linked', nat:'ENG', wiki:'Elliot_Anderson',
    stats:{ pass:88, prog:8.4, tackles:2.9, intercepts:1.8, duels:62, mins:3120, goals:4, assists:6 },
    radar:{ Passing:88, Stamina:92, Tackling:84, Creativity:82, Pace:80, Composure:86 },
    reason:'Topp target Amorims. Box-to-box með Englandsléttleika. Forest harðselja á £80m — Man City í harðri samkeppni. Að fá hann er fyrri-sigur.' },
  { id:'tonali', name:'Sandro Tonali', short:'Tonali', initials:'ST', club:'Newcastle', league:'Premier', pos:'CM', age:25, price:75, tag:'linked', nat:'ITA', wiki:'Sandro_Tonali',
    stats:{ pass:90, prog:7.8, tackles:3.1, intercepts:2.0, duels:64, mins:2980, goals:5, assists:4 },
    radar:{ Tackling:88, Passing:88, Composure:86, Stamina:90, Creativity:80, Pace:74 },
    reason:'Partner fyrir Mainoo. Newcastle gæti selt á £65-75m. Ítalskur leiðtogi, langhögg og lengjuþrek — alvöru mið.' },
  { id:'brunog', name:'Bruno Guimarães', short:'B. Guimarães', initials:'BG', club:'Newcastle', league:'Premier', pos:'CM', age:28, price:90, tag:'linked', nat:'BRA', wiki:'Bruno_Guimarães',
    stats:{ pass:91, prog:8.1, tackles:2.8, intercepts:1.9, duels:60, mins:3050, goals:7, assists:6 },
    radar:{ Creativity:90, Passing:90, Composure:88, Tackling:84, Stamina:88, Pace:74 },
    reason:'Casemiro mælir með honum persónulega. Newcastle vill alls ekki selja — astronomískt verð. En ef hann verður laus, blöskrar þú.' },
  { id:'wharton', name:'Adam Wharton', short:'Wharton', initials:'AW', club:'Crystal Palace', league:'Premier', pos:'CM', age:22, price:70, tag:'linked', nat:'ENG', wiki:'Adam_Wharton',
    stats:{ pass:92, prog:8.8, tackles:2.4, intercepts:1.9, duels:58, mins:2680, keypass:1.8, goals:1 },
    radar:{ Passing:92, Composure:90, Creativity:84, Tackling:78, Pace:70, Stamina:82 },
    reason:'United að undirbúa €70m tilboð. Pirlo-leg deep-lying playmaker frá Lancashire. Enskur, ungur, hár pottur.' },
  { id:'baleba', name:'Carlos Baleba', short:'Baleba', initials:'CB', club:'Brighton', league:'Premier', pos:'CM', age:22, price:100, tag:'linked', nat:'CMR', wiki:'Carlos_Baleba',
    stats:{ tackles:3.1, intercepts:2.4, pass:87, prog:7.2, duels:64, mins:2540, goals:2, dribbles:2.4 },
    radar:{ Tackling:90, Press:88, Passing:80, Pace:84, Stamina:88, Creativity:68 },
    reason:'Brighton verðmeta hann á £100m+. Tank með bolta. United pausa í baráttunni en hugarfar áfram til staðar.' },
  { id:'tchouameni', name:'Aurélien Tchouaméni', short:'Tchouaméni', initials:'AT', club:'Real Madrid', league:'La Liga', pos:'CDM', age:26, price:80, tag:'linked', nat:'FRA', wiki:'Aurélien_Tchouaméni',
    stats:{ pass:90, tackles:2.6, intercepts:1.8, duels:62, mins:2780, goals:2, dribbles:1.4, prog:6.4 },
    radar:{ Tackling:90, Passing:86, Composure:84, Pace:78, Aerial:84, Press:80 },
    reason:'Ef Real þurfa að selja vegna FFP — risastór franskur 6 sem getur dropped á milli CB-anna. Risadraumur.' },
  { id:'mfernandes', name:'Mateus Fernandes', short:'M. Fernandes', initials:'MF', club:'West Ham', league:'Premier', pos:'CM', age:21, price:40, tag:'linked', nat:'POR', wiki:'Mateus_Fernandes_(footballer,_born_2004)',
    stats:{ pass:84, prog:6.8, goals:6, assists:4, duels:54, mins:2640, dribbles:2.6, keypass:1.6 },
    radar:{ Creativity:82, Passing:84, Dribble:80, Pace:80, Stamina:84, Finishing:76 },
    reason:'West Ham-stjarnan sem allir hafa gleymt. Tæknilegur portúgali, fjölhæfur miðjumaður. Bargain ef Hammers verða undir £40m.' },
  { id:'jgomes', name:'João Gomes', short:'J. Gomes', initials:'JG', club:'Wolves', league:'Premier', pos:'CM', age:25, price:55, tag:'linked', nat:'BRA', wiki:'João_Gomes_(footballer,_born_2001)',
    stats:{ tackles:3.6, intercepts:2.2, pass:84, duels:66, mins:2980, goals:3, assists:2, prog:6.0 },
    radar:{ Tackling:90, Press:88, Stamina:90, Passing:80, Pace:76, Composure:74 },
    reason:'United í informal samtali við fulltrúa hans. Tank-cm sem rífur tackles í kíló. Wolves opnir fyrir réttu tilboði.' },
  { id:'gallagher', name:'Conor Gallagher', short:'Gallagher', initials:'CG', club:'Atlético', league:'La Liga', pos:'CM', age:26, price:45, tag:'linked', nat:'ENG', wiki:'Conor_Gallagher',
    stats:{ tackles:2.8, pass:82, prog:6.2, duels:60, mins:2580, goals:4, assists:3, press:2.4 },
    radar:{ Press:90, Stamina:90, Tackling:84, Passing:78, Pace:76, Creativity:74 },
    reason:'Áfram á Atlético-skuld eftir Chelsea-flýgildið. Press-monster sem hentar Amorim. Næstum Premier-tilbúinn aftur.' },

  // ---- Attack: LW ----
  { id:'diomande', name:'Yan Diomande', short:'Diomande', initials:'YD', club:'RB Leipzig', league:'Bundesliga', pos:'LW', age:19, price:88, tag:'linked', nat:'CIV', wiki:'Yan_Diomande',
    stats:{ goals:9, assists:7, dribbles:5.4, prog:8.6, xa:0.32, shots:2.4, mins:2480, duels:54 },
    radar:{ Pace:96, Dribble:92, Creativity:80, Finishing:78, Stamina:78, Press:64 },
    reason:'United þegar með opnandi tilboð. Leipzig-merkt €100m. Fílabein vinstri-vængur með framúrskarandi hraða, 19 ára.' },
  { id:'adeyemi', name:'Karim Adeyemi', short:'Adeyemi', initials:'KA', club:'Dortmund', league:'Bundesliga', pos:'LW', age:24, price:60, tag:'linked', nat:'GER', wiki:'Karim_Adeyemi',
    stats:{ goals:11, assists:8, dribbles:5.8, prog:9.0, xa:0.30, shots:2.6, mins:2640, duels:50 },
    radar:{ Pace:94, Dribble:90, Finishing:80, Creativity:78, Stamina:74, Press:60 },
    reason:'Vill flytja. United efst á shortlist. €65-70m, mun ódýrari en Diomande. Plug-and-play vinstri.' },
  { id:'gordon', name:'Anthony Gordon', short:'Gordon', initials:'AG', club:'Newcastle', league:'Premier', pos:'LW', age:25, price:75, tag:'linked', nat:'ENG', wiki:'Anthony_Gordon',
    stats:{ goals:12, assists:6, dribbles:4.2, prog:7.4, xa:0.28, shots:2.5, mins:2880, press:2.6 },
    radar:{ Pace:90, Dribble:84, Press:88, Finishing:80, Stamina:86, Creativity:74 },
    reason:'Eftir brotthvarf Garnacho og Rashford — Premier-prufaður vinstri með pressing-genin. Newcastle gæti losað ef þeir flunkka úr CL.' },
  { id:'ndiaye', name:'Iliman Ndiaye', short:'Ndiaye', initials:'IN', club:'Everton', league:'Premier', pos:'LW', age:26, price:45, tag:'linked', nat:'SEN', wiki:'Iliman_Ndiaye',
    stats:{ goals:9, assists:5, dribbles:4.8, prog:6.8, xa:0.21, shots:2.2, mins:2740, duels:52 },
    radar:{ Dribble:88, Creativity:82, Pace:84, Finishing:76, Stamina:78, Press:70 },
    reason:'Annar primary-target ásamt Diomande. Hægri-fót vinstri-vængur, einleikari, ódýr Premier-prufaður valkostur.' },
  { id:'leao', name:'Rafael Leão', short:'Leão', initials:'RL', club:'AC Milan', league:'Serie A', pos:'LW', age:26, price:80, tag:'linked', nat:'POR', wiki:'Rafael_Leão',
    stats:{ goals:10, assists:8, dribbles:5.2, prog:7.8, xa:0.26, shots:2.4, mins:2740, duels:48 },
    radar:{ Pace:94, Dribble:88, Finishing:80, Creativity:80, Stamina:74, Press:54 },
    reason:'Milan opnir fyrir sölu ef rétt verð. United assessa. Stjörnu-vinstri með athletisma — en pressing er rauður fáni.' },

  // ---- Attack: RW / forwards (Mbeumo já hjá United) ----
  { id:'semenyo', name:'Antoine Semenyo', short:'Semenyo', initials:'AS', club:'Bournemouth', league:'Premier', pos:'RW', age:26, price:55, tag:'linked', nat:'GHA', wiki:'Antoine_Semenyo',
    stats:{ goals:12, assists:6, dribbles:3.9, prog:6.4, xa:0.22, shots:2.6, mins:3010, duels:54 },
    radar:{ Pace:92, Power:90, Dribble:80, Finishing:78, Press:84, Stamina:88 },
    reason:'Jan-target sem missti til City — gæti komið aftur í sumar. Líkamlegt skrímsli, Iraola-skólinn, klár-fyrir-prem.' },

  // ---- Attack: Strikers (backup fyrir Sesko) ----
  { id:'kane', name:'Harry Kane', short:'Kane', initials:'HK', club:'Bayern', league:'Bundesliga', pos:'ST', age:32, price:80, tag:'linked', nat:'ENG', wiki:'Harry_Kane',
    stats:{ goals:32, xg:0.86, shots:3.8, aerial:64, sprint:74, assists:9, dribbles:1.4, press:1.6 },
    radar:{ Finishing:96, Passing:84, Aerial:84, Composure:92, Press:64, Pace:62 },
    reason:'Samningaviðræðum við Bayern stallaðar. Englensku WC-stjarnan vill mögulega heim. Sesko þarf reynslu — Kane er hún.' },
  { id:'lewy', name:'Robert Lewandowski', short:'Lewy', initials:'RL', club:'Barcelona', league:'La Liga', pos:'ST', age:37, price:0, tag:'linked', nat:'POL', wiki:'Robert_Lewandowski',
    stats:{ goals:28, xg:0.76, shots:3.4, aerial:70, sprint:64, assists:6, dribbles:1.2, press:1.4 },
    radar:{ Finishing:96, Composure:92, Aerial:84, Passing:78, Press:60, Pace:54 },
    reason:'FREE AGENT. Hefur sagt að hann sjái eftir að hafa ekki komið til United. Eins árs deal-stjórnandi-leiðtogi sem kennir Sesko.' },
  { id:'schick', name:'Patrik Schick', short:'Schick', initials:'PS', club:'Leverkusen', league:'Bundesliga', pos:'ST', age:30, price:35, tag:'linked', nat:'CZE', wiki:'Patrik_Schick',
    stats:{ goals:21, xg:0.68, shots:3.2, aerial:68, sprint:72, assists:4, dribbles:1.6, press:2.0 },
    radar:{ Finishing:90, Aerial:88, Composure:86, Pace:74, Stamina:78, Press:68 },
    reason:'Hefur sagt United sé draumaliðið sitt. Tæknilegur miðherji, ódýr backup fyrir Sesko sem klúbbur kæmist auðveldlega til.' },
  { id:'guirassy', name:'Serhou Guirassy', short:'Guirassy', initials:'SG', club:'Dortmund', league:'Bundesliga', pos:'ST', age:30, price:37, tag:'linked', nat:'GUI', wiki:'Serhou_Guirassy',
    stats:{ goals:24, xg:0.74, shots:3.6, aerial:71, sprint:84, assists:5, dribbles:1.4, press:2.4 },
    radar:{ Finishing:92, Aerial:88, Press:80, Pace:78, Stamina:82, Creativity:54 },
    reason:'£44m release clause. 30 ára er rauður fáni en mörk eru mörk. Backup-plan sem allir vinir þínir myndu sætta sig við.' },
  { id:'welbeck', name:'Danny Welbeck', short:'Welbeck', initials:'DW', club:'Brighton', league:'Premier', pos:'ST', age:35, price:8, tag:'linked', nat:'ENG', wiki:'Danny_Welbeck',
    stats:{ goals:14, xg:0.42, shots:2.2, aerial:62, sprint:74, assists:4, dribbles:1.4, press:2.0 },
    radar:{ Finishing:82, Composure:84, Aerial:74, Press:78, Stamina:74, Pace:72 },
    reason:'Hin rómantíska kaup. Heim aftur til Old Trafford fyrir £8m sem dressing-room karakter. Vinirnir þínir myndu klikka.' },

  // ---- LB (Shaw needs competition) ----
  { id:'lewisskelly', name:'Myles Lewis-Skelly', short:'M. Lewis-Skelly', initials:'ML', club:'Arsenal', league:'Premier', pos:'LB', age:19, price:50, tag:'linked', nat:'ENG', wiki:'Myles_Lewis-Skelly',
    stats:{ pass:88, prog:7.2, tackles:2.4, duels:58, mins:2840, assists:4, dribbles:2.2, intercepts:1.6 },
    radar:{ Pace:84, Passing:88, Stamina:88, Tackling:80, Composure:84, Creativity:80 },
    reason:'Pure profit fyrir Arsenal. United þegar með enquiry. 19 ára, opnar fyrir flutningi til að fá fastastað. Risavaxinn pottur.' },
  { id:'lhall', name:'Lewis Hall', short:'L. Hall', initials:'LH', club:'Newcastle', league:'Premier', pos:'LB', age:21, price:55, tag:'linked', nat:'ENG', wiki:'Lewis_Hall',
    stats:{ pass:84, prog:8.6, tackles:2.6, duels:60, mins:3020, assists:6, dribbles:2.4, crosses:2.8 },
    radar:{ Pace:88, Crossing:84, Stamina:90, Tackling:80, Passing:84, Aerial:68 },
    reason:'Mögulega besti LB Premier í þessari leiktíð. WC-leikur með Englandi gæti opnað dyrnar. Hörð samkeppni þó.' },
  { id:'nbrown', name:'Nathaniel Brown', short:'N. Brown', initials:'NB', club:'Frankfurt', league:'Bundesliga', pos:'LB', age:22, price:30, tag:'linked', nat:'GER', wiki:'Nathaniel_Brown',
    stats:{ pass:82, prog:7.4, tackles:2.4, duels:56, mins:2480, assists:3, dribbles:2.0, crosses:2.4 },
    radar:{ Pace:86, Crossing:80, Stamina:86, Tackling:78, Passing:82, Aerial:64 },
    reason:'Þýska perlan í Frankfurt. Brown er á 3-manna LB-lista United með Hall og Lewis-Skelly. Ódýrasti valkostur, mestur upside.' },
  { id:'arobinson', name:'Antonee Robinson', short:'Robinson', initials:'AR', club:'Fulham', league:'Premier', pos:'LB', age:28, price:35, tag:'linked', nat:'USA', wiki:'Antonee_Robinson',
    stats:{ pass:80, prog:8.0, tackles:3.0, duels:58, mins:3120, assists:8, dribbles:1.8, crosses:3.4 },
    radar:{ Pace:92, Crossing:84, Stamina:92, Tackling:84, Passing:78, Aerial:68 },
    reason:'Fljótasti LB Premier. Premier-tested, undirverðlagður á 28. PL-prufaður og fær fyrir réttu peningana.' },
  { id:'raum', name:'David Raum', short:'Raum', initials:'DR', club:'RB Leipzig', league:'Bundesliga', pos:'LB', age:28, price:40, tag:'linked', nat:'GER', wiki:'David_Raum',
    stats:{ pass:86, prog:8.4, tackles:2.2, duels:54, mins:2680, assists:9, dribbles:1.6, crosses:3.2 },
    radar:{ Crossing:90, Passing:86, Stamina:86, Pace:80, Tackling:74, Aerial:60 },
    reason:'Scoutarnir hafa fylgst með honum náið. Crossing-monster, Þjóðverja-LB með consistensí. United-möguleiki.' },
  { id:'mitchell', name:'Tyrick Mitchell', short:'Mitchell', initials:'TM', club:'Crystal Palace', league:'Premier', pos:'LB', age:26, price:25, tag:'linked', nat:'ENG', wiki:'Tyrick_Mitchell',
    stats:{ pass:78, prog:6.4, tackles:2.8, duels:60, mins:2780, assists:3, dribbles:1.8, crosses:2.6 },
    radar:{ Pace:88, Stamina:84, Tackling:82, Passing:74, Crossing:76, Aerial:62 },
    reason:'PL-prufaður, undirverðlagður. Tryggur valkostur á backup-LB ef alvöru-targetin floppa.' },

  // ---- CB ----
  { id:'branthwaite', name:'Jarrad Branthwaite', short:'Branthwaite', initials:'JB', club:'Everton', league:'Premier', pos:'CB', age:23, price:70, tag:'linked', nat:'ENG', wiki:'Jarrad_Branthwaite',
    stats:{ blocks:1.8, clears:4.2, aerial:74, pass:88, duels:67, intercepts:1.9, tackles:2.0, mins:2240 },
    radar:{ Aerial:90, Tackling:84, Passing:78, Pace:80, Press:70, Composure:86 },
    reason:'Long-term target. Hefur lengi viljað til Old Trafford. Vinstri-fót, ungur, breskur, þungur. £70m verð.' },
  { id:'guehi', name:'Marc Guéhi', short:'Guéhi', initials:'MG', club:'Crystal Palace', league:'Premier', pos:'CB', age:26, price:55, tag:'linked', nat:'ENG', wiki:'Marc_Guéhi',
    stats:{ blocks:1.5, clears:4.5, aerial:69, pass:87, duels:64, intercepts:2.0, tackles:1.9, mins:3220 },
    radar:{ Tackling:88, Composure:88, Passing:80, Pace:80, Aerial:76, Press:78 },
    reason:'Samningur að renna út — Palace verður að selja eða missa frítt. Top-2 CB-target United. Enskur, leiðtogi.' },
  { id:'konate', name:'Ibrahima Konaté', short:'Konaté', initials:'IK', club:'Liverpool', league:'Premier', pos:'CB', age:27, price:0, tag:'leaving', nat:'FRA', wiki:'Ibrahima_Konaté',
    stats:{ blocks:1.2, clears:3.8, aerial:81, pass:90, duels:71, intercepts:1.6, tackles:1.7, mins:2580 },
    radar:{ Aerial:88, Tackling:82, Passing:80, Pace:88, Composure:78, Press:74 },
    reason:'FRÍJI. Liverpool samningur að klárast. Að mýla rivalinn er sport. Hraði og loft sem De Ligt skortir.' },
  { id:'inacio', name:'Gonçalo Inácio', short:'Inácio', initials:'GI', club:'Sporting CP', league:'Liga Portugal', pos:'CB', age:24, price:52, tag:'linked', nat:'POR', wiki:'Gonçalo_Inácio',
    stats:{ blocks:1.4, clears:3.1, aerial:69, pass:91, duels:64, intercepts:2.3, tackles:1.8, mins:2640 },
    radar:{ Passing:90, Composure:88, Pace:82, Tackling:80, Aerial:78, Press:74 },
    reason:'5-klúbba slagur (Chelsea, Liverpool, United, Real, Barca). €60m release clause. Vinstri-fót, ball-playing — Amorim Sporting-tengsl.' },
  { id:'coulibaly', name:'Karim Coulibaly', short:'Coulibaly', initials:'KC', club:'Werder Bremen', league:'Bundesliga', pos:'CB', age:18, price:43, tag:'linked', nat:'FRA', wiki:'Karim_Coulibaly',
    stats:{ blocks:1.3, clears:3.6, aerial:70, pass:84, duels:62, intercepts:1.8, tackles:2.0, mins:2280 },
    radar:{ Pace:88, Tackling:80, Aerial:78, Passing:80, Composure:74, Press:76 },
    reason:'18 ára breakthrough season. United monitorera. Wonderkid-CB, hraður og hávaxinn. £43m gamble með risa-upside.' },

  // ---- GK backup ----
  { id:'rushworth', name:'Carl Rushworth', short:'Rushworth', initials:'CR', club:'Brighton', league:'Premier', pos:'GK', age:24, price:12, tag:'linked', nat:'ENG', wiki:'Carl_Rushworth',
    stats:{ saves:4.6, cs:16, claims:1.4, distrib:78, mins:3780, sweeper:0.8, penaltysaves:1, goalsConceded:36 },
    radar:{ Reflexes:84, Distribution:80, Aerial:78, Command:78, Composure:80, Speed:70 },
    reason:'16 hreinar leikir í Championship með Coventry. Backup fyrir Lammens sem ýtir frá. Enskur, ungur, ódýr.' },

  // ============================================================
  // LEAVING — current free agents / contract expiry / forced sales
  // ============================================================
  { id:'bernardo', name:'Bernardo Silva', short:'B. Silva', initials:'BS', club:'Man City', league:'Premier', pos:'AM', age:31, price:0, tag:'leaving', nat:'POR', wiki:'Bernardo_Silva',
    stats:{ goals:7, assists:11, pass:91, prog:6.8, dribbles:3.2, mins:2640, keypass:2.4, press:2.0 },
    radar:{ Creativity:92, Passing:92, Composure:90, Dribble:84, Pace:74, Stamina:84 },
    reason:'FRÍJI úr City. Tækni-meistari sem myndi heilla United-fans. Aldur (31) eini galli. Vinir þínir efast en — frítt!' },
  { id:'jstones', name:'John Stones', short:'Stones', initials:'JS', club:'Man City', league:'Premier', pos:'CB', age:31, price:0, tag:'leaving', nat:'ENG', wiki:'John_Stones',
    stats:{ blocks:1.4, clears:3.8, aerial:72, pass:92, duels:60, intercepts:1.8, tackles:1.6, mins:1880 },
    radar:{ Passing:92, Composure:90, Aerial:78, Tackling:78, Pace:74, Press:76 },
    reason:'FRÍJI úr City. Ensk-CB með bolta-leik betri en allra United-CB. Meiðsla-saga áhyggjuverð.' },
  { id:'bentancur', name:'Rodrigo Bentancur', short:'Bentancur', initials:'RB', club:'Tottenham', league:'Premier', pos:'CM', age:28, price:18, tag:'leaving', nat:'URU', wiki:'Rodrigo_Bentancur',
    stats:{ pass:88, tackles:2.4, intercepts:1.8, duels:58, mins:2480, goals:3, assists:4, prog:6.4 },
    radar:{ Passing:86, Composure:84, Tackling:80, Stamina:80, Pace:74, Creativity:74 },
    reason:'Spurs vilja kaupa nýja miðju. Bentancur kannski á útleið. Premier-prufaður, fjölhæfur, ódýr-ish.' },
  { id:'aina', name:'Ola Aina', short:'Aina', initials:'OA', club:'Nott Forest', league:'Premier', pos:'RB', age:29, price:0, tag:'leaving', nat:'NGA', wiki:'Ola_Aina',
    stats:{ pass:78, prog:7.2, tackles:2.4, duels:60, mins:2840, assists:4, dribbles:2.4, crosses:2.2 },
    radar:{ Pace:90, Stamina:86, Tackling:82, Crossing:76, Passing:76, Aerial:70 },
    reason:'FRÍJI úr Forest. Skotinn hraðamaður, fjölhæfur (RB/LB). Backup-bargain ef Dalot meiðist.' },
  { id:'hwilson', name:'Harry Wilson', short:'H. Wilson', initials:'HW', club:'Fulham', league:'Premier', pos:'AM', age:28, price:0, tag:'leaving', nat:'WAL', wiki:'Harry_Wilson_(footballer,_born_1997)',
    stats:{ goals:8, assists:6, pass:80, dribbles:2.8, mins:2280, keypass:2.0, prog:5.8, shots:2.4 },
    radar:{ Finishing:80, Creativity:80, Passing:80, Dribble:78, Pace:76, Stamina:78 },
    reason:'FRÍJI úr Fulham. Velsk-engill með Liverpool-bakgrunni. Backup-AM/RW á núlli pundi. Just say yes.' },
  { id:'son', name:'Son Heung-min', short:'Son', initials:'SH', club:'Tottenham', league:'Premier', pos:'LW', age:33, price:0, tag:'leaving', nat:'KOR', wiki:'Son_Heung-min',
    stats:{ goals:15, assists:8, pass:80, dribbles:2.4, mins:2580, prog:5.4, shots:2.8, press:1.8 },
    radar:{ Finishing:90, Pace:84, Dribble:82, Creativity:82, Stamina:78, Composure:88 },
    reason:'FRÍJI úr Spurs. Aldur áhyggjuverður (33), en stjarna á núlli pundi. Vinirnir þínir myndu LOSA IT.' },

  // ============================================================
  // GEM — hidden gems, bargains
  // ============================================================
  { id:'ascott', name:'Alex Scott', short:'A. Scott', initials:'AS', club:'Bournemouth', league:'Premier', pos:'CM', age:22, price:45, tag:'gem', nat:'ENG', wiki:'Alex_Scott_(footballer,_born_2003)',
    stats:{ pass:84, prog:7.6, tackles:2.2, duels:54, mins:2480, goals:3, assists:5, dribbles:2.6 },
    radar:{ Creativity:82, Passing:84, Dribble:80, Pace:78, Stamina:82, Composure:78 },
    reason:'Bournemouth-skólinn (sjá Semenyo, Huijsen). Enskur CM, fjölhæfur, undirmetinn. £45m steal.' },
  { id:'orozco', name:'Cristian Orozco', short:'Orozco', initials:'CO', club:'Junior FC', league:'Categoria A', pos:'CM', age:18, price:18, tag:'gem', nat:'COL', wiki:'Cristián_Orozco',
    stats:{ pass:80, dribbles:3.2, prog:6.2, tackles:1.8, mins:1840, goals:4, assists:3, keypass:1.6 },
    radar:{ Creativity:80, Dribble:82, Passing:78, Composure:74, Pace:80, Stamina:78 },
    reason:'INEOS \'hidden gem\' kaup þegar lokað. Næsti Caicedo, Kólumbískur miðjumaður, allt að gerast.' },
  { id:'tadams', name:'Tyler Adams', short:'T. Adams', initials:'TA', club:'Bournemouth', league:'Premier', pos:'CDM', age:27, price:25, tag:'gem', nat:'USA', wiki:'Tyler_Adams',
    stats:{ tackles:3.4, intercepts:2.2, pass:82, mins:2240, duels:62, goals:1, prog:5.4, press:2.6 },
    radar:{ Tackling:88, Press:90, Stamina:88, Passing:78, Pace:74, Composure:74 },
    reason:'Jan-target sem var blokk-kept. Premier-prufaður breaker í Bournemouth. Ódýr 6-Caseiro-replacer.' },
  { id:'rneves', name:'Rúben Neves', short:'R. Neves', initials:'RN', club:'Al-Hilal', league:'Saudi Pro', pos:'CM', age:29, price:30, tag:'gem', nat:'POR', wiki:'Rúben_Neves',
    stats:{ pass:90, prog:8.0, tackles:2.0, duels:54, mins:2740, goals:5, assists:4, keypass:2.0 },
    radar:{ Passing:92, Composure:88, Creativity:80, Tackling:74, Stamina:80, Pace:64 },
    reason:'Jan-shortlist. Al-Hilal samningur þungur. Portúgali — Amorim-tengsl, langhögg. Backup-plan.' },

  // ============================================================
  // YOUNG — wonderkids (under 22)
  // ============================================================
  { id:'bouaddi', name:'Ayyoub Bouaddi', short:'Bouaddi', initials:'AB', club:'Lille', league:'Ligue 1', pos:'CM', age:18, price:52, tag:'young', nat:'FRA', wiki:'Ayyoub_Bouaddi',
    stats:{ pass:84, prog:6.8, tackles:2.8, duels:58, mins:2680, goals:2, assists:3, dribbles:2.0 },
    radar:{ Tackling:84, Passing:84, Composure:86, Stamina:88, Creativity:78, Pace:74 },
    reason:'#1 á NXGN 2026. Amorim chasing, Ferguson enlisted. Líkt við ungan Pogba. €60m release, 6 stórklúbba slagur.' },
  { id:'subiabre', name:'Ian Subiabre', short:'Subiabre', initials:'IS', club:'River Plate', league:'Liga Argentina', pos:'AM', age:18, price:20, tag:'young', nat:'ARG', wiki:'Ian_Subiabre',
    stats:{ pass:78, dribbles:3.4, goals:6, assists:4, mins:1640, prog:5.4, shots:2.2, keypass:1.8 },
    radar:{ Creativity:80, Dribble:84, Pace:82, Finishing:74, Passing:78, Composure:74 },
    reason:'River Plate-perlan. Argentískur AM, long-term United-target. Næsti Garnacho-style frá Buenos Aires.' },
  { id:'alajbegovic', name:'Kerim Alajbegović', short:'Alajbegović', initials:'KA', club:'RB Salzburg', league:'Bundesliga AT', pos:'RW', age:18, price:25, tag:'young', nat:'BIH', wiki:'Kerim_Alajbegović',
    stats:{ goals:5, assists:6, dribbles:4.2, mins:1480, prog:5.2, shots:1.8, keypass:1.4, duels:48 },
    radar:{ Dribble:84, Pace:88, Creativity:78, Finishing:72, Stamina:74, Press:60 },
    reason:'Salzburg-vinstrivængur, 18. Líka Chelsea og Real að monitora. Klassísk RB-skóli-pipeline.' },
  { id:'mmane', name:'Matheus Mane', short:'Mane', initials:'MM', club:'Wolves', league:'Premier', pos:'RW', age:18, price:18, tag:'young', nat:'BRA', wiki:'Matheus_Mané',
    stats:{ goals:3, assists:2, dribbles:3.4, mins:980, prog:4.6, shots:1.2, keypass:1.2, duels:42 },
    radar:{ Dribble:82, Pace:86, Creativity:74, Finishing:70, Stamina:72, Press:62 },
    reason:'Wolves-perlan. Brasílíu-kantmaður, fjölhæfur. Wolves \'bright light\' fyrir tímabilið. Sleeper.' },
  { id:'blopa', name:'Salvador Blopa', short:'Blopa', initials:'SB', club:'Sporting CP', league:'Liga Portugal', pos:'AM', age:19, price:22, tag:'young', nat:'POR', wiki:'Salvador_Blopa',
    stats:{ goals:4, assists:5, dribbles:3.6, mins:1240, pass:80, keypass:1.6, prog:5.0, shots:1.4 },
    radar:{ Creativity:82, Dribble:80, Passing:80, Pace:78, Finishing:72, Composure:78 },
    reason:'Sporting-akademían — Amorim-tengsl. Skemmtilegur tæknimaður, 19. Pólska Pogba-skóla væntingar.' },
  { id:'castillo', name:'Ederson Castillo', short:'Castillo', initials:'EC', club:'Independiente del Valle', league:'Liga Pro EC', pos:'CM', age:19, price:15, tag:'young', nat:'ECU', wiki:'Ederson_Castillo',
    stats:{ pass:82, tackles:2.4, mins:1520, prog:5.8, duels:54, goals:2, assists:3, dribbles:1.8 },
    radar:{ Passing:80, Stamina:84, Tackling:78, Composure:78, Pace:76, Creativity:72 },
    reason:'INEOS-projektið, Ekvador. Lágt verð, ungur. Plan-fyrir-2028 frekar en 2026 — en á spjaldi þínu núna.' },
  { id:'jjgabriel', name:'JJ Gabriel', short:'JJ Gabriel', initials:'JG', club:'Chelsea U18', league:'U18 Premier', pos:'LW', age:15, price:15, tag:'young', nat:'ENG', wiki:'Joseph_Junior_Andreou_Gabriel',
    stats:{ goals:18, assists:9, dribbles:5.4, mins:1240, prog:6.8, shots:3.0, keypass:1.8, duels:46 },
    radar:{ Dribble:88, Pace:88, Creativity:80, Finishing:80, Stamina:70, Composure:74 },
    reason:'15 ÁRA. Borinn saman við Ronaldo og Neymar. Hafnaði nýverið City. Long-game kaup — en orðrómurinn er staðreyndalegur.' },
  { id:'sedikinteh', name:'Abubacarr Sedi Kinteh', short:'S. Kinteh', initials:'SK', club:'Hammarby IF', league:'Allsvenskan', pos:'CB', age:17, price:8, tag:'young', nat:'GAM', wiki:'Abubacarr_Sedi_Kinteh',
    stats:{ blocks:0.9, clears:2.4, aerial:62, pass:74, duels:54, intercepts:1.4, tackles:1.6, mins:980 },
    radar:{ Pace:92, Aerial:74, Tackling:74, Composure:68, Passing:72, Press:74 },
    reason:'Rapid wonderkid-defender. Gambia/Hammarby, ungur sprintari. Chelsea einnig á eftir. £8m bet.' },
];

const TAG_META = {
  linked:  { label:'Orðaður',     color:'#DA291C' },
  leaving: { label:'Á förum',     color:'#fbbf24' },
  gem:     { label:'Falinn perla', color:'#a78bfa' },
  young:   { label:'Ungstirni',   color:'#22c55e' },
};

const BUDGET_TOTAL = 350;
const SELECTED_IDS = ['anderson','wharton','branthwaite','adeyemi','lewisskelly'];

// Current Manchester United squad (2025/26). Updated for the post-summer-2025 reality:
// new arrivals Cunha, Mbeumo, Sesko, Lammens, Dorgu, Heaven; Garnacho gone (Chelsea),
// Rashford on loan at Barça, Onana on loan at Trabzonspor, Casemiro leaving as a free agent.
// Manager: Rúben Amorim.
const UNITED_SQUAD = [
  { id:'lammens',  name:'Senne Lammens',      short:'Lammens',  initials:'SL', pos:'GK',  age:23, nat:'BEL', rating:80, wiki:'Senne_Lammens',
    radar:{ Reflexes:84, Distribution:80, Aerial:80, Command:78, Composure:80, Speed:72 } },
  { id:'heaton',   name:'Tom Heaton',         short:'Heaton',   initials:'TH', pos:'GK',  age:40, nat:'ENG', rating:72, wiki:'Tom_Heaton',
    radar:{ Reflexes:74, Distribution:72, Aerial:74, Command:78, Composure:80, Speed:54 } },
  { id:'dalot',    name:'Diogo Dalot',        short:'Dalot',    initials:'DD', pos:'RB',  age:27, nat:'POR', rating:80, wiki:'Diogo_Dalot',
    radar:{ Pace:82, Tackling:74, Crossing:78, Stamina:88, Passing:76, Aerial:62 } },
  { id:'mazraoui', name:'Noussair Mazraoui',  short:'Mazraoui', initials:'NM', pos:'RB',  age:28, nat:'MAR', rating:78, wiki:'Noussair_Mazraoui',
    radar:{ Pace:82, Tackling:78, Crossing:74, Stamina:84, Passing:80, Aerial:66 } },
  { id:'deligt',   name:'Matthijs de Ligt',   short:'De Ligt',  initials:'ML', pos:'CB',  age:27, nat:'NED', rating:84, wiki:'Matthijs_de_Ligt',
    radar:{ Aerial:90, Tackling:84, Passing:80, Pace:72, Composure:84, Press:74 } },
  { id:'martinez', name:'Lisandro Martínez',  short:'L. Martínez', initials:'LM', pos:'CB', age:28, nat:'ARG', rating:83, wiki:'Lisandro_Martínez',
    radar:{ Aerial:74, Tackling:90, Passing:82, Pace:76, Composure:80, Press:86 } },
  { id:'yoro',     name:'Leny Yoro',          short:'Yoro',     initials:'LY', pos:'CB',  age:20, nat:'FRA', rating:80, wiki:'Leny_Yoro',
    radar:{ Pace:86, Aerial:82, Tackling:80, Passing:80, Composure:80, Press:74 } },
  { id:'heaven',   name:'Ayden Heaven',       short:'Heaven',   initials:'AH', pos:'CB',  age:19, nat:'ENG', rating:76, wiki:'Ayden_Heaven',
    radar:{ Pace:80, Tackling:80, Aerial:78, Passing:74, Composure:74, Press:72 } },
  { id:'shaw',     name:'Luke Shaw',          short:'Shaw',     initials:'LS', pos:'LB',  age:30, nat:'ENG', rating:81, wiki:'Luke_Shaw',
    radar:{ Pace:80, Tackling:78, Crossing:82, Stamina:78, Passing:84, Aerial:68 } },
  { id:'dorgu',    name:'Patrick Dorgu',      short:'Dorgu',    initials:'PD', pos:'LB',  age:21, nat:'DEN', rating:76, wiki:'Patrick_Dorgu',
    radar:{ Pace:88, Tackling:74, Crossing:78, Stamina:84, Passing:74, Aerial:60 } },
  { id:'ugarte',   name:'Manuel Ugarte',      short:'Ugarte',   initials:'MU', pos:'CDM', age:25, nat:'URU', rating:76, wiki:'Manuel_Ugarte_(footballer)',
    radar:{ Tackling:88, Press:90, Passing:72, Stamina:86, Pace:74, Composure:70 } },
  { id:'mainoo',   name:'Kobbie Mainoo',      short:'Mainoo',   initials:'KM', pos:'CM',  age:21, nat:'ENG', rating:81, wiki:'Kobbie_Mainoo',
    radar:{ Passing:84, Composure:88, Pace:74, Tackling:76, Stamina:82, Creativity:80 } },
  { id:'collyer',  name:'Toby Collyer',       short:'Collyer',  initials:'TC', pos:'CM',  age:22, nat:'ENG', rating:73, wiki:'Toby_Collyer',
    radar:{ Tackling:76, Passing:76, Stamina:80, Pace:74, Composure:72, Creativity:70 } },
  { id:'bruno',    name:'Bruno Fernandes',    short:'Bruno',    initials:'BF', pos:'AM',  age:31, nat:'POR', rating:87, wiki:'Bruno_Fernandes',
    radar:{ Creativity:92, Passing:90, Finishing:84, Dribble:74, Stamina:88, Pace:72 } },
  { id:'mount',    name:'Mason Mount',        short:'Mount',    initials:'MM', pos:'AM',  age:27, nat:'ENG', rating:77, wiki:'Mason_Mount',
    radar:{ Creativity:80, Passing:82, Finishing:74, Pace:74, Press:84, Stamina:80 } },
  { id:'mbeumo',   name:'Bryan Mbeumo',       short:'Mbeumo',   initials:'BM', pos:'RW',  age:26, nat:'CMR', rating:83, wiki:'Bryan_Mbeumo',
    radar:{ Finishing:84, Dribble:84, Pace:86, Creativity:82, Stamina:84, Press:78 } },
  { id:'cunha',    name:'Matheus Cunha',      short:'Cunha',    initials:'MC', pos:'AM',  age:26, nat:'BRA', rating:83, wiki:'Matheus_Cunha',
    radar:{ Dribble:86, Creativity:84, Finishing:82, Pace:82, Stamina:80, Press:74 } },
  { id:'amad',     name:'Amad Diallo',        short:'Amad',     initials:'AD', pos:'RW',  age:23, nat:'CIV', rating:80, wiki:'Amad_Diallo',
    radar:{ Dribble:88, Pace:84, Creativity:80, Finishing:76, Stamina:76, Press:70 } },
  { id:'sesko',    name:'Benjamin Šeško',     short:'Šeško',    initials:'BS', pos:'ST',  age:22, nat:'SVN', rating:82, wiki:'Benjamin_Šeško',
    radar:{ Finishing:82, Pace:86, Aerial:84, Press:74, Stamina:78, Composure:76 } },
  { id:'hojlund',  name:'Rasmus Højlund',     short:'Højlund',  initials:'RH', pos:'ST',  age:23, nat:'DEN', rating:76, wiki:'Rasmus_Højlund',
    radar:{ Finishing:78, Pace:86, Aerial:74, Press:78, Stamina:80, Creativity:60 } },
];

const fmt = (n) => '£' + n + 'm';
const sum = (ids, allPlayers) => ids.reduce((a,id) => a + ((allPlayers||PLAYERS).find(p=>p.id===id)?.price||0), 0);

// ---- Custom players: persisted in localStorage so they survive reload ----
const CUSTOM_KEY = 'dk:custom:v1';
const SIGNED_KEY = 'dk:signed:v2';
const NAME_KEY = 'dk:name:v1';

function loadName() {
  try { return localStorage.getItem(NAME_KEY) || ''; } catch { return ''; }
}
function saveName(name) {
  try { localStorage.setItem(NAME_KEY, name || ''); } catch {}
}

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
  loadName, saveName,
};
