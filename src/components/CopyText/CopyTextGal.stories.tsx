import type { Meta, StoryObj } from "@storybook/react-vite";
import { CopyTextGal } from "./CopyTextGal";

const meta = {
  title: "Components/CopyTextGal",
  component: CopyTextGal,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    theme: {
      control: "select",
      options: [
        "black",
        "light",
        "dracula",
        "orange",
        "green",
        "solarized-light",
        "blue",
        "yellow",
        "red",
      ],
    },
  },
} satisfies Meta<typeof CopyTextGal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Code: Story = {
  args: {
    command: "npm install galliard-ui",
    theme: "green",
  },
};
