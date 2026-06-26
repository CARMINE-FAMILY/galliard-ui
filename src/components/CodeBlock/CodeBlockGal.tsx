import { useState, type CSSProperties } from "react";
import type {
  CodeBlockProps,
  CodeTab,
  CodeThemeValues,
} from "../../models/CodeBlock/CodeBlockModel";
import { tokenize } from "../../hooks/useCodeTokenizer";
import styles from "../../components/CodeBlock/CodeBlockGal.module.scss";

const DEFAULT_PREVIEW_LINES = 8;

// Convierte la llave camelCase del modelo (bgHeader) al nombre
// real de la variable CSS en el scss (--code-bg-header).
const CSS_VAR_MAP: Record<keyof CodeThemeValues, string> = {
  bg: "--code-bg",
  bgHeader: "--code-bg-header",
  border: "--code-border",
  textMuted: "--code-text-muted",
  textActive: "--code-text-active",
  accent: "--code-accent",
  success: "--code-success",
  fadeFrom: "--code-fade-from",
  fadeTo: "--code-fade-to",
  buttonBg: "--code-button-bg",
  keyword: "--code-keyword",
  string: "--code-string",
  comment: "--code-comment",
  function: "--code-function",
  type: "--code-type",
  number: "--code-number",
  operator: "--code-operator",
  tag: "--code-tag",
  attribute: "--code-attribute",
  punctuation: "--code-punctuation",
  variable: "--code-variable",
  plain: "--code-plain",
  fontSize: "--code-font-size",
  lineHeight: "--code-line-height",
  padding: "--code-padding",
  radius: "--code-radius",
  fontFamily: "--code-font-family",
};

// Solo arma variables CSS para las llaves que el usuario SI mando;
// lo que no se pasa, no se incluye, y por cascada cae al tema base.
function buildCustomStyle(
  customTheme?: Partial<CodeThemeValues>,
): CSSProperties {
  if (!customTheme) return {};

  const style: Record<string, string> = {};

  for (const key in customTheme) {
    const typedKey = key as keyof CodeThemeValues;
    const value = customTheme[typedKey];
    if (value) {
      style[CSS_VAR_MAP[typedKey]] = value;
    }
  }

  return style as CSSProperties;
}

function HighlightedCode({ code }: { code: string }) {
  const tokens = tokenize(code);

  return (
    <code>
      {tokens.map((token, i) => (
        // los tokens usan el modulo "token" del scss, no "codeBlock"
        <span key={i} className={styles[`token-${token.type}`]}>
          {token.value}
        </span>
      ))}
    </code>
  );
}

export function CodeBlockGal({ tabs, className }: CodeBlockProps) {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  // expansion independiente por tab: cambiar de tab no resetea
  // el estado de los demas tabs collapsible
  const [expandedByTab, setExpandedByTab] = useState<Record<number, boolean>>(
    {},
  );

  const currentTab: CodeTab = tabs[active];
  // el tema y customTheme vienen del tab ACTIVO; al cambiar de tab,
  // cambia el tema con el, porque currentTab cambia en cada render
  const activeTheme = currentTab.theme ?? "black";
  const customStyle = buildCustomStyle(currentTab.customTheme);

  const isCollapsible = currentTab.collapsible ?? false;
  const previewLines = currentTab.previewLines ?? DEFAULT_PREVIEW_LINES;
  const expanded = expandedByTab[active] ?? false;

  const lines = currentTab.code.trim().split("\n");
  const isLong = isCollapsible && lines.length > previewLines;
  const displayedCode =
    isCollapsible && !expanded
      ? lines.slice(0, previewLines).join("\n")
      : currentTab.code;

  const toggleExpanded = () => {
    setExpandedByTab((prev) => ({ ...prev, [active]: !expanded }));
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentTab.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Error al copiar:", error);
    }
  };

  return (
    // data-theme pone la base; customStyle (inline) gana donde aplique
    <div
      className={`${styles["codeBlock-wrapper"]} ${className ?? ""}`}
      data-theme={activeTheme}
      style={customStyle}
    >
      <div className={styles["codeBlock-header"]}>
        <div className={styles["codeBlock-tabsContainer"]}>
          {tabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`${styles["codeBlock-tabButton"]} ${
                active === i ? styles.active : ""
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <button
          onClick={handleCopy}
          className={`${styles["codeBlock-copyButton"]} ${
            copied ? styles.copied : ""
          }`}
        >
          {copied ? "✓ Copiado" : "📋 Copiar"}
        </button>
      </div>

      <div className={styles["codeBlock-codeWrapper"]}>
        {/* mandas a llamar al ejemplo de tu codigo */}
        <pre className={styles["codeBlock-codePre"]}>
          <HighlightedCode code={displayedCode} />
        </pre>

        {isLong && !expanded && <div className={styles["codeBlock-fade"]} />}
      </div>

      {isLong && (
        <button
          onClick={toggleExpanded}
          className={styles["codeBlock-toggleButton"]}
        >
          {expanded ? "▲ Ver menos" : "▼ Ver más"}
        </button>
      )}
    </div>
  );
}
