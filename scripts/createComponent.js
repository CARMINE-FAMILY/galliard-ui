import { type } from "node:os";

export default function (plop) {
    plop.setGenerator('componente', {
        description: 'Crea un nuevo componente con su historia de Storybook',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: '¿Cuál es el nombre del componente?',
            },
            {
                type: 'input',
                name: 'folder',
                message: 'En que ruta de tu src/ quieres crearlo?',
                default: 'src'
            }
        ],
        actions: [
            // Crea el archivo del componente
            {
                type: 'add',
                path: '../src/{{folder}}/{{pascalCase name}}/{{pascalCase name}}Gal.tsx',
                template: `import { forwardRef } from "react";

export const BottomSheetGal = forwardRef<TuTipoParaUseRef, TuModelAqui>(function BottomSheetGal({
    // Props aqui si las necesitas
 }, ref) {
    return (
        <div>BottomSheet</div>
    );
});`
            },
            // Crea el archivo scss
            {
                type: 'add',
                path: '../src/{{folder}}/{{pascalCase name}}/{{pascalCase name}}Gal.module.scss',
                template: `// Estilos aqui`
            },
            // Crea el archivo de Storybook
            {
                type: 'add',
                path: '../src/{{folder}}/{{pascalCase name}}/{{pascalCase name}}.stories.tsx',
                template: `import type { Meta, StoryObj } from "@storybook/react-vite";
import { BottomSheetGal } from './BottomSheetGal';

const meta: Meta<typeof BottomSheetGal> = {
    title: 'Components/BottomSheetGal', // puedes ajustar la ruta del título según tu estructura de Storybook
    component: BottomSheetGal,
    tags: ["autodocs"],
    parameters: {
        layout: 'centered',
    }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};
                `
            }
        ],
    });
};