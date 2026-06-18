import type { Meta, StoryObj } from "@storybook/react-vite";
import { Pagination } from "@/components/Pagination";

const meta = {
  title: "Components/Pagination",
  tags: ["autodocs"],
  component: Pagination,
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentPage: 5,
    totalPages: 9,
  },
};
