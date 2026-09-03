import type { InputHTMLAttributes } from "react";

export interface OptionsSearchModel {
  valueOption: number | string | null;
  text: string;
}

export interface SearchDownProps {
  label?: string;
  value: OptionsSearchModel | null;
  setValue: (value: OptionsSearchModel | null) => void;
  searchAction?: (
    value: string | null,
  ) => OptionsSearchModel[] | Promise<OptionsSearchModel[]>;
  useForApi: boolean;
  options: OptionsSearchModel[];
  placeholder?: string;
  errorMessage?: string;
  iconInRight?: boolean;
  orientation?: "top" | "left" | "right" | "bottom";
  font?:
    | "OpenSansLight"
    | "OpenSansRegular"
    | "OpenSansSemiBold"
    | "OpenSansBold"
    | "OpenSansBolder";
  fontLabel?:
    | "OpenSansLight"
    | "OpenSansRegular"
    | "OpenSansSemiBold"
    | "OpenSansBold"
    | "OpenSansBolder";

  rounded?: "none" | "sm" | "md" | "lg" | "full";
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
  iconInput?: string;
  iconSize?: string | number;
  iconsOptionsSize?: string | number;
  seeIcon?: boolean;
  seeInputIcon?: boolean;
  iconsColor?: string;
  customIcon?: React.ReactNode;
  customInputIcon?: React.ReactNode;

  customContainerClass?: string;
  customInputClass?: string;
  customLabelClass?: string;
  customIconClass?: string;
  customOptionClass?: string;
  customInputContainerClass?: string;
  
  args?: InputHTMLAttributes<HTMLInputElement>;
}
