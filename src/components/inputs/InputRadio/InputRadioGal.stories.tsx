// InputText.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { InputRadioGal } from './InputRadioGal';

// 1. CONFIGURACIÓN GENERAL (Meta)
const meta = {
  title: 'Components/InputRadioGal', // Esto define la jerarquía en la barra lateral
  component: InputRadioGal,
  // Esta etiqueta genera una página de documentación automática
  tags: ['autodocs'],
  // Esto centra el componente en el lienzo para que se vea bonito
  parameters: {
    layout: 'centered',
  },
  // Aquí puedes definir controles manuales si Storybook no los detecta
  argTypes: {
    
  },
} satisfies Meta<typeof InputRadioGal>;

export default meta;

// 2. DEFINICIÓN DEL TIPO
type Story = StoryObj<typeof meta>;

// 3. LAS HISTORIAS (Variaciones)

// Historia 1: El estado por defecto (sin placeholder o vacío)
export const Default: Story = {
  args: {
    label: "Selecciona el turno:",
    name: "shift",
    options: [
      {value: "1", label: "Turno 1", seeIcon: false},
      {value: "2", label: "Turno 2", seeIcon: false},
      {value: "3", label: "Turno 3", seeIcon: false}
    ],
    setValue: (e) => {alert(e)},
    errorMessage: "Los campos son obligatorios",
    HorV: 'vertical'
  },
};

// Historia 2: Con un placeholder específico
export const WithIcons: Story = {
  args: {
    label: "Selecciona tu genero:",
    name: "gender",
    options: [
      {value: "1", label: "Hombre", seeIcon: true, icon: "fxemoji:man"},
      {value: "2", label: "Mujer", seeIcon: false, customIcon: <img style={{height: '95%', width: 'auto', display: 'flex', justifyContent: 'center' }} src='https://cdnb.artstation.com/p/assets/images/images/040/288/947/large/foritis-wang-irelia.jpg?1628431072'/>}
    ],
    setValue: (e) => {alert(e)},
    errorMessage: 'Este campo es obligatorio',
    HorV: 'horizontal'
  },
  argTypes: {
  }
};