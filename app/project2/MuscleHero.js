"use client";

const COLORS = {
  chest: "#f78166",
  legs:  "#3fb950",
  arms:  "#d2a8ff",
  back:  "#58a6ff",
};

export default function MuscleHero({ activeMuscle, onMuscleClick }) {
  const active = (m) => activeMuscle === m;
  const fill   = (m, alpha = "33") => active(m) ? COLORS[m] : `${COLORS[m]}${alpha}`;
  const stroke = (m) => active(m) ? COLORS[m] : "#30363d";
  const glow   = (m) => active(m) ? `drop-shadow(0 0 8px ${COLORS[m]}88)` : "none";

  return (
    <div style={{
      background: "linear-gradient(160deg,#0d1117 0%,#161b22 100%)",
      border: "1px solid #30363d",
      borderRadius: "12px",
      padding: "20px",
      marginBottom: "20px",
      fontFamily: "'Syne', sans-serif",
    }}>
      {/* Header */}
      <p style={{ color: "#58a6ff", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 4px", fontWeight: 700 }}>
        Muscle Map
      </p>
      <h2 style={{ color: "#e6edf3", fontSize: "16px", fontWeight: 700, margin: "0 0 16px" }}>
        Select a Muscle Group
      </h2>

      {/* Legend pills */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px" }}>
        {Object.entries(COLORS).map(([muscle, color]) => (
          <button
            key={muscle}
            onClick={() => onMuscleClick(muscle)}
            style={{
              display: "flex", alignItems: "center", gap: "6px",
              background: active(muscle) ? `${color}22` : "transparent",
              border: `1px solid ${active(muscle) ? color : "#30363d"}`,
              borderRadius: "20px", padding: "4px 12px", cursor: "pointer",
              color: active(muscle) ? color : "#8b949e",
              fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em",
              textTransform: "uppercase", transition: "all 0.15s",
            }}
          >
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: color, flexShrink: 0 }} />
            {muscle}
          </button>
        ))}
      </div>

      {/* SVG Body Diagram */}
      <svg viewBox="0 0 420 360" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", display: "block" }}>
        <defs>
          <filter id="glow-chest"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          <filter id="glow-legs"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          <filter id="glow-arms"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          <filter id="glow-back"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>

        {/* ── FRONT VIEW ── */}
        <g transform="translate(30,10)">
          <text x="90" y="12" textAnchor="middle" fill="#484f58" fontSize="9" letterSpacing="3" fontFamily="Syne,sans-serif">FRONT</text>

          {/* Head */}
          <ellipse cx="90" cy="34" rx="20" ry="24" fill="#161b22" stroke="#30363d" strokeWidth="1.5"/>
          {/* Neck */}
          <rect x="82" y="54" width="16" height="12" rx="4" fill="#161b22" stroke="#30363d" strokeWidth="1"/>

          {/* CHEST */}
          <g onClick={() => onMuscleClick("chest")} style={{ cursor: "pointer" }} filter={active("chest") ? "url(#glow-chest)" : undefined}>
            <path d="M62,70 Q68,65 90,66 Q112,65 118,70 L115,98 Q103,105 90,106 Q77,105 65,98 Z"
              fill={fill("chest","22")} stroke={stroke("chest")} strokeWidth="1.5"/>
            {/* pec split */}
            <ellipse cx="76" cy="84" rx="13" ry="11" fill={fill("chest","18")} stroke={stroke("chest")} strokeWidth="1" opacity="0.8"/>
            <ellipse cx="104" cy="84" rx="13" ry="11" fill={fill("chest","18")} stroke={stroke("chest")} strokeWidth="1" opacity="0.8"/>
            <line x1="90" y1="66" x2="90" y2="106" stroke={stroke("chest")} strokeWidth="0.8" strokeDasharray="2 2" opacity="0.5"/>
          </g>

          {/* ABS (neutral, non-clickable decoration) */}
          <rect x="72" y="106" width="36" height="50" rx="6" fill="#161b22" stroke="#21262d" strokeWidth="1"/>
          {[112,124,136].map(y => (
            <g key={y}>
              <rect x="77" y={y} width="11" height="9" rx="2" fill="#21262d" stroke="#30363d" strokeWidth="0.8"/>
              <rect x="92" y={y} width="11" height="9" rx="2" fill="#21262d" stroke="#30363d" strokeWidth="0.8"/>
            </g>
          ))}

          {/* ARMS */}
          <g onClick={() => onMuscleClick("arms")} style={{ cursor: "pointer" }} filter={active("arms") ? "url(#glow-arms)" : undefined}>
            {/* left shoulder */}
            <ellipse cx="54" cy="74" rx="13" ry="11" fill={fill("arms","22")} stroke={stroke("arms")} strokeWidth="1.5"/>
            {/* right shoulder */}
            <ellipse cx="126" cy="74" rx="13" ry="11" fill={fill("arms","22")} stroke={stroke("arms")} strokeWidth="1.5"/>
            {/* left upper arm */}
            <rect x="38" y="83" width="15" height="38" rx="7" fill={fill("arms","22")} stroke={stroke("arms")} strokeWidth="1.5"/>
            {/* right upper arm */}
            <rect x="127" y="83" width="15" height="38" rx="7" fill={fill("arms","22")} stroke={stroke("arms")} strokeWidth="1.5"/>
            {/* left forearm */}
            <rect x="36" y="124" width="13" height="34" rx="6" fill={fill("arms","14")} stroke={stroke("arms")} strokeWidth="1.2"/>
            {/* right forearm */}
            <rect x="131" y="124" width="13" height="34" rx="6" fill={fill("arms","14")} stroke={stroke("arms")} strokeWidth="1.2"/>
          </g>

          {/* LEGS */}
          <g onClick={() => onMuscleClick("legs")} style={{ cursor: "pointer" }} filter={active("legs") ? "url(#glow-legs)" : undefined}>
            {/* hips */}
            <rect x="64" y="154" width="52" height="18" rx="6" fill={fill("legs","22")} stroke={stroke("legs")} strokeWidth="1.5"/>
            {/* left quad */}
            <rect x="65" y="170" width="22" height="54" rx="9" fill={fill("legs","22")} stroke={stroke("legs")} strokeWidth="1.5"/>
            {/* right quad */}
            <rect x="93" y="170" width="22" height="54" rx="9" fill={fill("legs","22")} stroke={stroke("legs")} strokeWidth="1.5"/>
            {/* left knee */}
            <ellipse cx="76" cy="228" rx="12" ry="8" fill={fill("legs","14")} stroke={stroke("legs")} strokeWidth="1.2"/>
            {/* right knee */}
            <ellipse cx="104" cy="228" rx="12" ry="8" fill={fill("legs","14")} stroke={stroke("legs")} strokeWidth="1.2"/>
            {/* left shin */}
            <rect x="67" y="234" width="18" height="48" rx="8" fill={fill("legs","14")} stroke={stroke("legs")} strokeWidth="1.2"/>
            {/* right shin */}
            <rect x="95" y="234" width="18" height="48" rx="8" fill={fill("legs","14")} stroke={stroke("legs")} strokeWidth="1.2"/>
          </g>
        </g>

        {/* ── divider ── */}
        <line x1="210" y1="8" x2="210" y2="354" stroke="#21262d" strokeWidth="1" strokeDasharray="4 3"/>

        {/* ── BACK VIEW ── */}
        <g transform="translate(220,10)">
          <text x="90" y="12" textAnchor="middle" fill="#484f58" fontSize="9" letterSpacing="3" fontFamily="Syne,sans-serif">BACK</text>

          {/* Head */}
          <ellipse cx="90" cy="34" rx="20" ry="24" fill="#161b22" stroke="#30363d" strokeWidth="1.5"/>
          <rect x="82" y="54" width="16" height="12" rx="4" fill="#161b22" stroke="#30363d" strokeWidth="1"/>

          {/* BACK */}
          <g onClick={() => onMuscleClick("back")} style={{ cursor: "pointer" }} filter={active("back") ? "url(#glow-back)" : undefined}>
            {/* trapezius */}
            <path d="M65,64 Q90,56 115,64 Q122,76 118,86 L90,82 L62,86 Q58,76 65,64Z"
              fill={fill("back","22")} stroke={stroke("back")} strokeWidth="1.5"/>
            {/* left lat */}
            <path d="M62,84 Q50,100 54,136 L72,136 Q68,108 72,84Z"
              fill={fill("back","22")} stroke={stroke("back")} strokeWidth="1.5"/>
            {/* right lat */}
            <path d="M118,84 Q130,100 126,136 L108,136 Q112,108 108,84Z"
              fill={fill("back","22")} stroke={stroke("back")} strokeWidth="1.5"/>
            {/* center / erectors */}
            <rect x="80" y="82" width="20" height="58" rx="5" fill={fill("back","14")} stroke={stroke("back")} strokeWidth="1"/>
            {/* spine dots */}
            {[90,102,114,126].map(y => (
              <circle key={y} cx="90" cy={y} r="2" fill={stroke("back")} opacity="0.6"/>
            ))}
          </g>

          {/* ARMS (back) */}
          <g onClick={() => onMuscleClick("arms")} style={{ cursor: "pointer" }} filter={active("arms") ? "url(#glow-arms)" : undefined}>
            <ellipse cx="54" cy="74" rx="13" ry="11" fill={fill("arms","22")} stroke={stroke("arms")} strokeWidth="1.5"/>
            <ellipse cx="126" cy="74" rx="13" ry="11" fill={fill("arms","22")} stroke={stroke("arms")} strokeWidth="1.5"/>
            <rect x="38" y="83" width="15" height="38" rx="7" fill={fill("arms","22")} stroke={stroke("arms")} strokeWidth="1.5"/>
            <rect x="127" y="83" width="15" height="38" rx="7" fill={fill("arms","22")} stroke={stroke("arms")} strokeWidth="1.5"/>
            <rect x="36" y="124" width="13" height="34" rx="6" fill={fill("arms","14")} stroke={stroke("arms")} strokeWidth="1.2"/>
            <rect x="131" y="124" width="13" height="34" rx="6" fill={fill("arms","14")} stroke={stroke("arms")} strokeWidth="1.2"/>
          </g>

          {/* lower torso */}
          <rect x="68" y="138" width="44" height="20" rx="5" fill="#161b22" stroke="#21262d" strokeWidth="1"/>

          {/* LEGS (back — glutes + hamstrings) */}
          <g onClick={() => onMuscleClick("legs")} style={{ cursor: "pointer" }} filter={active("legs") ? "url(#glow-legs)" : undefined}>
            <ellipse cx="76" cy="168" rx="16" ry="18" fill={fill("legs","22")} stroke={stroke("legs")} strokeWidth="1.5"/>
            <ellipse cx="104" cy="168" rx="16" ry="18" fill={fill("legs","22")} stroke={stroke("legs")} strokeWidth="1.5"/>
            {/* hamstrings */}
            <rect x="63" y="183" width="24" height="52" rx="9" fill={fill("legs","22")} stroke={stroke("legs")} strokeWidth="1.5"/>
            <rect x="93" y="183" width="24" height="52" rx="9" fill={fill("legs","22")} stroke={stroke("legs")} strokeWidth="1.5"/>
            {/* calves */}
            <rect x="65" y="238" width="19" height="46" rx="8" fill={fill("legs","14")} stroke={stroke("legs")} strokeWidth="1.2"/>
            <rect x="96" y="238" width="19" height="46" rx="8" fill={fill("legs","14")} stroke={stroke("legs")} strokeWidth="1.2"/>
          </g>
        </g>

        {/* Active label */}
        {activeMuscle && (
          <text x="210" y="352" textAnchor="middle"
            fill={COLORS[activeMuscle]} fontSize="10" fontWeight="800"
            letterSpacing="4" fontFamily="Syne,sans-serif">
            {activeMuscle.toUpperCase()} SELECTED
          </text>
        )}
      </svg>
    </div>
  );
}
