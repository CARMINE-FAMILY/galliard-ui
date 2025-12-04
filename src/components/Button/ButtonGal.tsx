import { Icon } from "@iconify/react";
import styles from "./ButtonGal.module.scss";
import { forwardRef, useMemo } from "react";
import type { ButtonProps } from "../../models/Button/ButtonModel";
import { getRoundedValue } from "../inputs/utils/Functions";

export const ButtonGal = forwardRef<HTMLButtonElement, ButtonProps>(function ButtonGal({
    label = "Texto del Botón",
    action = () => { alert("Botón presionado"); },
    font,
    width,
    height,
    
    icon = "tabler:send",
    seeIcon = true,
    textSize,
    iconColor,
    iconSize,

    styleType = "ThemeDark",
    rounded = 'md',
    borderedStyle = false,
    iconOn,
    padding,

    shadow = false,
    colorShadow,

    customClassButton,
    customClassLabel,
    customClassIcon,

    customIcon,
    args
}, ref) {

    const getRounded: number = useMemo(() => {
        return getRoundedValue(rounded ?? "full");
    }, [rounded]);

    return (
        <button
            ref={ref}
            className={`${styles[`btn${styleType}`]} ${borderedStyle && styles[`btnBordered${styleType}`]} ${customClassButton}`}
            style={{
                borderRadius: getRounded,
                width: width ?? 'auto',
                height: height ?? 'auto',
                flexDirection: iconOn === 'left' ? "row-reverse" : 'row',
                boxShadow: `${shadow ? '0 0 7px ' + (colorShadow ? colorShadow : '#000') : ''}`,
                padding: padding
            }}
            onClick={(e) => {
                e.preventDefault();
                action();
            }}
            {...args}
        >
            {label &&
                <p
                    className={`${customClassLabel}`}
                    style={{
                        fontSize: textSize,
                        fontFamily: font
                    }}
                >
                    {label}
                </p>
            }

            {!customIcon ? seeIcon &&
                <Icon
                    icon={icon}
                    className={`${styles.iconButton} ${customClassIcon}`}
                    style={{ fontSize: iconSize, color: iconColor }}
                />
                :
                <div className={`${styles.containerCustomIcon} ${customClassIcon}`}>
                    {customIcon}
                </div>
            }
        </button>
    );
});