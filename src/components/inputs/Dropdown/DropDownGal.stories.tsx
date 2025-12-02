// InputText.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { DropDownGal } from './DropDownGal';
import type { OptionsDropModel } from '../../../models/Inputs/DropDownModel';
import { useState } from 'react';

// 1. CONFIGURACIÓN GENERAL (Meta)
const meta = {
  title: 'Components/DropDownGal', // Esto define la jerarquía en la barra lateral
  component: DropDownGal,
  // Esta etiqueta genera una página de documentación automática
  tags: ['autodocs'],
  // Esto centra el componente en el lienzo para que se vea bonito
  parameters: {
    layout: 'centered',
  },
  // Aquí puedes definir controles manuales si Storybook no los detecta
  argTypes: {

  },
} satisfies Meta<typeof DropDownGal>;

export default meta;

// 2. DEFINICIÓN DEL TIPO
type Story = StoryObj<typeof meta>;

// 3. LAS HISTORIAS (Variaciones)

// Historia 1: El estado por defecto (sin placeholder o vacío)
export const Default: Story = {
  args: {
    label: "Lugar de entrega",
    value: null,
    seeIcon: true,
    shadow: true,
    border: false,
    seeOptionsIcons: true,
    customIcon: <img style={{ height: '95%', width: 'auto', display: 'flex', justifyContent: 'center' }} src='https://cdnb.artstation.com/p/assets/images/images/040/288/947/large/foritis-wang-irelia.jpg?1628431072' />,
    setValue: (e: OptionsDropModel | null) => { alert(e?.valueOption) },
    options: [
      { valueOption: 'A', text: 'Opcion A', icon: 'game-icons:zeus-sword', iconColor: 'yellow' },
      { valueOption: 'B', text: 'Opcion B', icon: 'noto-v1:trident-emblem' }
    ],
    errorMessage: "Obligatorio",
    iconSize: 20
  },
  argTypes: {
    bgColor: {control: 'color'},
    textColor: {control: 'color'},
    iconsColor: {control: 'color'}
  }
};

// Historia 2: Con un placeholder específico
export const WithIcons: Story = {
  args: {
    placeholder: 'Selecciona tu casa:',
    value: null,
    setValue: (e: OptionsDropModel | null) => { alert(e?.valueOption) },
    seeIcon: false,
    seeOptionsIcons: true,

    options: [
      { valueOption: 1, text: 'Stark', customIcon: <img src="https://static.wikia.nocookie.net/roldehieloyfuego/images/f/fc/Casa_Stark.png/revision/latest?cb=20140228071220&path-prefix=es" /> },
      { valueOption: 2, text: 'Targaryen', customIcon: <img src="https://m.media-amazon.com/images/I/51uzrlA0s8L._AC_UF1000,1000_QL80_.jpg" /> },
      { valueOption: 3, text: 'Tully', customIcon: <img src="https://p7.hiclipart.com/preview/216/72/840/brand-computer-wallpaper-logo-illustration-tully.jpg" /> },
      { valueOption: 4, text: 'Lannister', customIcon: <img src="https://images.seeklogo.com/logo-png/22/1/house-lannister-logo-png_seeklogo-223408.png" /> },
      { valueOption: 5, text: 'Martell', customIcon: <img src="https://static.wikia.nocookie.net/hieloyfuego/images/9/95/Casa_Martell.png/revision/latest?cb=20170413021955" /> },
      { valueOption: 6, text: 'Tyrell', customIcon: <img src="https://e7.pngegg.com/pngimages/835/89/png-clipart-house-tyrell-theon-greyjoy-house-targaryen-icon-house-tyrell-background-shield-house-arryn.png" /> },
      { valueOption: 1, text: 'Arryn', customIcon: <img src="https://i.pinimg.com/736x/7f/7a/6d/7f7a6d4d6847a2832c435b6c815bdab1.jpg" /> },
      { valueOption: 1, text: 'Greyjoy', customIcon: <img src="https://static.wikia.nocookie.net/hieloyfuego/images/2/20/Casa_Greyjoy_escudo.png/revision/latest?cb=20161230202702" /> }
    ],

    errorMessage: 'Este campo es obligatorio',
    orientation: "left"
  },
  argTypes: {
    bgColor: {control: 'color'},
    textColor: {control: 'color'},
    iconsColor: {control: 'color'}
  }
};