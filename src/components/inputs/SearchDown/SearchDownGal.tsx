import { Icon } from "@iconify/react";
import React, { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import styles from "./SearchDownGal.module.scss";
import type { OptionsSearchModel, SearchDownProps } from "@/models/Inputs/SearchDownModel";
import { getRoundedValue } from "../utils/Functions";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";
import { useDebounceCallback } from "@/hooks/useDebouncer";

export const SearchDownGal = forwardRef<HTMLInputElement, SearchDownProps>(function SearchDownBox(
    {
        label,
        value,
        setValue,
        searchAction,
        useForApi = false,
        options = [],
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
    const originalOptions = useRef<OptionsSearchModel[]>(options)

    const [seeOpt, setSeeOpt] = useState<boolean>(false);
    const [internalSearch, setInternalSearch] = useState<string>('');
    const [internalOptions, setInternalOptions] = useState<OptionsSearchModel[]>(options);

    const divRef = useRef<HTMLDivElement>(null);

    // Busca sobre una lista que se comparte al componente
    const searchInStaticList = (): void => {
        const data: OptionsSearchModel[] = originalOptions.current.filter(x => x.text.toLowerCase().includes(internalSearch?.toLocaleLowerCase()));
        setInternalOptions(data);
    }

    const searchCustomList = (e: string): void => {
        if(searchAction !== undefined ){
            searchAction(e);
        } 
        setSeeOpt(true);
    }

    const debouncedSearch = useDebounceCallback(searchInStaticList, .5);
    const debouncedCustomAction = useDebounceCallback(searchCustomList, .5);

    const defaultValue: OptionsSearchModel = { valueOption: null, text: placeholder ?? "Escribe para buscar" };

    // cierra el dropdown al hacer click fuera de options container
    useOnClickOutside(divRef, () => {
        setSeeOpt(false);
    });

    useEffect(() => {
        if (internalSearch !== '') {
            debouncedSearch();
            setSeeOpt(true);
        }else{
            setSeeOpt(false);
        }
    }, [internalSearch]);

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
                        <Icon
                            icon={'icon-park-solid:search'}
                            className={styles.icon}
                            style={{ color: iconsColor, fontSize: iconsOptionsSize }}
                        />

                        <input
                            type="text"
                            className={styles.inputElement}
                            value={internalSearch}
                            placeholder={value?.text ? value.text : defaultValue.text}
                            onClick={(e: React.MouseEvent<HTMLInputElement>): void => {
                                if ((!seeOpt && internalOptions.length > 0) && e.currentTarget.value !== '') {
                                    setSeeOpt(true);
                                }
                            }}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                e.preventDefault();
                                // Valida si usar la funcion personalizable o no
                                if (useForApi) {
                                    debouncedCustomAction(e.target.value.toString());
                                }
                                else if (!useForApi) {
                                    setInternalSearch(e.target.value.toString())
                                }
                            }}
                            style={{
                                fontSize: labelSize,
                                color: labelColor,
                                fontWeight: value?.valueOption ? 'bold' : '',
                                fontFamily: font
                            }}
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
                                        
                                        if (!useForApi) {
                                            setInternalSearch(option.text);
                                        }
                                    }}
                                    className={`${styles.optionElement} ${customOptionClass}`}
                                >
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