import type { InputHTMLAttributes } from "react";
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
    
    HorV?: 'horizontal' | 'vertical';
    iconSize?: string | number;
    iconColor?: string;

    customInputClass?: string;
    customLabelClass?: string;
    customContainerRadiosClass?: string;
}