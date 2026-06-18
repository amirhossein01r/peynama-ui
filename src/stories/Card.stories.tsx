import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "@/components/Card";
import { interstellarMovie } from "@/mocks/movies.mock";

const meta = {
  title: "Components/Card",
  tags: ["autodocs"],
  component: Card,
  decorators: [
    (Story) => (
      <div className="w-60">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    item: {
      id: interstellarMovie.id,
      poster_url: interstellarMovie.poster_url,
      title: interstellarMovie.title,
      url: "",
    },
  },
};
