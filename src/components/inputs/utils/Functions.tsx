//#region OBTENER VALOR DE BORDER RADIUS

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

//#endregion