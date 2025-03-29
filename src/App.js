import React, { useState } from "react";
import "./App.css";

const API_URL = "https://your-backend.onrender.com"; // Replace with your actual backend URL

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [complexity, setComplexity] = useState("");

  // Function to execute code
  const runCode = async () => {
    setOutput("Running...");
    try {
      const response = await fetch(`${API_URL}/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language, code }),
      });
      const data = await response.json();
      setOutput(data.output);
    } catch (error) {
      setOutput("Error connecting to the server.");
    }
  };

  // Function to analyze complexity
  const analyzeComplexity = async () => {
    setComplexity("Analyzing...");
    try {
      const response = await fetch(`${API_URL}/complexity`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language, code }),
      });
      const data = await response.json();
      setComplexity(data.complexity);
    } catch (error) {
      setComplexity("Error analyzing complexity.");
    }
  };

  return (
    <div className={`app-container ${darkMode ? "dark-mode" : "light-mode"}`}>
      <h1 className="app-title">CodeIQ</h1>

      {/* Dark Mode Toggle */}
      <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>

      {/* Language Selection */}
      <select className="language-select" value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="cpp">C++</option>
        <option value="python">Python</option>
      </select>

      {/* Code Editor */}
      <textarea
        className="code-editor"
        placeholder="Write your code here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      {/* Run & Complexity Buttons */}
      <div className="button-container">
        <button className="run-btn" onClick={runCode}>Run Code</button>
        <button className="complexity-btn" onClick={analyzeComplexity}>Analyze Complexity</button>
      </div>

      {/* Display Output */}
      <div className="output-container">
        <h3>Output:</h3>
        <pre className="output-box">{output}</pre>
      </div>

      {/* Display Complexity */}
      <div className="complexity-container">
        <h3>Complexity:</h3>
        <pre className="complexity-box">{complexity}</pre>
      </div>
    </div>
  );
}

export default App;
