interface BaseProps {
    setError?: (error: string) => void;
    nameInput?: string;
    canBeNull?: boolean;
}

interface TextValidation extends BaseProps {
    typeInput: 'text';
    value: string | null | undefined;
    
    maxLength?: number;
    minLength?: number;
    regex?: RegExp;
    needBeEqualTo?: string;
}

interface EmailValidation extends BaseProps {
    typeInput: 'email';
    value: string | null | undefined;
}

interface PhoneValidation extends BaseProps {
    typeInput: 'phone';
    value: string | null | undefined;
}

interface UrlValidation extends BaseProps {
    typeInput: 'url';
    value: string | null | undefined;
}

interface PassValidation extends BaseProps {
    typeInput: 'pass';
    value: string | null | undefined;
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
    typeInput: 'date' | 'date-time';
    value: Date | string | number | null | undefined; 
    
    min?: Date;
    max?: Date;
}

interface TimeValidation extends BaseProps {
    typeInput: 'time';
    value: Date | string | number | null | undefined; 
    
    min?: Date;
    max?: Date;
}

interface DataValidation extends BaseProps {
    typeInput: 'data';
    value: any | null | undefined; 
}

export type ValidateProps = 
    | TextValidation 
    | EmailValidation
    | PhoneValidation
    | UrlValidation
    | PassValidation
    | NumberValidation 
    | BoolValidation 
    | DateValidation
    | TimeValidation
    | DataValidation
;