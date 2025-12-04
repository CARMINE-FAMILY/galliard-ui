// InputText.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { InputFileGal } from './InputFileGal';

// 1. CONFIGURACIÓN GENERAL (Meta)
const meta = {
  title: 'Components/InputFileGal', // Esto define la jerarquía en la barra lateral
  component: InputFileGal,
  // Esta etiqueta genera una página de documentación automática
  tags: ['autodocs'],
  // Esto centra el componente en el lienzo para que se vea bonito
  parameters: {
    layout: 'centered',
  },
  // Aquí puedes definir controles manuales si Storybook no los detecta
  argTypes: {
    bgColorHover: {control: 'color'},
    bgColor: {control: 'color'},
    labelColor: {control: 'color'},
    iconColor: {control: 'color'}
  },
} satisfies Meta<typeof InputFileGal>;

export default meta;

// 2. DEFINICIÓN DEL TIPO
type Story = StoryObj<typeof meta>;

// 3. LAS HISTORIAS (Variaciones)

// Historia 1: El estado por defecto (sin placeholder o vacío)
export const Default: Story = {
  args: {
    selectedFileE: null,
    // customIcon: <img style={{height: '95%', width: 'auto', display: 'flex', justifyContent: 'center' }} src='https://cdnb.artstation.com/p/assets/images/images/040/288/947/large/foritis-wang-irelia.jpg?1628431072'/>,
    maxMBSize: 2,
    acceptFiles: [
      'images', 
      {docs: ['pdf', 'word'], code: ['js']}
    ],
    setSelectedFileE: (e) => {console.log(e)},
    errorMessage: "Los campos son obligatorios",
  },
};

// Historia 2: Con un placeholder específico
export const WithIcons: Story = {
  args: {
    selectedFileE: null,
    setSelectedFileE: (e) => {console.log(e)},
    errorMessage: 'Este campo es obligatorio',
  },
};