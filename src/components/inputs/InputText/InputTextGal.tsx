import { Icon } from "@iconify/react";
import type { InputProps } from "../../../models/Inputs/InputsModels";
import { useState, forwardRef, useCallback, useMemo, useId } from "react";
import styles from "./InputText.module.scss";
import { getRoundedValue } from "../utils/Functions";

export const InputTextGal = forwardRef<HTMLInputElement, InputProps>(function InputText(
    {
        placeholder,
        value,
        setValue,
        label,
        typeInput,
        HorV,
        errorMessage,

        rounded,
        width,
        height,
        border,
        shadow,
        textSize,
        textColor,
        bgColor,

        customContainerClass,
        customInputClass,
        customIconRClass,
        customIconLClass,

        seeInputLeft = true,
        seeInputRight,
        iconColorL,
        iconColorR,
        iconSizeL,
        iconSizeR,
        iconLeft,
        iconRight,

        customIconLeft,
        customIconRight,
        args
    },
    ref
) {
    const idDiv = useId();

    const getRounded: number = useMemo(() => {
        return getRoundedValue(rounded ?? "full");
    }, [rounded]);

    return (
        <div 
            className={styles.container} 
            style={{ 
                flexDirection: HorV === "horizontal" ? "row" : "column"
            }}
        >
            <label
                style={{
                    fontSize: textSize,
                    color: textColor,
                    height: HorV === "horizontal" ? 35 : 'auto',
                    display: HorV === "horizontal" ? 'flex' : 'block',
                    alignItems: HorV === "horizontal" ? 'center' : 'initial',
                    marginRight: HorV === "horizontal" ? 10 : 0,
                    marginBottom: HorV === "vertical" ? 5 : 0,
                }}
            >
                {label}
            </label>

            <div className={styles.containerInputError}>
                <div
                    className={`${styles.containerInput} ${customContainerClass}`}
                    style={{
                        borderRadius: getRounded,
                        width: (!width && typeInput === 'datetime-local') ? 'auto' : width,
                        height: height,
                        border: border || border === undefined ? "1px solid #000" : "none",
                        boxShadow: shadow ? "0 0 5px #00000075" : "",
                        backgroundColor: bgColor,
                    }}
                >
                    {!customIconLeft ? seeInputLeft &&
                        <Icon
                            icon={iconLeft ?? "mi:user"}
                            className={`${styles.icon} ${customIconLClass}`}
                            style={{ color: iconColorL, fontSize: iconSizeL }}
                        />
                        :
                        <div className={`${styles.containerCustomIcon} ${customIconRClass}`}>
                            {// Icono izquierdo personalizado
                            customIconLeft}
                        </div>
                    }

                    <input
                        ref={ref}
                        className={`${styles.inputElement} ${customInputClass}`}
                        style={{ fontSize: textSize, color: textColor }}
                        type={typeInput}
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) => setValue?.(e.target.value)}
                        {...args}
                    />

                    {!customIconRight ? seeInputRight &&
                        <Icon
                            icon={iconRight ?? "mi:user"}
                            className={`${styles.icon} ${customIconRClass}`}
                            style={{ color: iconColorR, fontSize: iconSizeR }}
                        />
                        :
                        <div className={`${styles.containerCustomIcon} ${customIconRClass}`}>
                            {// Icono derecho personalizado
                            customIconRight}
                        </div>
                    }
                </div>

                {errorMessage !== "" && <p className={styles.errorMessage}>{errorMessage}</p>}
            </div>
        </div>
    );
});