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
    bgColor: { control: 'color' },
    textColor: { control: 'color' },
    iconsColor: { control: 'color' },
    useForApi: { control: 'boolean' }
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