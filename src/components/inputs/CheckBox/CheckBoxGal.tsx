import { Icon } from "@iconify/react";
import { forwardRef, useId } from "react";
import styles from "./CheckBoxGal.module.scss";
import type { CheckProps } from "../../../models/Inputs/CheckModel";

export const CheckBoxGal = forwardRef<HTMLInputElement, CheckProps>(function CkeckBox(
    {
        label,
        value,
        errorMessage,
        textSize,
        textColor,
        setValue,
        useLinkable,
        link,

        iconSize,
        seeIcon,
        icon,
        iconColor,

        customInputClass,
        customLabelClass,
        customIconClass,
        customIcon,
        args
    },
    ref
) {
    const uniqueId = useId();

    return (
        <div ref={ref} className={styles.container}>
            <div className={styles.containerInputError}>
                <div className={styles.containerInput}>
                    <input
                        className={`${styles.inputElement} ${customInputClass}`}
                        style={{ fontSize: textSize, color: textColor }}
                        type="checkbox"
                        checked={value}
                        onChange={(e) => setValue(e.target.checked)}
                        {...args}
                    />

                    {!customIcon ? seeIcon &&
                        <Icon
                            icon={icon ?? "mi:user"}
                            className={`${styles.icon} ${customIconClass}`}
                            style={{ color: iconColor, fontSize: iconSize }}
                        />
                        :
                        <div className={`${styles.containerCustomIcon} ${customIconClass}`}>
                            {customIcon}
                        </div>
                    }

                    {useLinkable ?
                        <a
                            className={customLabelClass}
                            href={!link ? '#' : link}
                            style={{
                                fontSize: textSize,
                                color: textColor,
                                textDecoration: 'underline'
                            }}
                        >
                            {label}
                        </a>
                        :
                        <label
                            htmlFor={uniqueId}
                            className={customLabelClass}
                            style={{
                                fontSize: textSize,
                                color: textColor
                            }}
                        >
                            {label}
                        </label>
                    }
                </div>

                {errorMessage !== "" && <p className={styles.errorMessage}>{errorMessage}</p>}
            </div>
        </div>
    );
});