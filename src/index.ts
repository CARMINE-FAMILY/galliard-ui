// -- COMPONENTES

// INPUTS
export * from './components/inputs/InputText/InputTextGal';
export * from './components/inputs/CheckBox/CheckBoxGal';
export * from './components/inputs/Dropdown/DropDownGal';
export * from './components/inputs/SearchDown/SearchDownGal';
export * from './components/inputs/InputFile/InputFileGal';
export * from './components/inputs/InputRadio/InputRadioGal';
export * from './components/inputs/Textarea/TextAreaGal';

// BUTTON
export * from './components/Button/ButtonGal';

// CODEBLOCK
export * from './components/CodeBlock/CodeBlockGal';

// COPY TEXT
export * from './components/CopyText/CopyTextGal';

// COMPONENT PREVIEW
export * from './components/ComponentPreview/ComponentPreviewGal';

// -- FUNCTIONS

// HOOKS
export * from './hooks/useOnClickOutside';
export * from './hooks/useValidateForms';
export * from './hooks/useDebouncer';

// MODALS
export * from './components/modals/BottomSheet/BottomSheetGal';

// -- TYPES

// BUTTON MODEL
export type { ButtonProps } from './models/Button/ButtonModel';

// FILE MODEL
export type { NameCategory, NameAttributesCategory, AcceptProp } from './models/Catalogs/FileCatalog';

// HOOK MODEL
export type { ValidateProps } from './models/Hooks/ValidateModel';
export type { CheckProps } from './models/Inputs/CheckModel';
export type { DropDownProps, OptionsDropModel } from './models/Inputs/DropDownModel';
export type { SearchDownProps, OptionsSearchModel } from './models/Inputs/SearchDownModel';
export type { InputFileProps } from './models/Inputs/InputFileModel';
export type { InputProps } from './models/Inputs/InputModel';
export type { RadioProps } from './models/Inputs/InputRadioModel';
export type { TextAreaProps } from './models/Inputs/TextAreaModel';

// MODAL MODEL
export type { BottomSheetModel } from './models/Modals/BottomSheetModel';

//CODEBLOCK MODEL
export type {CodeBlockProps,CodeTab,CodeThemeValues,} from './models/CodeBlock/CodeBlockModel';

//COPYTEXT MODEL
export type {CopyTextProps,CopyTextThemeValues,} from './models/CopyText/CopyTextModel';

//COMPONENTPREVIEW MODEL
export type {ComponentPreviewProps,PreviewCodeTab,PreviewThemeValues,} from './models/ComponentPreview/ComponentPreviewModel';