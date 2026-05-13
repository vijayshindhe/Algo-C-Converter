// Algo_c.jsx — Bold Professional Redesign

import React, { useState } from "react";
import { convertToC, EXAMPLE_ALGORITHM } from "../utils/converter";
import { styles } from "../utils/styles";

function AlgoC() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState({ code: "", tokens: [], errors: [] });
  const [viewMode, setViewMode] = useState("code"); // "code" or "tokens"
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    const textToCopy = viewMode === "code" ? output.code : JSON.stringify(output.tokens, null, 2);
    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const loadExample = () => setInput(EXAMPLE_ALGORITHM);
  const clearAll = () => {
    setInput("");
    setOutput({ code: "", tokens: [], errors: [] });
  };

  const handleConvert = () => {
    const result = convertToC(input);
    setOutput(result);
  };

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <header style={styles.header}>
        <h1 style={styles.title} className="bold-title">
          ALGO TO C CONVERTER
        </h1>
        
        {/* OBJECTIVE BOXES */}
        <div style={styles.objectivesWrapper}>
          <div style={styles.objectiveBox} className="glass-card">Lexical Analysis</div>
          <div style={styles.objectiveBox} className="glass-card">Syntax Analysis</div>
          <div style={styles.objectiveBox} className="glass-card">Code Generation</div>
          <div style={styles.objectiveBox} className="glass-card">Logic Mapping</div>
        </div>

        <h2 style={styles.subtitle}>
          Lexical & Syntax Translation Engine
        </h2>
        
        <p style={styles.description}>
          A comprehensive tool for identifying keywords, identifiers, and syntax trees 
          to generate executable C source code from high-level algorithms.
        </p>
      </header>

      {/* MAIN */}
      <main style={styles.main}>
        {/* ACTION BAR */}
        <div style={styles.topButtonWrapper}>
          <button
            style={styles.convertBtnTop}
            className="btn-primary"
            onClick={handleConvert}
          >
            RUN COMPILER ENGINE
          </button>
        </div>

        {/* PANELS */}
        <div style={styles.panelsWrapper}>
          {/* INPUT PANEL */}
          <div style={styles.panel} className="glass-card">
            <div style={styles.panelHeader}>
              <h2 style={styles.panelTitle}>ALGORITHM INPUT</h2>
              <div style={styles.panelActions}>
                <button 
                  style={styles.secondaryBtn} 
                  className="btn-secondary" 
                  onClick={loadExample}
                >
                  LOAD SAMPLE
                </button>
                <button 
                  style={styles.secondaryBtn} 
                  className="btn-secondary" 
                  onClick={clearAll}
                >
                  CLEAR
                </button>
              </div>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter Pseudo-code (e.g. START, IF, REPEAT)..."
              style={styles.textarea}
            />
          </div>

          {/* OUTPUT PANEL */}
          <div style={styles.panel} className="glass-card">
            <div style={styles.panelHeader}>
              <div style={{ display: "flex", gap: "10px" }}>
                <h2 
                  style={{ ...styles.panelTitle, cursor: "pointer", color: viewMode === "code" ? "#4f46e5" : "#0f172a" }}
                  onClick={() => setViewMode("code")}
                >
                  C SOURCE
                </h2>
                <span style={{ color: "#cbd5e1" }}>|</span>
                <h2 
                  style={{ ...styles.panelTitle, cursor: "pointer", color: viewMode === "tokens" ? "#4f46e5" : "#0f172a" }}
                  onClick={() => setViewMode("tokens")}
                >
                  TOKENS
                </h2>
              </div>
              <button 
                style={styles.copyBtn} 
                onClick={copyToClipboard}
              >
                {isCopied ? "COPIED!" : "COPY"}
              </button>
            </div>
            <pre style={styles.codeBlock}>
              {output.errors.length > 0 ? (
                <span style={{ color: "#ef4444" }}>
                  {output.errors.map(e => `Error: ${e}`).join("\n")}
                </span>
              ) : (
                viewMode === "code" 
                  ? (output.code || "// Awaiting Input...") 
                  : (output.tokens.length > 0 
                      ? output.tokens.map(t => `[${t.type}: ${t.value} (Line ${t.line})]`).join("\n")
                      : "// No tokens identified yet...")
              )}
            </pre>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AlgoC;