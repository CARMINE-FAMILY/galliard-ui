const BRIGHTNESS_THRESHOLD: number = 150;

// obtiene el valor de redondeo segun el parametro 'rounded'

export const getRoundedValue = (rounded: string): number => {
    switch (rounded) {
        case "none":
            return 0;
        case "sm":
            return 5;
        case "md":
            return 10;
        case "lg":
            return 15;
        case "full":
            return 9999;
        default:
            return 0;
    }
};