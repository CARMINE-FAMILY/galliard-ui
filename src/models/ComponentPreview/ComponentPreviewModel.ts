import type { ReactNode } from "react";
import type {
  CodeLanguage,
  CodeTheme,
  CodeThemeValues,
} from "../../models/CodeBlock/CodeBlockModel";

// Debe coincidir EXACTO con las llaves de $themes en
// componentPreview.module.scss
export type PreviewTheme = CodeTheme;

// Variables propias del fondo "Avance" (rayas diagonales).
// Se mantienen separadas de CodeThemeValues porque ComponentPreview
// no muestra codigo en ese tab, solo el componente en vivo.
export interface PreviewThemeValues {
  bg: string;
  stripe: string;
}

// Un snippet de codigo que se muestra como tab dentro del preview
// (ej: { label: "HTML", code: "<button>...</button>" }).
export interface PreviewCodeTab {
  label: string;
  code: string;
  language?: CodeLanguage;
}

export interface ComponentPreviewProps {
  title?: string; // ej: "Botón" (opcional, por si ya lo pones afuera)
  children: ReactNode; // el componente real, montado en vivo en "Avance"
  codeTabs: PreviewCodeTab[]; // ej: [{label:"HTML",...}, {label:"JSX",...}]
  previewLabel?: string; // default: "Avance"
  theme?: PreviewTheme; // tema compartido por el fondo Y los CodeBlock internos
  customTheme?: Partial<PreviewThemeValues>; // override solo del fondo de rayas
  codeCustomTheme?: Partial<CodeThemeValues>; // override solo de los CodeBlock internos
  className?: string;
  codeTheme?: PreviewTheme; // tema indenpendiente para codeblock
  allowOverflow?: boolean; // default: false. Si true, el preview puede crecer y salirse del contenedor padre
}
