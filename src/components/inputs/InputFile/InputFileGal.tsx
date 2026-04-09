import { Icon } from "@iconify/react";
import { forwardRef, useId, useMemo, useRef, useState, type ChangeEvent, type DragEvent } from "react";
import styles from "./InputFileGal.module.scss";
import type { InputFileProps } from "../../../models/Inputs/InputFileModel";
import { usefileCatalogTranslate } from "../../../hooks/useFileCatalogTranslate";
import { ButtonGal } from "../../Button/ButtonGal";
import { getRoundedValue } from "../utils/Functions";

export const InputFileGal = forwardRef<HTMLInputElement, InputFileProps>(function InputFile(
    {
        label,
        errorMessage,
        acceptFiles = '*',
        selectedFileE,
        setSelectedFileE,
        maxMBSize,
        shadow = true,
        textButtonCancel = "Cancelar",
        font,

        width,
        height,
        bgColor,
        bgColorHover,
        labelSize,
        labelColor,
        rounded = 'md',

        iconSize = 30,
        seeIcon = true,
        icon,
        iconColor = '#fff',

        customFIleClass,
        customSelectedClass,
        customLabelClass,
        customIconClass,

        customIcon,
        args
    },
    ref
) {
    const fileId = useId();

    const counterDrag = useRef<number>(0);

    const [selectedFile, setSelectedFile] = useState<File | null>(selectedFileE);
    const [hovered, setHovered] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [dragActive, setDragActive] = useState<boolean>(false);

    // Obteniendo parseados los tipos de archivo aceptados
    const acceptString = usefileCatalogTranslate(acceptFiles);

    const resetFile = (): void => {
        setSelectedFile(null);
        setSelectedFileE(null);
    }

    // Guardando archivo
    const validateAndSetFile = (file: File) => {
        setError(null);

        if (maxMBSize) {

            // MB * 1024 * 1024 = Bytes
            const maxBytes = maxMBSize * 1024 * 1024;

            if (file.size > maxBytes) {
                setError(`El archivo excede el límite de ${maxMBSize} MB.`);
                resetFile();
                return;
            }
        }
        setSelectedFile(file);
        setSelectedFileE(file);
    }

    // Evento Clikc
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            validateAndSetFile(e.target.files[0]);
        }
        else {
            resetFile();
        }
    };

    // Evento Drag
    const handleDrag = (e: DragEvent<any>) => {
        e.preventDefault();
        e.stopPropagation();

        counterDrag.current += 1;

        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    // Si sale el drag
    const handleDragLeave = (e: DragEvent<any>) => {
        e.preventDefault();
        e.stopPropagation();

        counterDrag.current -= 1;

        if (counterDrag.current === 0) {
            setDragActive(false);
        }
    };

    // Evento Drop
    const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();

        setDragActive(false);
        counterDrag.current = 0;

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            validateAndSetFile(e.dataTransfer.files[0]);
        }
    };

    const getRounded: number = useMemo(() => {
        return getRoundedValue(rounded ?? "lg");
    }, [rounded]);

    return (
        <div className={styles.container}>
            <div className={styles.containerInputError}>
                {!selectedFile ?
                    <label
                        htmlFor={fileId}
                        className={`${styles.containerInputFile} ${customFIleClass}`}
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDragLeave}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleDrop}
                        style={{
                            boxShadow: shadow ? '0 0 5px #00000050' : "",
                            borderRadius: getRounded,

                            backgroundColor: dragActive ?
                                '#fff' : hovered ?
                                    bgColorHover : bgColor
                            ,
                            borderColor: dragActive ?
                                bgColor ? bgColor :
                                    '#6936ee' : ''
                            ,

                            width: width,
                            height: height,
                            fontFamily: font
                        }}
                    >

                        {(!customIcon || dragActive) ? seeIcon &&
                            <Icon
                                icon={dragActive ? 'tabler:drag-drop' : icon ?? "mingcute:upload-3-fill"}
                                className={`${styles.icon} ${customIconClass}`}
                                onDragEnter={handleDrag}
                                onDragLeave={handleDragLeave}
                                style={{
                                    color: !dragActive ?
                                        iconColor : bgColor ?
                                            bgColor : '#6936ee'
                                    ,

                                    fontSize: iconSize
                                }}
                            />
                            :
                            <div
                                className={`${styles.containerCustomIcon} ${customIconClass}`}
                                style={{ height: iconSize ?? '2rem' }}
                            >
                                {customIcon}
                            </div>
                        }

                        <span
                            className={`${styles.textInput} ${customLabelClass}`}
                            style={{
                                fontSize: labelSize,
                                color: !dragActive ?
                                    labelColor : bgColor ?
                                        bgColor : '#6936ee',
                                fontFamily: font

                            }}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDragLeave}
                        >
                            {dragActive ? "Suelta para agregar" : label ?? "Click o arrastra un archivo"}
                        </span>

                        <input
                            ref={ref}
                            id={fileId}
                            type="file"
                            accept={acceptString}
                            className={styles.inputFile}
                            onChange={handleFileChange}
                            {...args}
                        />
                    </label>
                    :
                    <div
                        className={`${styles.containerSelectedFile} ${customSelectedClass}`}
                        style={{
                            boxShadow: shadow ? '0 0 5px #00000050' : "",
                            borderRadius: getRounded,
                            width: width,
                            height: height,
                        }}
                    >
                        {seeIcon &&
                            <Icon
                                icon={"uim:paperclip"}
                                className={styles.icon}
                            />
                        }
                        <p className={styles.fileName} style={{fontFamily: font}}>{selectedFile?.name}</p>

                        <div className={styles.backdrop} style={{ borderRadius: getRounded }}>
                            <ButtonGal
                                styleType='ThemeRed'
                                action={resetFile}
                                label={textButtonCancel}
                                rounded='full'
                                icon="fa:trash"
                                iconSize="1.4rem"
                                iconColor="#fff"
                                textSize={12}
                                padding={'7px'}
                            />
                        </div>
                    </div>
                }

                <p className={styles.errorMessage}>
                    {error ?
                        error : errorMessage ?
                            errorMessage : ""
                    }
                </p>
            </div>
        </div>
    );
});