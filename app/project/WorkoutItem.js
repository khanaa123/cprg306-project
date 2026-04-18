export default function WorkoutItem({ exercise, onSelect, accentColor = "#58a6ff" }) {
  return (
    <div
      onClick={onSelect}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "rgba(255,255,255,0.02)",
        border: "1px solid #21262d",
        borderLeft: `3px solid ${accentColor}`,
        borderRadius: "8px",
        padding: "11px 14px",
        marginBottom: "7px",
        cursor: "pointer",
        transition: "all 0.15s",
        fontFamily: "'Syne', sans-serif",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.06)";
        e.currentTarget.style.borderColor = accentColor;
        e.currentTarget.style.borderLeftColor = accentColor;
        e.currentTarget.style.transform = "translateX(3px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.02)";
        e.currentTarget.style.borderColor = "#21262d";
        e.currentTarget.style.borderLeftColor = accentColor;
        e.currentTarget.style.transform = "translateX(0)";
      }}
    >
      <div>
        <div style={{ color: "#e6edf3", fontWeight: 600, fontSize: "13px", textTransform: "capitalize" }}>
          {exercise.name}
        </div>
        <div style={{ color: "#484f58", fontSize: "11px", marginTop: "2px", textTransform: "capitalize" }}>
          {exercise.category}
        </div>
      </div>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, opacity: 0.5 }}>
        <path d="M5 3l4 4-4 4" stroke={accentColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}
