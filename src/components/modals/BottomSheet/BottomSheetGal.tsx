import { Icon } from '@iconify/react/dist/iconify.js';
import { useEffect, useRef, useState } from 'react';
import type { BottomSheetModel } from "@/models/Modals/BottomSheetModel";
import styles from './BottomSheetGal.module.scss';

export function BottomSheetGal({
    isOpen = true,
    setIsOpen = ():void => {console.log("Open change");},
    transitionDuration = 0.5,
    canDisapear = false,
    disapearPercent = 20,
    startHeightPercentPosition = 50,
    maxHeightPercentPosition = 90,
    minHeightPercentPosition = 20,
    widthPercent = "90%",
    useBackdrop = true,
    children,
    closeOnBackdropClick = false,
    headerBg,
    bodyBg,
    draggElementColor = "#000",
    backdropBlur,
    backdropColor,
    customBackdropClass,
    customBodyClass,
    customContainerClass,
    ...args
}: BottomSheetModel) {
    // Referencias para el panel y la posición inicial del drag
    const sheetRef = useRef<HTMLDivElement | null>(null);
    const startY = useRef<number>(0);
    const startHeight = useRef<number>(0);
    // PARA PRUEBAS
    // const [isOpen, setIsOpen] = useState<boolean>(true);
    const [screenHeight, setScreenHeight] = useState<number>(window.innerHeight);

    // Posiciones del bottomsheet
    const [pxVariant, setPxVariant] = useState<number>(0);
    const [percentFixed, setPercentFixed] = useState<number>(0);
    const [screenInitial, setScreenInitial] = useState<number>(0);
    const [screenMin, setScreenMin] = useState<number>(0);
    const [screenMax, setScreenMax] = useState<number>(0);

    // Cantidad mínima de desplazamiento para cerrar el panel
    const [threshold, setThreshold] = useState<number>(150);

    // Estado para manejar el desplazamiento vertical actual
    const [currentBottom, setCurrentBottom] = useState<number>(0);

    // Estado que indica si se está arrastrando el panel
    const [isDragging, setIsDragging] = useState<boolean>(false);

    // Calcula el height de la pagina actual para usarlo como referencia del 100% del panel
    useEffect(() => {
        const handleResize = () => setScreenHeight(window.innerHeight);

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // calcula cuanto es el 1% del height de la pantalla y lo asigna al pocentaje de desaparicion y el state de 1%
    useEffect(() => {
        if (screenHeight > 0) {
            const percentTemp: number = screenHeight / 100;

            if (canDisapear) {
                setThreshold(percentTemp * disapearPercent);
            }

            let sTemp: number = percentTemp * startHeightPercentPosition;

            setPxVariant(sTemp);
            setPercentFixed(startHeightPercentPosition);
            setScreenInitial(sTemp);

            if (minHeightPercentPosition) {
                setScreenMin(percentTemp * minHeightPercentPosition);
            }

            if (maxHeightPercentPosition) {
                setScreenMax(percentTemp * maxHeightPercentPosition);
            }
        }
    }, [screenHeight, disapearPercent, canDisapear, isOpen]);

    // Desactiva el scroll del cuerpo cuando el panel está abierto
    useEffect(() => {
        if (canDisapear) { 
            document.body.style.overflow = isOpen ? 'hidden' : ''; 
        }
        
        if (isOpen) setCurrentBottom(0);

        return () => {
             document.body.style.overflow = '';
        }
    }, [isOpen, canDisapear]);

    // Evita que se seleccione texto mientras se arrastra el panel
    useEffect(() => {
        document.body.classList.toggle('noSelect', isDragging);
    }, [isDragging]);

    // Calculara en que posicion debe rebotar el bottom sheet al terminar el dragg
    const bounceEndDragg = () => {
        // si se partio desde la posicion inicial
        if (percentFixed === startHeightPercentPosition) {
            if ((minHeightPercentPosition && screenMin) && (pxVariant < screenMin)) {
                startHeight.current = screenMin;
                setPercentFixed(minHeightPercentPosition);
            }

            if ((maxHeightPercentPosition && screenMax) && (pxVariant > screenMax)) {
                startHeight.current = screenMax;
                setPercentFixed(maxHeightPercentPosition);
            }
        }

        // si parte del valor minimo
        if (minHeightPercentPosition && percentFixed === minHeightPercentPosition) {
            if (screenMin && (pxVariant > screenMin && pxVariant < screenInitial)) {
                startHeight.current = screenMin;
                setPercentFixed(minHeightPercentPosition);
            }

            if (pxVariant >= screenInitial && pxVariant < screenMax) {
                startHeight.current = screenInitial;
                setPercentFixed(startHeightPercentPosition);
            }

            if ((maxHeightPercentPosition && screenMax) && (pxVariant > screenMax)) {
                startHeight.current = screenMax;
                setPercentFixed(maxHeightPercentPosition);
            }
        }

        // si parte del valor maximo
        if (maxHeightPercentPosition && percentFixed === maxHeightPercentPosition) {
            if (minHeightPercentPosition && screenMin && (pxVariant < screenMin)) {
                startHeight.current = screenMin;
                setPercentFixed(minHeightPercentPosition);
            }

            if (pxVariant <= screenInitial && pxVariant > screenMin) {
                startHeight.current = screenInitial;
                setPercentFixed(startHeightPercentPosition);
            }

            if (screenMax && (pxVariant < screenMax && pxVariant > screenInitial)) {
                startHeight.current = screenMax;
                setPercentFixed(maxHeightPercentPosition);
            }
        }
    }

    // Manejo de los eventos de drag del panel de muentras se draggea y cuando se suelta
    useEffect(() => {
        // Maneja el movimiento del panel mientras se arrastra
        const handleDrag = (e: any) => {
            const y: number = 'touches' in e ? e.touches[0].clientY : e.clientY;
            const diff: number = y - startY.current;

            setPxVariant(startHeight.current - diff);
            setCurrentBottom(diff);
        };

        // Maneja el fin del arrastre y decide si cerrar el panel o volver a su posición original
        const handleDragEnd = () => {
            setIsDragging(false);

            // Si el panel se ha desplazado más allá del umbral, se cierra. De lo contrario, vuelve a su posición original
            if (sheetRef.current) {
                const divHLessTranslate = sheetRef.current.offsetHeight;

                if (divHLessTranslate < threshold) {
                    if (canDisapear) {
                        setIsOpen(false);
                    } else {
                        setCurrentBottom(0);
                        bounceEndDragg();
                        setPxVariant(startHeight.current);
                    }
                } else {
                    setCurrentBottom(0);
                    bounceEndDragg();
                    setPxVariant(startHeight.current);
                }
            }

            window.removeEventListener("mousemove", handleDrag);
            window.removeEventListener("mouseup", handleDragEnd);
            window.removeEventListener("touchmove", handleDrag);
            window.removeEventListener("touchend", handleDragEnd);
        };

        if (isDragging) {
            window.addEventListener("mousemove", handleDrag);
            window.addEventListener("mouseup", handleDragEnd);
            window.addEventListener("touchmove", handleDrag);
            window.addEventListener("touchend", handleDragEnd);
        }

        return () => {
            window.removeEventListener("mousemove", handleDrag);
            window.removeEventListener("mouseup", handleDragEnd);
            window.removeEventListener("touchmove", handleDrag);
            window.removeEventListener("touchend", handleDragEnd);
        };
    }, [isDragging, currentBottom, setIsOpen]);

    // Inicia el arrastre y guarda la posición inicial del cursor
    const handleDragStart = (e: any) => {
        setIsDragging(true);
        startY.current = 'touches' in e ? e.touches[0].clientY : e.clientY;

        if (sheetRef.current) {
            startHeight.current = sheetRef.current.offsetHeight;
        }
    };

    return (
        <>
            <div
                ref={sheetRef}
                className={`${styles.bottomSheetCardComponent} ${customContainerClass}`}
                style={{
                    transform: `translateX(-50%)`,
                    transition: `all ${isDragging ? 0 : transitionDuration}s ease`,
                    height: isOpen ? (pxVariant) + "px" : 0,
                    visibility: isOpen ? "visible" : "hidden",
                    width: widthPercent
                }}
                {...args}
            >
                <div
                    className={styles.headerBs}
                    onMouseDown={handleDragStart}
                    onTouchStart={handleDragStart}
                    style={{background: headerBg}}
                >
                    <Icon icon="fluent:line-horizontal-1-16-filled" className={styles.icon} style={{ "--color-dinamico": draggElementColor } as React.CSSProperties} />
                </div>
                <div className={`${styles.bodyBs} ${customBodyClass}`} style={{background: bodyBg}}>
                    {children}
                </div>
            </div>

            {useBackdrop &&
                <div
                    className={`${styles.backdropSheetCardComponent} ${customBackdropClass}`}
                    style={{
                        opacity: isOpen ? 1 : 0,
                        pointerEvents: isOpen ? 'auto' : 'none',
                        transition: `opacity ${transitionDuration}s ease`,
                        backdropFilter: `blur(${backdropBlur}px)`,
                        background: backdropColor
                    }}
                    onClick={() => closeOnBackdropClick && setIsOpen(false)}
                ></div>
            }
        </>
    );
};