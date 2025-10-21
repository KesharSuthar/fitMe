# 🧘‍♀️ fitMe — Self-Assessment Tool

A **web-based interactive questionnaire** built using **React** and **TailwindCSS** to help users identify their **Ayurvedic body constitution (Prakriti)** — **Vata**, **Pitta**, or **Kapha** — under the theme *Indian Health, Wellness, and Psychology*.

---

## 🌿 Features

- 🧍‍♂️ Assess physical, mental, and emotional traits through 10 guided questions.
- 📊 Automatically calculate dominant dosha (Vata, Pitta, or Kapha).
- 🧘 Personalized wellness and lifestyle recommendations based on results.
- 💾 Export results as JSON or **Print/Save as PDF**.
- 🔄 Retake the test anytime.
- ✨ Minimal, responsive, and clean UI with TailwindCSS styling.

---

## ⚙️ Tech Stack

| Layer | Technology |
|--------|-------------|
| Frontend | React (Functional Components + Hooks) |
| Styling | TailwindCSS |
| Build Tool | Vite or Create React App |
| Output | JSON report, printable page |

---

## 🧩 Project Structure

```
📦 fitMe
├── src/
│   ├── components/
│   │   └── PrakritiQuiz.jsx   # Main component
│   ├── App.jsx
│   ├── index.css              # TailwindCSS imports
│   └── main.jsx               # React entry point
└── package.json
```

---

## 🚀 How to Run

### 1. Clone the repository
```bash
git clone https://github.com/kesharsuthar/fitMe.git
cd fitMe
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the development server
```bash
npm run dev
```

Then open your browser at **http://localhost:5173** (for Vite).

---

## 🧠 How It Works

- Each question offers 3 options — each mapped to one dosha (Vata, Pitta, Kapha).
- Every selected option adds a point to that dosha’s score.
- The highest score determines your **dominant dosha**.
- If two doshas are equal, a **dual-dosha** result is shown.
- Based on the outcome, users receive Ayurvedic lifestyle tips.

---

## 📄 Output Example
```json
{
  "generatedAt": "2025-10-21T10:25:00.000Z",
  "answers": {
    "skin": "vata",
    "build": "pitta",
    "hair": "kapha"
  },
  "scores": {
    "vata": 3,
    "pitta": 2,
    "kapha": 1
  },
  "dominant": "vata"
}
```

---

## 🩺 About Doshas

| Dosha | Key Traits | Needs |
|--------|-------------|-------|
| **Vata** | Light, creative, dry, restless | Warmth, routine, grounding foods |
| **Pitta** | Intense, sharp, driven | Cooling, calm, moderation |
| **Kapha** | Calm, stable, heavy | Stimulation, light diet, activity |

---

## 🪷 Educational Disclaimer
This is an **educational self-assessment tool** inspired by classical Ayurvedic principles. It is **not a substitute for medical advice**. For personalized wellness guidance, consult a certified Ayurvedic practitioner.

---

## 📘 License
This project is open-source under the **MIT License**.

---

## 💛 Credits
Developed by **Keshar Suthar** for *Indian Health, Wellness & Psychology — Assignment*.

---
