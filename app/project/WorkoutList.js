"use client";

import { useState } from "react";
import WorkoutItem from "./WorkoutItem.js";

// 20 preset exercises across 4 muscle groups
// `muscle` = ExerciseDB API target slug used when item is clicked
const EXERCISES = [
  // Chest → API target: "pectorals"
  { id: "c1", name: "Barbell Bench Press",      category: "chest", apiTarget: "pectorals" },
  { id: "c2", name: "Incline Dumbbell Press",   category: "chest", apiTarget: "pectorals" },
  { id: "c3", name: "Cable Fly",                category: "chest", apiTarget: "pectorals" },
  { id: "c4", name: "Push-Up",                  category: "chest", apiTarget: "pectorals" },
  { id: "c5", name: "Dips (Chest Focus)",        category: "chest", apiTarget: "pectorals" },
  // Legs → API target: "quadriceps"
  { id: "l1", name: "Barbell Back Squat",       category: "legs",  apiTarget: "quadriceps" },
  { id: "l2", name: "Romanian Deadlift",        category: "legs",  apiTarget: "hamstrings" },
  { id: "l3", name: "Leg Press",                category: "legs",  apiTarget: "quadriceps" },
  { id: "l4", name: "Walking Lunges",           category: "legs",  apiTarget: "quadriceps" },
  { id: "l5", name: "Standing Calf Raises",     category: "legs",  apiTarget: "calves" },
  // Arms → API target: "biceps" / "triceps"
  { id: "a1", name: "Barbell Curl",             category: "arms",  apiTarget: "biceps" },
  { id: "a2", name: "Tricep Pushdown",          category: "arms",  apiTarget: "triceps" },
  { id: "a3", name: "Hammer Curl",              category: "arms",  apiTarget: "biceps" },
  { id: "a4", name: "Skull Crushers",           category: "arms",  apiTarget: "triceps" },
  { id: "a5", name: "Concentration Curl",       category: "arms",  apiTarget: "biceps" },
  // Back → API target: "lats" / "upper back"
  { id: "b1", name: "Conventional Deadlift",    category: "back",  apiTarget: "spine" },
  { id: "b2", name: "Pull-Up",                  category: "back",  apiTarget: "lats" },
  { id: "b3", name: "Bent-Over Barbell Row",    category: "back",  apiTarget: "upper%20back" },
  { id: "b4", name: "Lat Pulldown",             category: "back",  apiTarget: "lats" },
  { id: "b5", name: "Seated Cable Row",         category: "back",  apiTarget: "upper%20back" },
];

const ACCENT = {
  chest: "#f78166",
  legs:  "#3fb950",
  arms:  "#d2a8ff",
  back:  "#58a6ff",
};

export default function WorkoutList({ onExerciseSelect, selectedMuscle }) {
  const [sortBy, setSortBy] = useState("grouped");

  // Mirror item-list.js filter: show all or just selected muscle
  const filtered = selectedMuscle
    ? EXERCISES.filter((e) => e.category === selectedMuscle)
    : EXERCISES;

  const sorted = [...filtered].sort((a, b) =>
    sortBy === "grouped"
      ? a.category.localeCompare(b.category) || a.name.localeCompare(b.name)
      : a.name.localeCompare(b.name)
  );

  // Mirrors renderGrouped() from item-list.js
  function renderGrouped() {
    const groups = {};
    sorted.forEach((item) => {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    });

    return Object.keys(groups).sort().map((cat) => (
      <div key={cat}>
        <div style={{ display: "flex", alignItems: "center", gap: "7px", padding: "12px 0 6px" }}>
          <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: ACCENT[cat], flexShrink: 0 }} />
          <h3 style={{ color: ACCENT[cat], fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.18em", fontWeight: 700, margin: 0 }}>
            {cat}
          </h3>
        </div>
        {groups[cat].map((item) => (
          <WorkoutItem
            key={item.id}
            exercise={item}
            accentColor={ACCENT[cat]}
            onSelect={() => onExerciseSelect(item)}
          />
        ))}
      </div>
    ));
  }

  const btnBase = {
    padding: "5px 14px", borderRadius: "20px", fontSize: "11px",
    fontWeight: 700, letterSpacing: "0.05em", cursor: "pointer",
    transition: "all 0.15s", fontFamily: "'Syne', sans-serif",
    border: "1px solid #30363d",
  };

  return (
    <div style={{
      background: "linear-gradient(160deg,#0d1117 0%,#161b22 100%)",
      border: "1px solid #30363d",
      borderRadius: "12px",
      padding: "20px",
      fontFamily: "'Syne', sans-serif",
    }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px" }}>
        <div>
          <p style={{ color: "#58a6ff", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 4px", fontWeight: 700 }}>
            Workout Library
          </p>
          <h2 style={{ color: "#e6edf3", fontSize: "16px", fontWeight: 700, margin: 0 }}>
            {selectedMuscle
              ? `${selectedMuscle.charAt(0).toUpperCase() + selectedMuscle.slice(1)} Exercises`
              : "All Exercises"}
          </h2>
        </div>
        <span style={{ color: "#484f58", fontSize: "11px", paddingTop: "4px" }}>
          {filtered.length} exercises
        </span>
      </div>

      {/* Sort buttons — mirrors item-list.js buttons */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "14px" }}>
        {[["name", "By Name"], ["grouped", "By Group"]].map(([val, label]) => (
          <button
            key={val}
            onClick={() => setSortBy(val)}
            style={{
              ...btnBase,
              background: sortBy === val ? "#58a6ff" : "transparent",
              color: sortBy === val ? "#0d1117" : "#8b949e",
              borderColor: sortBy === val ? "#58a6ff" : "#30363d",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* List */}
      <div>
        {sortBy === "grouped"
          ? renderGrouped()
          : sorted.map((item) => (
              <WorkoutItem
                key={item.id}
                exercise={item}
                accentColor={ACCENT[item.category]}
                onSelect={() => onExerciseSelect(item)}
              />
            ))}
      </div>
    </div>
  );
}
