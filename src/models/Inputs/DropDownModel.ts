import type { HTMLAttributes } from "react"; // [MOD] Se agregó para soporte de `args`.

export interface OptionsDropModel {
    valueOption: number | string | null;
    text: string;
    icon?: string;
    iconColor?: string;
    customIcon?: React.ReactNode;
}

// [MOD] Se agregó `args` para propagar atributos nativos del input.
export interface DropDownProps {
    label?: string;
    value: OptionsDropModel | null;
    setValue: (value: OptionsDropModel | null) => void;
    options: OptionsDropModel[];
    placeholder?: string;    
    errorMessage?: string;
    iconInRight?: boolean;
    orientation?: 'top' | 'left' | 'right' | 'bottom'; 
    font?: 'OpenSansLight' | 'OpenSansRegular' | 'OpenSansSemiBold' | 'OpenSansBold' | 'OpenSansBolder';
    fontLabel?: 'OpenSansLight' | 'OpenSansRegular' | 'OpenSansSemiBold' | 'OpenSansBold' | 'OpenSansBolder';

    rounded?: "none" | "sm" | "md" | "lg" | "full",
    border?: boolean;
    textSize?: number | string;
    textColor?: string;
    labelSize?: number | string;
    labelColor?: string;
    width?: number | string;
    height?: number | string;
    bgColor?: string;
    shadow?: boolean;
    HorV?: "horizontal" | "vertical";

    icon?: string;
    iconSize?: string | number;
    iconsOptionsSize?: string | number;
    seeIcon?: boolean;
    seeOptionsIcons?: boolean;
    iconsColor?: string;
    customIcon?: React.ReactNode;

    customContainerClass?: string;
    customInputClass?: string;
    customLabelClass?: string;
    customIconClass?: string;
    customOptionClass?: string;
    args?: HTMLAttributes<HTMLDivElement>; // [MOD] Se agregó para propagar atributos nativos en el div contenedor (hace de input del dropdown).
}