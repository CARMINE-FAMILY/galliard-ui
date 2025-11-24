import { Icon } from "@iconify/react";
import type { InputProps } from "../../../models/Inputs/InputsModels";
import { useState, forwardRef, useCallback, useMemo, useId } from "react";
import styles from "./InputTextGal.module.scss";
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

        seeIconLeft = true,
        seeIconRight,
        iconColorL,
        iconColorR,
        iconColorPass,
        iconSizeL,
        iconSizeR,
        iconSizePass,
        iconLeft,
        iconRight,

        customIconLeft,
        customIconRight,
        args
    },
    ref
) {
    const [seePass, setSeePass] = useState<boolean>(false);

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
                    {!customIconLeft ? seeIconLeft &&
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
                        type={typeInput === 'password' && seePass ? 'text' : typeInput}
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) => setValue?.(e.target.value)}
                        {...args}
                    />

                    {typeInput === 'password' &&
                        <Icon
                            onClick={()=>setSeePass(!seePass)}
                            icon={seePass ? "fluent:eye-20-filled" : "fluent:eye-hide-20-filled"}
                            className={`${styles.icon}`}
                            style={{ color: iconColorPass, fontSize: iconSizePass, marginRight: 10 }}
                        />
                    }

                    {!customIconRight ?
                        seeIconRight &&
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