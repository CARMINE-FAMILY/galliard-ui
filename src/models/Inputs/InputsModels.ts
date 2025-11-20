import type { InputHTMLAttributes } from "react";

type CompatibleInputTypes = 
  | 'text' 
  | 'email' 
  | 'password' 
  | 'url' 
  | 'tel' 
  | 'number' 
  | 'date' 
  | 'time' 
  | 'datetime-local' 
  | 'search';

export interface InputProps {
    // Valores básicos
    placeholder?: string;
    value?: string;
    setValue?: (text: string) => void;
    label?: string;
    typeInput?: CompatibleInputTypes;
    errorMessage?: string;

    // Estilos
    rounded?: "none" | "sm" | "md" | "lg" | "full";
    width?: string | number;
    height?: string | number;
    shadow?: boolean;
    border?: boolean;
    textSize?: number | string;
    textColor?: string;
    bgColor?: string;
    HorV?: "horizontal" | "vertical";

    // Clases
    customContainerClass?: string;
    customInputClass?: string;
    customIconRClass?: string;
    customIconLClass?: string;

    // Iconos
    seeIconLeft?: boolean;
    seeIconRight?: boolean;
    iconColorL?: string;
    iconColorR?: string;
    iconSizeL?: number;
    iconSizeR?: number;
    iconLeft?: string;
    iconRight?: string;

    // Iconos personalizados
    customIconLeft?: React.ReactNode;
    customIconRight?: React.ReactNode;
    args?: InputHTMLAttributes<HTMLInputElement>;
}