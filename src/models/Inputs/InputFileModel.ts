import type { InputHTMLAttributes } from "react";
import type { AcceptProp } from "../Catalogs/FileCatalog";

export interface InputFileProps {
    label?: string;
    acceptFiles?: AcceptProp;
    textButtonCancel?: string;
    errorMessage?: string;
    selectedFileE: File | null;
    setSelectedFileE: (e: File | null) => void;
    maxMBSize?: number;
    shadow?: boolean;

    width?: string | number;
    height?: string | number;
    bgColor?: string;
    bgColorHover?: string;
    labelSize?: number | string;
    labelColor?: string;
    rounded?: "none" | "sm" | "md" | "lg" | "full";

    iconSize?: string | number;
    seeIcon?: boolean;
    icon?: string;
    iconColor?: string;

    customFIleClass?: string;
    customSelectedClass?: string;
    customLabelClass?: string;
    customIconClass?: string;

    customIcon?: React.ReactNode;
    args?: InputHTMLAttributes<HTMLInputElement>;
}