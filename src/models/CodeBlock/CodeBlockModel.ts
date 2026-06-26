export type CodeLanguage = "tsx" | "ts" | "js" | "jsx" | "scss" | "bash";

// Debe coincidir EXACTO con las llaves de $themes en el .module.scss
export type CodeTheme =
  | "black"
  | "light"
  | "dracula"
  | "orange"
  | "green"
  | "solarized-light"
  | "blue"
  | "yellow"
  | "red";

// Cada llave aqui = una variable CSS --code-* en el .module.scss.
// Si agregas una variable nueva al scss, agregala tambien aqui
// (mismo nombre, sin el prefijo "--code-").
// fadeFrom/fadeTo/buttonBg vienen de CollapsibleCode: se fusionaron
// aqui porque ahora cualquier tab puede ser collapsible.
export interface CodeThemeValues {
  bg: string;
  bgHeader: string;
  border: string;
  textMuted: string;
  textActive: string;
  accent: string;
  success: string;
  fadeFrom: string;
  fadeTo: string;
  buttonBg: string;
  keyword: string;
  string: string;
  comment: string;
  function: string;
  type: string;
  number: string;
  operator: string;
  tag: string;
  attribute: string;
  punctuation: string;
  variable: string;
  plain: string;
  fontSize: string;
  lineHeight: string;
  padding: string;
  radius: string;
  fontFamily: string;
}

export interface CodeTab {
  label: string;
  code: string;
  language?: CodeLanguage;
  theme?: CodeTheme; // default: "black". Cada tab puede tener su propio tema
  customTheme?: Partial<CodeThemeValues>; // override parcial solo para este tab
  // Si true, este tab nace colapsado (fade + boton "Ver mas/menos").
  // Si no se manda, el tab se muestra completo (comportamiento original).
  collapsible?: boolean;
  previewLines?: number; // default 8. Solo aplica si collapsible es true.
}

export type TokenType =
  | "keyword"
  | "string"
  | "comment"
  | "function"
  | "type"
  | "number"
  | "operator"
  | "tag"
  | "attribute"
  | "punctuation"
  | "variable"
  | "plain";

export interface Token {
  type: TokenType;
  value: string;
}

export interface CodeBlockProps {
  tabs: CodeTab[];
  className?: string;
}