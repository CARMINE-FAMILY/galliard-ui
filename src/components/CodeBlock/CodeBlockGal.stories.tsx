import type { Meta, StoryObj } from "@storybook/react-vite";
import { CodeBlockGal } from "./CodeBlockGal";

const meta = {
  title: "Components/CodeBlockGal",
  component: CodeBlockGal,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof CodeBlockGal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Block: Story = {
  args: {
    tabs: [
      {
        label: "TSX",
        code: `const saludo = "Hola";`,
      },
    ],
  },
};
