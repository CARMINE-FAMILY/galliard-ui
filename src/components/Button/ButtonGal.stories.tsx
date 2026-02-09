import type { Meta, StoryObj } from "@storybook/react-vite";
import { ButtonGal } from "./ButtonGal";

const meta = {
    title: "Components/ButtonGal",
    component: ButtonGal,
    tags: ["autodocs"],    
    parameters: {
        layout: 'centered',
    }
} satisfies Meta<typeof ButtonGal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        label: "Enviar",
        action: () => { alert("Botón presionado"); },
        styleType: 'ThemeBlue',
    },
    argTypes: {
        colorShadow: {control: 'color'}
    }
}