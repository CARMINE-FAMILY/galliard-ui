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

export const CollapsibleCode: Story = {
  args: {
    tabs: [
      {
        label: "TSX",
        language: "tsx",
        collapsible: true,
        code: `
// código largo, más de 8 líneas
export function EjemploLargo() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [c, setC] = useState(0);
  useEffect(() => {
    console.log(a, b, c);
  }, [a, b, c]);
  return <div>...</div>;
}
      `,
      },
    ],
  },
};
