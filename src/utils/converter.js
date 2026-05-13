// ===============================================
// ADVANCED ALGORITHM TO C CONVERTER
// PROFESSIONAL VERSION WITH LEXICAL & SYNTAX ANALYSIS
// ===============================================

/**
 * LEXICAL ANALYSIS
 * Identifies tokens like keywords, identifiers, operators, and literals.
 */
const tokenize = (input) => {
  const tokens = [];
  const lines = input.split("\n");
  
  const keywords = ["START", "END", "DECLARE", "INPUT", "PRINT", "IF", "THEN", "ELSE", "END IF", "FOR", "TO", "STEP", "END FOR", "WHILE", "END WHILE", "REPEAT", "UNTIL", "SWITCH", "CASE", "DEFAULT", "BREAK", "CONTINUE", "END SWITCH"];
  
  lines.forEach((line, lineIdx) => {
    const trimmed = line.trim();
    if (!trimmed) return;

    // Very simple tokenizer for demonstration
    const words = trimmed.split(/\s+|(?=[=<>!+*/-])|(?<=[=<>!+*/-])/);
    
    words.forEach(word => {
      if (!word) return;
      const upper = word.toUpperCase();
      
      if (keywords.includes(upper)) {
        tokens.push({ type: "KEYWORD", value: upper, line: lineIdx + 1 });
      } else if (/^[a-zA-Z_][a-zA-Z0-9_]*(\[\d+\])?$/.test(word)) {
        tokens.push({ type: "IDENTIFIER", value: word, line: lineIdx + 1 });
      } else if (/^[0-9]+$/.test(word)) {
        tokens.push({ type: "LITERAL", value: word, line: lineIdx + 1 });
      } else if (/^".*"$/.test(word)) {
        tokens.push({ type: "STRING", value: word, line: lineIdx + 1 });
      } else {
        tokens.push({ type: "OPERATOR", value: word, line: lineIdx + 1 });
      }
    });
  });
  
  return tokens;
};

const normalizeAlgorithm = text =>
  text
    .replace(/←/g, "=")
    .replace(/\bREAD\b/gi, "INPUT")
    .replace(/\bWRITE\b/gi, "PRINT")
    .replace(/\bDISPLAY\b/gi, "PRINT")
    .replace(/\bENDIF\b/gi, "END IF")
    .replace(/\bENDFOR\b/gi, "END FOR")
    .replace(/\bENDWHILE\b/gi, "END WHILE")
    .replace(/\bENDSWITCH\b/gi, "END SWITCH")
    .replace(/\bSTOP\b/gi, "END")
    .replace(/\bBEGIN\b/gi, "START")
    .replace(/Step\s+\d+\s*:/gi, "")
    .replace(/\t/g, "    ");

const convertCondition = condition =>
  condition
    .replace(/\bAND\b/gi, "&&")
    .replace(/\bOR\b/gi, "||")
    .replace(/\bNOT\b/gi, "!")
    .replace(/<>/g, "!=")
    .replace(/([^!<>=])=([^=])/g, "$1==$2");

/**
 * MAIN CONVERTER
 * Performs Syntax Analysis and Code Generation
 */
