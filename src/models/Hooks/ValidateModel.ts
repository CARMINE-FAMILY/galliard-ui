interface BaseProps {
    setError?: (error: string) => void;
    nameInput?: string;
    canBeNull?: boolean;
}

interface TextValidation extends BaseProps {
    typeInput: 'text' | 'email' | 'phone' | 'url' | 'pass';
    value: string | null | undefined;
    
    maxLength?: number;
    minLength?: number;
    onlyUpperCase?: boolean;
    onlyLowerCase?: boolean;
    regex?: RegExp;
    needBeEqualTo?: string;
}

interface NumberValidation extends BaseProps {
    typeInput: 'num'; 
    value: number | null | undefined; 
    
    min?: number;
    max?: number;
    isInteger?: boolean;
    needBeEqualTo?: number;
}

interface BoolValidation extends BaseProps {
    typeInput: 'bool';
    value: boolean | null | undefined;
    
    mustBeTrue?: boolean; 
}

interface DateValidation extends BaseProps {
    typeInput: 'date' | 'date-time' | 'time';
    value: Date | string | number | null | undefined; 
    
    min?: Date;
    max?: Date;
    canBeAfterToday?: boolean;
    canBeBeforeToday?: boolean;
    canBeAfterNow?: boolean;
    canBeBeforeNow?: boolean;
}

interface DataValidation extends BaseProps {
    typeInput: 'data';
    value: any | null | undefined; 
}

export type ValidateProps = 
    | TextValidation 
    | NumberValidation 
    | BoolValidation 
    | DateValidation
    | DataValidation;