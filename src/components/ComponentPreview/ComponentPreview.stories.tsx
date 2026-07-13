import type { Meta, StoryObj } from "@storybook/react-vite";
import { ComponentPreviewGal } from "./ComponentPreviewGal";
import { ButtonGal } from "../Button/ButtonGal";

const meta = {
  title: "Components/ComponentPreviewGal",
  component: ComponentPreviewGal,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ComponentPreviewGal>;

export default meta;

type Story = StoryObj<typeof meta>;

// children no se puede mandar como arg simple en autodocs, asi que
// estas stories usan "render" para poder pasar JSX real en el canvas.
export const Basic: Story = {
  render: () => (
    <ComponentPreviewGal
      codeTabs={[
        {
          label: "TSX",
          language: "tsx",
          code: `<ButtonGal label="Button" />`,
        },
      ]}
    >
      <ButtonGal label="Button" />
    </ComponentPreviewGal>
  ),
};

export const WithMultipleTabs: Story = {
  render: () => (
    <ComponentPreviewGal
      codeTabs={[
        {
          label: "JSX",
          language: "jsx",
          code: `<ButtonGal label="Enviar" icon="tabler:send" />`,
        },
        {
          label: "TSX",
          language: "tsx",
          code: `<ButtonGal label="Enviar" icon="tabler:send" />`,
        },
      ]}
    >
      <ButtonGal label="Enviar" icon="tabler:send" />
    </ComponentPreviewGal>
  ),
};

export const DarkTheme: Story = {
  render: () => (
    <ComponentPreviewGal
      theme="black"
      codeTabs={[
        {
          label: "TSX",
          language: "tsx",
          theme: "black",
          code: `<ButtonGal label="ThemeDark" />`,
        },
      ]}
    >
      <ButtonGal label="ThemeDark" />
    </ComponentPreviewGal>
  ),
};
