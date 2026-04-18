"use client";

import { useState, useEffect } from "react";

async function fetchExercisesByMuscle(muscle) {
  const url = `https://exercisedb.p.rapidapi.com/exercises/target/${muscle}?limit=12`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "YOUR_API_KEY",
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    },
  };
  const response = await fetch(url, options);
  return await response.json();
}

async function fetchExerciseDetails(exerciseId) {
  const url = `https://exercisedb.p.rapidapi.com/exercises/exercise/${exerciseId}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "YOUR_API_KEY",
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    },
  };
  const response = await fetch(url, options);
  return await response.json();
}

export default function ExerciseSuggestions({ muscleGroup }) {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);
  const [exerciseDetails, setExerciseDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

  useEffect(() => {
    if (!muscleGroup) return;
    setLoading(true);
    setExercises([]);
    fetchExercisesByMuscle(muscleGroup)
      .then((data) => setExercises(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, [muscleGroup]);

  async function handleMouseEnter(exercise) {
    setHoveredId(exercise.id);
    setDetailsLoading(true);
    const details = await fetchExerciseDetails(exercise.id);
    setExerciseDetails(details);
    setDetailsLoading(false);
  }

  function handleMouseLeave() {
    setHoveredId(null);
    setExerciseDetails(null);
  }

  return (
    <div
      style={{
        background: "linear-gradient(160deg, #0f172a 0%, #1e293b 100%)",
        border: "1px solid rgba(99,102,241,0.2)",
        borderRadius: "16px",
        padding: "24px",
        width: "320px",
        minHeight: "200px",
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
          Exercise Suggestions
        </div>
        <h2
          style={{
            color: "#f1f5f9",
            fontSize: "18px",
            fontWeight: 700,
            margin: 0,
          }}
        >
          {muscleGroup
            ? `Target: ${muscleGroup.charAt(0).toUpperCase() + muscleGroup.slice(1)}`
            : "Select a muscle group"}
        </h2>
      </div>

      {loading && (
        <div style={{ textAlign: "center", padding: "32px 0" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              border: "3px solid rgba(99,102,241,0.2)",
              borderTop: "3px solid #6366f1",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
              margin: "0 auto 12px",
            }}
          />
          <p style={{ color: "#64748b", fontSize: "13px" }}>Loading exercises...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {!loading && !muscleGroup && (
        <p style={{ color: "#475569", fontSize: "14px", textAlign: "center", padding: "24px 0" }}>
          Click an exercise from the list to explore suggestions.
        </p>
      )}

      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {exercises.map((exercise) => (
          <li
            key={exercise.id}
            onMouseEnter={() => handleMouseEnter(exercise)}
            onMouseLeave={handleMouseLeave}
            style={{
              borderBottom: "1px solid rgba(99,102,241,0.1)",
              padding: "12px 0",
              cursor: "pointer",
              transition: "background 0.15s",
            }}
          >
            <span
              style={{
                color: hoveredId === exercise.id ? "#a5b4fc" : "#cbd5e1",
                fontSize: "14px",
                fontWeight: 500,
                display: "block",
                textTransform: "capitalize",
                transition: "color 0.15s",
              }}
            >
              {exercise.name}
            </span>

            {hoveredId === exercise.id && (
              <div
                style={{
                  marginTop: "12px",
                  animation: "fadeIn 0.2s ease",
                }}
              >
                {detailsLoading ? (
                  <p style={{ color: "#64748b", fontSize: "12px" }}>Loading details...</p>
                ) : exerciseDetails ? (
                  <>
                    {exerciseDetails.gifUrl && (
                      <img
                        src={exerciseDetails.gifUrl}
                        alt={exerciseDetails.name}
                        style={{
                          width: "100%",
                          borderRadius: "10px",
                          marginBottom: "10px",
                          border: "1px solid rgba(99,102,241,0.2)",
                        }}
                      />
                    )}
                    <div style={{ marginBottom: "8px" }}>
                      <span
                        style={{
                          fontSize: "10px",
                          textTransform: "uppercase",
                          letterSpacing: "0.15em",
                          color: "#6366f1",
                          fontWeight: 600,
                        }}
                      >
                        Equipment
                      </span>
                      <p
                        style={{
                          color: "#94a3b8",
                          fontSize: "12px",
                          margin: "2px 0 0",
                          textTransform: "capitalize",
                        }}
                      >
                        {exerciseDetails.equipment || "None"}
                      </p>
                    </div>
                    {exerciseDetails.secondaryMuscles?.length > 0 && (
                      <div>
                        <span
                          style={{
                            fontSize: "10px",
                            textTransform: "uppercase",
                            letterSpacing: "0.15em",
                            color: "#6366f1",
                            fontWeight: 600,
                          }}
                        >
                          Secondary Muscles
                        </span>
                        <ul
                          style={{
                            margin: "4px 0 0",
                            padding: "0 0 0 14px",
                            color: "#94a3b8",
                            fontSize: "12px",
                          }}
                        >
                          {exerciseDetails.secondaryMuscles.map((m) => (
                            <li key={m} style={{ textTransform: "capitalize", marginBottom: "2px" }}>
                              {m}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                ) : null}
              </div>
            )}
          </li>
        ))}
      </ul>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
