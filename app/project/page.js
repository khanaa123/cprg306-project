"use client";

import { useState } from "react";
import MuscleHero        from "./MuscleHero.js";
import WorkoutList       from "./WorkoutList.js";
import ExerciseSuggestions from "./ExerciseSuggestions.js";

// ── Muscle group → ExerciseDB API target slug map ─────────────────────────────
// ExerciseDB valid target values (case-sensitive, spaces encoded):
//   pectorals | quadriceps | hamstrings | calves | biceps | triceps
//   lats | upper%20back | spine | glutes | abs | delts | forearms
//   cardiovascular%20system | serratus%20anterior | adductors | abductors

const MUSCLE_TO_API = {
  chest: "pectorals",
  legs:  "quadriceps",
  arms:  "biceps",
  back:  "lats",
};

// Mirrors the cleanName function from the original page.js
function cleanMuscleSlug(raw) {
  return raw
    .split(",")[0]
    .trim()
    .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, "")
    .trim()
    .toLowerCase();
}

export default function Page() {
  // selectedMuscle — internal category name ("chest" | "legs" | "arms" | "back")
  const [selectedMuscle, setSelectedMuscle] = useState(null);
  // apiTarget — the slug sent to ExerciseDB API ("pectorals", "lats", etc.)
  const [apiTarget, setApiTarget] = useState("");

  // Called when user clicks a region on MuscleHero SVG
  function handleMuscleClick(muscle) {
    const clean = cleanMuscleSlug(muscle);
    setSelectedMuscle(clean);
    setApiTarget(MUSCLE_TO_API[clean] || clean);
  }

  // Called when user clicks a WorkoutItem row
  // Uses the exercise's specific apiTarget for more precise API results
  function handleExerciseSelect(exercise) {
    setSelectedMuscle(exercise.category);
    // exercise.apiTarget is the precise slug (e.g. "hamstrings" for RDL, "triceps" for pushdown)
    const slug = cleanMuscleSlug(exercise.apiTarget.replace(/%20/g, " ")).replace(/ /g, "%20");
    setApiTarget(slug);
  }

  return (
    <>
      {/* Google Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #010409; }
      `}</style>

      <main style={{
        minHeight: "100vh",
        background: "#010409",
        backgroundImage: `
          radial-gradient(ellipse 60% 40% at 15% 15%, rgba(88,166,255,0.07) 0%, transparent 60%),
          radial-gradient(ellipse 50% 40% at 85% 85%, rgba(63,185,80,0.05) 0%, transparent 60%)
        `,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "48px 16px 80px",
        fontFamily: "'Syne', sans-serif",
      }}>

        {/* ── Page header ── */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <p style={{ color: "#58a6ff", fontSize: "10px", letterSpacing: "0.28em", textTransform: "uppercase", marginBottom: "10px", fontWeight: 700 }}>
            Training Hub
          </p>
          <h1 style={{
            fontSize: "clamp(30px, 5vw, 48px)",
            fontWeight: 800,
            color: "#e6edf3",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            marginBottom: "12px",
          }}>
            Workout Explorer
          </h1>
          <p style={{ color: "#484f58", fontSize: "14px", maxWidth: "360px", lineHeight: 1.6 }}>
            Select a muscle group to browse exercises and discover targeted movements from the ExerciseDB API.
          </p>
        </div>

        {/* ── Two-column layout ── */}
        <div style={{
          display: "flex",
          gap: "20px",
          width: "100%",
          maxWidth: "1060px",
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}>
          {/* Left column */}
          <div style={{ flex: "1 1 340px", minWidth: "280px" }}>
            <MuscleHero
              activeMuscle={selectedMuscle}
              onMuscleClick={handleMuscleClick}
            />
            <WorkoutList
              selectedMuscle={selectedMuscle}
              onExerciseSelect={handleExerciseSelect}
            />
          </div>

          {/* Right column — sticky side panel (mirrors MealIdeas position) */}
          <div style={{ flex: "0 0 300px", position: "sticky", top: "24px" }}>
            <ExerciseSuggestions muscleGroup={apiTarget} />
          </div>
        </div>
      </main>
    </>
  );
}
