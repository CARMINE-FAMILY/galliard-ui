import { Icon } from "@iconify/react";
import styles from "./ButtonGal.module.scss";
import { forwardRef, useMemo } from "react";
import type { ButtonProps } from "../../models/Button/ButtonModel";
import { getRoundedValue } from "../inputs/utils/Functions";

export const ButtonGal = forwardRef<HTMLButtonElement, ButtonProps>(function ButtonGal({
    label = "Texto del Botón",
    icon = "tabler:send",
    action = () => { alert("Botón presionado"); },
    textSize,
    iconSize,
    font,
    width,
    height,

    styleType = "ThemeDark",
    rounded = 'md',
    borderedStyle = false,
    iconOn,

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
                height: height ?? 35,
                flexDirection: iconOn === 'left' ? "row-reverse" : 'row',
                boxShadow: `${shadow ? '0 0 7px ' + (colorShadow ? colorShadow : '#000') : ''}`
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

            {!customIcon ? icon &&
                <Icon
                    icon={icon}
                    className={`${styles.iconButton} ${customClassIcon}`}
                    style={{ fontSize: iconSize }}
                />
                :
                <div className={`${styles.containerCustomIcon} ${customClassIcon}`}>
                    {// Icono derecho personalizado
                        customIcon}
                </div>
            }
        </button>
    );
});