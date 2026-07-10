// Parte esencial para que CodeBlockGal funcione
import type { Token, TokenType } from "../models/CodeBlock/CodeBlockModel";

// Orden importa: las reglas se evalúan de arriba a abajo, la primera que matchea gana
const PATTERNS: [RegExp, TokenType][] = [
  [/^\/\/[^\n]*/, "comment"], // comentario de una línea
  [/^\/\*[\s\S]*?\*\//, "comment"], // comentario multilínea
  [/^`(?:[^`\\]|\\.)*`/, "string"], // template strings
  [/^"(?:[^"\\]|\\.)*"/, "string"], // strings con comillas dobles
  [/^'(?:[^'\\]|\\.)*'/, "string"], // strings con comillas simples
  [/^\d+(\.\d+)?/, "number"], // números enteros o decimales
  [
    // palabras reservadas del lenguaje
    /^(?:import|export|from|default|const|let|var|function|return|if|else|for|while|class|extends|implements|new|this|typeof|keyof|as|type|interface|enum|namespace|declare|abstract|readonly|static|public|private|protected|async|await|of|in|instanceof|void|null|undefined|true|false|try|catch|finally|throw|switch|case|break|continue)\b/,
    "keyword",
  ],

  [
    // tipos built-in de TS / utilidades comunes
    /^(?:string|number|boolean|object|any|never|unknown|symbol|bigint|Array|Promise|Record|Partial|Required|Pick|Omit|Readonly|Map|Set|Date|Error|RegExp|Function)\b/,
    "type",
  ],
  [/^<\/?[A-Z][a-zA-Z0-9]*/, "tag"], // componentes JSX (mayúscula inicial)
  [/^<\/?[a-z][a-zA-Z0-9]*/, "tag"], // tags HTML normales (minúscula inicial)
  [/^[a-zA-Z_$][a-zA-Z0-9_$]*(?==)/, "attribute"], // identificador seguido de "=" (prop/atributo)
  [/^[a-zA-Z_$][a-zA-Z0-9_$]*(?=\s*\()/, "function"], // identificador seguido de "(" (llamada a función)
  [/^[a-zA-Z_$][a-zA-Z0-9_$]*/, "variable"], // cualquier otro identificador
  [/^(?:===|!==|=>|>=|<=|&&|\|\||[+\-*/%=!<>&|^~?:])/, "operator"], // operadores
  [/^[{}[\]();,.<>]/, "punctuation"], // signos de puntuación
  [/^[\s\S]/, "plain"], // fallback: cualquier carácter suelto
];

export function tokenize(code: string): Token[] {
  const tokens: Token[] = [];
  let remaining = code; // texto que aún falta procesar

  while (remaining.length > 0) {
    let matched = false;

    // probar cada patrón hasta encontrar el primero que matchee al inicio
    for (const [pattern, type] of PATTERNS) {
      const match = remaining.match(pattern);

      if (match) {
        tokens.push({ type, value: match[0] });
        remaining = remaining.slice(match[0].length); // avanzar lo que se consumió
        matched = true;
        break;
      }
    }

    if (!matched) {
      // seguridad por si ningún patrón matchea (no debería pasar por el fallback "plain")
      tokens.push({ type: "plain", value: remaining[0] });
      remaining = remaining.slice(1);
    }
  }

  return tokens;
}