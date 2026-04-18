import { Icon } from "@iconify/react";
import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import styles from "./DropDownGal.module.scss";
import type { DropDownProps, OptionsDropModel } from "../../../models/Inputs/DropDownModel";
import { getRoundedValue } from "../utils/Functions";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";

export const DropDownGal = forwardRef<HTMLInputElement, DropDownProps>(function DropDownBox(
    {
        label,
        value,
        setValue,
        options,
        placeholder,
        errorMessage,
        orientation = 'bottom',
        iconInRight = false,
        font,
        fontLabel,

        rounded,
        border = true,
        textSize = '1.4em',
        textColor = '#000',
        labelSize = '1.4em',
        labelColor = '#000',
        width = 250,
        height = 40,
        bgColor,
        shadow = false,
        HorV = "vertical",

        icon,
        iconSize = 20,
        iconsOptionsSize = 20,
        seeIcon = false,
        seeOptionsIcons = false,
        iconsColor = '#000',
        customIcon,

        customContainerClass,
        customInputClass,
        customLabelClass,
        customIconClass,
        customOptionClass
    },
    ref
) {
    const [internalOptions, setInternalOptions] = useState<OptionsDropModel[] | null>(null);
    const [seeOpt, setSeeOpt] = useState<boolean>(false);

    const divRef = useRef<HTMLDivElement>(null);

    const defaultValue: OptionsDropModel = { valueOption: null, text: placeholder ?? "Selecciona una opción", icon: 'hugeicons:cursor-magic-selection-04' };

    // cierra el dropdown al hacer click fuera de options container
    useOnClickOutside(divRef, () => {
        setSeeOpt(false);
    });

    useEffect(() => {
        let opts = [defaultValue, ...options];
        setInternalOptions(opts);
    }, []);

    const getRounded: number = useMemo(() => {
        return getRoundedValue(rounded ?? "lg");
    }, [rounded]);

    return (
        <div 
            ref={ref} 
            className={`${styles.container} ${customContainerClass}`} 
            style={{
                flexDirection: HorV === "horizontal" ? "row" : "column"
            }}
        >
            <div className={styles.containerLabel} style={{ flexDirection: iconInRight ? 'row-reverse' : 'row', justifyContent: iconInRight ? 'flex-end' : 'flex-start' }}>

                {!customIcon ? seeIcon &&
                    <Icon
                        icon={icon ?? "icon-park-outline:dot"}
                        className={`${styles.icon} ${customIconClass}`}
                        style={{ color: iconsColor, fontSize: iconSize }}
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
                    className={customLabelClass}
                    style={{
                        fontSize: labelSize,
                        color: labelColor,
                        height: HorV === "horizontal" ? 35 : 'auto',
                        display: HorV === "horizontal" ? 'flex' : 'block',
                        alignItems: HorV === "horizontal" ? 'center' : 'initial',
                        marginRight: HorV === "horizontal" ? 10 : 0,
                        marginBottom: HorV === "vertical" ? 5 : 0,
                        fontFamily: fontLabel
                    }}
                >
                    {label}
                </label>
            </div>

            <div className={styles.containerInputError}>
                <div ref={divRef} className={styles.containerInputAndOptions}>
                    <div
                        onClick={(e) => {
                            e.stopPropagation();
                            setSeeOpt(!seeOpt)
                        }}
                        className={`${styles.containerInput} ${customInputClass}`}
                        style={{
                            width: width,
                            height: height,
                            border: border ? '' : 'none',
                            boxShadow: shadow ? '0 0 10px #00000050' : '',
                            borderRadius: getRounded,
                            backgroundColor: bgColor
                        }}
                    >
                        {seeOptionsIcons && value?.valueOption &&
                            <>
                                {!value?.customIcon ? value?.icon &&
                                    <Icon
                                        icon={value.icon}
                                        className={styles.icon}
                                        style={{ color: value.iconColor ? value.iconColor : iconsColor, fontSize: iconsOptionsSize }}
                                    />
                                    :
                                    <div className={styles.containerCustomIcon}>
                                        {value?.customIcon}
                                    </div>
                                }
                            </>
                        }
                        <p
                            className={styles.textOption}
                            style={{
                                fontSize: labelSize,
                                color: labelColor,
                                fontWeight: value?.valueOption ? 'bold' : '',
                                fontFamily: font
                            }}
                        >
                            {value?.text ? value.text : defaultValue.text}
                        </p>

                        <Icon
                            icon={"ri:arrow-down-s-line"}
                            className={`${styles.icon} ${styles.iconArrow}`}
                        />
                    </div>

                    {seeOpt &&
                        <div
                            className={styles.containerOptions}
                            style={{
                                top: orientation === 'bottom' ? 'calc(100% + 10px)' : orientation === 'left' || orientation === 'right' ? 0 : '',
                                left: orientation === 'right' ? 'calc(100% + 10px)' : orientation === 'top' || orientation === 'bottom' ? 0 : '',
                                bottom: orientation === 'top' ? 'calc(100% + 10px)' : '',
                                right: orientation === 'left' ? 'calc(100% + 10px)' : ''
                            }}
                        >
                            {internalOptions?.map((option, key) =>

                                <div
                                    key={key}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSeeOpt(false);
                                        setValue(option);
                                    }}
                                    className={`${styles.optionElement} ${customOptionClass}`}
                                >
                                    {seeOptionsIcons &&
                                        <div className={`${styles.containerIconOption}`}>
                                            {!option.customIcon ? seeOptionsIcons &&
                                                <Icon
                                                    icon={option.icon ?? "icon-park-outline:dot"}
                                                    className={`${styles.icon} ${styles.containerIconOption}`}
                                                    style={{ color: option.iconColor ? option.iconColor : iconsColor, fontSize: iconsOptionsSize }}
                                                />
                                                :
                                                option.customIcon
                                            }
                                        </div>
                                    }
                                    <p
                                        className={styles.textOption}
                                        style={{
                                            fontSize: textSize,
                                            color: textColor,
                                            fontFamily: font
                                        }}
                                    >
                                        {option.text ? option.text : defaultValue.text}
                                    </p>
                                </div>
                            )}
                        </div>
                    }
                </div>

                {errorMessage !== "" && <p className={styles.errorMessage}>{errorMessage}</p>}
            </div>
        </div>
    );
});