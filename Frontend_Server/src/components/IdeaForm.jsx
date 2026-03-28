//IdeaForm.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { analyzeIdea } from "../services/api";

const IdeaForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    audience: "",
    budget: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      const res = await analyzeIdea(formData);
      navigate("/result", { state: res.data });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <input name="title" placeholder="Title" onChange={handleChange} />
      <textarea name="description" placeholder="Description" onChange={handleChange} />
      <input name="audience" placeholder="Audience" onChange={handleChange} />
      <input name="budget" placeholder="Budget" onChange={handleChange} />

      <button onClick={handleSubmit}>Analyze 🚀</button>
    </div>
  );
};

export default IdeaForm;