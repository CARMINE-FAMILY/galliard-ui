export interface OptionsDropModel {
    valueOption: number | string | null;
    text: string;
    icon?: string;
    iconColor?: string;
    customIcon?: React.ReactNode;
}

export interface DropDownProps {
    label?: string;
    value: OptionsDropModel | null;
    setValue: (value: OptionsDropModel | null) => void;
    options: OptionsDropModel[];
    placeholder?: string;    
    errorMessage?: string;
    iconInRight?: boolean;
    orientation?: 'top' | 'left' | 'right' | 'bottom'; 

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
}