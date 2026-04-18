"use client";

import { useState } from "react";
import MuscleHero from "./MuscleHero.js";
import WorkoutList from "./WorkoutList.js";
import ExerciseSuggestions from "./ExerciseSuggestions.js";

// Maps our internal category names to ExerciseDB API target muscle slugs
const MUSCLE_API_MAP = {
  chest: "pectorals",
  legs: "quadriceps",
  arms: "biceps",
  back: "lats",
};

function cleanMuscleGroup(raw) {
  return raw
    .split(",")[0]
    .trim()
    .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, "")
    .trim()
    .toLowerCase();
}

export default function Page() {
  const [selectedMuscle, setSelectedMuscle] = useState(null);
  const [apiMuscle, setApiMuscle] = useState("");

  function handleMuscleClick(muscle) {
    const clean = cleanMuscleGroup(muscle);
    setSelectedMuscle(clean);
    setApiMuscle(MUSCLE_API_MAP[clean] || clean);
  }

  function handleExerciseSelect(exercise) {
    const clean = cleanMuscleGroup(exercise.muscle || exercise.category);
    setApiMuscle(clean.replace(/%20/g, " "));
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#060d1a",
        backgroundImage: `
          radial-gradient(ellipse at 20% 20%, rgba(99,102,241,0.08) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 80%, rgba(16,185,129,0.06) 0%, transparent 50%)
        `,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px 16px",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "36px" }}>
        <div
          style={{
            fontSize: "10px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#6366f1",
            marginBottom: "8px",
            fontWeight: 700,
          }}
        >
          Training Hub
        </div>
        <h1
          style={{
            fontSize: "clamp(28px, 5vw, 42px)",
            fontWeight: 800,
            color: "#f1f5f9",
            margin: 0,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}
        >
          Workout Explorer
        </h1>
        <p style={{ color: "#475569", marginTop: "10px", fontSize: "14px", maxWidth: "380px" }}>
          Select a muscle group to browse exercises and discover targeted movements.
        </p>
      </div>

      {/* Main Layout */}
      <div
        style={{
          display: "flex",
          gap: "24px",
          width: "100%",
          maxWidth: "1100px",
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        {/* Left column */}
        <div style={{ flex: "1 1 340px", minWidth: "280px" }}>
          <MuscleHero
            activeMuscle={selectedMuscle}
            onMuscleClick={handleMuscleClick}
          />
          <WorkoutList
            onExerciseSelect={handleExerciseSelect}
            selectedMuscle={selectedMuscle}
          />
        </div>

        {/* Right column — sticky side panel */}
        <div style={{ flex: "0 0 320px", position: "sticky", top: "24px" }}>
          <ExerciseSuggestions muscleGroup={apiMuscle} />
        </div>
      </div>

      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
      `}</style>
    </main>
  );
}
