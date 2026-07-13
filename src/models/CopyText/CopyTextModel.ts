// Debe coincidir EXACTO con las llaves de $themes en el .module.scss
// para que se aplique el color pertinente
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

// Se agregan las variables que usa el inputText
export interface CopyTextThemeValues {
  bg: string;
  border: string;
  text: string;
  buttonBg: string;
  buttonBorder: string;
  success: string;
  radius: string;
  width: string;
  paddingY: string; // alto del padding vertical del cuadro
}

export interface CopyTextProps {
  command: string;
  className?: string;
  theme?: CodeTheme; // este es para que se aplique el color pertinente
  customStyle?: Partial<CopyTextThemeValues>;
  iconPosition?: "left" | "right";
}