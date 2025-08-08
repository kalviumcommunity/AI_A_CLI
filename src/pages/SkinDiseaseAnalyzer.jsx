import React, { useState } from "react";
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import Base64 from "base64-js";
import { toast } from "react-toastify";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const SkinDiseaseAnalyzerOneShot = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const systemPrompt = `You are a medical assistant specializing in dermatology. 
  Always respond with structured, clear, and safe advice.`;

  const oneShotPrompt = `Example:
  🩺 Diagnosis: Acne Vulgaris
  🚑 Immediate Measures:
  - Wash face twice daily
  - Avoid touching face
  🛡 Long-Term Prevention:
  - Use non-comedogenic products
  - Maintain hydration
  🥗 Recommended Diet:
  - Leafy greens
  - Foods rich in Omega-3

  Now, explain the user's skin disease in the same format.
  Think through the steps internally before writing your final structured answer.`;

  const finalPrompt = `${systemPrompt}
  Analyze the image and return ONLY in the following JSON structure:
  {
    "diagnosis": "string",
    "measures": ["string", "string"],
    "prevention": ["string", "string"],
    "diet": ["string", "string"]
  }
  ${oneShotPrompt}`;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) return toast.error("Image must be under 5MB");

    setImage(file);
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const analyzeImage = async (e) => {
    e.preventDefault();
    if (!image) return toast.error("Upload an image first.");

    setLoading(true);
    setResults(null);

    try {
      const reader = new FileReader();
      const imageBase64 = await new Promise((resolve, reject) => {
        reader.onload = () => resolve(Base64.fromByteArray(new Uint8Array(reader.result)));
        reader.onerror = reject;
        reader.readAsArrayBuffer(image);
      });

      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        safetySettings: [
          { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH }
        ]
      });

      const result = await model.generateContent({
        contents: [
          { role: "user", parts: [{ inline_data: { mime_type: image.type, data: imageBase64 } }] },
          { role: "user", parts: [{ text: finalPrompt }] }
        ],
        generationConfig: {
          temperature: 0.7,
          topP: 0.9,
          topK: 40,
          stopSequences: ["\n\nNote:", "Disclaimer:"]
        }
      });

      const parsed = JSON.parse(result.response.text());

      setResults(parsed);
      toast.success("Analysis complete!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to analyze image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded shadow">
      <h1 className="text-xl font-bold text-center mb-4">🩺 One-Shot Skin Disease Analyzer</h1>
      <form onSubmit={analyzeImage}>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {imagePreview && <img src={imagePreview} alt="Preview" className="max-h-40 mt-2" />}
        <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded mt-4">
          {loading ? "Analyzing..." : "Analyze Image"}
        </button>
      </form>
      {results && (
        <div className="mt-4 bg-gray-100 p-4 rounded">
          <p><strong>Diagnosis:</strong> {results.diagnosis}</p>
          <p><strong>Immediate Measures:</strong> {results.measures.join(", ")}</p>
          <p><strong>Long-Term Prevention:</strong> {results.prevention.join(", ")}</p>
          <p><strong>Recommended Diet:</strong> {results.diet.join(", ")}</p>
        </div>
      )}
    </div>
  );
};

export default SkinDiseaseAnalyzerOneShot;
