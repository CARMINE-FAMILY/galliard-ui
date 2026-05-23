import type { HTMLAttributes, HtmlHTMLAttributes } from "react";

export interface BottomSheetModel {
    isOpen?: boolean;
    setIsOpen?: (isOpen: boolean) => void;
    transitionDuration?: 0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1;
    canDisapear: boolean;

    disapearPercent?:  0 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90;
    startHeightPercentPosition: 0 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100;
    maxHeightPercentPosition?: 0 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100 | null;
    minHeightPercentPosition?: 0 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100 | null;
    widthPercent?: "20%" | "30%" | "40%" | "50%" | "60%" | "70%" | "80%" | "90%" | "100%";

    useBackdrop?: boolean;
    children: React.ReactNode;
    closeOnBackdropClick?: boolean;
    headerBg?: string;
    bodyBg?: string;
    backdropBlur?: number;
    backdropColor?: string;
    draggElementColor?: string;

    customBackdropClass?: string;
    customContainerClass?: string;
    customBodyClass?: string;
    args?: HTMLAttributes<HTMLDivElement>;
}