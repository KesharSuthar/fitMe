import { useState, useMemo } from "react";

const QUESTIONS = [
  {
    id: "skin",
    title: "Skin type",
    options: [
      { id: "dry", label: "Dry", dosha: "vata" },
      { id: "oily", label: "Oily", dosha: "pitta" },
      { id: "balanced", label: "Balanced", dosha: "kapha" },
    ],
  },
  {
    id: "build",
    title: "Body build",
    options: [
      { id: "thin", label: "Thin (slim)", dosha: "vata" },
      { id: "muscular", label: "Muscular / medium", dosha: "pitta" },
      { id: "heavy", label: "Heavier / solid", dosha: "kapha" },
    ],
  },
  {
    id: "hair",
    title: "Hair type",
    options: [
      { id: "dry_hair", label: "Dry / frizzy", dosha: "vata" },
      { id: "oily_hair", label: "Oily / fine", dosha: "pitta" },
      { id: "thick_hair", label: "Thick / lustrous", dosha: "kapha" },
    ],
  },
  {
    id: "mindset",
    title: "Mindset",
    options: [
      { id: "restless", label: "Restless / creative", dosha: "vata" },
      { id: "intense", label: "Intense / sharp", dosha: "pitta" },
      { id: "calm", label: "Calm / steady", dosha: "kapha" },
    ],
  },
  {
    id: "memory",
    title: "Memory",
    options: [
      { id: "forgetful", label: "Forgets easily", dosha: "vata" },
      { id: "good_memory", label: "Good memory", dosha: "pitta" },
      { id: "long_memory", label: "Slow but long-term memory", dosha: "kapha" },
    ],
  },
  {
    id: "sleep",
    title: "Sleep pattern",
    options: [
      { id: "light_sleep", label: "Light / often disturbed", dosha: "vata" },
      { id: "moderate_sleep", label: "Moderate sleep", dosha: "pitta" },
      { id: "deep_sleep", label: "Deep / long sleep", dosha: "kapha" },
    ],
  },
  {
    id: "diet",
    title: "Diet preference",
    options: [
      { id: "hot_food", label: "Prefer hot / dry foods", dosha: "vata" },
      { id: "spicy_food", label: "Prefer spicy / savory foods", dosha: "pitta" },
      { id: "sweet_food", label: "Prefer sweet / milky foods", dosha: "kapha" },
    ],
  },
  {
    id: "energy",
    title: "Energy levels throughout the day",
    options: [
      { id: "energetic_spurts", label: "Bursts of energy, easily tired", dosha: "vata" },
      { id: "consistent", label: "Consistent energy, driven", dosha: "pitta" },
      { id: "steady_low", label: "Slow and steady energy", dosha: "kapha" },
    ],
  },
  {
    id: "weather",
    title: "Weather preference",
    options: [
      { id: "warm_pref", label: "Prefer warm weather", dosha: "vata" },
      { id: "cool_pref", label: "Prefer cool weather", dosha: "pitta" },
      { id: "moderate_pref", label: "Prefer moderate / warm & dry", dosha: "kapha" },
    ],
  },
  {
    id: "stress",
    title: "Stress response",
    options: [
      { id: "anxious", label: "Become anxious or worried", dosha: "vata" },
      { id: "irritated", label: "Irritated / angry quickly", dosha: "pitta" },
      { id: "withdrawn", label: "Withdraw / stay calm", dosha: "kapha" },
    ],
  },
];

const RECOMMENDATIONS = {
  vata: {
    title: "Vata (Air + Ether)",
    desc:
      "Characteristics: dry skin, thin build, creative but restless mind. Needs warmth, routine and grounding foods.",
    tips: [
      "Prefer warm, cooked and slightly oily foods.",
      "Follow a daily routine and regular sleep schedule.",
      "Practice grounding yoga (slow Hatha, gentle stretching).",
      "Keep warm and avoid cold, windy weather.",
    ],
  },
  pitta: {
    title: "Pitta (Fire + Water)",
    desc:
      "Characteristics: oily skin, medium build, sharp and intense mind. Needs cooling, calming routines and moderation.",
    tips: [
      "Eat cooling, less spicy foods (cucumber, mint, dairy if tolerated).",
      "Avoid overheating and intense midday sun.",
      "Practice calming pranayama and meditation.",
      "Maintain moderate exercise — avoid overexertion.",
    ],
  },
  kapha: {
    title: "Kapha (Earth + Water)",
    desc:
      "Characteristics: balanced/oily skin, heavier build, calm and steady mind. Needs stimulation, light foods and movement.",
    tips: [
      "Prefer light, warm, and spicy foods to stimulate digestion.",
      "Include regular aerobic exercise to boost energy.",
      "Keep routine but avoid oversleeping.",
      "Use invigorating practices like brisk walks and dynamic yoga.",
    ],
  },
};

