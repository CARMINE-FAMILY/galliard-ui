// InputText.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { CheckBoxGal } from './CheckBoxGal';

// 1. CONFIGURACIÓN GENERAL (Meta)
const meta = {
  title: 'Components/CheckBoxGal', // Esto define la jerarquía en la barra lateral
  component: CheckBoxGal,
  // Esta etiqueta genera una página de documentación automática
  tags: ['autodocs'],
  // Esto centra el componente en el lienzo para que se vea bonito
  parameters: {
    layout: 'centered',
  },
  // Aquí puedes definir controles manuales si Storybook no los detecta
  argTypes: {
    
  },
} satisfies Meta<typeof CheckBoxGal>;

export default meta;

// 2. DEFINICIÓN DEL TIPO
type Story = StoryObj<typeof meta>;

// 3. LAS HISTORIAS (Variaciones)

// Historia 1: El estado por defecto (sin placeholder o vacío)
export const Default: Story = {
  args: {
    label: "Acepto",
    value: true,
    seeIcon: true,
    customIcon: <img style={{height: '95%', width: 'auto', display: 'flex', justifyContent: 'center' }} src='https://cdnb.artstation.com/p/assets/images/images/040/288/947/large/foritis-wang-irelia.jpg?1628431072'/>,
    setValue: (e: boolean) => {alert(e)},
    errorMessage: "Obligatorio",
  },
};

// Historia 2: Con un placeholder específico
export const WithIcons: Story = {
  args: {
    label: "Acepto terminos y condiciones",
    value: false,
    seeIcon: false,
    setValue: (e: boolean) => {alert(e)},
    errorMessage: 'Este campo es obligatorio',
    useLinkable: true,
    link: 'https://www.google.com'
  },
  argTypes: {
  }
};