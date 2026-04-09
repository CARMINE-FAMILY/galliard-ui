import type { InputHTMLAttributes } from "react";

export interface CheckProps {
    label: string;
    value: boolean;
    setValue: (value: boolean) => void;
    textSize?: number | string;
    textColor?: string;
    errorMessage?: string;
    useLinkable?: boolean;
    link?: string;
    font?: 'OpenSansLight' | 'OpenSansRegular' | 'OpenSansSemiBold' | 'OpenSansBold' | 'OpenSansBolder';

    iconSize?: string | number;
    seeIcon: boolean;
    icon?: string;
    iconColor?: string;

    customInputClass?: string;
    customLabelClass?: string;
    customIconClass?: string;

    customIcon?: React.ReactNode;
    args?: InputHTMLAttributes<HTMLInputElement>;
}