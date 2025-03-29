import React, { useState } from "react";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [complexity, setComplexity] = useState("");

  // Function to execute code
  const runCode = async () => {
    setOutput("Running...");
    const response = await fetch("http://localhost:5000/run", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ language, code }),
    });
    const data = await response.json();
    setOutput(data.output);
  };

  // Function to analyze complexity
  const analyzeComplexity = async () => {
    setComplexity("Analyzing...");
    const response = await fetch("http://localhost:5000/complexity", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ language, code }),
    });
    const data = await response.json();
    setComplexity(data.complexity);
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
