import type { Meta, StoryObj } from "@storybook/react-vite";
import { BottomSheetGal } from './BottomSheetGal';

const meta: Meta<typeof BottomSheetGal> = {
    title: 'Components/BottomSheetGal',
    component: BottomSheetGal,
    tags: ["autodocs"],
    parameters: {
        docs: {
            story: {
                inline: false, 
                iframeHeight: 500,
            },
        },
    },
    argTypes: {
        isOpen: { control: 'boolean' },
        useBackdrop: { control: 'boolean' },
        canDisapear: { control: 'boolean' },
        closeOnBackdropClick: { control: 'boolean' },
        
        transitionDuration: {
            control: 'select',
            options: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        },
        disapearPercent: {
            control: 'select',
            options: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90],
        },
        startHeightPercentPosition: {
            control: 'select',
            options: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
        },
        maxHeightPercentPosition: {
            control: 'select',
            options: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100], 
        },
        minHeightPercentPosition: {
            control: 'select',
            options: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
        },
        widthPercent: {
            control: 'select',
            options: ["20%", "30%", "40%", "50%", "60%", "70%", "80%", "90%", "100%"],
        },
        
        // Controles de color nativos
        headerBg: { control: 'color' },
        bodyBg: { control: 'color' },
        backdropColor: { control: 'color' },
        draggElementColor: { control: 'color' },
        
        // Control numérico libre
        backdropBlur: { control: 'number' },
        
        // Controles de texto libres
        customBackdropClass: { control: 'text' },
        customContainerClass: { control: 'text' },
        customBodyClass: { control: 'text' },
        
        // Ocultamos las funciones y nodos de React que Storybook no puede editar bien
        setIsOpen: { table: { disable: true } },
        children: { table: { disable: true } },
        args: { table: { disable: true } },
    }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ModalWithBackdrop: Story = {
    args: {
        isOpen: true,
        setIsOpen: (val: boolean) => console.log("Cambiando estado a:", val), 
        canDisapear: true,
        useBackdrop: true,
        closeOnBackdropClick: true,
        startHeightPercentPosition: 50,
        maxHeightPercentPosition: 90,
        minHeightPercentPosition: 20,
        disapearPercent: 20,
        widthPercent: "90%",
        transitionDuration: 0.5,
        children: (
            <div style={{ padding: '20px', color: '#000', textAlign: 'center' }}>
                <h2 style={{ margin: '0 0 10px 0' }}>Panel Modal</h2>
                <p>Este panel oscurece el fondo y desactiva el scroll principal.</p>
                <p style={{ opacity: 0.7 }}>Arrastra hacia abajo más del 20% para cerrarlo.</p>
            </div>
        ),
    },
};

export const PersistentPanel: Story = {
    args: {
        canDisapear: false,
        useBackdrop: false,
        startHeightPercentPosition: 40,
        minHeightPercentPosition: 10,
        maxHeightPercentPosition: 80,
        widthPercent: "100%",
        transitionDuration: 0.5,
        headerBg: "#2a2d30",
        bodyBg: "#f2f2f2",
        draggElementColor: "#fff",
        children: (
            <div style={{ padding: '20px', color: '#000', textAlign: 'center' }}>
                <h2 style={{ margin: '0 0 10px 0' }}>Panel Persistente</h2>
                <p>Navegación libre: Puedes hacer scroll en la página de fondo.</p>
                <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
                    <span>⬇ Mínimo: 10%</span>
                    <span>⏺ Inicio: 40%</span>
                    <span>⬆ Máximo: 80%</span>
                </div>
            </div>
        ),
    },
};