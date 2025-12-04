import type { ButtonHTMLAttributes } from "react";

export interface ButtonProps {
    // Propiedades
    label?: string;
    action: () => void;
    textSize?: string | number;
    font?: 'OpenSansLight' | 'OpenSansRegular' | 'OpenSansSemiBold' | 'OpenSansBold' | 'OpenSansBolder';
    width?: string | number;
    height?: string | number;
    
    icon?: string;
    seeIcon?: boolean;
    iconSize?: string | number;
    iconColor?: string;
    iconOn?: 'left' | 'right';

    // temas
    styleType?: 'ThemeDark' | 'ThemeLight' | 'ThemeGreen' | 'ThemeRed' | 'ThemeBlue' | 'ThemeYellow' | 'ThemePurple' | 'ThemeGray';
    rounded?: "none" | "sm" | "md" | "lg" | "full";
    borderedStyle?: boolean;
    padding?: string | number;

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