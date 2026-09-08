import { useCallback } from "react";
import type { ValidateProps } from "../models/Hooks/ValidateModel";
import { convertToUnix, SupportedTimeZone, unixToDate, unixToDateTime } from "../funtions/UnixActions";

export function useValidateForms(): { ApplyValidate: (validations: ValidateProps[]) => boolean } {
    //#region Funcionmes generales

    const messageError = useCallback((
        nameInput: string | null | undefined,
        message: string
    ): string => {
        if (!nameInput || nameInput === undefined || nameInput.length === 0) {
            return "Este campo " + message;
        } else {
            return nameInput + " " + message;
        }
    }, [])

    const isNotNull = useCallback((
        val: any,
        canBeNull?: boolean,
        nameInput?: string,
        setError?: (error: string) => void
    ): boolean => {
        if (canBeNull !== true) {
            if (val === null || val === undefined || (typeof val === 'string' && val.trim() === '')) {
                setError?.(messageError(nameInput, "es obligatorio"));
                return false;
            }
            return true;
        }
        return true;
    }, []);

    //#endregion

    //#region Validaciones de tipo texto

    const valMin = useCallback((
        val: string,
        leng: number,
        nameInput?: string,
        setError?: (error: string) => void
    ): boolean => {
        if (val.length < leng) {
            setError?.(messageError(nameInput, "debe tener mínimo " + leng.toString() + " caracteres"));
            return false;
        }
        return true;
    }, []);

    const valMax = useCallback((
        val: string,
        leng: number,
        nameInput?: string,
        setError?: (error: string) => void
    ): boolean => {
        if (val.length > leng) {
            setError?.(messageError(nameInput, "debe tener máximo " + leng.toString() + " caracteres"));
            return false;
        }
        return true;
    }, []);

    const isEqual = useCallback((
        val: string,
        wordEqual: string,
        nameInput?: string,
        setError?: (error: string) => void
    ): boolean => {
        if (val === wordEqual) {
            setError?.(messageError(nameInput, "debe ser igual a: " + wordEqual));
            return false;
        }
        return true;
    }, []);

    const validateRegex = useCallback((
        val: string,
        regex: RegExp,
        nameInput?: string,
        setError?: (error: string) => void
    ): boolean => {
        const isValid = regex.test(val);

        if (!isValid) {
            setError?.(messageError(nameInput, 'tiene un formato inválido'));
            return false;
        }
        return true;
    }, []);

    const validateEmail = useCallback((
        val: string,
        nameInput?: string,
        setError?: (error: string) => void
    ): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(val);

        if (!isValid) {
            setError?.(messageError(nameInput, 'no es un correo electrónico válido'));
            return false;
        }
        return true;
    }, [messageError]);

    const validatePhone = useCallback((
        val: string,
        nameInput?: string,
        setError?: (error: string) => void
    ): boolean => {
        const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
        const isValid = phoneRegex.test(val);

        if (!isValid) {
            setError?.(messageError(nameInput, 'no es un número de teléfono válido'));
            return false;
        }
        return true;
    }, [messageError]);

    const validateUrl = useCallback((
        val: string,
        nameInput?: string,
        setError?: (error: string) => void
    ): boolean => {
        const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
        const isValid = urlRegex.test(val);

        if (!isValid) {
            setError?.(messageError(nameInput, 'no es una URL válida'));
            return false;
        }
        return true;
    }, [messageError]);

    const validatePass = useCallback((
        val: string,
        nameInput?: string,
        setError?: (error: string) => void
    ): boolean => {
        const passRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
        const isValid = passRegex.test(val);

        if (!isValid) {
            setError?.(messageError(nameInput, 'debe tener al menos 8 caracteres, un número y un símbolo'));
            return false;
        }
        return true;
    }, [messageError]);

    //#endregion

    //#region validaciones de tipo numero

    const validateIsNumber = useCallback((
        val: number | null | undefined,
        nameInput?: string,
        setError?: (error: string) => void
    ): boolean => {
        if (typeof val !== 'number') {
            setError?.(messageError(nameInput, 'debe ser un número'));
            return false;
        }
        return true;
    }, [messageError]);

    const validateMinNum = useCallback((
        val: number,
        min: number,
        nameInput?: string,
        setError?: (error: string) => void
    ): boolean => {
        if (val < min) {
            setError?.(messageError(nameInput, 'debe ser mayor a ' + min.toString()));
            return false;
        }
        return true;
    }, [messageError]);

    const validateMaxNum = useCallback((
        val: number,
        max: number,
        nameInput?: string,
        setError?: (error: string) => void
    ): boolean => {
        if (val > max) {
            setError?.(messageError(nameInput, 'debe ser menor a ' + max.toString()));
            return false;
        }
        return true;
    }, [messageError]);

    const validateIsInteger = useCallback((
        val: number,
        nameInput?: string,
        setError?: (error: string) => void
    ): boolean => {
        if (!Number.isInteger(val)) {
            setError?.(messageError(nameInput, 'debe ser un número entero (sin decimales)'));
            return false;
        }
        return true;
    }, [messageError]);

    const validateBeEqualNumber = useCallback((
        val: number,
        toCompare: number,
        nameInput?: string,
        setError?: (error: string) => void
    ): boolean => {
        if (toCompare === val) {
            setError?.(messageError(nameInput, 'debe ser igual a ' + toCompare.toString()));
            return false;
        }
        return true;
    }, [messageError]);

    //#endregion

    //#region Validaciones de tipo fechas y tiempo

    // Helper reutilizable que recorta la fecha a "YYYY-MM-DD" si es exclusiva de 'date'
    const getSafeUnixDate = useCallback((val: Date | string, isOnlyDate: boolean): number => {
        let safeVal = val;
        if (isOnlyDate && typeof safeVal === 'string' && safeVal.includes('T')) {
            safeVal = safeVal.split(/T| /)[0];
        }
        return convertToUnix(safeVal);
    }, []);

    //#endregion

    const ApplyValidate = (validations: ValidateProps[]): boolean => {
        let flag: boolean = true;

        try {

            validations.forEach(toValidate => {

                if (!isNotNull(
                    toValidate.value,
                    toValidate.canBeNull,
                    toValidate.nameInput,
                    toValidate.setError
                )) {
                    flag = false;
                    return;
                }

                switch (toValidate.typeInput) {

                    // --- GRUPO 1: TEXTO ---
                    case 'text':

                        if ((typeof toValidate.minLength === 'number' && toValidate.minLength > 0) && typeof toValidate.value === 'string') {
                            if (!valMin(
                                toValidate.value,
                                toValidate.minLength,
                                toValidate.nameInput,
                                toValidate.setError
                            )) {
                                flag = false;
                                return;
                            }
                        }

                        if ((typeof toValidate.maxLength === 'number' && toValidate.maxLength > 0) && typeof toValidate.value === 'string') {
                            if (!valMax(
                                toValidate.value,
                                toValidate.maxLength,
                                toValidate.nameInput,
                                toValidate.setError
                            )) {
                                flag = false;
                                return;
                            }
                        }

                        if (typeof toValidate.needBeEqualTo === 'string' && typeof toValidate.value === 'string') {
                            if (!isEqual(
                                toValidate.value,
                                toValidate.needBeEqualTo,
                                toValidate.nameInput,
                                toValidate.setError
                            )) {
                                flag = false;
                                return;
                            }
                        }

                        if (typeof toValidate.regex === 'string' && typeof toValidate.value === 'string') {
                            if (!validateRegex(
                                toValidate.value,
                                toValidate.regex,
                                toValidate.nameInput,
                                toValidate.setError
                            )) {
                                flag = false;
                                return;
                            }
                        }

                        break;

                    // --- GRUPO 2: EMAIL ---
                    case 'email':

                        if (typeof toValidate.value === 'string') {
                            if (!validateEmail(
                                toValidate.value,
                                toValidate.nameInput,
                                toValidate.setError
                            )) {
                                flag = false;
                                return;
                            }
                        }

                        break;

                    // --- GRUPO 3: PHONE ---
                    case 'phone':

                        if (typeof toValidate.value === 'string') {
                            if (!validatePhone(
                                toValidate.value,
                                toValidate.nameInput,
                                toValidate.setError
                            )) {
                                flag = false;
                                return;
                            }
                        }

                        break;

                    // --- GRUPO 4: URL ---
                    case 'url':

                        if (typeof toValidate.value === 'string') {
                            if (!validateUrl(
                                toValidate.value,
                                toValidate.nameInput,
                                toValidate.setError
                            )) {
                                flag = false;
                                return;
                            }
                        }

                        break;

                    // --- GRUPO 5: PASSWORD ---
                    case 'pass':

                        if (typeof toValidate.value === 'string') {
                            if (!validatePass(
                                toValidate.value,
                                toValidate.nameInput,
                                toValidate.setError
                            )) {
                                flag = false;
                                return;
                            }
                        }

                        break;

                    // --- GRUPO 6: NÚMEROS ---
                    case 'num':

                        if (!validateIsNumber(
                            toValidate.value,
                            toValidate.nameInput,
                            toValidate.setError
                        )) {
                            flag = false;
                            return;
                        }

                        if ((typeof toValidate.min === 'number' && toValidate.min > 0) && typeof toValidate.value === 'number') {
                            if (!validateMinNum(
                                toValidate.value,
                                toValidate.min,
                                toValidate.nameInput,
                                toValidate.setError
                            )) {
                                flag = false;
                                return;
                            }
                        }

                        if ((typeof toValidate.max === 'number' && toValidate.max > 0) && typeof toValidate.value === 'number') {
                            if (!validateMaxNum(
                                toValidate.value,
                                toValidate.max,
                                toValidate.nameInput,
                                toValidate.setError
                            )) {
                                flag = false;
                                return;
                            }
                        }

                        if (toValidate.isInteger === true && typeof toValidate.value === 'number') {
                            if (!validateIsInteger(
                                toValidate.value,
                                toValidate.nameInput,
                                toValidate.setError
                            )) {
                                flag = false;
                                return;
                            }
                        }

                        if ((typeof toValidate.needBeEqualTo === 'number' && toValidate.needBeEqualTo > 0) && typeof toValidate.value === 'number') {
                            if (!validateBeEqualNumber(
                                toValidate.value,
                                toValidate.needBeEqualTo,
                                toValidate.nameInput,
                                toValidate.setError
                            )) {
                                flag = false;
                                return;
                            }
                        }

                        break;

                    // --- GRUPO 7: BOOLEANOS --
                    case 'bool':
                        if (toValidate.mustBeTrue === true && toValidate.value !== true) {
                            flag = false;
                            toValidate.setError?.(messageError(toValidate.nameInput, 'debe estar seleccionado'));
                            return;
                        }
                        break;

                    // --- GRUPO 8 y 9: FECHAS Y DATETIME FUSIONADOS ---
                    case 'date':
                    case 'date-time': {
                        let dateN: number;
                        let tz: SupportedTimeZone = toValidate.timeZone ?? "UTC"; // time zone por defecto en utc para que no modifique lo que se le paso
                        
                        // Determinamos el tipo para formatear mensajes y recortar la fecha
                        const isOnlyDate = toValidate.typeInput === 'date';
                        const formatFn = isOnlyDate ? unixToDate : unixToDateTime;

                        if (typeof toValidate.value === 'number' && toValidate.value.toString().length === 10) {
                            dateN = toValidate.value;
                        } else if (toValidate.value instanceof Date || typeof toValidate.value === 'string') {
                            // Se utiliza el helper reutilizable para convertir
                            const convertedUnix = getSafeUnixDate(toValidate.value, isOnlyDate);

                            if (isNaN(convertedUnix) || convertedUnix === 0) {
                                flag = false;
                                toValidate.setError?.(messageError(toValidate.nameInput, 'no es una fecha válida'));
                                return;
                            }
                            dateN = convertedUnix;
                        } else {
                            flag = false;
                            toValidate.setError?.(messageError(toValidate.nameInput, 'tiene un formato de fecha inválido'));
                            return;
                        }

                        if (toValidate.min) {
                            if (toValidate.min instanceof Date || typeof toValidate.min === 'string') {
                                const min = getSafeUnixDate(toValidate.min, isOnlyDate);

                                if (dateN < min) {
                                    flag = false;
                                    toValidate.setError?.(messageError(toValidate.nameInput, 'no puede ser menor que ' + formatFn(min, tz)));
                                    return;
                                }
                            } else {
                                flag = false;
                                toValidate.setError?.(messageError(toValidate.nameInput, "tiene un 'min' inválido"));
                                return;
                            }
                        }

                        if (toValidate.max) {
                            if (toValidate.max instanceof Date || typeof toValidate.max === 'string') {
                                const max = getSafeUnixDate(toValidate.max, isOnlyDate);

                                if (dateN > max) {
                                    flag = false;
                                    toValidate.setError?.(messageError(toValidate.nameInput, 'no puede ser mayor que ' + formatFn(max, tz)));
                                    return;
                                }
                            } else {
                                flag = false;
                                toValidate.setError?.(messageError(toValidate.nameInput, "tiene un 'max' inválido"));
                                return;
                            }
                        }
                        break;
                    }

                    // --- GRUPO 10: TIEMPO ---
                    case 'time': {

                        // 1. Helper interno: Convierte cualquier formato a "minutos desde medianoche"
                        const getMinutes = (t: Date | string | number | null | undefined): number => {
                            if (t === null || t === undefined) return -1;
                            if (typeof t === 'number') return t; // Si ya envías minutos crudos
                            if (t instanceof Date) return t.getHours() * 60 + t.getMinutes();
                            
                            if (typeof t === 'string') {
                                // Soporta strings de inputs tipo time como "14:30" o "14:30:00"
                                const parts = t.split(':');
                                if (parts.length >= 2) {
                                    return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
                                }
                            }
                            return -1; // Formato inválido
                        };

                        // Helper interno: Regresa los minutos a texto legible (ej. "14:30")
                        const formatTime = (m: number): string => {
                            const hours = Math.floor(m / 60).toString().padStart(2, '0');
                            const mins = (m % 60).toString().padStart(2, '0');
                            return `${hours}:${mins}`;
                        };

                        // Convertimos el valor principal a minutos
                        const timeN = getMinutes(toValidate.value);

                        if (timeN === -1 || isNaN(timeN)) {
                            flag = false;
                            toValidate.setError?.(messageError(toValidate.nameInput, 'no es una hora válida'));
                            return;
                        }

                        // Validación de MIN
                        if (toValidate.min) {
                            const minMinutes = getMinutes(toValidate.min);
                            if (minMinutes !== -1 && !isNaN(minMinutes)) {

                                if (timeN < minMinutes) {
                                    flag = false;
                                    toValidate.setError?.(messageError(toValidate.nameInput, 'no puede ser menor a las ' + formatTime(minMinutes)));
                                    return;
                                }
                            } else {
                                flag = false;
                                toValidate.setError?.(messageError(toValidate.nameInput, "tiene un 'min' de hora inválido"));
                                return;
                            }
                        }

                        // Validación de MAX
                        if (toValidate.max) {
                            const maxMinutes = getMinutes(toValidate.max);
                            if (maxMinutes !== -1 && !isNaN(maxMinutes)) {

                                if (timeN > maxMinutes) {
                                    flag = false;
                                    toValidate.setError?.(messageError(toValidate.nameInput, 'no puede ser mayor a las ' + formatTime(maxMinutes)));
                                    return;
                                }
                            } else {
                                flag = false;
                                toValidate.setError?.(messageError(toValidate.nameInput, "tiene un 'max' de hora inválido"));
                                return;
                            }
                        }
                        break;
                    }

                    // --- GRUPO 11: DATOS GENÉRICOS ---
                    case 'data':
                        return;

                    default:
                        throw new Error("Tipo de validación no reconocida");
                }
            });

            return flag;
        } catch (error) {
            const message = (error as Error).message;
            console.error(`Error: ${message}`);
            throw error;
        }
    }

    return { ApplyValidate };
}