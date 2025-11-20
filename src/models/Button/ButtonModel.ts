import type { ButtonHTMLAttributes } from "react";

export interface ButtonProps {
    // Propiedades
    label?: string;
    icon?: string;
    action: () => void;
    textSize?: string;
    iconSize?: string;
    font?: 'OpenSansLight' | 'OpenSansRegular' | 'OpenSansSemiBold' | 'OpenSansBold' | 'OpenSansBolder';
    width?: string | number;
    height?: string | number;

    // temas
    styleType?: 'ThemeDark' | 'ThemeLight' | 'ThemeGreen' | 'ThemeRed' | 'ThemeBlue' | 'ThemeYellow' | 'ThemePurple' | 'ThemeGray';
    rounded?: "none" | "sm" | "md" | "lg" | "full";
    borderedStyle?: boolean;
    iconOn?: 'left' | 'right';

    // Sombra
    shadow?: boolean;
    colorShadow?: string;

    // Clases propias dle usuario
    customClassButton?: string;
    customClassLabel?: string;
    customClassIcon?: string;

    // Personalizados
    customIcon?: React.ReactNode;
    args?: ButtonHTMLAttributes<HTMLButtonElement>;
}