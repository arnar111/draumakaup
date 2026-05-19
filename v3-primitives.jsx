// Shared trading-card primitives for the V3 prototype.
// Exposes: FutCard, MiniChip, Pitch to window.
// Aesthetic constants exported on window.V3T.

(function () {
const cream = '#ebe2cc';
const cream2 = '#dcd0b3';
const ink = '#1f1813';
const red = '#c52a1c';
const gold = '#d4a017';
const navy = '#1b2a4e';

const RARITY = {
  linked:  { name:'TARGET',    grad:'linear-gradient(135deg, #c52a1c 0%, #f96e2a 45%, #ffd97a 100%)', text:'#1f1813', border:'#d4a017' },
  leaving: { name:'AVAILABLE', grad:'linear-gradient(135deg, #d4a017 0%, #ffe24a 100%)',              text:'#1f1813', border:'#a87d10' },
  gem:     { name:'HIDDEN',    grad:'linear-gradient(135deg, #2c1e54 0%, #5e3aa8 60%, #a78bfa 100%)', text:'#fbf6e7', border:'#a78bfa' },
  young:   { name:'WONDERKID', grad:'linear-gradient(135deg, #0a4f2a 0%, #1e9d57 60%, #8af0a5 100%)', text:'#0a2a18', border:'#22c55e' },
  united:  { name:'SQUAD',     grad:'linear-gradient(135deg, #4a0a05 0%, #c52a1c 50%, #ff5040 100%)',  text:'#fff7da', border:'#fff7da' },
};

// FutCard — full size sticker
function FutCard({ p, w=200, big=false, isUnited=false }) {
  const r = isUnited ? RARITY.united : RARITY[p.tag];
  const fontSize = big ? 1.4 : 1;
  const rating = p.rating || Math.round(80 + (p.price ? Math.min(12, p.price/14) : 4));
  return (
    <div style={{
      width: w, aspectRatio: '2/3',
      background: r.grad,
      borderRadius: 14,
      padding: 12*fontSize,
      position:'relative',
      boxShadow:`0 ${big?16:6}px ${big?32:16}px -8px rgba(0,0,0,0.35)`,
      color: r.text,
      fontFamily:'"Bebas Neue", "Oswald", Impact, sans-serif',
      overflow:'hidden',
      border:`2px solid ${r.border}`,
    }}>
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%)', pointerEvents:'none' }} />
      <div style={{ position:'absolute', inset:0, background:'repeating-linear-gradient(180deg, transparent 0 3px, rgba(255,255,255,0.04) 3px 4px)', pointerEvents:'none' }} />

      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', position:'relative' }}>
        <div>
          <div style={{ fontSize: 48*fontSize, fontWeight:900, lineHeight:0.85 }}>{rating}</div>
          <div style={{ fontSize: 18*fontSize, fontWeight:700, marginTop:-2 }}>{p.pos}</div>
        </div>
        <div style={{ fontSize:11*fontSize, fontWeight:700, letterSpacing:'0.1em', writingMode:'vertical-rl', transform:'rotate(180deg)', opacity:0.7 }}>{r.name}</div>
      </div>

      <div style={{
        marginTop:8*fontSize, aspectRatio:'1/1',
        background:`radial-gradient(circle, rgba(255,255,255,0.18) 0%, transparent 60%)`,
        display:'grid', placeItems:'center', position:'relative',
      }}>
        <div style={{ fontSize: 96*fontSize, fontWeight:900, opacity:0.85, letterSpacing:'-0.04em', textShadow:'0 4px 16px rgba(0,0,0,0.3)' }}>{p.initials}</div>
        <div style={{ position:'absolute', bottom:0, right:0, fontSize:9*fontSize, fontWeight:700, letterSpacing:'0.15em', background:'rgba(0,0,0,0.4)', padding:'2px 6px', borderRadius:4, color:'#fff' }}>{p.nat}</div>
      </div>

      <div style={{
        marginTop:8*fontSize, textAlign:'center', fontSize:18*fontSize, fontWeight:700,
        letterSpacing:'0.02em', borderTop:'1.5px solid rgba(0,0,0,0.25)', paddingTop:6*fontSize,
        textTransform:'uppercase',
      }}>{p.short.toUpperCase()}</div>

      <div style={{ marginTop:6*fontSize, display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:4, fontSize:10*fontSize }}>
        {Object.entries(p.radar).slice(0,6).map(([k,v]) => (
          <div key={k} style={{ display:'flex', justifyContent:'space-between', fontFamily:'"Oswald", Impact, sans-serif' }}>
            <span style={{ fontWeight:900 }}>{v}</span>
            <span style={{ opacity:0.7, letterSpacing:'0.04em' }}>{k.slice(0,3).toUpperCase()}</span>
          </div>
        ))}
      </div>

      {p.price > 0 && (
        <div style={{ position:'absolute', bottom: -8, left:'50%', transform:'translateX(-50%)', background:ink, color:'#fff7da', padding:'4px 12px', borderRadius:6, fontSize:14*fontSize, fontWeight:900, letterSpacing:'0.05em' }}>
          £{p.price}m
        </div>
      )}
    </div>
  );
}

// MiniChip — small chip for the pitch
function MiniChip({ p, isNew=false, size=72 }) {
  const r = isNew ? RARITY[p.tag] : RARITY.united;
  const fs = size/72;
  const rating = p.rating || Math.round(80 + (p.price ? Math.min(12, p.price/14) : 4));
  return (
    <div style={{
      width: size, aspectRatio:'2/3',
      background: r.grad, borderRadius: 8, padding: 5*fs,
      position:'relative', boxShadow:`0 6px 14px rgba(0,0,0,0.45)`,
      color: r.text, fontFamily:'"Bebas Neue", Impact, sans-serif',
      overflow:'hidden', border:`2px solid ${r.border}`,
    }}>
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%)', pointerEvents:'none' }} />
      <div style={{ position:'absolute', inset:0, background:'repeating-linear-gradient(180deg, transparent 0 3px, rgba(255,255,255,0.04) 3px 4px)', pointerEvents:'none' }} />
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', position:'relative' }}>
        <div style={{ fontSize:18*fs, fontWeight:900, lineHeight:0.85 }}>{rating}</div>
        <div style={{ fontSize:9*fs, fontWeight:700, opacity:0.85 }}>{p.pos}</div>
      </div>
      <div style={{ textAlign:'center', marginTop:2*fs, position:'relative' }}>
        <div style={{ fontSize:30*fs, fontWeight:900, lineHeight:1, letterSpacing:'-0.04em', textShadow:'0 2px 8px rgba(0,0,0,0.4)' }}>{p.initials}</div>
      </div>
      <div style={{
        position:'absolute', bottom:5*fs, left:5*fs, right:5*fs,
        textAlign:'center', fontSize: 10*fs, fontWeight:700, letterSpacing:'0.04em',
        borderTop:'1px solid rgba(0,0,0,0.25)', paddingTop:3*fs,
      }}>{p.short.toUpperCase()}</div>
      {isNew && (
        <div style={{
          position:'absolute', top:-6, right:-6,
          background:gold, color:ink, fontSize:9*fs, fontWeight:900,
          padding:'2px 5px', borderRadius:3, border:`1.5px solid ${ink}`,
          letterSpacing:'0.08em', transform:'rotate(8deg)', boxShadow:`1.5px 1.5px 0 ${ink}`,
        }}>NEW</div>
      )}
    </div>
  );
}

