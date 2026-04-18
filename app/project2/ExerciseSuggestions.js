"use client";

import { useState, useEffect } from "react";

// ── API Layer (mirrors fetchMealIdeas / fetchMealDetails) ──────────────────────

async function fetchExercisesByMuscle(muscle) {
  const res = await fetch(
    `https://exercisedb.p.rapidapi.com/exercises/target/${muscle}?limit=15&offset=0`,
    {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
        "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
      },
    }
  );
  if (!res.ok) throw new Error(`API ${res.status}: ${res.statusText}`);
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

async function fetchExerciseDetails(id) {
  const res = await fetch(
    `https://exercisedb.p.rapidapi.com/exercises/exercise/${id}`,
    {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
        "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
      },
    }
  );
  if (!res.ok) throw new Error(`API ${res.status}`);
  const ex = await res.json();
  return {
    gifUrl:           ex.gifUrl            || null,
    equipment:        ex.equipment         || "bodyweight",
    secondaryMuscles: ex.secondaryMuscles  || [],
    instructions:     ex.instructions      || [],
  };
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function ExerciseSuggestions({ muscleGroup }) {
  const [exercises,      setExercises]      = useState([]);
  const [loading,        setLoading]        = useState(false);
  const [error,          setError]          = useState(null);
  const [hoveredId,      setHoveredId]      = useState(null);
  const [details,        setDetails]        = useState(null);
  const [detailLoading,  setDetailLoading]  = useState(false);

  // Mirrors useEffect([ingredient]) in MealIdeas.js
  useEffect(() => {
    if (!muscleGroup) return;
    setLoading(true);
    setError(null);
    setExercises([]);
    setHoveredId(null);
    setDetails(null);

    fetchExercisesByMuscle(muscleGroup)
      .then(setExercises)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [muscleGroup]);

  // Mirrors handleMouseEnter in MealIdeas.js
  async function handleMouseEnter(exercise) {
    setHoveredId(exercise.id);
    setDetailLoading(true);
    setDetails(null);
    try {
      const d = await fetchExerciseDetails(exercise.id);
      setDetails(d);
    } catch {
      setDetails(null);
    } finally {
      setDetailLoading(false);
    }
  }

  function handleMouseLeave() {
    setHoveredId(null);
    setDetails(null);
  }

  return (
    <div style={{
      background: "linear-gradient(160deg,#0d1117 0%,#161b22 100%)",
      border: "1px solid #30363d",
      borderRadius: "12px",
      padding: "20px",
      width: "300px",
      fontFamily: "'Syne', sans-serif",
    }}>
      {/* Header */}
      <div style={{ marginBottom: "16px" }}>
        <p style={{ color: "#58a6ff", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 4px", fontWeight: 700 }}>
          Exercise Suggestions
        </p>
        <h2 style={{ color: "#e6edf3", fontSize: "16px", fontWeight: 700, margin: 0 }}>
          {muscleGroup
            ? `Target: ${muscleGroup.replace(/%20/g, " ")}`
            : "Click an item to see exercises"}
        </h2>
      </div>

      {/* States */}
      {loading && (
        <div style={{ padding: "32px 0", textAlign: "center" }}>
          <div style={{
            width: "28px", height: "28px", margin: "0 auto 10px",
            border: "3px solid #21262d", borderTop: "3px solid #58a6ff",
            borderRadius: "50%", animation: "spin 0.7s linear infinite"
          }} />
          <p style={{ color: "#8b949e", fontSize: "12px", margin: 0 }}>Fetching exercises…</p>
          <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        </div>
      )}

      {error && (
        <div style={{ background: "#2d1515", border: "1px solid #6e2222", borderRadius: "8px", padding: "12px", fontSize: "12px", color: "#ff7b72" }}>
          <strong>⚠ API Error</strong><br />{error}<br />
          <span style={{ color: "#8b949e", fontSize: "11px" }}>Check NEXT_PUBLIC_RAPIDAPI_KEY in .env.local</span>
        </div>
      )}

      {!loading && !error && !muscleGroup && (
        <p style={{ color: "#484f58", fontSize: "13px", textAlign: "center", padding: "24px 0" }}>
          Select a muscle group to explore exercises.
        </p>
      )}

      {/* Exercise list — mirrors <ul> in MealIdeas.js */}
      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {exercises.map((exercise) => (
          <li
            key={exercise.id}
            onMouseEnter={() => handleMouseEnter(exercise)}
            onMouseLeave={handleMouseLeave}
            style={{
              borderBottom: "1px solid #21262d",
              padding: "10px 0",
              cursor: "pointer",
            }}
          >
            <span style={{
              color: hoveredId === exercise.id ? "#58a6ff" : "#c9d1d9",
              fontSize: "13px",
              fontWeight: 500,
              textTransform: "capitalize",
              display: "block",
              transition: "color 0.15s",
            }}>
              {exercise.name}
            </span>

            {/* Hover detail — mirrors meal hover in MealIdeas.js */}
            {hoveredId === exercise.id && (
              <div style={{ marginTop: "10px", animation: "fadeUp 0.2s ease" }}>
                <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}`}</style>

                {detailLoading && (
                  <p style={{ color: "#8b949e", fontSize: "11px" }}>Loading details…</p>
                )}

                {!detailLoading && details && (
                  <>
                    {details.gifUrl && (
                      <img
                        src={details.gifUrl}
                        alt={exercise.name}
                        style={{ width: "100%", borderRadius: "8px", marginBottom: "10px", border: "1px solid #30363d" }}
                      />
                    )}

                    <div style={{ marginBottom: "8px" }}>
                      <p style={{ color: "#58a6ff", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 700, margin: "0 0 2px" }}>Equipment</p>
                      <p style={{ color: "#8b949e", fontSize: "12px", margin: 0, textTransform: "capitalize" }}>{details.equipment}</p>
                    </div>

                    {details.secondaryMuscles.length > 0 && (
                      <div style={{ marginBottom: "8px" }}>
                        <p style={{ color: "#58a6ff", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 700, margin: "0 0 4px" }}>Secondary Muscles</p>
                        <ul style={{ margin: 0, paddingLeft: "14px", color: "#8b949e", fontSize: "12px" }}>
                          {details.secondaryMuscles.map((m) => (
                            <li key={m} style={{ textTransform: "capitalize", marginBottom: "2px" }}>{m}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {details.instructions.length > 0 && (
                      <div>
                        <p style={{ color: "#58a6ff", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 700, margin: "0 0 4px" }}>Instructions</p>
                        <ol style={{ margin: 0, paddingLeft: "16px", color: "#8b949e", fontSize: "11px", lineHeight: "1.5" }}>
                          {details.instructions.slice(0, 4).map((step, i) => (
                            <li key={i} style={{ marginBottom: "4px" }}>{step}</li>
                          ))}
                        </ol>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
