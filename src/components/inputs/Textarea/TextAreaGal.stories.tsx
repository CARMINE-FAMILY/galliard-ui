// InputText.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { TextAreaGal } from './TextAreaGal';

// 1. CONFIGURACIÓN GENERAL (Meta)
const meta = {
  title: 'Components/TextAreaGal', // Esto define la jerarquía en la barra lateral
  component: TextAreaGal,
  // Esta etiqueta genera una página de documentación automática
  tags: ['autodocs'],
  // Esto centra el componente en el lienzo para que se vea bonito
  parameters: {
    layout: 'centered',
  },
  // Aquí puedes definir controles manuales si Storybook no los detecta
  argTypes: {
    placeholder: { control: 'text' },
  },
} satisfies Meta<typeof TextAreaGal>;

export default meta;

// 2. DEFINICIÓN DEL TIPO
type Story = StoryObj<typeof meta>;

// 3. LAS HISTORIAS (Variaciones)

// Historia 1: El estado por defecto (sin placeholder o vacío)
export const Default: Story = {
  args: {
    label: "Mensaje:",
    placeholder: "Escribe aqui",
    seeIcon: true
  },
};

// Historia 2: Con un placeholder específico
export const ConError: Story = {
  args: {
    label: "Comentario:",
    placeholder: 'Escribe tu comentario',
    errorMessage: 'Este campo es obligatorio sdfhgjd sfhgjsdfhj gdfsg hjdfshj gfsddfhjsgg dfg dfg dfg dfg fg dfg df dfg df gdf',
    iconColor: '#ff0000',
    iconSize: 20,
    customIcon: <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24"><path fill="#dc2626" d="M13.458.86L0 7.093l3.353 12.761l2.552-.313l-.701-8.024l.838-.373l1.447 8.202l4.361-.535l-.775-8.857l.83-.37l1.591 9.025l4.412-.542l-.849-9.708l.84-.374l1.74 9.87L24 17.318V3.5Zm.316 19.356l.222 1.256L24 23.14v-4.18l-10.22 1.256Z"/></svg>,
    args: {}
  },
  argTypes: {
    bgColor: {control: 'color'},
    iconColor: {control: 'color'},
    textColor: {control: 'color'}
  }
};