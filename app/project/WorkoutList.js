"use client";

import { useState } from "react";
import WorkoutItem from "./WorkoutItem.js";

const EXERCISES = [
  // Chest
  { id: "c1", name: "Barbell Bench Press", category: "chest", muscle: "chest" },
  { id: "c2", name: "Incline Dumbbell Press", category: "chest", muscle: "chest" },
  { id: "c3", name: "Cable Fly", category: "chest", muscle: "chest" },
  { id: "c4", name: "Push-Up", category: "chest", muscle: "chest" },
  { id: "c5", name: "Dips (Chest)", category: "chest", muscle: "chest" },
  // Legs
  { id: "l1", name: "Barbell Back Squat", category: "legs", muscle: "upper%20legs" },
  { id: "l2", name: "Romanian Deadlift", category: "legs", muscle: "upper%20legs" },
  { id: "l3", name: "Leg Press", category: "legs", muscle: "upper%20legs" },
  { id: "l4", name: "Lunges", category: "legs", muscle: "upper%20legs" },
  { id: "l5", name: "Calf Raises", category: "legs", muscle: "calves" },
  // Arms
  { id: "a1", name: "Barbell Curl", category: "arms", muscle: "biceps" },
  { id: "a2", name: "Tricep Pushdown", category: "arms", muscle: "triceps" },
  { id: "a3", name: "Hammer Curl", category: "arms", muscle: "biceps" },
  { id: "a4", name: "Skull Crushers", category: "arms", muscle: "triceps" },
  { id: "a5", name: "Concentration Curl", category: "arms", muscle: "biceps" },
  // Back
  { id: "b1", name: "Deadlift", category: "back", muscle: "upper%20back" },
  { id: "b2", name: "Pull-Up", category: "back", muscle: "lats" },
  { id: "b3", name: "Bent-Over Row", category: "back", muscle: "upper%20back" },
  { id: "b4", name: "Lat Pulldown", category: "back", muscle: "lats" },
  { id: "b5", name: "Seated Cable Row", category: "back", muscle: "upper%20back" },
];

const CATEGORY_COLORS = {
  chest: "#6366f1",
  legs: "#10b981",
  arms: "#f59e0b",
  back: "#ef4444",
};

export default function WorkoutList({ onExerciseSelect, selectedMuscle }) {
  const [sortBy, setSortBy] = useState("grouped");

  const filtered = selectedMuscle
    ? EXERCISES.filter((e) => e.category === selectedMuscle)
    : EXERCISES;

  const sorted = [...filtered].sort((a, b) =>
    sortBy === "grouped"
      ? a.category.localeCompare(b.category) || a.name.localeCompare(b.name)
      : a.name.localeCompare(b.name)
  );

  function renderGrouped() {
    const groups = {};
    sorted.forEach((item) => {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    });

    return Object.keys(groups)
      .sort()
      .map((cat) => (
        <div key={cat}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 0 6px",
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: CATEGORY_COLORS[cat] || "#6366f1",
                flexShrink: 0,
              }}
            />
            <h3
              style={{
                color: CATEGORY_COLORS[cat] || "#6366f1",
                fontSize: "10px",
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                fontWeight: 700,
                margin: 0,
              }}
            >
              {cat}
            </h3>
          </div>
          {groups[cat].map((item) => (
            <WorkoutItem
              key={item.id}
              exercise={item}
              onSelect={() => onExerciseSelect(item)}
              accentColor={CATEGORY_COLORS[cat]}
            />
          ))}
        </div>
      ));
  }

  const btnBase = {
    padding: "5px 14px",
    borderRadius: "20px",
    fontSize: "11px",
    fontWeight: 600,
    letterSpacing: "0.05em",
    cursor: "pointer",
    transition: "all 0.15s",
    fontFamily: "'DM Sans', sans-serif",
  };

  const activeBtn = {
    ...btnBase,
    background: "#6366f1",
    color: "#fff",
    border: "1px solid #6366f1",
  };

  const inactiveBtn = {
    ...btnBase,
    background: "transparent",
    color: "#64748b",
    border: "1px solid rgba(148,163,184,0.2)",
  };

  return (
    <div
      style={{
        background: "linear-gradient(160deg, #0f172a 0%, #1e293b 100%)",
        border: "1px solid rgba(99,102,241,0.2)",
        borderRadius: "16px",
        padding: "20px 24px",
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
          Workout Library
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ color: "#f1f5f9", fontSize: "18px", fontWeight: 700, margin: 0 }}>
            {selectedMuscle
              ? `${selectedMuscle.charAt(0).toUpperCase() + selectedMuscle.slice(1)} Exercises`
              : "All Exercises"}
          </h2>
          <span style={{ color: "#475569", fontSize: "12px" }}>{filtered.length} exercises</span>
        </div>
      </div>

      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        <button
          style={sortBy === "name" ? activeBtn : inactiveBtn}
          onClick={() => setSortBy("name")}
        >
          By Name
        </button>
        <button
          style={sortBy === "grouped" ? activeBtn : inactiveBtn}
          onClick={() => setSortBy("grouped")}
        >
          By Group
        </button>
      </div>

      <div>
        {sortBy === "grouped"
          ? renderGrouped()
          : sorted.map((item) => (
              <WorkoutItem
                key={item.id}
                exercise={item}
                onSelect={() => onExerciseSelect(item)}
                accentColor={CATEGORY_COLORS[item.category]}
              />
            ))}
      </div>
    </div>
  );
}
