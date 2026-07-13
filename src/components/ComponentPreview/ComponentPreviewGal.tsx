import { useState, type CSSProperties } from "react";
import { CodeBlockGal } from "../CodeBlock/CodeBlockGal";
import type {
  ComponentPreviewProps,
  PreviewThemeValues,
} from "../../models/ComponentPreview/ComponentPreviewModel";
import styles from "./ComponentPreviewGal.module.scss";

const PREVIEW_CSS_VAR_MAP: Record<keyof PreviewThemeValues, string> = {
  bg: "--preview-bg",
  stripe: "--preview-stripe",
};

// Mismo patron que CodeBlock: solo arma las variables que el
// usuario SI mando; el resto cae al tema base por cascada.
function buildPreviewStyle(
  customTheme?: Partial<PreviewThemeValues>,
): CSSProperties {
  if (!customTheme) return {};

  const style: Record<string, string> = {};

  for (const key in customTheme) {
    const typedKey = key as keyof PreviewThemeValues;
    const value = customTheme[typedKey];
    if (value) {
      style[PREVIEW_CSS_VAR_MAP[typedKey]] = value;
    }
  }

  return style as CSSProperties;
}

export function ComponentPreviewGal({
  children,
  codeTabs,
  previewLabel = "Vista previa",
  theme = "light",
  customTheme,
  codeCustomTheme,
  codeTheme,
  className,
  allowOverflow = true, // antes: false
}: ComponentPreviewProps) {
  const [active, setActive] = useState(0);
  const isPreviewTab = active === 0;
  const previewStyle = buildPreviewStyle(customTheme);

  return (
    <div
      className={`${styles["componentPreview-wrapper"]} ${
        allowOverflow ? styles["componentPreview-wrapperOverflow"] : ""
      } ${className ?? ""}`}
    >
      <div className={styles["componentPreview-tabsContainer"]}>
        <button
          onClick={() => setActive(0)}
          className={`${styles["componentPreview-tabButton"]} ${
            isPreviewTab ? styles.active : ""
          }`}
        >
          {previewLabel}
        </button>

        {codeTabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setActive(i + 1)}
            className={`${styles["componentPreview-tabButton"]} ${
              active === i + 1 ? styles.active : ""
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {isPreviewTab ? (
        <div
          className={`${styles["componentPreview-canvas"]} ${
            allowOverflow ? styles["componentPreview-canvasOverflow"] : ""
          }`}
          data-theme={theme}
          style={previewStyle}
        >
          {children}
        </div>
      ) : (
        <CodeBlockGal
          hideHeaderIfSingleTab
          tabs={[
            {
              label: codeTabs[active - 1].label,
              code: codeTabs[active - 1].code,
              language: codeTabs[active - 1].language,
              theme: codeTheme ?? "blue",
              customTheme: codeCustomTheme,
            },
          ]}
        />
      )}
    </div>
  );
}
