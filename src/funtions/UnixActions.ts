const TIMEZONES = [
    'America/Mexico_City',
    'America/New_York',
    'America/Los_Angeles',
    'America/Bogota',
    'America/Argentina/Buenos_Aires',
    'America/Sao_Paulo',
    'Europe/Madrid',
    'Europe/London',
    'Europe/Paris',
    'Asia/Tokyo',
    'Asia/Shanghai',
    'Australia/Sydney',
    'UTC'
] as const;

type SupportedTimeZone = typeof TIMEZONES[number];

const DEFAULT_TIMEZONE: SupportedTimeZone = 'America/Mexico_City';

// Estandariza los formatos para evitar errores
function getDateParts(date: Date, timeZone: SupportedTimeZone): Record<string, string> {
    const formatter = new Intl.DateTimeFormat('es-MX', {
        timeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });

    return formatter.formatToParts(date).reduce((acc, part) => {
        acc[part.type] = part.value;
        return acc;
    }, {} as Record<string, string>);
}

// Devuelve una fecha en formato unix UTC en segundos
function convertToUnix(dateString: string | Date): number {
    if (!dateString) return 0;

    let date: Date;

    if (typeof dateString === 'string') {
        date = new Date(dateString);
    } else {
        date = dateString;
    }

    return Math.floor(date.getTime() / 1000);
}

// Convierte un unix a un formato YYMMDD compatible con new Date
function unixToDate(
    unixTime: number | null | undefined,
    timeZone: SupportedTimeZone = DEFAULT_TIMEZONE
): string {

    if (!unixTime) return "";

    const date = new Date(unixTime * 1000);
    const parts = getDateParts(date, timeZone);
    return `${parts.year}-${parts.month}-${parts.day}`;
}

// Devuelve un string con AM o PM
function unixToDateTimeString(
    unixTime: number | null | undefined,
    timeZone: SupportedTimeZone = DEFAULT_TIMEZONE
): string {

    if (!unixTime) return "";

    const months = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
    const date = new Date(unixTime * 1000);
    const parts = getDateParts(date, timeZone);

    const monthIndex = parseInt(parts.month, 10) - 1;
    const monthName = months[monthIndex] || parts.month;

    const amPm = parts.dayPeriod ? parts.dayPeriod.toUpperCase().replace(/\./g, '') : '';

    return `${parts.day}/${monthName}/${parts.year} - ${parts.hour}:${parts.minute} ${amPm}`;
}

// Devuelve un string compatible con new Date
function unixToDateTime(
    unixTime: number | null | undefined,
    timeZone: SupportedTimeZone = DEFAULT_TIMEZONE
): string {

    if (!unixTime) return "";

    const date = new Date(unixTime * 1000);

    const formatter = new Intl.DateTimeFormat('es-MX', {
        timeZone,
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', hour12: false
    });

    const parts = formatter.formatToParts(date).reduce((acc, part) => {
        acc[part.type] = part.value;
        return acc;
    }, {} as Record<string, string>);

    return `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute}`;
}

// Devuelve la fecha con el nombre dle mes
function unixToStringYMD(
    unixTimestamp: number | null | undefined,
    timeZone: SupportedTimeZone = DEFAULT_TIMEZONE
): string {
    const formattedDate = unixToDateTimeString(unixTimestamp, timeZone);
    return formattedDate.split(' - ')[0];
}

export { TIMEZONES, convertToUnix, unixToDate, unixToStringYMD, unixToDateTime, unixToDateTimeString }