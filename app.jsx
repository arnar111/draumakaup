// Draumakaup — interactive prototype.
// Screens: Market → Stats modal → Lineup (tactics) → Export.
// Trading-card aesthetic. Old Trafford pitch ratio 105:68 throughout.

(function () {
const { PLAYERS, UNITED_SQUAD, TAG_META, BUDGET_TOTAL, fmt, sum,
        loadCustomPlayers, saveCustomPlayers,
        loadSigned, saveSigned, makeCustomPlayer,
        loadName, saveName } = window.DK;
const { cream, cream2, ink, red, gold, navy } = window.V3T;
const { FutCard, MiniChip, Pitch } = window;
const { useState, useEffect, useMemo, useRef } = React;

function useElementWidth(ref) {
  const [w, setW] = useState(0);
  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(entries => {
      for (const e of entries) setW(e.contentRect.width);
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, [ref]);
  return w;
}

// Position slot definitions for 4-2-3-1
// Coords use the vertical-pitch system: x in [0,100], y in [0,100],
// y=0 is at opponent goal (attack), y=100 is own goal.
const FORMATIONS = {
  '4-2-3-1': [
    { id:'ST',  x:50, y:12, role:'ST'  },
    { id:'LW',  x:18, y:30, role:'LW'  },
    { id:'AM',  x:50, y:34, role:'AM'  },
    { id:'RW',  x:82, y:30, role:'RW'  },
    { id:'LCM', x:34, y:52, role:'CM'  },
    { id:'RCM', x:66, y:52, role:'CM'  },
    { id:'LB',  x:14, y:72, role:'LB'  },
    { id:'LCB', x:38, y:76, role:'CB'  },
    { id:'RCB', x:62, y:76, role:'CB'  },
    { id:'RB',  x:86, y:72, role:'RB'  },
    { id:'GK',  x:50, y:93, role:'GK'  },
  ],
  '4-3-3': [
    { id:'ST',  x:50, y:12, role:'ST' },
    { id:'LW',  x:20, y:20, role:'LW' },
    { id:'RW',  x:80, y:20, role:'RW' },
    { id:'LCM', x:30, y:46, role:'CM' },
    { id:'CDM', x:50, y:54, role:'CDM' },
    { id:'RCM', x:70, y:46, role:'CM' },
    { id:'LB',  x:14, y:72, role:'LB' },
    { id:'LCB', x:38, y:76, role:'CB' },
    { id:'RCB', x:62, y:76, role:'CB' },
    { id:'RB',  x:86, y:72, role:'RB' },
    { id:'GK',  x:50, y:93, role:'GK' },
  ],
  '3-4-3': [
    { id:'ST',  x:50, y:12, role:'ST' },
    { id:'LW',  x:20, y:20, role:'LW' },
    { id:'RW',  x:80, y:20, role:'RW' },
    { id:'LM',  x:14, y:46, role:'LM' },
    { id:'LCM', x:38, y:50, role:'CM' },
    { id:'RCM', x:62, y:50, role:'CM' },
    { id:'RM',  x:86, y:46, role:'RM' },
    { id:'LCB', x:26, y:74, role:'CB' },
    { id:'CCB', x:50, y:78, role:'CB' },
    { id:'RCB', x:74, y:74, role:'CB' },
    { id:'GK',  x:50, y:93, role:'GK' },
  ],
};

// Auto-assignment by best role fit
const ROLE_MAP = {
  'ST': ['ST'], 'LW': ['LW','LM','AM'], 'RW': ['RW','RM','AM'],
  'AM': ['AM','CM','LW','RW'], 'CM': ['CM','CDM','AM'], 'CDM': ['CDM','CM','CB'],
  'LM': ['LM','LW','LB'], 'RM': ['RM','RW','RB'],
  'LB': ['LB','LM'], 'RB': ['RB','RM'], 'CB': ['CB','CDM'], 'GK': ['GK']
};

function bestForRole(role, candidates) {
  // sorted by best match (exact role wins)
  const wanted = ROLE_MAP[role] || [role];
  return [...candidates].sort((a,b) => {
    const ai = wanted.indexOf(a.pos);
    const bi = wanted.indexOf(b.pos);
    const aw = ai === -1 ? 99 : ai;
    const bw = bi === -1 ? 99 : bi;
    if (aw !== bw) return aw - bw;
    return (b.rating || 80) - (a.rating || 80);
  });
}

function autoLineup(formation, signedIds, allPlayers) {
  const lineup = {};
  const used = new Set();
  const slots = FORMATIONS[formation];
  const signings = signedIds.map(id => allPlayers.find(p=>p.id===id)).filter(Boolean);
  // Greedy: fill best signings first, then United squad fillers
  // Order slots by attack→defense to give signings priority on offensive roles
  const ordered = [...slots];
  ordered.sort((a,b) => a.y - b.y);
  for (const slot of ordered) {
    // pool = unsigned-yet (signings first then united)
    const pool = [...signings, ...UNITED_SQUAD].filter(p => !used.has(p.id));
    const best = bestForRole(slot.role, pool);
    if (best.length > 0) {
      lineup[slot.id] = best[0].id;
      used.add(best[0].id);
    }
  }
  return lineup;
}

// =====================================================================
// TOP BAR
// =====================================================================
function TopBar({ signedIds, players, tab, setTab, managerName, onEditName }) {
  const spent = sum(signedIds, players);
  const remaining = BUDGET_TOTAL - spent;
  const pct = (spent/BUDGET_TOTAL) * 100;
  return (
    <div style={{
      padding:'14px 28px 14px',
      borderBottom:`2px dashed ${ink}`,
      display:'flex', alignItems:'center', justifyContent:'space-between',
      background: cream,
      position:'relative', zIndex:5,
    }}>
      <div style={{ display:'flex', alignItems:'center', gap:14 }}>
        <div style={{ width:54, height:54, borderRadius:'50%', background:red, color:'#fff7da', display:'grid', placeItems:'center', border:`3px double #fff7da`, boxShadow:`0 0 0 3px ${red}`, fontFamily:'"Bebas Neue", Impact, sans-serif', fontSize:24, lineHeight:1, transform:'rotate(-8deg)' }}>
          <div style={{ textAlign:'center' }}>
            <div style={{ fontSize:9, letterSpacing:'0.2em' }}>SUMAR</div>
            <div style={{ fontSize:22, fontWeight:900 }}>'26</div>
          </div>
        </div>
        <div>
          <div style={{ fontFamily:'"Bebas Neue", Impact, sans-serif', fontSize:34, lineHeight:0.9, letterSpacing:'0.02em', color:ink }}>DRAUMAKAUP</div>
          <div style={{ fontSize:11, letterSpacing:'0.22em', color:'rgba(31,24,19,0.6)', fontWeight:700 }}>
            ★ STJÓRINN{' '}
            <span
              onClick={onEditName}
              title="Smella til að breyta nafni"
              style={{ color:ink, cursor:'pointer', borderBottom:`1.5px dashed rgba(31,24,19,0.5)`, padding:'0 2px' }}>
              @{(managerName || 'ÞÚ').toUpperCase()}
            </span>
            {' '}· MUFC · {signedIds.length} SIGNINGS ★
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display:'flex', gap:6 }}>
        {[
          { id:'market',  label:'MARKAÐUR' },
          { id:'lineup',  label:'DRAUMA-XI' },
          { id:'export',  label:'DEILA' },
        ].map((t, i) => (
          <button key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              padding:'8px 16px',
              background: tab===t.id ? ink : cream2,
              color: tab===t.id ? cream : ink,
              border:`2px solid ${ink}`, borderRadius:8,
              fontFamily:'"Bebas Neue", Impact, sans-serif', fontSize:18, letterSpacing:'0.08em',
              boxShadow: tab===t.id ? `3px 3px 0 ${red}` : `2px 2px 0 ${ink}`,
              transform:`rotate(${[(-1.2),(0.8),(-0.6)][i]}deg)`,
              cursor:'pointer',
            }}>{t.label}</button>
        ))}
      </div>

      {/* Wallet */}
      <div style={{ background:`linear-gradient(135deg, ${gold}, #f5d35c)`, border:`2px solid ${ink}`, padding:'8px 14px', borderRadius:10, transform:'rotate(2deg)', boxShadow:`3px 3px 0 ${ink}`, minWidth:170 }}>
        <div style={{ display:'flex', justifyContent:'space-between', fontSize:9, letterSpacing:'0.18em', fontWeight:700 }}>
          <span>WALLET</span><span>{Math.round(pct)}% USED</span>
        </div>
        <div style={{ fontFamily:'"Bebas Neue", Impact, sans-serif', fontSize:32, lineHeight:1, color:ink }}>£{remaining}m left</div>
        <div style={{ height:5, background:'rgba(31,24,19,0.18)', borderRadius:99, marginTop:4 }}>
          <div style={{ width:`${Math.min(100, pct)}%`, height:'100%', background: pct>100 ? red : ink, borderRadius:99 }} />
        </div>
        <div style={{ fontSize:9, marginTop:3, fontWeight:600 }}>spent £{spent}m / £{BUDGET_TOTAL}m</div>
      </div>
    </div>
  );
}