export default function Quiz() {
  const [answers, setAnswers] = useState({});
  const [step, setStep] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const totalSteps = QUESTIONS.length;

  function handleSelect(questionId, dosha) {
    setAnswers((prev) => ({ ...prev, [questionId]: dosha }));
  }

  function next() {
    if (step < totalSteps - 1) setStep((s) => s + 1);
    else setShowResult(true);
  }

  function prev() {
    if (step > 0) setStep((s) => s - 1);
  }

  const scores = useMemo(() => {
    const s = { vata: 0, pitta: 0, kapha: 0 };
    for (const q of QUESTIONS) {
      const ans = answers[q.id];
      if (ans) s[ans]++;
    }
    return s;
  }, [answers]);

  const totalAnswered = Object.keys(answers).length;

  const dominant = useMemo(() => {
    const entries = Object.entries(scores);
    const sorted = entries.sort((a, b) => b[1] - a[1]);
    const top = sorted[0];
    const runner = sorted[1];
    // Simple tie handling: if top equals runner, consider dual-dosha
    if (!top) return null;
    if (top[1] === runner[1]) return `${top[0]} & ${runner[0]}`;
    return top[0];
  }, [scores]);

  function restart() {
    setAnswers({});
    setStep(0);
    setShowResult(false);
  }

  function downloadJSONReport() {
    const payload = {
      generatedAt: new Date().toISOString(),
      answers,
      scores,
      dominant,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "prakriti_report.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg mt-8">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-extrabold">fitMe — Self Assessment</h1>
        <div className="text-sm text-gray-600"> Health · Wellness · Psychology</div>
      </header>

      {!showResult ? (
        <div>
          <div className="mb-4">
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 via-rose-400 to-emerald-400"
                style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
              />
            </div>
            <div className="mt-2 text-xs text-gray-500">
              Question {step + 1} of {totalSteps} • Answered {totalAnswered}
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-3">{QUESTIONS[step].title}</h2>
            <div className="grid gap-3 md:grid-cols-3">
              {QUESTIONS[step].options.map((opt) => {
                const selected = answers[QUESTIONS[step].id] === opt.dosha && answers[QUESTIONS[step].id] === opt.dosha && opt.dosha === answers[QUESTIONS[step].id] && answers[QUESTIONS[step].id] === opt.dosha;
                // simplified selected check
                const isSelected = answers[QUESTIONS[step].id] === opt.dosha && answers[QUESTIONS[step].id] === opt.dosha && opt.id === Object.keys(QUESTIONS[step].options).find(k=>k===k);
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelect(QUESTIONS[step].id, opt.dosha)}
                    className={`text-left p-4 border rounded-lg hover:shadow-md transition-all duration-150 flex flex-col justify-between ${answers[QUESTIONS[step].id] === opt.dosha ? "ring-2 ring-amber-300 bg-white" : "bg-white/90"}`}
                  >
                    <div className="font-medium">{opt.label}</div>
                    <div className="mt-2 text-xs text-gray-500">{opt.dosha.toUpperCase()}</div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between mt-6">
            <div>
              <button
                onClick={prev}
                disabled={step === 0}
                className={`px-4 py-2 rounded-md mr-3 ${step === 0 ? "bg-gray-200 text-gray-500" : "bg-gray-800 text-white"}`}
              >
                Previous
              </button>
              <button
                onClick={next}
                className={`px-4 py-2 rounded-md ${answers[QUESTIONS[step].id] ? "bg-amber-500 text-white" : "bg-amber-200 text-amber-800"}`}
                disabled={!answers[QUESTIONS[step].id]}
              >
                {step === totalSteps - 1 ? "Finish" : "Next"}
              </button>
            </div>

            <div className="text-sm text-gray-600">Tip: Try to answer honestly for best results.</div>
          </div>
        </div>
      ) : (
        <div>
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold">Your Result</h2>
            <p className="mt-2 text-gray-600">Auto-generated from your answers.</p>

            <div className="mt-6 grid md:grid-cols-3 gap-4">
              <div className="col-span-2">
                <div className="p-4 rounded-lg border">
                  <h3 className="font-semibold text-lg">Dominant Dosha</h3>
                  <div className="mt-3 flex items-center gap-4">
                    <div className="text-3xl font-extrabold">{dominant ? dominant.toUpperCase() : "-"}</div>
                    <div className="text-sm text-gray-600">Scores: Vata {scores.vata} · Pitta {scores.pitta} · Kapha {scores.kapha}</div>
                  </div>

                  <div className="mt-4">
                    {Array.isArray(dominant) ? null : (
                      <div>
                        <h4 className="font-semibold mt-3">About {dominant}</h4>
                        <p className="text-gray-700 mt-2">{dominant ? RECOMMENDATIONS[dominant]?.desc : ""}</p>

                        <ul className="mt-3 list-disc list-inside">
                          {dominant && RECOMMENDATIONS[dominant]?.tips.map((t, i) => (
                            <li key={i} className="text-gray-700">{t}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* If dual-dosha show both */}
                    {typeof dominant === "string" && dominant.includes("&") && (
                      <div className="mt-4">
                        <p className="text-gray-700">You appear to have two dominant doshas. Consider balancing tips from both categories.</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4 p-4 border rounded-lg bg-gray-50">
                  <h4 className="font-semibold">Your raw answers</h4>
                  <pre className="mt-2 text-xs text-gray-700 overflow-auto max-h-40 p-2 bg-white rounded">{JSON.stringify(answers, null, 2)}</pre>
                </div>
              </div>

              <aside className="p-4 border rounded-lg">
                <h4 className="font-semibold">Quick actions</h4>
                <div className="mt-3 grid gap-2">
                  <button onClick={downloadJSONReport} className="px-3 py-2 rounded bg-amber-500 text-white">Download JSON Report</button>
                  <button onClick={() => window.print()} className="px-3 py-2 rounded border">Print / Save as PDF</button>
                  <button onClick={restart} className="px-3 py-2 rounded border">Retake Test</button>
                </div>

                <div className="mt-6 text-xs text-gray-500">
                  Note: This tool is an educational self-assessment based on classical dosha indicators. For clinical advice consult an Ayurvedic practitioner.
                </div>
              </aside>
            </div>
          </div>
        </div>
      )}

      <footer className="mt-6 text-center text-xs text-gray-500">Built for: Health · Wellness · Psychology — Self-Assessment</footer>
    </div>
  );
}
