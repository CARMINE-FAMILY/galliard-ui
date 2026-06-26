import { useState, type CSSProperties } from "react";
import type {
  CopyTextProps,
  CopyTextThemeValues,
} from "../../models/CopyText/CopyTextModel";
import styles from "../CopyText/CopyTextGal.module.scss";
import { Icon } from "@iconify/react";

function CopyIcon() {
  return <Icon icon="icon-park-solid:copy" />;
}

function CheckIcon() {
  return <Icon icon="streamline-ultimate-color:check" />;
}

// Traduce la llave camelCase del modelo al nombre real de la
// variable CSS en el scss (ej. paddingY -> --it-padding-y).
const CSS_VAR_MAP: Record<keyof CopyTextThemeValues, string> = {
  bg: "--ct-bg",
  border: "--ct-border",
  text: "--ct-text",
  buttonBg: "--ct-button-bg",
  buttonBorder: "--ct-button-border",
  success: "--ct-success",
  radius: "--ct-radius",
  width: "--ct-width",
  paddingY: "--ct-padding-y",
};

// Solo arma variables CSS para las llaves que el usuario SI mando;
// lo que no se pasa cae al default definido en el scss.
function buildCustomStyle(
  customStyle?: Partial<CopyTextThemeValues>,
): CSSProperties {
  if (!customStyle) return {};

  const style: Record<string, string> = {};

  for (const key in customStyle) {
    const typedKey = key as keyof CopyTextThemeValues;
    const value = customStyle[typedKey];
    if (value) {
      style[CSS_VAR_MAP[typedKey]] = value;
    }
  }
  return style as CSSProperties; 
}

export function CopyTextGal({
  command,
  className,
  theme = "solarized-light",
  customStyle,
}: CopyTextProps) {
  const [copied, setCopied] = useState(false);

  const inlineStyle = buildCustomStyle(customStyle);

  // funcion para el metodo de copiar
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      //tiempo que tarda en copiar y que cambie el icono
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Error al copiar:", error);
    }
  };

  return (
    <div
      className={`${styles["copyText-wrapper"]} ${className ?? ""}`}
      data-theme={theme}
      style={inlineStyle}
    >
      <span className={styles["copyText-text"]}>{command}</span>

      <button
        //funcion para copiar
        onClick={handleCopy}
        aria-label="Copiar comando"
        className={`${styles["copyText-copyButton"]} ${
          copied ? styles.copied : ""
        }`}
      >
        {copied ? <CheckIcon /> : <CopyIcon />}

        {copied && <span className={styles["copyText-tooltip"]}>Copiado</span>}
      </button>
    </div>
  );
}
