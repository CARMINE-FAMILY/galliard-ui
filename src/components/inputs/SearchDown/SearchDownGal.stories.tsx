// InputText.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { SearchDownGal } from './SearchDownGal';
import type { OptionsSearchModel } from '../../../models/Inputs/SearchDownModel';
import { useState } from 'react';

// 1. CONFIGURACIÓN GENERAL (Meta)
const meta = {
  title: 'Components/SearchDownGal', // Esto define la jerarquía en la barra lateral
  component: SearchDownGal,
  // Esta etiqueta genera una página de documentación automática
  tags: ['autodocs'],
  // Esto centra el componente en el lienzo para que se vea bonito
  parameters: {
    layout: 'centered',
  },
  // Aquí puedes definir controles manuales si Storybook no los detecta
  argTypes: {
    // 🔘 BOOLEANOS (Garantizamos que aparezca el Switch)
    useForApi: { control: 'boolean' },
    allowVoidOption: { control: 'boolean' },
    iconInRight: { control: 'boolean' },
    border: { control: 'boolean' },
    shadow: { control: 'boolean' },
    seeIcon: { control: 'boolean' },
    seeInputIcon: { control: 'boolean' },

    // 🔽 SELECTORES / UNIONES (Forzamos las opciones para que despliegue el menú)
    orientation: {
      control: 'select',
      options: ['top', 'left', 'right', 'bottom'],
    },
    font: {
      control: 'select',
      options: ['OpenSansLight', 'OpenSansRegular', 'OpenSansSemiBold', 'OpenSansBold', 'OpenSansBolder'],
    },
    fontLabel: {
      control: 'select',
      options: ['OpenSansLight', 'OpenSansRegular', 'OpenSansSemiBold', 'OpenSansBold', 'OpenSansBolder'],
    },
    rounded: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'full'],
    },
    HorV: {
      control: 'radio', // Radio es mejor para solo 2 opciones
      options: ['horizontal', 'vertical'],
    },

    // 📝 TEXTOS SIMPLES
    label: { control: 'text' },
    placeholder: { control: 'text' },
    errorMessage: { control: 'text' },
    icon: { control: 'text' },
    iconInput: { control: 'text' },

    // 💅 CLASES CSS OPCIONALES
    customContainerClass: { control: 'text' },
    customInputClass: { control: 'text' },
    customLabelClass: { control: 'text' },
    customIconClass: { control: 'text' },
    customOptionClass: { control: 'text' },
    customInputContainerClass: { control: 'text' },

    // 🎨 COLORES (Color Picker)
    bgColor: { control: 'color' },
    textColor: { control: 'color' },
    iconsColor: { control: 'color' },
    labelColor: { control: 'color' },

    // 📏 DIMENSIONES (number | string -> Forzado a texto para evitar error de tipos en UI)
    textSize: { control: 'text' },
    labelSize: { control: 'text' },
    width: { control: 'text' },
    height: { control: 'text' },
    iconSize: { control: 'text' },
    iconsOptionsSize: { control: 'text' },

    // 🚫 DESHABILITADOS (Propiedades inyectadas por React, funciones o estados que rompen Storybook)
    value: { control: false },
    setValue: { control: false },
    searchAction: { control: false },
    customIcon: { control: false },
    customInputIcon: { control: false },
    args: { control: false },
  },
} satisfies Meta<typeof SearchDownGal>;

export default meta;

// 2. DEFINICIÓN DEL TIPO
type Story = StoryObj<typeof meta>;

const mockOptionsList: OptionsSearchModel[] = [
  {
    valueOption: 'MID',
    text: 'Carril Central',
  },
  {
    valueOption: 'TOP',
    text: 'Carril Superior',
  },
  {
    valueOption: 'JG',
    text: 'Jungla',
  },
  {
    valueOption: 'IONIA',
    text: 'Facción: Jonia',
  },
  {
    valueOption: 99,
    text: 'Opción Numérica (99)',
  }
];

// Historia 1: El estado por defecto (sin placeholder o vacío)
export const WithApi: Story = {
  render: (args) => {
    // Aqui puede ir un state

    return (
      <SearchDownGal 
        {...args} 
        searchAction={(e: string | null) => {
          let data: OptionsSearchModel[] = mockOptionsList.filter(o => 
            o.text.toLowerCase().includes(e?.toLocaleLowerCase() ?? '')
          );
          return data;
        }}
      />
    );
  },
  args: {
    label: "Carril",
    value: null,
    seeIcon: true,
    shadow: true,
    border: false,
    seeOptionsIcons: true,
    useForApi: true,
    customIcon: <img style={{ height: '95%', width: 'auto', display: 'flex', justifyContent: 'center' }} src='https://cdnb.artstation.com/p/assets/images/images/040/288/947/large/foritis-wang-irelia.jpg?1628431072' alt="Irelia" />,
    setValue: (e: OptionsSearchModel | null) => { alert(e?.valueOption) },
    errorMessage: "Obligatorio",
    iconSize: 20
  }
};

// Historia 2: Con un placeholder específico
export const WithStatic: Story = {
  args: {
    placeholder: 'Busca tu casa:',
    value: null,
    setValue: (e: OptionsSearchModel | null) => { alert(e?.valueOption) },
    seeIcon: false,
    seeOptionsIcons: true,
    options: [
      { valueOption: 1, text: 'Stark' },
      { valueOption: 2, text: 'Targaryen' },
      { valueOption: 3, text: 'Tully' },
      { valueOption: 4, text: 'Lannister' },
      { valueOption: 5, text: 'Martell' },
      { valueOption: 6, text: 'Tyrell' },
      { valueOption: 1, text: 'Arryn' },
      { valueOption: 1, text: 'Greyjoy' }
    ],
    errorMessage: 'Este campo es obligatorio',
    orientation: "left"
  }
};