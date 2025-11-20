// InputText.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { InputTextGal } from './InputTextGal';

// 1. CONFIGURACIÓN GENERAL (Meta)
const meta = {
  title: 'Components/InputTextGal', // Esto define la jerarquía en la barra lateral
  component: InputTextGal,
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
} satisfies Meta<typeof InputTextGal>;

export default meta;

// 2. DEFINICIÓN DEL TIPO
type Story = StoryObj<typeof meta>;

// 3. LAS HISTORIAS (Variaciones)

// Historia 1: El estado por defecto (sin placeholder o vacío)
export const Default: Story = {
  args: {
    customContainerClass: 'conta'
  },
};

// Historia 2: Con un placeholder específico
export const ConPlaceholder: Story = {
  args: {
    placeholder: 'Escribe tu correo aquí...',
    errorMessage: 'Este campo es obligatorio',
    iconColorL: '#ff0000',
    iconSizeL: 20,
    customIconLeft: <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24"><path fill="#dc2626" d="M13.458.86L0 7.093l3.353 12.761l2.552-.313l-.701-8.024l.838-.373l1.447 8.202l4.361-.535l-.775-8.857l.83-.37l1.591 9.025l4.412-.542l-.849-9.708l.84-.374l1.74 9.87L24 17.318V3.5Zm.316 19.356l.222 1.256L24 23.14v-4.18l-10.22 1.256Z"/></svg>,
    customIconRight: <img style={{height: '95%', width: 'auto', display: 'flex', justifyContent: 'center' }} src='https://cdnb.artstation.com/p/assets/images/images/040/288/947/large/foritis-wang-irelia.jpg?1628431072'/>,
    HorV: 'horizontal',
    typeInput: 'number',
    args: {}
  },
  argTypes: {
    bgColor: {control: 'color'},
    iconColorR: {control: 'color'},
    iconColorL: {control: 'color'},
    textColor: {control: 'color'}
  }
};