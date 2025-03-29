import React, { useState } from "react";
import axios from "axios";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";

const Compiler = () => {
  const [code, setCode] = useState("# Write your Python or C++ code here...");
  const [language, setLanguage] = useState("python");
  const [output, setOutput] = useState("");
  const [complexity, setComplexity] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Function to run code
  const runCode = async () => {
    try {
      const response = await axios.post("http://localhost:5000/run", {
        language,
        code,
      });
      setOutput(response.data.output);
    } catch (error) {
      setOutput("Error running code");
    }
  };

  // Function to analyze complexity
  const analyzeComplexity = async () => {
    try {
      const response = await axios.post("http://localhost:5000/complexity", {
        language,
        code,
      });
      setComplexity(response.data.complexity);
    } catch (error) {
      setComplexity("Error analyzing complexity.");
    }
  };

  return (
    <div className={`compiler-container ${darkMode ? "dark-mode" : "light-mode"}`}>
      <h2>Online Code Compiler</h2>

      {/* Theme Toggle */}
      <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>

      {/* Language Selector */}
      <select onChange={(e) => setLanguage(e.target.value)} value={language}>
        <option value="python">Python</option>
        <option value="cpp">C++</option>
      </select>

      {/* Code Editor */}
      <CodeMirror
        value={code}
        height="300px"
        extensions={[language === "python" ? python() : cpp()]}
        onChange={(value) => setCode(value)}
        theme={darkMode ? "dark" : "light"}
      />

      {/* Run Button */}
      <button onClick={runCode} className="run-btn">
        Run Code
      </button>

      {/* Analyze Complexity Button */}
      <button onClick={analyzeComplexity} className="complexity-btn">
        Analyze Complexity
      </button>

      {/* Complexity Analysis */}
      <div className="complexity">
        <h3>Estimated Complexity:</h3>
        <pre>{complexity}</pre>
      </div>

      {/* Output Display */}
      <div className="output">
        <h3>Output:</h3>
        <pre>{output}</pre>
      </div>
    </div>
  );
};

export default Compiler;