// =====================================================================
// MARKET SCREEN
// =====================================================================
function MarketScreen({ players, signedIds, onToggle, onOpenStats, onAddClick, onDeleteCustom }) {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let list = players;
    if (filter !== 'all') list = list.filter(p => p.tag === filter);
    if (search) {
      const s = search.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(s) || p.club.toLowerCase().includes(s));
    }
    return list;
  }, [filter, search, players]);

  return (
    <div style={{ padding:'16px 28px 90px', position:'relative' }}>
      {/* Filter row */}
      <div style={{ display:'flex', gap:10, alignItems:'center', flexWrap:'wrap' }}>
        {[
          { id:'all', l:'ALL', n:players.length, c:ink },
          { id:'linked', l:'TARGETS', n:players.filter(p=>p.tag==='linked').length, c:red },
          { id:'leaving', l:'AVAILABLE', n:players.filter(p=>p.tag==='leaving').length, c:gold },
          { id:'gem', l:'HIDDEN', n:players.filter(p=>p.tag==='gem').length, c:'#5e3aa8' },
          { id:'young', l:'WONDERKIDS', n:players.filter(p=>p.tag==='young').length, c:'#22c55e' },
        ].map((f,i)=>(
          <button key={f.id}
            onClick={()=>setFilter(f.id)}
            style={{
              padding:'7px 14px', borderRadius:8,
              background: filter===f.id ? f.c : cream2,
              color: filter===f.id ? '#fff7da' : ink,
              border:`2px solid ${ink}`, fontFamily:'"Bebas Neue", Impact, sans-serif',
              fontSize:14, letterSpacing:'0.08em', cursor:'pointer',
              transform: `rotate(${[(-1),(0.8),(-0.5),(1),(-0.8)][i]}deg)`,
              boxShadow: filter===f.id ? `3px 3px 0 ${ink}` : `2px 2px 0 ${ink}`,
            }}>{f.l} <span style={{ fontSize:11, opacity:0.75 }}>{f.n}</span></button>
        ))}

        <button
          onClick={onAddClick}
          style={{
            padding:'7px 14px', borderRadius:8,
            background:'#fff7da', color:ink,
            border:`2px dashed ${ink}`, fontFamily:'"Bebas Neue", Impact, sans-serif',
            fontSize:14, letterSpacing:'0.08em', cursor:'pointer',
            transform: 'rotate(0.6deg)', boxShadow:`2px 2px 0 ${ink}`,
          }}>+ BÆTA VIÐ</button>

        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="leita..."
          style={{
            marginLeft:'auto', padding:'7px 14px', border:`2px solid ${ink}`, borderRadius:8,
            background:cream2, fontFamily:'"Bebas Neue", Impact, sans-serif', fontSize:14, letterSpacing:'0.08em',
            width:180, outline:'none', boxShadow:`2px 2px 0 ${ink}`, color: ink,
          }}/>
      </div>

      {/* Cards grid */}
      <div style={{ marginTop:18, display:'grid', gridTemplateColumns:'repeat(5, 1fr)', gap:'34px 22px', justifyItems:'center' }}>
        {filtered.map((p, i) => {
          const isSel = signedIds.includes(p.id);
          const rot = [(-2),(1.5),(-1),(2),(-1.5),(1),(-2),(1.2),(-1.5),(1),(-1),(1.5)][i % 12];
          return (
            <div key={p.id} style={{ position:'relative', transform:`rotate(${rot}deg)` }}>
              <div
                onClick={() => onOpenStats(p.id)}
                style={{ cursor:'pointer', transition:'transform .15s', }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                <FutCard p={p} w={180} />
              </div>
              {/* SIGN/SIGNED button */}
              <button
                onClick={(e)=>{ e.stopPropagation(); onToggle(p.id); }}
                style={{
                  position:'absolute', bottom:-22, left:'50%', transform:`translateX(-50%) rotate(${-rot}deg)`,
                  background: isSel ? '#22c55e' : ink,
                  color: isSel ? ink : cream,
                  border:`2px solid ${ink}`,
                  padding:'5px 14px', borderRadius:6,
                  fontFamily:'"Bebas Neue", Impact, sans-serif', fontSize:13, letterSpacing:'0.1em',
                  boxShadow:`2px 2px 0 ${red}`,
                  cursor:'pointer',
                  whiteSpace:'nowrap', zIndex:2,
                }}>{isSel ? '✓ SIGNED' : '+ SIGN'}</button>
              {isSel && (
                <div style={{ position:'absolute', top:-12, right:-12, background:red, color:'#fff7da', borderRadius:'50%', width:42, height:42, display:'grid', placeItems:'center', border:`2px solid ${ink}`, boxShadow:`2px 2px 0 ${ink}`, transform:`rotate(${8-rot}deg)`, fontFamily:'"Bebas Neue", Impact, sans-serif', fontSize:11, lineHeight:1, textAlign:'center', pointerEvents:'none' }}>
                  IN<br/>HÓP
                </div>
              )}
              {p.custom && !isSel && (
                <button
                  onClick={(e)=>{ e.stopPropagation(); if (confirm(`Eyða ${p.name} úr listanum?`)) onDeleteCustom(p.id); }}
                  title="Eyða custom leikmanni"
                  style={{ position:'absolute', top:-10, left:-10, background:ink, color:cream, border:`2px solid ${cream}`, width:26, height:26, borderRadius:'50%', cursor:'pointer', fontSize:14, lineHeight:1, transform:`rotate(${-rot}deg)`, boxShadow:`2px 2px 0 ${red}`, zIndex:3 }}>×</button>
              )}
              {p.custom && (
                <div style={{ position:'absolute', top:8, left:8, background:'#fff7da', color:ink, fontSize:8, fontWeight:900, letterSpacing:'0.15em', padding:'2px 5px', border:`1.5px solid ${ink}`, transform:`rotate(${-rot-4}deg)`, zIndex:2, fontFamily:'"Bebas Neue", Impact, sans-serif' }}>CUSTOM</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// =====================================================================
// NAME MODAL — asks for manager name; shown on first load and editable
// =====================================================================
function NameModal({ initial, onClose, onSave, canDismiss }) {
  const [val, setVal] = useState(initial || '');
  const trimmed = val.trim();
  function submit(e) {
    e?.preventDefault?.();
    if (!trimmed) return;
    onSave(trimmed);
  }
  return (
    <div onClick={canDismiss ? onClose : undefined} style={{
      position:'fixed', inset:0, zIndex:130,
      background:'rgba(31,24,19,0.82)', backdropFilter:'blur(8px)',
      display:'grid', placeItems:'center', padding:'40px',
    }}>
      <form onSubmit={submit} onClick={e=>e.stopPropagation()} style={{
        width:'min(480px, 96vw)', background:cream, color:ink, position:'relative',
        fontFamily:'"Oswald", Impact, sans-serif', padding:'28px 32px',
        border:`5px solid ${ink}`, boxShadow:`10px 10px 0 ${red}`,
      }}>
        {canDismiss && (
          <button type="button" onClick={onClose} style={{
            position:'absolute', top:12, right:12, background:ink, color:cream, border:'none',
            width:34, height:34, borderRadius:6, fontFamily:'"Bebas Neue", Impact, sans-serif', fontSize:20, cursor:'pointer',
          }}>×</button>
        )}

        <div style={{ fontSize:11, letterSpacing:'0.3em', color:'rgba(31,24,19,0.6)', fontWeight:700 }}>★ STJÓRA-RÁÐNING ★</div>
        <div style={{ fontFamily:'"Bebas Neue", Impact, sans-serif', fontSize:54, lineHeight:0.9, marginTop:4 }}>HVAÐ HEITIRÐU?</div>
        <div style={{ fontSize:13, color:'rgba(31,24,19,0.7)', marginTop:8, lineHeight:1.4 }}>
          Nafnið þitt birtist á deilanlegri PNG-myndinni þegar þú staðfestir hópinn. Bíddu með "Sir" þangað til þú vinnur Champions League.
        </div>

        <input
          autoFocus
          value={val}
          onChange={e=>setVal(e.target.value)}
          placeholder="t.d. Arnar"
          maxLength={24}
          style={{
            marginTop:18, width:'100%', padding:'14px 16px', border:`2px solid ${ink}`, borderRadius:10,
            background:'#fff7da', fontFamily:'"Bebas Neue", Impact, sans-serif', fontSize:28, letterSpacing:'0.04em',
            outline:'none', boxShadow:`3px 3px 0 ${ink}`, color:ink, boxSizing:'border-box',
          }}
        />

        <button type="submit" disabled={!trimmed}
          style={{
            marginTop:18, width:'100%', background: trimmed ? ink : 'rgba(31,24,19,0.35)',
            color: cream, border:`2px solid ${ink}`, padding:'14px', borderRadius:10,
            fontFamily:'"Bebas Neue", Impact, sans-serif', fontSize:22, letterSpacing:'0.12em',
            cursor: trimmed ? 'pointer' : 'not-allowed', boxShadow:`4px 4px 0 ${red}`,
          }}>★ TAKA VIÐ MUFC ★</button>
      </form>
    </div>
  );
}

// =====================================================================
// ADD-PLAYER MODAL
// =====================================================================
function AddPlayerModal({ onClose, onAdd }) {
  const [form, setForm] = useState({ name:'', club:'', pos:'CM', price:'30', tag:'linked', nat:'' });
  const update = (k,v) => setForm(f => ({ ...f, [k]:v }));
  const canSubmit = form.name.trim().length > 1 && form.club.trim().length > 0 && parseInt(form.price,10) >= 0;

  function submit(e) {
    e?.preventDefault?.();
    if (!canSubmit) return;
    onAdd(form);
  }

  const labelStyle = { fontSize:10, letterSpacing:'0.2em', fontWeight:700, color:'rgba(31,24,19,0.7)', marginBottom:4, display:'block' };
  const inputStyle = {
    width:'100%', padding:'9px 12px', border:`2px solid ${ink}`, borderRadius:8,
    background:'#fff7da', fontFamily:'"Oswald", Impact, sans-serif', fontSize:15,
    outline:'none', boxShadow:`2px 2px 0 ${ink}`, color:ink, boxSizing:'border-box',
  };

  return (
    <div onClick={onClose} style={{
      position:'fixed', inset:0, zIndex:120,
      background:'rgba(31,24,19,0.78)', backdropFilter:'blur(8px)',
      display:'grid', placeItems:'center', padding:'40px',
    }}>
      <form onSubmit={submit} onClick={e=>e.stopPropagation()} style={{
        width:'min(560px, 96vw)', background:cream, color:ink, position:'relative',
        fontFamily:'"Oswald", Impact, sans-serif', padding:'28px 32px',
        border:`5px solid ${ink}`, boxShadow:`10px 10px 0 ${red}`,
      }}>
        <button type="button" onClick={onClose} style={{
          position:'absolute', top:12, right:12, background:ink, color:cream, border:'none',
          width:34, height:34, borderRadius:6, fontFamily:'"Bebas Neue", Impact, sans-serif', fontSize:20, cursor:'pointer',
        }}>×</button>

        <div style={{ fontSize:11, letterSpacing:'0.3em', color:'rgba(31,24,19,0.6)', fontWeight:700 }}>★ TRANSFER REQUEST ★</div>
        <div style={{ fontFamily:'"Bebas Neue", Impact, sans-serif', fontSize:46, lineHeight:0.9, marginTop:4 }}>BÆTA VIÐ LEIKMANNI</div>
        <div style={{ fontSize:12, color:'rgba(31,24,19,0.65)', marginTop:6, fontStyle:'italic' }}>Mynd er sótt sjálfkrafa frá Wikipedia ef nafnið finnst. Annars færðu initials.</div>

        <div style={{ marginTop:18, display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
          <div style={{ gridColumn:'1 / -1' }}>
            <label style={labelStyle}>NAFN</label>
            <input style={inputStyle} value={form.name} onChange={e=>update('name', e.target.value)} placeholder="t.d. Bryan Mbeumo" autoFocus />
          </div>
          <div>
            <label style={labelStyle}>LIÐ</label>
            <input style={inputStyle} value={form.club} onChange={e=>update('club', e.target.value)} placeholder="t.d. Brentford" />
          </div>
          <div>
            <label style={labelStyle}>ÞJÓÐ (3 stafir)</label>
            <input style={inputStyle} value={form.nat} onChange={e=>update('nat', e.target.value)} placeholder="t.d. CMR" maxLength={3} />
          </div>
          <div>
            <label style={labelStyle}>STAÐA</label>
            <select style={inputStyle} value={form.pos} onChange={e=>update('pos', e.target.value)}>
              {['GK','RB','CB','LB','CDM','CM','AM','RM','LM','RW','LW','ST'].map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>VERÐ (£M)</label>
            <input style={inputStyle} type="number" min="0" step="1" value={form.price} onChange={e=>update('price', e.target.value)} />
          </div>
          <div style={{ gridColumn:'1 / -1' }}>
            <label style={labelStyle}>FLOKKUR</label>
            <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
              {[
                { id:'linked',  l:'ORÐAÐUR',     c:red },
                { id:'leaving', l:'Á FÖRUM',     c:gold },
                { id:'gem',     l:'FALIN PERLA', c:'#5e3aa8' },
                { id:'young',   l:'UNGSTIRNI',   c:'#22c55e' },
              ].map(t => (
                <button key={t.id} type="button" onClick={()=>update('tag', t.id)}
                  style={{
                    padding:'8px 14px', borderRadius:8,
                    background: form.tag===t.id ? t.c : cream2,
                    color: form.tag===t.id ? '#fff7da' : ink,
                    border:`2px solid ${ink}`, fontFamily:'"Bebas Neue", Impact, sans-serif', fontSize:14,
                    letterSpacing:'0.08em', cursor:'pointer',
                    boxShadow: form.tag===t.id ? `2px 2px 0 ${ink}` : `2px 2px 0 ${ink}`,
                  }}>{t.l}</button>
              ))}
            </div>
          </div>
        </div>

        <button type="submit" disabled={!canSubmit}
          style={{
            marginTop:22, width:'100%', background: canSubmit ? ink : 'rgba(31,24,19,0.35)',
            color: cream, border:`2px solid ${ink}`, padding:'14px', borderRadius:10,
            fontFamily:'"Bebas Neue", Impact, sans-serif', fontSize:22, letterSpacing:'0.12em',
            cursor: canSubmit ? 'pointer' : 'not-allowed', boxShadow:`4px 4px 0 ${red}`,
          }}>★ BÚA TIL SPJALD ★</button>
      </form>
    </div>
  );
}

// =====================================================================
// STATS MODAL
// =====================================================================
function StatsModal({ player, onClose, onToggle, signed }) {
  if (!player) return null;
  const p = player;
  return (
    <div onClick={onClose} style={{
      position:'fixed', inset:0, zIndex:100,
      background:'rgba(31,24,19,0.78)', backdropFilter:'blur(8px)',
      display:'grid', placeItems:'center', padding:'40px',
    }}>
      <div onClick={e=>e.stopPropagation()} style={{
        width:'min(1280px, 96vw)', maxHeight:'92vh', overflow:'auto',
        background:cream, color:ink, position:'relative',
        fontFamily:'"Oswald", Impact, sans-serif', padding:'30px 36px',
        border:`5px solid ${ink}`, boxShadow:`12px 12px 0 ${red}`,
      }}>
        <div style={{ position:'absolute', inset:0, background:'repeating-linear-gradient(45deg, transparent 0 3px, rgba(0,0,0,0.015) 3px 4px)', pointerEvents:'none' }} />

        {/* Close */}
        <button onClick={onClose} style={{
          position:'absolute', top:14, right:14, background:ink, color:cream, border:'none',
          width:36, height:36, borderRadius:6, fontFamily:'"Bebas Neue", Impact, sans-serif', fontSize:20, cursor:'pointer',
          zIndex:3,
        }}>×</button>

        {/* Header */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', position:'relative' }}>
          <div>
            <div style={{ fontSize:11, letterSpacing:'0.3em', color:'rgba(31,24,19,0.6)', fontWeight:700 }}>★ DOSSIER · {TAG_META[p.tag].label.toUpperCase()} ★</div>
            <div style={{ fontFamily:'"Bebas Neue", Impact, sans-serif', fontSize:80, lineHeight:0.9, letterSpacing:'0.02em', marginTop:6 }}>{p.name.toUpperCase()}</div>
            <div style={{ marginTop:6, fontSize:14, fontWeight:600, color:'rgba(31,24,19,0.7)', letterSpacing:'0.05em' }}>
              {p.club.toUpperCase()} · {p.league.toUpperCase()} · {p.pos} · {p.age} ÁRA · {p.nat}
            </div>
          </div>
          <div style={{ background:`linear-gradient(135deg, ${gold}, #f5d35c)`, border:`2px solid ${ink}`, padding:'10px 22px', borderRadius:10, transform:'rotate(3deg)', boxShadow:`4px 4px 0 ${ink}`, textAlign:'center' }}>
            <div style={{ fontSize:10, letterSpacing:'0.2em', fontWeight:700 }}>PRICE</div>
            <div style={{ fontFamily:'"Bebas Neue", Impact, sans-serif', fontSize:54, lineHeight:0.9 }}>£{p.price}m</div>
          </div>
        </div>

        {/* Body */}
        <div style={{ marginTop:24, display:'grid', gridTemplateColumns:'auto 1fr 1fr', gap:28, position:'relative' }}>
          <div style={{ transform:'rotate(-3deg)' }}>
            <FutCard p={p} w={260} big={false} />
          </div>

          {/* Hex ratings */}
          <div>
            <div style={{ fontSize:11, letterSpacing:'0.25em', fontWeight:700, color:'rgba(31,24,19,0.6)' }}>★ ABILITY RATINGS</div>
            <div style={{ fontFamily:'"Bebas Neue", Impact, sans-serif', fontSize:24, marginTop:2, marginBottom:12, letterSpacing:'0.02em' }}>SIX-PACK</div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'14px 10px' }}>
              {Object.entries(p.radar).map(([k,v], i) => {
                const colors = ['#c52a1c','#d4a017','#5e3aa8','#22c55e','#5aa8ff','#ff6b6b'];
                return <Hex key={k} value={v} label={k} color={colors[i%colors.length]} />;
              })}
            </div>
          </div>

          {/* Numbers + report */}
          <div>
            <div style={{ background:cream2, border:`2px solid ${ink}`, borderRadius:10, padding:'16px 18px', position:'relative', boxShadow:`4px 4px 0 ${ink}` }}>
              <div style={{ position:'absolute', top:-12, left:14, background:red, color:'#fff7da', padding:'3px 10px', fontSize:11, fontWeight:700, letterSpacing:'0.2em', borderRadius:4, transform:'rotate(-2deg)' }}>SCOUTING REPORT</div>
              <div style={{ marginTop:6, fontSize:13, lineHeight:1.55, color:ink, fontFamily:'"Source Serif Pro", Georgia, serif' }}>“{p.reason}”</div>
            </div>
            <div style={{ marginTop:14, display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:8 }}>
              {Object.entries(p.stats).slice(0,4).map(([k,v],i) => {
                const colors = [red, navy, gold, '#22c55e'];
                return (
                  <div key={k} style={{ background: colors[i], color:'#fff7da', padding:'10px 12px', borderRadius:8, border:`2px solid ${ink}`, boxShadow:`3px 3px 0 ${ink}`, transform:`rotate(${[(-1),(1.5),(-1.5),(1)][i]}deg)` }}>
                    <div style={{ fontSize:10, letterSpacing:'0.16em', fontWeight:700, opacity:0.85 }}>{k.toUpperCase()}</div>
                    <div style={{ fontFamily:'"Bebas Neue", Impact, sans-serif', fontSize:34, lineHeight:0.9, letterSpacing:'0.01em' }}>{typeof v === 'number' ? v : v}</div>
                  </div>
                );
              })}
            </div>
            <button
              onClick={() => { onToggle(p.id); onClose(); }}
              style={{
                marginTop:14, width:'100%', background: signed ? '#22c55e' : ink, color: signed ? ink : cream,
                border:`2px solid ${ink}`, padding:'14px', borderRadius:10,
                fontFamily:'"Bebas Neue", Impact, sans-serif', fontSize:22, letterSpacing:'0.12em',
                cursor:'pointer', boxShadow:`4px 4px 0 ${red}`,
              }}>{signed ? '✓ REMOVE FROM ALBUM' : '★ ADD TO ALBUM ★'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Hex({ value, label, color }) {
  return (
    <div style={{ position:'relative', width:'100%', aspectRatio:'1/1' }}>
      <svg viewBox="0 0 100 100" style={{ position:'absolute', inset:0 }}>
        <polygon points="50,4 92,28 92,72 50,96 8,72 8,28" fill={color} stroke="#1f1813" strokeWidth="2"/>
        <polygon points="50,12 84,32 84,68 50,88 16,68 16,32" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
      </svg>
      <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', color:'#fff7da', textShadow:'0 2px 4px rgba(0,0,0,0.3)' }}>
        <div style={{ fontFamily:'"Bebas Neue", Impact, sans-serif', fontSize:32, lineHeight:1, letterSpacing:'0.02em' }}>{value}</div>
        <div style={{ fontSize:9, letterSpacing:'0.15em', fontWeight:700, marginTop:2 }}>{label.toUpperCase()}</div>
      </div>
    </div>
  );
}

// =====================================================================
// LINEUP SCREEN — interactive
// =====================================================================
function LineupScreen({ players, signedIds, lineup, setLineup, formation, setFormation, onPickSlot, pickingSlot }) {
  const slots = FORMATIONS[formation];
  const onPitchIds = new Set(Object.values(lineup));
  const pitchWrapRef = useRef(null);
  const pw = useElementWidth(pitchWrapRef);
  // ~8.5% of pitch width is the chip width sweet spot
  const chipSize = Math.max(44, Math.min(92, Math.round(pw * 0.085)));
  return (
    <div style={{ padding:'16px 28px 28px', display:'grid', gridTemplateColumns:'1.45fr 1fr', gap:24, height:'calc(100vh - 92px)' }}>
      {/* Pitch */}
      <div style={{ display:'flex', flexDirection:'column' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
          <div style={{ fontSize:10, letterSpacing:'0.25em', color:'rgba(31,24,19,0.65)', fontWeight:700 }}>★ OLD TRAFFORD · 105 × 68 M · ATTACK →</div>
          <div style={{ display:'flex', gap:6 }}>
            {Object.keys(FORMATIONS).map((f,i)=>(
              <button key={f} onClick={()=>setFormation(f)}
                style={{
                  padding:'5px 11px',
                  background: formation===f ? ink : cream2,
                  color: formation===f ? cream : ink,
                  border:`2px solid ${ink}`, borderRadius:5,
                  fontFamily:'"Bebas Neue", Impact, sans-serif', fontSize:14, letterSpacing:'0.06em',
                  boxShadow: formation===f ? `2px 2px 0 ${red}` : `2px 2px 0 ${ink}`,
                  cursor:'pointer',
                }}>{f}</button>
            ))}
          </div>
        </div>
        <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center' }}>
          <div ref={pitchWrapRef} style={{ width:'100%', position:'relative' }}>
            <Pitch>
              {slots.map(slot => {
                const playerId = lineup[slot.id];
                const player = playerId ? (players.find(p=>p.id===playerId) || UNITED_SQUAD.find(p=>p.id===playerId)) : null;
                const isNew = playerId ? signedIds.includes(playerId) : false;
                // horizontal pitch: rotate the vertical coord system
                const x = 100 - slot.y;
                const y = slot.x;
                const isPicking = pickingSlot === slot.id;
                return (
                  <div key={slot.id}
                    onClick={() => onPickSlot(slot.id)}
                    style={{
                      position:'absolute', left:`${x}%`, top:`${y}%`, transform:'translate(-50%,-50%)',
                      cursor:'pointer',
                      transition:'transform .15s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.06)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)'}>
                    {player ? (
                      <div style={{ position:'relative' }}>
                        <MiniChip p={player} isNew={isNew} size={chipSize} />
                        {isPicking && <div style={{ position:'absolute', inset:-6, border:`3px dashed ${gold}`, borderRadius:10, animation:'dashed-spin 8s linear infinite' }} />}
                      </div>
                    ) : (
                      <div style={{
                        width:chipSize, aspectRatio:'2/3', borderRadius:8,
                        border:`3px dashed ${isPicking ? gold : 'rgba(255,247,218,0.6)'}`,
                        background: isPicking ? 'rgba(212,160,23,0.18)' : 'rgba(0,0,0,0.15)',
                        display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
                        color:'#fff7da', fontFamily:'"Bebas Neue", Impact, sans-serif',
                      }}>
                        <div style={{ fontSize: chipSize*0.4, lineHeight:1, fontWeight:300 }}>+</div>
                        <div style={{ fontSize: Math.max(9, chipSize*0.16), letterSpacing:'0.12em' }}>{slot.role}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </Pitch>
          </div>
        </div>
        <div style={{ marginTop:8, display:'flex', justifyContent:'space-between', fontSize:10, color:'rgba(31,24,19,0.6)', letterSpacing:'0.15em', fontWeight:700 }}>
          <span>● {Object.values(lineup).filter(id => signedIds.includes(id)).length} NEW SIGNINGS</span>
          <span>★ {Object.values(lineup).filter(id => UNITED_SQUAD.some(p=>p.id===id)).length} KEPT</span>
          <span>{Object.keys(lineup).length}/11 PLACED</span>
        </div>
      </div>

      {/* Roster panel */}
      <RosterPanel
        players={players}
        signedIds={signedIds}
        onPitchIds={onPitchIds}
        pickingSlot={pickingSlot}
        onPlace={(playerId) => {
          if (!pickingSlot) return;
          // place player into picking slot. Remove if used elsewhere.
          const next = { ...lineup };
          for (const k of Object.keys(next)) {
            if (next[k] === playerId) delete next[k];
          }
          next[pickingSlot] = playerId;
          setLineup(next);
          onPickSlot(null);
        }}
        onClearSlot={() => {
          if (!pickingSlot) return;
          const next = { ...lineup };
          delete next[pickingSlot];
          setLineup(next);
          onPickSlot(null);
        }}
      />
    </div>
  );
}

function RosterPanel({ players, signedIds, onPitchIds, pickingSlot, onPlace, onClearSlot }) {
  const signings = signedIds.map(id => players.find(p=>p.id===id)).filter(Boolean);
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:12, minHeight:0 }}>
      {/* Picking banner */}
      {pickingSlot ? (
        <div style={{ background:gold, color:ink, border:`3px solid ${ink}`, borderRadius:10, padding:'10px 14px', boxShadow:`4px 4px 0 ${ink}`, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div>
            <div style={{ fontSize:10, letterSpacing:'0.2em', fontWeight:700 }}>PICKING SLOT</div>
            <div style={{ fontFamily:'"Bebas Neue", Impact, sans-serif', fontSize:24, lineHeight:1 }}>{pickingSlot}</div>
          </div>
          <button onClick={onClearSlot}
            style={{ background:ink, color:cream, border:'none', padding:'7px 12px', borderRadius:5, fontFamily:'"Bebas Neue", Impact, sans-serif', fontSize:14, letterSpacing:'0.08em', cursor:'pointer' }}>
            CLEAR SLOT
          </button>
        </div>
      ) : (
        <div style={{ background:cream2, border:`2px dashed ${ink}`, borderRadius:10, padding:'10px 14px', fontSize:12, color:'rgba(31,24,19,0.65)', fontWeight:600, textAlign:'center' }}>
          Smelltu á slot á vellinum og veldu svo leikmann hér →
        </div>
      )}

      {/* Signings */}
      <div style={{ background:cream2, border:`3px solid ${ink}`, borderRadius:10, padding:'10px 12px', boxShadow:`4px 4px 0 ${ink}`, transform:'rotate(-0.4deg)' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:6 }}>
          <div style={{ fontFamily:'"Bebas Neue", Impact, sans-serif', fontSize:20, letterSpacing:'0.05em' }}>YOUR SIGNINGS</div>
          <div style={{ fontSize:9, letterSpacing:'0.15em', fontWeight:700, color:'rgba(31,24,19,0.6)' }}>{signings.length}</div>
        </div>
        {signings.length === 0 ? (
          <div style={{ padding:'12px', fontSize:12, color:'rgba(31,24,19,0.6)', textAlign:'center', fontStyle:'italic' }}>Engin kaup ennþá — farðu á Markaður tab</div>
        ) : (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:6 }}>
            {signings.map(p => (
              <ChipPick key={p.id} p={p} isNew={true} disabled={onPitchIds.has(p.id) && pickingSlot==null} onClick={() => onPlace(p.id)} />
            ))}
          </div>
        )}
      </div>

      {/* United squad */}
      <div style={{ background:cream2, border:`3px solid ${ink}`, borderRadius:10, padding:'10px 12px', boxShadow:`4px 4px 0 ${ink}`, transform:'rotate(0.4deg)', flex:1, minHeight:0, display:'flex', flexDirection:'column' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:6 }}>
          <div style={{ fontFamily:'"Bebas Neue", Impact, sans-serif', fontSize:20, letterSpacing:'0.05em' }}>UNITED SQUAD</div>
          <div style={{ fontSize:9, letterSpacing:'0.15em', fontWeight:700, color:'rgba(31,24,19,0.6)' }}>{UNITED_SQUAD.length}</div>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:5, overflow:'auto' }}>
          {UNITED_SQUAD.map(p => (
            <ChipPick key={p.id} p={p} isNew={false} disabled={onPitchIds.has(p.id) && pickingSlot==null} onClick={() => onPlace(p.id)} size={58} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ChipPick({ p, isNew, disabled, onClick, size=68 }) {
  const used = disabled;
  return (
    <div style={{ position:'relative', cursor: 'pointer', opacity: used ? 0.5 : 1, transition:'transform .12s' }}
      onClick={onClick}
      onMouseEnter={e => { if(!used) e.currentTarget.style.transform = 'scale(1.06) translateY(-2px)'; }}
      onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
      <MiniChip p={p} isNew={isNew} size={size} />
      {used && (
        <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%) rotate(-12deg)', background:ink, color:cream, padding:'1px 6px', fontFamily:'"Bebas Neue", Impact, sans-serif', fontSize:10, letterSpacing:'0.1em', border:`1.5px solid ${cream}` }}>USED</div>
      )}
    </div>
  );
}

// =====================================================================
// EXPORT SCREEN — matchday programme poster, with download trigger
// =====================================================================
function ExportScreen({ players, signedIds, lineup, formation, managerName }) {
  const [status, setStatus] = useState('idle'); // idle | working | done | error
  const wrapRef = useRef(null);
  const posterRef = useRef(null);
  const ww = useElementWidth(wrapRef);
  const scale = ww > 0 ? Math.min(1, ww / 1080) : 1;

  async function savePng() {
    if (!posterRef.current || !window.htmlToImage) return;
    setStatus('working');
    try {
      const dataUrl = await window.htmlToImage.toPng(posterRef.current, {
        width: 1080, height: 1350, pixelRatio: 2, cacheBust: true,
        backgroundColor: '#0e1a14',
      });
      const a = document.createElement('a');
      a.href = dataUrl;
      const slug = (managerName || 'stjori').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'') || 'stjori';
      a.download = `draumakaup-${slug}-${new Date().toISOString().slice(0,10)}.png`;
      document.body.appendChild(a); a.click(); a.remove();
      setStatus('done');
      setTimeout(() => setStatus('idle'), 2400);
    } catch (e) {
      console.error(e);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 2400);
    }
  }

  const label = status === 'working' ? '… RENDERING' : status === 'done' ? '✓ DOWNLOADED' : status === 'error' ? '✗ TRY AGAIN' : '↓ SAVE PNG';
  const bg = status === 'done' ? '#22c55e' : status === 'error' ? red : ink;

  return (
    <div style={{ padding:'28px 28px 60px', display:'flex', flexDirection:'column', alignItems:'center', gap:24 }}>
      <div style={{ display:'flex', gap:18, alignItems:'center', maxWidth:1080, width:'100%', justifyContent:'space-between' }}>
        <div>
          <div style={{ fontSize:11, letterSpacing:'0.25em', color:'rgba(31,24,19,0.7)', fontWeight:700 }}>★ PREVIEW · 1080 × 1350 (INSTAGRAM-PORTRAIT) ★</div>
          <div style={{ fontFamily:'"Bebas Neue", Impact, sans-serif', fontSize:42, lineHeight:1, letterSpacing:'0.02em' }}>DEILDU DRAUMA-XI</div>
        </div>
        <button
          disabled={status === 'working'}
          onClick={savePng}
          style={{
            background: bg, color: status === 'done' ? ink : cream,
            border:`3px solid ${ink}`, padding:'14px 24px', borderRadius:10,
            fontFamily:'"Bebas Neue", Impact, sans-serif', fontSize:22, letterSpacing:'0.1em',
            cursor: status === 'working' ? 'wait' : 'pointer', boxShadow:`5px 5px 0 ${red}`,
            opacity: status === 'working' ? 0.7 : 1,
          }}>{label}</button>
      </div>
      <div ref={wrapRef} style={{ width:'100%', maxWidth:1080, height: 1350*scale + 8, overflow:'hidden', display:'flex', justifyContent:'center' }}>
        <div style={{ transform:`scale(${scale})`, transformOrigin:'top center' }}>
          <div ref={posterRef}>
            <PosterCard players={players} signedIds={signedIds} lineup={lineup} formation={formation} managerName={managerName} />
          </div>
        </div>
      </div>
    </div>
  );
}

function PosterCard({ players, signedIds, lineup, formation, managerName }) {
  const slots = FORMATIONS[formation];
  const tag = (managerName || 'ÞÚ').toUpperCase();
  return (
    <div style={{
      width:1080, height:1350, background:'#0e1a14', color:cream, position:'relative', overflow:'hidden',
      fontFamily:'"Oswald", Impact, sans-serif',
      padding:'40px 44px', boxSizing:'border-box',
      border:`4px solid ${ink}`, boxShadow:`16px 16px 0 ${red}`,
    }}>
      <div style={{ position:'absolute', inset:0, background:`radial-gradient(ellipse at top, rgba(212,160,23,0.22), transparent 60%), radial-gradient(ellipse at bottom, rgba(197,42,28,0.18), transparent 55%)`, pointerEvents:'none' }} />
      <div style={{ position:'absolute', inset:0, background:'repeating-linear-gradient(0deg, transparent 0 3px, rgba(255,255,255,0.02) 3px 4px)', pointerEvents:'none' }} />

      <div style={{ position:'relative' }}>
        <div style={{ textAlign:'center' }}>
          <div style={{ fontSize:12, letterSpacing:'0.4em', color:gold, fontWeight:800 }}>★ ★ ★ MATCHDAY PROGRAMME ★ ★ ★</div>
          <div style={{ fontFamily:'"Bebas Neue", Impact, sans-serif', fontSize:120, lineHeight:0.82, letterSpacing:'0.04em', marginTop:8, color:cream }}>
            DRAUMAKAUP
          </div>
          <div style={{ marginTop:4, fontSize:18, letterSpacing:'0.3em', color:cream, fontWeight:700 }}>
            SUMAR <span style={{ color:red }}>·</span> 2026 <span style={{ color:red }}>·</span> STJÓRI @{tag}
          </div>
        </div>

        {/* Vertical pitch with players */}
        <div style={{ marginTop:24, display:'flex', justifyContent:'center' }}>
          <div style={{ width:620, position:'relative' }}>
            <Pitch vertical={true}>
              {slots.map(slot => {
                const playerId = lineup[slot.id];
                if (!playerId) return null;
                const player = players.find(p=>p.id===playerId) || UNITED_SQUAD.find(p=>p.id===playerId);
                const isNew = signedIds.includes(playerId);
                return (
                  <div key={slot.id} style={{ position:'absolute', left:`${slot.x}%`, top:`${slot.y}%`, transform:'translate(-50%,-50%)' }}>
                    <MiniChip p={player} isNew={isNew} size={88} />
                  </div>
                );
              })}
            </Pitch>
          </div>
        </div>

        {/* Bottom KPI */}
        <div style={{ marginTop:24, display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:12 }}>
          {[
            { l:'FORMATION', v:formation, c:cream },
            { l:'SPENT',     v:`£${sum(signedIds, players)}M`, c:gold },
            { l:'NEW SIGNINGS', v:`${Object.values(lineup).filter(id => signedIds.includes(id)).length}/11`, c:red },
          ].map((s,i)=>(
            <div key={i} style={{
              background:'rgba(255,247,218,0.05)', border:`2px solid rgba(255,247,218,0.2)`,
              padding:'12px 14px', textAlign:'center', borderRadius:6,
              transform:`rotate(${[(-1),(0.5),(-0.8)][i]}deg)`,
            }}>
              <div style={{ fontSize:10, letterSpacing:'0.22em', color:'rgba(255,247,218,0.55)', fontWeight:700 }}>{s.l}</div>
              <div style={{ fontFamily:'"Bebas Neue", Impact, sans-serif', fontSize:36, lineHeight:1, color:s.c }}>{s.v}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop:18, fontSize:10, letterSpacing:'0.3em', textAlign:'center', color:'rgba(255,247,218,0.5)', fontWeight:700 }}>
          DRAUMAKAUP.IS · OLD TRAFFORD 105 × 68 M · DESIGNED FOR THE 33-ERS
        </div>
      </div>
    </div>
  );
}

// =====================================================================
// APP
// =====================================================================
function App() {
  const [customPlayers, setCustomPlayers] = useState(() => loadCustomPlayers());
  const players = useMemo(() => [...PLAYERS, ...customPlayers], [customPlayers]);
  const [signedIds, setSignedIds] = useState(() => loadSigned(window.DK.SELECTED_IDS));
  const [formation, setFormation] = useState('4-2-3-1');
  const [tab, setTab] = useState('market');
  const [statsId, setStatsId] = useState(null);
  const [pickingSlot, setPickingSlot] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [managerName, setManagerName] = useState(() => loadName());
  const [showName, setShowName] = useState(() => !loadName());
  const [lineup, setLineup] = useState(() =>
    autoLineup('4-2-3-1', loadSigned(window.DK.SELECTED_IDS), [...PLAYERS, ...loadCustomPlayers()])
  );

  // persist signings
  useEffect(() => { saveSigned(signedIds); }, [signedIds]);
  // persist custom players
  useEffect(() => { saveCustomPlayers(customPlayers); }, [customPlayers]);
  // persist manager name
  useEffect(() => { saveName(managerName); }, [managerName]);

  // re-auto when formation changes
  useEffect(() => {
    setLineup(autoLineup(formation, signedIds, players));
    setPickingSlot(null);
  }, [formation]);

  function toggleSign(id) {
    setSignedIds(prev => {
      if (prev.includes(id)) {
        setLineup(L => {
          const m = { ...L };
          for (const k of Object.keys(m)) if (m[k]===id) delete m[k];
          return m;
        });
        return prev.filter(x => x !== id);
      }
      return [...prev, id];
    });
  }

  function addCustom(form) {
    const p = makeCustomPlayer(form);
    setCustomPlayers(prev => [...prev, p]);
    setShowAdd(false);
  }

  function deleteCustom(id) {
    setCustomPlayers(prev => prev.filter(p => p.id !== id));
    setSignedIds(prev => prev.filter(x => x !== id));
    setLineup(L => {
      const m = { ...L };
      for (const k of Object.keys(m)) if (m[k]===id) delete m[k];
      return m;
    });
  }

  const statsPlayer = statsId ? players.find(p=>p.id===statsId) : null;

  return (
    <div style={{
      minHeight:'100vh', background:cream, color:ink,
      fontFamily:'"Oswald", Impact, sans-serif', position:'relative',
      backgroundImage:`radial-gradient(circle at 0% 0%, rgba(0,0,0,0.04) 0%, transparent 40%), radial-gradient(circle at 100% 100%, rgba(0,0,0,0.05) 0%, transparent 40%)`,
    }}>
      <div style={{ position:'fixed', inset:0, background:'repeating-linear-gradient(45deg, transparent 0 3px, rgba(0,0,0,0.015) 3px 4px)', pointerEvents:'none', zIndex:1 }} />
      <style>{`
        @keyframes dashed-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div style={{ position:'relative', zIndex:2 }}>
        <TopBar
          signedIds={signedIds}
          players={players}
          tab={tab}
          setTab={setTab}
          managerName={managerName}
          onEditName={() => setShowName(true)}
        />

        {tab === 'market' && (
          <MarketScreen
            players={players}
            signedIds={signedIds}
            onToggle={toggleSign}
            onOpenStats={setStatsId}
            onAddClick={() => setShowAdd(true)}
            onDeleteCustom={deleteCustom}
          />
        )}

        {tab === 'lineup' && (
          <LineupScreen
            players={players}
            signedIds={signedIds}
            lineup={lineup}
            setLineup={setLineup}
            formation={formation}
            setFormation={setFormation}
            onPickSlot={setPickingSlot}
            pickingSlot={pickingSlot}
          />
        )}

        {tab === 'export' && (
          <ExportScreen players={players} signedIds={signedIds} lineup={lineup} formation={formation} managerName={managerName} />
        )}

        <StatsModal
          player={statsPlayer}
          onClose={() => setStatsId(null)}
          onToggle={toggleSign}
          signed={statsId ? signedIds.includes(statsId) : false}
        />

        {showName && (
          <NameModal
            initial={managerName}
            canDismiss={!!managerName}
            onClose={() => setShowName(false)}
            onSave={(n) => { setManagerName(n); setShowName(false); }}
          />
        )}

        {showAdd && <AddPlayerModal onClose={() => setShowAdd(false)} onAdd={addCustom} />}
      </div>
    </div>
  );
}

window.__App = App;
})();
