import type { Meta, StoryObj } from "@storybook/react-vite";
import { BottomSheetGal } from './BottomSheetGal';

const meta: Meta<typeof BottomSheetGal> = {
    title: 'Components/BottomSheetGal',
    component: BottomSheetGal,
    tags: ["autodocs"],
    parameters: {
        layout: 'centered',
    }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};
                