import { FileCatalog, type AcceptProp, type NameCategory, type NameAttributesCategory } from '../models/Catalogs/FileCatalog';

export const usefileCatalogTranslate = (input: AcceptProp): string | undefined => {
    // CASO 0: Es un Array Mixed si recibimos multiples datos ['images', { docs: ['pdf'] }] 

    // Si recibimos un arreglo quiere decir que se hizo uso del tipo mixed y puede tener diferentes
    // tipos, ya sea de tipo simple que es solo el string y es una catehoria completa o objeto que 
    // su key define la categoria y contiene un arreglo de strings que son los tipos de esa categoria
    // Por lo tanto usa el hock parta traer los datos de ambos casos
    if (Array.isArray(input)) {
        const combined = input
            .map((item) => usefileCatalogTranslate(item))
            .filter((item) => item !== undefined);

        return combined.join(', ');
    }

    // CASO 1: Comodín tre todos los datos
    if (input === '*') return undefined;

    // CASO 2: String simple Ontiene una categoria completa

    // Si el tipo de dato es string y solo requiere de una categoria obtiene todos los valores de 
    // todas las key de esa categoria y las combina en un string separandolas con ','
    if (typeof input === 'string') {
        if (input in FileCatalog) {
            const category = FileCatalog[input as NameCategory];
            return Object.values(category).join(', ');
        }
        return undefined;
    }

    // CASO 3: Objeto específico de una ctaegoria

    // Si se recibio un objeto se indica que se puede recibir una o varias categorias y elementos 
    // especificos de cada una, busca la key que coincida con cada categoria y se obtienen todos
    // los valores de esa categoria agregandolos a un arreglo que al final se une en un string
    // y se separara por ','
    if (typeof input === 'object') {
        const finalString: string[] = [];
        (Object.keys(input) as NameCategory[]).forEach((catKey) => {
            const selectedSubTypes = (input as NameAttributesCategory)[catKey];
            const catalogCategory = FileCatalog[catKey];

            if (selectedSubTypes && catalogCategory) {
                selectedSubTypes.forEach((subKey) => {
                    // @ts-ignore
                    const mimeType = catalogCategory[subKey];
                    if (mimeType) finalString.push(mimeType);
                });
            }
        });
        return finalString.join(', ');
    }

    return undefined;
};