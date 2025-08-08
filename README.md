# One-Shot Prompting – Skin Disease Analyzer

## 📌 What is One-Shot Prompting?

One-shot prompting is a technique where the model is provided with one example to guide its output format and behavior. This helps in generating more structured and accurate responses by demonstrating what a good response looks like.

## 💡 How it's Used

This project allows users to upload a skin image and choose “One-Shot” mode. The backend sends a single example in the prompt, instructing the model to return diagnosis, measures, prevention, and diet in structured JSON.

## ✅ Evaluation Criteria

- **Correctness:** Responses are accurate and structured per the given example.
- **Efficiency:** Uses optimized image-to-Base64 handling and Gemini 1.5 Flash.
- **Scalability:** Handles structured prompts, enabling parallel evaluation on multiple images if scaled.

---

## 🧪 Try It

- Run `npm run dev` and go to `localhost:5173`.
- Upload an image and click “Analyze Image.”

## 📁 File

- `SkinDiseaseAnalyzerOneShot.jsx` – Self-contained component for this mode.

