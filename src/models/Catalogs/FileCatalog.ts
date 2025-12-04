// fileTypes.ts

export const FileCatalog = {
    // --- IMÁGENES (Expandido) ---
    images: {
        common: "image/png, image/jpeg, image/gif, image/webp",
        png: "image/png",
        jpg: "image/jpeg, image/jpg",
        gif: "image/gif",
        svg: "image/svg+xml",
        webp: "image/webp",
        avif: "image/avif",
        ico: "image/x-icon, image/vnd.microsoft.icon",
        tiff: "image/tiff",
        bmp: "image/bmp",
        heic: "image/heic, image/heif", 
    },
    
    // --- DOCUMENTOS Y OFICINA (Expandido) ---
    docs: {
        pdf: "application/pdf",
        // Microsoft Office
        word: ".doc, .docx, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        excel: ".xls, .xlsx, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        powerpoint: ".ppt, .pptx, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation",
        // Open Office / Libre Office
        odt: "application/vnd.oasis.opendocument.text",
        ods: "application/vnd.oasis.opendocument.spreadsheet",
        odp: "application/vnd.oasis.opendocument.presentation",
        // Texto y Otros
        txt: "text/plain",
        rtf: "application/rtf",
        csv: "text/csv",
        markdown: "text/markdown, .md",
        epub: "application/epub+zip",
    },

    // --- ARCHIVOS COMPRIMIDOS (Nueva Categoría) ---
    archives: {
        zip: "application/zip, application/x-zip-compressed",
        rar: "application/x-rar-compressed, .rar",
        sevenZ: "application/x-7z-compressed",
        tar: "application/x-tar",
        gz: "application/gzip",
        iso: "application/x-iso9660-image, .iso",
    },

    // --- AUDIO Y VIDEO ---
    media: {
        audio: "audio/*",
        video: "video/*",
        mp3: "audio/mpeg",
        wav: "audio/wav",
        ogg: "audio/ogg, video/ogg",
        mp4: "video/mp4",
        webm: "video/webm",
        mov: "video/quicktime",
        avi: "video/x-msvideo",
    },

    // --- FUENTES / TIPOGRAFÍA (Nueva Categoría) ---
    fonts: {
        woff: "font/woff",
        woff2: "font/woff2",
        ttf: "font/ttf, application/x-font-ttf",
        otf: "font/otf, application/x-font-opentype",
        eot: "application/vnd.ms-fontobject",
    },

    // --- CÓDIGO Y DESARROLLO (Muy Expandido) ---
    code: {
        // Web
        html: "text/html",
        css: "text/css",
        js: "text/javascript, application/javascript, .mjs",
        ts: "application/typescript, .ts, .tsx",
        json: "application/json",
        xml: "application/xml, text/xml",
        // Backend / Scripts
        python: "text/x-python, .py",
        java: "text/x-java-source, .java, application/java-archive, .jar",
        csharp: "text/plain, .cs",
        cpp: "text/x-c++, .cpp, .h, .hpp",
        c: "text/x-c, .c",
        php: "application/x-httpd-php, .php",
        sql: "application/sql, .sql",
        sh: "application/x-sh, .sh",
        yaml: "text/yaml, .yaml, .yml",
    }
} as const;

// Tipos para hacer autocomplete
export type NameCategory = keyof typeof FileCatalog;
export type NameAttributesCategory = {
  [K in NameCategory]?: (keyof typeof FileCatalog[K])[];
};
type MixedCategory = NameCategory | NameAttributesCategory | '*';

export type AcceptProp = MixedCategory | MixedCategory[];