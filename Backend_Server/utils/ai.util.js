import axios from "axios";

// 🔐 Axios instance with timeout
export const axiosInstance = axios.create({
  timeout: 15000
});

// 🛡️ Safe JSON Parse
export const safeJSONParse = (text) => {
  try {
    return JSON.parse(text);
  } catch {
    try {
      const cleaned = text
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();
      return JSON.parse(cleaned);
    } catch {
      return null;
    }
  }
};

// 🔁 Standard fallback wrapper
export const withFallback = async (fn, fallback) => {
  try {
    const result = await fn();
    return result || fallback;
  } catch (err) {
    console.error("AI Service Error:", err.message);
    return fallback;
  }
};