// Pitch — 105:68 Old Trafford ratio. Horizontal or vertical.
function Pitch({ vertical=false, w='100%', h='auto', children, style={} }) {
  const ar = vertical ? '68 / 105' : '105 / 68';
  return (
    <div style={{
      width: w, height: h, aspectRatio: ar,
      background:`repeating-linear-gradient(${vertical?'0deg':'90deg'}, #2d6b3f 0 10%, #266339 10% 20%)`,
      position:'relative', overflow:'hidden',
      border:`6px solid ${ink}`, borderRadius:6,
      boxShadow:`0 12px 32px rgba(0,0,0,0.4), inset 0 0 80px rgba(0,0,0,0.25)`,
      ...style,
    }}>
      <PitchLines vertical={vertical} />
      {children}
    </div>
  );
}

function PitchLines({ vertical }) {
  if (vertical) {
    return (
      <svg viewBox="0 0 68 105" preserveAspectRatio="none" style={{ position:'absolute', inset:0, width:'100%', height:'100%' }}>
        <rect x="1" y="1" width="66" height="103" fill="none" stroke="#f0e8d0" strokeWidth="0.3" />
        <line x1="1" y1="52.5" x2="67" y2="52.5" stroke="#f0e8d0" strokeWidth="0.3" />
        <circle cx="34" cy="52.5" r="9.15" fill="none" stroke="#f0e8d0" strokeWidth="0.3" />
        <circle cx="34" cy="52.5" r="0.5" fill="#f0e8d0" />
        <rect x="13.84" y="1" width="40.32" height="16.5" fill="none" stroke="#f0e8d0" strokeWidth="0.3" />
        <rect x="13.84" y="87.5" width="40.32" height="16.5" fill="none" stroke="#f0e8d0" strokeWidth="0.3" />
        <rect x="24.84" y="1" width="18.32" height="5.5" fill="none" stroke="#f0e8d0" strokeWidth="0.3" />
        <rect x="24.84" y="98.5" width="18.32" height="5.5" fill="none" stroke="#f0e8d0" strokeWidth="0.3" />
        <circle cx="34" cy="12" r="0.4" fill="#f0e8d0" />
        <circle cx="34" cy="93" r="0.4" fill="#f0e8d0" />
        <path d="M 24.84 17.5 A 9.15 9.15 0 0 0 43.16 17.5" fill="none" stroke="#f0e8d0" strokeWidth="0.3" />
        <path d="M 24.84 87.5 A 9.15 9.15 0 0 1 43.16 87.5" fill="none" stroke="#f0e8d0" strokeWidth="0.3" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 105 68" preserveAspectRatio="none" style={{ position:'absolute', inset:0, width:'100%', height:'100%' }}>
      <rect x="1" y="1" width="103" height="66" fill="none" stroke="#f0e8d0" strokeWidth="0.3" />
      <line x1="52.5" y1="1" x2="52.5" y2="67" stroke="#f0e8d0" strokeWidth="0.3" />
      <circle cx="52.5" cy="34" r="9.15" fill="none" stroke="#f0e8d0" strokeWidth="0.3" />
      <circle cx="52.5" cy="34" r="0.5" fill="#f0e8d0" />
      <rect x="1" y="13.84" width="16.5" height="40.32" fill="none" stroke="#f0e8d0" strokeWidth="0.3" />
      <rect x="87.5" y="13.84" width="16.5" height="40.32" fill="none" stroke="#f0e8d0" strokeWidth="0.3" />
      <rect x="1" y="24.84" width="5.5" height="18.32" fill="none" stroke="#f0e8d0" strokeWidth="0.3" />
      <rect x="98.5" y="24.84" width="5.5" height="18.32" fill="none" stroke="#f0e8d0" strokeWidth="0.3" />
      <circle cx="12" cy="34" r="0.4" fill="#f0e8d0" />
      <circle cx="93" cy="34" r="0.4" fill="#f0e8d0" />
      <path d="M 17.5 24.84 A 9.15 9.15 0 0 1 17.5 43.16" fill="none" stroke="#f0e8d0" strokeWidth="0.3" />
      <path d="M 87.5 24.84 A 9.15 9.15 0 0 0 87.5 43.16" fill="none" stroke="#f0e8d0" strokeWidth="0.3" />
    </svg>
  );
}

window.V3T = { cream, cream2, ink, red, gold, navy, RARITY };
Object.assign(window, { FutCard, MiniChip, Pitch });
})();
