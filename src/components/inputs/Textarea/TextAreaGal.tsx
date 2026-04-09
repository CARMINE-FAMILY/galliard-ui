import { Icon } from "@iconify/react";
import { forwardRef, useMemo } from "react";
import styles from "./TextAreaGal.module.scss";
import { getRoundedValue } from "../utils/Functions";
import type { TextAreaProps } from "../../../models/Inputs/TextAreaModel";

export const TextAreaGal = forwardRef<HTMLTextAreaElement, TextAreaProps>(function InputText(
    {
        placeholder,
        value,
        setValue,
        label,
        errorMessage,
        seeMaxCharCounter = true,
        maxCharacters = 300,
        resize = true,
        font,
        fontLabel,

        rounded,
        width = 250,
        height = 100,
        maxWidth = 500,
        maxHeight = 500,
        border,
        shadow,
        textSize,
        textColor,
        bgColor,

        customContainerClass,
        customTextAreaClass,
        customIconClass,

        seeIcon,
        iconInRight = false,
        iconColor,
        iconSize,
        icon,

        customIcon,
        args
    },
    ref
) {

    const getRounded: number = useMemo(() => {
        return getRoundedValue(rounded ?? "lg");
    }, [rounded]);

    return (
        <div
            className={styles.container}
        >
            <div className={styles.containerLabel} style={{flexDirection: iconInRight ? 'row-reverse' : 'row', justifyContent: iconInRight ? 'flex-end' : 'flex-start'}}>

                {!customIcon ? seeIcon &&
                    <Icon
                        icon={icon ?? "mi:user"}
                        className={`${styles.icon} ${customIconClass}`}
                        style={{ color: iconColor, fontSize: iconSize }}
                    />
                    :
                    <div
                        className={`${styles.containerCustomIcon} ${customIconClass}`}
                        style={{ height: iconSize }}
                    >
                        {customIcon}
                    </div>
                }
                <label
                    style={{
                        fontSize: textSize,
                        color: textColor,
                        fontFamily: fontLabel
                    }}
                >
                    {label}
                </label>
            </div>

            <div className={styles.containerInputError}>
                <div
                    className={`${styles.containerInput} ${customContainerClass}`}
                    style={{
                        borderRadius: getRounded,
                        border: border || border === undefined ? "" : "none",
                        boxShadow: shadow ? "0 0 5px #00000075" : "",
                        backgroundColor: bgColor,
                        resize: resize ? "both" : "none",
                        width: width,
                        height: height,
                        minWidth: width,
                        minHeight: height,
                        maxWidth: maxWidth,
                        maxHeight: maxHeight
                    }}
                >
                    <textarea
                        ref={ref}
                        className={`${styles.inputElement} ${customTextAreaClass}`}
                        style={{
                            fontSize: textSize,
                            color: textColor,
                            fontFamily: font
                        }}
                        placeholder={placeholder}
                        value={value}
                        maxLength={maxCharacters}
                        onChange={(e) => setValue?.(e.target.value)}
                        {...args}
                    />

                    {seeMaxCharCounter &&
                        <p className={styles.counterCharacter}>{value ? value?.length : 0}/{maxCharacters}</p>
                    }
                </div>

                {errorMessage !== "" && <p className={styles.errorMessage}>{errorMessage}</p>}
            </div>
        </div>
    );
});