export const convertToC = input => {
  const originalInput = input;
  input = normalizeAlgorithm(input);

  if (!input.trim()) {
    return {
      code: "// Please enter an algorithm",
      tokens: [],
      errors: []
    };
  }

  const tokens = tokenize(originalInput);
  const lines = input.split("\n").map(line => line.trim()).filter(Boolean);

  let code = `#include <stdio.h>\n\nint main() {\n\n`;
  let indent = "    ";
  const declaredVars = new Set();
  const blockStack = [];
  const errors = [];
  let hasStart = false;
  let hasEnd = false;

  lines.forEach((original, index) => {
    const lineNo = index + 1;
    const trimmed = original.toUpperCase();

    if (trimmed === "START") return hasStart = true;
    if (trimmed === "END") {
      hasEnd = true;
      while (blockStack.length) {
        blockStack.pop();
        indent = indent.slice(0, -4);
        code += `${indent}}\n`;
      }
      return;
    }

    if (trimmed.startsWith("DECLARE")) {
      original.replace(/DECLARE/i, "").split(",").map(v => v.trim()).filter(Boolean).forEach(v => declaredVars.add(v));
      return;
    }

    if (trimmed.startsWith("INPUT")) {
      original.replace(/INPUT/i, "").split(",").map(v => v.trim()).filter(Boolean).forEach(v => {
        code += `${indent}printf("Enter ${v}: ");\n`;
        code += `${indent}scanf("%d", &${v});\n`;
      });
      return;
    }

    if (trimmed.startsWith("PRINT")) {
      const value = original.replace(/PRINT/i, "").trim();
      code += /^".*"$/.test(value)
        ? `${indent}printf(${value});\n`
        : `${indent}printf("%d\\n", ${value});\n`;
      return;
    }

    if (trimmed.startsWith("IF ")) {
      const condition = original.replace(/IF/i, "").replace(/THEN/i, "").trim();
      code += `${indent}if (${convertCondition(condition)}) {\n`;
      indent += "    ";
      blockStack.push("IF");
      return;
    }

    if (trimmed === "ELSE") {
      indent = indent.slice(0, -4);
      code += `${indent}} else {\n`;
      indent += "    ";
      return;
    }

    if (trimmed === "END IF") {
      blockStack.pop();
      indent = indent.slice(0, -4);
      code += `${indent}}\n`;
      return;
    }

    if (trimmed.startsWith("FOR ")) {
      const match = original.match(/FOR\s+(\w+)\s*=\s*(.+)\s+TO\s+(.+?)(?:\s+STEP\s+(.+))?$/i);
      if (!match) return errors.push(`Line ${lineNo}: Invalid FOR syntax`);
      const [, loopVar, start, end, step] = match;
      code += `${indent}for (${loopVar} = ${start}; ${loopVar} <= ${end}; ${loopVar} += ${step || 1}) {\n`;
      indent += "    ";
      blockStack.push("FOR");
      return;
    }

    if (trimmed === "END FOR") {
      blockStack.pop();
      indent = indent.slice(0, -4);
      code += `${indent}}\n`;
      return;
    }

    if (trimmed.startsWith("WHILE ")) {
      const condition = original.replace(/WHILE/i, "").trim();
      code += `${indent}while (${convertCondition(condition)}) {\n`;
      indent += "    ";
      blockStack.push("WHILE");
      return;
    }

    if (trimmed === "END WHILE") {
      blockStack.pop();
      indent = indent.slice(0, -4);
      code += `${indent}}\n`;
      return;
    }

    if (trimmed === "REPEAT") {
      code += `${indent}do {\n`;
      indent += "    ";
      blockStack.push("REPEAT");
      return;
    }

    if (trimmed.startsWith("UNTIL ")) {
      const condition = original.replace(/UNTIL/i, "").trim();
      blockStack.pop();
      indent = indent.slice(0, -4);
      code += `${indent}} while (!(${convertCondition(condition)}));\n`;
      return;
    }

    if (trimmed.startsWith("SWITCH ")) {
      const variable = original.replace(/SWITCH/i, "").trim();
      code += `${indent}switch (${variable}) {\n`;
      indent += "    ";
      blockStack.push("SWITCH");
      return;
    }

    if (trimmed.startsWith("CASE ")) {
      indent = indent.slice(0, -4);
      const value = original.replace(/CASE/i, "").trim();
      code += `${indent}case ${value}:\n`;
      indent += "    ";
      return;
    }

    if (trimmed === "DEFAULT") {
      indent = indent.slice(0, -4);
      code += `${indent}default:\n`;
      indent += "    ";
      return;
    }

    if (trimmed === "BREAK") {
      code += `${indent}break;\n`;
      return;
    }

    if (trimmed === "END SWITCH") {
      blockStack.pop();
      indent = indent.slice(0, -4);
      code += `${indent}}\n`;
      return;
    }

    if (/^[a-zA-Z_][a-zA-Z0-9_\[\]]*\s*=/.test(original)) {
      const parts = original.split("=");
      const left = parts[0].trim();
      const right = parts.slice(1).join("=").trim();
      code += `${indent}${left} = ${right};\n`;
      return;
    }

    errors.push(`Line ${lineNo}: Unknown statement -> ${original}`);
  });

  if (!hasStart) errors.push("Algorithm missing START");
  if (!hasEnd) errors.push("Algorithm missing END");
  if (blockStack.length) errors.push(`Unclosed block(s): ${blockStack.join(", ")}`);

  let declarations = "";
  declaredVars.forEach(v =>
    declarations += /\[\d+\]/.test(v) ? `    int ${v};\n` : `    int ${v} = 0;\n`
  );

  code = code.replace("int main() {\n\n", `int main() {\n\n${declarations}\n`);
  code += `\n    return 0;\n}`;

  return { code, tokens, errors };
};

export const EXAMPLE_ALGORITHM = `START
DECLARE i, n
INPUT n
FOR i = 1 TO n
    PRINT i
END FOR
END`;