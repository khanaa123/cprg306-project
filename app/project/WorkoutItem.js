export default function WorkoutItem({ exercise, onSelect, accentColor = "#6366f1" }) {
  return (
    <div
      onClick={onSelect}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(148,163,184,0.08)",
        borderRadius: "10px",
        padding: "12px 16px",
        marginBottom: "8px",
        cursor: "pointer",
        transition: "all 0.15s",
        borderLeft: `3px solid ${accentColor}`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.07)";
        e.currentTarget.style.borderColor = accentColor;
        e.currentTarget.style.transform = "translateX(2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.03)";
        e.currentTarget.style.borderColor = "rgba(148,163,184,0.08)";
        e.currentTarget.style.borderLeftColor = accentColor;
        e.currentTarget.style.transform = "translateX(0)";
      }}
    >
      <div>
        <div
          style={{
            color: "#e2e8f0",
            fontWeight: 600,
            fontSize: "14px",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {exercise.name}
        </div>
        <div
          style={{
            color: "#475569",
            fontSize: "11px",
            marginTop: "2px",
            textTransform: "capitalize",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {exercise.category}
        </div>
      </div>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
        <path d="M5 3l4 4-4 4" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
