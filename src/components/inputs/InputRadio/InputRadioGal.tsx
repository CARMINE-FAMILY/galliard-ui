import { Icon } from "@iconify/react";
import { forwardRef, useId } from "react";
import styles from "./InputRadioGal.module.scss";
import type { RadioProps } from "../../../models/Inputs/InputRadioModel";

export const InputRadioGal = forwardRef<HTMLInputElement, RadioProps>(function InputRadio(
    {
        label,
        labelSize,
        labelColor,
        options,
        errorMessage,
        textSize,
        textColor,
        setValue,
        name,
        
        HorV = 'horizontal',
        icon,
        iconInRight,
        iconSize,
        iconColor,
        customIcon,
        seeIcon = true,

        customInputClass,
        customLabelClass,
        customTextClass,
        customIconLabelClass,
        customContainerRadiosClass
    },
    ref
) {
    const groupId = useId();

    return (
        <div ref={ref} className={styles.container}>
            <div className={styles.containerLabel} style={{flexDirection: iconInRight ? 'row-reverse' : 'row', justifyContent: iconInRight ? 'flex-end' : 'flex-start'}}>

                {!customIcon ? seeIcon &&
                    <Icon
                        icon={icon ?? "mi:user"}
                        className={`${styles.icon} ${customIconLabelClass}`}
                        style={{ color: iconColor, fontSize: iconSize }}
                    />
                    :
                    <div
                        className={`${styles.containerCustomIcon} ${customIconLabelClass}`}
                        style={{ height: iconSize }}
                    >
                        {customIcon}
                    </div>
                }
                <label
                    style={{
                        fontSize: labelSize,
                        color: labelColor
                    }}
                    className={customTextClass}
                >
                    {label}
                </label>
            </div>
            
            <div className={styles.containerInputError}>
                <div
                    className={`${styles.containerGroupRadio} ${customContainerRadiosClass}`}
                    style={{
                        flexDirection: HorV === 'vertical' ? 'column' : 'row',
                        alignItems: HorV === 'vertical' ? 'stretch' : 'center',
                        justifyContent: HorV === 'vertical' ? 'center' : 'flex-start'
                    }}
                >
                    {options.map((option, index) => {
                        const uniqueId = `${groupId}-${index}`;

                        return (
                            <div key={groupId + option.value} className={styles.containerRadio}>
                                <input
                                    id={uniqueId}
                                    className={`${styles.inputElement} ${customInputClass}`}
                                    style={{ fontSize: textSize, color: textColor }}
                                    type="radio"
                                    name={name}
                                    value={option.value}
                                    onChange={(e) => setValue(e.target.value)}
                                />

                                {!option.customIcon ? option.seeIcon &&
                                    <Icon
                                        icon={option.icon ?? "mi:user"}
                                        className={`${styles.icon} ${option.customIconClass}`}
                                        style={{ color: option.iconColor, fontSize: iconSize }}
                                    />
                                    :
                                    <div className={`${styles.containerCustomIcon} ${option.customIconClass}`}>
                                        {option.customIcon}
                                    </div>
                                }

                                <label
                                    htmlFor={uniqueId}
                                    className={customLabelClass}
                                    style={{
                                        fontSize: textSize,
                                        color: textColor,
                                    }}
                                >
                                    {option.label}
                                </label>
                            </div>
                        );
                    })}
                </div>

                {errorMessage !== "" && <p className={styles.errorMessage}>{errorMessage}</p>}
            </div>
        </div>
    );
});