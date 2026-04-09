import type { TextareaHTMLAttributes } from "react";

export interface TextAreaProps {
    // Valores básicos
    placeholder?: string;
    value?: string;
    setValue?: (text: string) => void;
    label?: string;
    errorMessage?: string;
    seeMaxCharCounter?: boolean;
    maxCharacters?: number;
    font?: 'OpenSansLight' | 'OpenSansRegular' | 'OpenSansSemiBold' | 'OpenSansBold' | 'OpenSansBolder';
    fontLabel?: 'OpenSansLight' | 'OpenSansRegular' | 'OpenSansSemiBold' | 'OpenSansBold' | 'OpenSansBolder';

    // Estilos
    rounded?: "none" | "sm" | "md" | "lg";
    width?: string | number;
    height?: string | number;
    maxWidth?: string | number;
    maxHeight?: string | number;
    shadow?: boolean;
    border?: boolean;
    textSize?: number | string;
    textColor?: string;
    bgColor?: string;
    iconInRight?: boolean;
    resize?: boolean;

    // Clases
    customContainerClass?: string;
    customTextAreaClass?: string;
    customIconClass?: string;

    // Iconos
    seeIcon?: boolean;
    iconColor?: string;
    iconSize?: number;
    icon?: string;

    // Iconos personalizados
    customIcon?: React.ReactNode;
    args?: TextareaHTMLAttributes<HTMLTextAreaElement>;
}