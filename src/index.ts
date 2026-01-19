// -- COMPONENTES

// INPUTS
export * from './components/inputs/InputText/InputTextGal';
export * from './components/inputs/CheckBox/CheckBoxGal';
export * from './components/inputs/Dropdown/DropDownGal';
export * from './components/inputs/InputFile/InputFileGal';
export * from './components/inputs/InputRadio/InputRadioGal';
export * from './components/inputs/Textarea/TextAreaGal';

// BUTTON
export * from './components/Button/ButtonGal';

// -- FUNCTIONS

// HOOKS
export * from './hooks/useOnClickOutside';
export * from './hooks/useValidateForms';

// DATE UNIX FUNCTIONS
export * from './funtions/UnixActions';

// -- TYPES

// BUTTON MODEL
export type { ButtonProps } from './models/Button/ButtonModel';

// FILE MODEL
export type { NameCategory, NameAttributesCategory, AcceptProp } from './models/Catalogs/FileCatalog';

// HOOK MODEL
export type { ValidateProps } from './models/Hooks/ValidateModel';
export type { CheckProps } from './models/Inputs/CheckModel';
export type { DropDownProps, OptionsDropModel } from './models/Inputs/DropDownModel';
export type { InputFileProps } from './models/Inputs/InputFileModel';
export type { InputProps } from './models/Inputs/InputModel';
export type { RadioProps } from './models/Inputs/InputRadioModel';
export type { TextAreaProps } from './models/Inputs/TextAreaModel';