import type { Meta, StoryObj } from "@storybook/react-vite";
import { Hero } from "@/components/Hero";
import { interstellarMovie } from "@/mocks/movies.mock";

const meta = {
  title: "Components/Hero",
  tags: ["autodocs"],
  component: Hero,
  decorators: [
    (Story) => (
      <main className="min-h-screen bg-background">
        <Story />
      </main>
    ),
  ],
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    movie: interstellarMovie,
  },
};
