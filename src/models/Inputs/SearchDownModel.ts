export interface OptionsSearchModel {
    valueOption: number | string | null;
    text: string;
}

export interface SearchDownProps {
    label?: string;
    value: OptionsSearchModel | null;
    setValue: (value: OptionsSearchModel | null) => void;
    searchAction?: (value: string | null) => void,
    useForApi: boolean;
    options: OptionsSearchModel[];
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
    iconsColor?: string;
    customIcon?: React.ReactNode;

    customContainerClass?: string;
    customInputClass?: string;
    customLabelClass?: string;
    customIconClass?: string;
    customOptionClass?: string;
}