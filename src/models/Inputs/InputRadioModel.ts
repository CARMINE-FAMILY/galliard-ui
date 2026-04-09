import type React from "react";

interface PropsOptions{
    value: string | number; 
    label: string; 
    seeIcon: boolean; 
    icon?: string; 
    iconColor?: string; 
    customIcon?: React.ReactNode;
    customIconClass?: string;
}

export interface RadioProps{
    label: string;    
    name: string;
    options: PropsOptions[];
    setValue: (value: string) => void;
    textSize?: number | string;
    textColor?: string;
    labelSize?: number | string;
    labelColor?: string;
    errorMessage?: string;
    iconInRight?: boolean;
    font?: 'OpenSansLight' | 'OpenSansRegular' | 'OpenSansSemiBold' | 'OpenSansBold' | 'OpenSansBolder';
    fontLabel?: 'OpenSansLight' | 'OpenSansRegular' | 'OpenSansSemiBold' | 'OpenSansBold' | 'OpenSansBolder';
    
    HorV?: 'horizontal' | 'vertical';
    icon?: string;
    iconSize?: string | number;
    iconColor?: string;
    seeIcon?: boolean;
    customIcon?: React.ReactElement;

    customInputClass?: string;
    customLabelClass?: string;
    customTextClass?: string;
    customIconLabelClass?: string;
    customContainerRadiosClass?: string;
}