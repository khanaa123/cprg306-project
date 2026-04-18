"use client";

const MUSCLE_COLORS = {
  chest: "#6366f1",
  legs: "#10b981",
  arms: "#f59e0b",
  back: "#ef4444",
};

const MUSCLE_LABELS = {
  chest: { x: 112, y: 108, label: "CHEST" },
  legs: { x: 112, y: 230, label: "LEGS" },
  arms: { x: 62, y: 140, label: "ARMS" },
  back: { x: 310, y: 130, label: "BACK" },
};

export default function MuscleHero({ activeMuscle, onMuscleClick }) {
  function getColor(muscle, base = "rgba(99,102,241,0.15)") {
    if (activeMuscle === muscle) return MUSCLE_COLORS[muscle];
    return base;
  }

  function getStroke(muscle) {
    return activeMuscle === muscle ? MUSCLE_COLORS[muscle] : "rgba(148,163,184,0.3)";
  }

  return (
    <div
      style={{
        background: "linear-gradient(160deg, #0f172a 0%, #1e293b 100%)",
        border: "1px solid rgba(99,102,241,0.2)",
        borderRadius: "16px",
        padding: "24px",
        marginBottom: "24px",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div style={{ marginBottom: "16px" }}>
        <div
          style={{
            fontSize: "10px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#6366f1",
            marginBottom: "4px",
            fontWeight: 600,
          }}
        >
          Muscle Map
        </div>
        <h2 style={{ color: "#f1f5f9", fontSize: "18px", fontWeight: 700, margin: 0 }}>
          Select a Muscle Group
        </h2>
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "16px" }}>
        {Object.entries(MUSCLE_COLORS).map(([muscle, color]) => (
          <button
            key={muscle}
            onClick={() => onMuscleClick(muscle)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: activeMuscle === muscle ? `${color}22` : "rgba(255,255,255,0.04)",
              border: `1px solid ${activeMuscle === muscle ? color : "rgba(148,163,184,0.2)"}`,
              borderRadius: "20px",
              padding: "4px 12px",
              cursor: "pointer",
              color: activeMuscle === muscle ? color : "#94a3b8",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              transition: "all 0.2s",
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: color,
                flexShrink: 0,
              }}
            />
            {muscle}
          </button>
        ))}
      </div>

      {/* SVG Anatomical Figure */}
      <svg
        viewBox="0 0 440 380"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", display: "block" }}
      >
        <defs>
          <radialGradient id="bodyGlow" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── FRONT FIGURE (left side) ── */}
        <g transform="translate(60, 20)">
          <text x="55" y="12" textAnchor="middle" fill="#475569" fontSize="9" letterSpacing="2" fontFamily="DM Sans, sans-serif">FRONT</text>

          {/* Head */}
          <ellipse cx="55" cy="32" rx="18" ry="22" fill="#1e293b" stroke="rgba(148,163,184,0.25)" strokeWidth="1.5" />
          {/* Neck */}
          <rect x="47" y="50" width="16" height="12" rx="4" fill="#1e293b" stroke="rgba(148,163,184,0.2)" strokeWidth="1" />

          {/* CHEST — pectorals */}
          <g
            onClick={() => onMuscleClick("chest")}
            style={{ cursor: "pointer" }}
            filter={activeMuscle === "chest" ? "url(#glow)" : undefined}
          >
            {/* Left pec */}
            <ellipse cx="42" cy="85" rx="16" ry="13" fill={getColor("chest")} stroke={getStroke("chest")} strokeWidth="1.5" />
            {/* Right pec */}
            <ellipse cx="68" cy="85" rx="16" ry="13" fill={getColor("chest")} stroke={getStroke("chest")} strokeWidth="1.5" />
            {/* Sternum line */}
            <line x1="55" y1="72" x2="55" y2="98" stroke={getStroke("chest")} strokeWidth="1" opacity="0.5" />
          </g>

          {/* Shoulders/Deltoids — part of arms */}
          <g
            onClick={() => onMuscleClick("arms")}
            style={{ cursor: "pointer" }}
            filter={activeMuscle === "arms" ? "url(#glow)" : undefined}
          >
            {/* Left shoulder */}
            <ellipse cx="23" cy="73" rx="12" ry="10" fill={getColor("arms")} stroke={getStroke("arms")} strokeWidth="1.5" />
            {/* Right shoulder */}
            <ellipse cx="87" cy="73" rx="12" ry="10" fill={getColor("arms")} stroke={getStroke("arms")} strokeWidth="1.5" />
            {/* Left upper arm */}
            <rect x="8" y="82" width="14" height="36" rx="7" fill={getColor("arms")} stroke={getStroke("arms")} strokeWidth="1.5" />
            {/* Right upper arm */}
            <rect x="88" y="82" width="14" height="36" rx="7" fill={getColor("arms")} stroke={getStroke("arms")} strokeWidth="1.5" />
            {/* Left forearm */}
            <rect x="6" y="122" width="12" height="32" rx="6" fill={getColor("arms", "rgba(245,158,11,0.08)")} stroke={getStroke("arms")} strokeWidth="1.5" />
            {/* Right forearm */}
            <rect x="92" y="122" width="12" height="32" rx="6" fill={getColor("arms", "rgba(245,158,11,0.08)")} stroke={getStroke("arms")} strokeWidth="1.5" />
          </g>

          {/* Torso/Abs */}
          <rect x="35" y="97" width="40" height="55" rx="8" fill="#1e293b" stroke="rgba(148,163,184,0.15)" strokeWidth="1" />
          {/* Abs grid */}
          {[107, 121, 135].map((y) => (
            <g key={y}>
              <rect x="40" y={y} width="13" height="11" rx="3" fill="rgba(148,163,184,0.06)" stroke="rgba(148,163,184,0.15)" strokeWidth="0.8" />
              <rect x="57" y={y} width="13" height="11" rx="3" fill="rgba(148,163,184,0.06)" stroke="rgba(148,163,184,0.15)" strokeWidth="0.8" />
            </g>
          ))}

          {/* LEGS */}
          <g
            onClick={() => onMuscleClick("legs")}
            style={{ cursor: "pointer" }}
            filter={activeMuscle === "legs" ? "url(#glow)" : undefined}
          >
            {/* Hip */}
            <rect x="32" y="150" width="46" height="20" rx="6" fill={getColor("legs")} stroke={getStroke("legs")} strokeWidth="1.5" />
            {/* Left quad */}
            <rect x="33" y="168" width="20" height="52" rx="8" fill={getColor("legs")} stroke={getStroke("legs")} strokeWidth="1.5" />
            {/* Right quad */}
            <rect x="57" y="168" width="20" height="52" rx="8" fill={getColor("legs")} stroke={getStroke("legs")} strokeWidth="1.5" />
            {/* Left knee */}
            <ellipse cx="43" cy="223" rx="11" ry="8" fill={getColor("legs", "rgba(16,185,129,0.08)")} stroke={getStroke("legs")} strokeWidth="1.2" />
            {/* Right knee */}
            <ellipse cx="67" cy="223" rx="11" ry="8" fill={getColor("legs", "rgba(16,185,129,0.08)")} stroke={getStroke("legs")} strokeWidth="1.2" />
            {/* Left shin */}
            <rect x="35" y="229" width="16" height="46" rx="7" fill={getColor("legs", "rgba(16,185,129,0.06)")} stroke={getStroke("legs")} strokeWidth="1.2" />
            {/* Right shin */}
            <rect x="59" y="229" width="16" height="46" rx="7" fill={getColor("legs", "rgba(16,185,129,0.06)")} stroke={getStroke("legs")} strokeWidth="1.2" />
          </g>
        </g>

        {/* ── BACK FIGURE (right side) ── */}
        <g transform="translate(240, 20)">
          <text x="55" y="12" textAnchor="middle" fill="#475569" fontSize="9" letterSpacing="2" fontFamily="DM Sans, sans-serif">BACK</text>

          {/* Head */}
          <ellipse cx="55" cy="32" rx="18" ry="22" fill="#1e293b" stroke="rgba(148,163,184,0.25)" strokeWidth="1.5" />
          <rect x="47" y="50" width="16" height="12" rx="4" fill="#1e293b" stroke="rgba(148,163,184,0.2)" strokeWidth="1" />

          {/* BACK — trapezius + lats */}
          <g
            onClick={() => onMuscleClick("back")}
            style={{ cursor: "pointer" }}
            filter={activeMuscle === "back" ? "url(#glow)" : undefined}
          >
            {/* Trapezius */}
            <path
              d="M38,62 Q55,55 72,62 Q80,72 75,82 L55,78 L35,82 Q30,72 38,62Z"
              fill={getColor("back")}
              stroke={getStroke("back")}
              strokeWidth="1.5"
            />
            {/* Left lat */}
            <path
              d="M32,82 Q22,95 26,130 L43,130 Q40,105 43,82Z"
              fill={getColor("back")}
              stroke={getStroke("back")}
              strokeWidth="1.5"
            />
            {/* Right lat */}
            <path
              d="M78,82 Q88,95 84,130 L67,130 Q70,105 67,82Z"
              fill={getColor("back")}
              stroke={getStroke("back")}
              strokeWidth="1.5"
            />
            {/* Center spine area */}
            <rect x="46" y="78" width="18" height="52" rx="5" fill={getColor("back", "rgba(239,68,68,0.08)")} stroke={getStroke("back")} strokeWidth="1" />
            {/* Spine dots */}
            {[85, 96, 107, 118].map((y) => (
              <circle key={y} cx="55" cy={y} r="2" fill={getStroke("back")} opacity="0.5" />
            ))}
          </g>

          {/* Shoulders back */}
          <g
            onClick={() => onMuscleClick("arms")}
            style={{ cursor: "pointer" }}
            filter={activeMuscle === "arms" ? "url(#glow)" : undefined}
          >
            <ellipse cx="23" cy="73" rx="12" ry="10" fill={getColor("arms")} stroke={getStroke("arms")} strokeWidth="1.5" />
            <ellipse cx="87" cy="73" rx="12" ry="10" fill={getColor("arms")} stroke={getStroke("arms")} strokeWidth="1.5" />
            {/* Back upper arms */}
            <rect x="8" y="82" width="14" height="36" rx="7" fill={getColor("arms")} stroke={getStroke("arms")} strokeWidth="1.5" />
            <rect x="88" y="82" width="14" height="36" rx="7" fill={getColor("arms")} stroke={getStroke("arms")} strokeWidth="1.5" />
            {/* Forearms */}
            <rect x="6" y="122" width="12" height="32" rx="6" fill={getColor("arms", "rgba(245,158,11,0.08)")} stroke={getStroke("arms")} strokeWidth="1.5" />
            <rect x="92" y="122" width="12" height="32" rx="6" fill={getColor("arms", "rgba(245,158,11,0.08)")} stroke={getStroke("arms")} strokeWidth="1.5" />
          </g>

          {/* Lower torso */}
          <rect x="35" y="128" width="40" height="24" rx="6" fill="#1e293b" stroke="rgba(148,163,184,0.1)" strokeWidth="1" />
          {/* Glutes */}
          <g
            onClick={() => onMuscleClick("legs")}
            style={{ cursor: "pointer" }}
            filter={activeMuscle === "legs" ? "url(#glow)" : undefined}
          >
            {/* Glutes */}
            <ellipse cx="43" cy="162" rx="14" ry="16" fill={getColor("legs")} stroke={getStroke("legs")} strokeWidth="1.5" />
            <ellipse cx="67" cy="162" rx="14" ry="16" fill={getColor("legs")} stroke={getStroke("legs")} strokeWidth="1.5" />
            {/* Hamstrings */}
            <rect x="33" y="175" width="20" height="48" rx="8" fill={getColor("legs")} stroke={getStroke("legs")} strokeWidth="1.5" />
            <rect x="57" y="175" width="20" height="48" rx="8" fill={getColor("legs")} stroke={getStroke("legs")} strokeWidth="1.5" />
            {/* Calves */}
            <rect x="35" y="228" width="16" height="47" rx="7" fill={getColor("legs", "rgba(16,185,129,0.08)")} stroke={getStroke("legs")} strokeWidth="1.2" />
            <rect x="59" y="228" width="16" height="47" rx="7" fill={getColor("legs", "rgba(16,185,129,0.08)")} stroke={getStroke("legs")} strokeWidth="1.2" />
          </g>
        </g>

        {/* Divider */}
        <line x1="220" y1="20" x2="220" y2="360" stroke="rgba(99,102,241,0.12)" strokeWidth="1" strokeDasharray="4 4" />

        {/* Active muscle label */}
        {activeMuscle && (
          <text
            x="220"
            y="372"
            textAnchor="middle"
            fill={MUSCLE_COLORS[activeMuscle]}
            fontSize="11"
            fontWeight="700"
            letterSpacing="3"
            textTransform="uppercase"
            fontFamily="DM Sans, sans-serif"
          >
            {activeMuscle.toUpperCase()} SELECTED
          </text>
        )}
      </svg>
    </div>
  );
}
