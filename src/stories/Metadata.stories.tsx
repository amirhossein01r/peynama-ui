import type { Meta, StoryObj } from "@storybook/react-vite";
import { MetadataGroup } from "@/components/Metadata";
import { interstellarMovie } from "@/mocks/movies.mock";
import { mapMovieToMetadata } from "@/lib/metadata.mapper";

const meta = {
  title: "Components/MetadataGroup",
  tags: ["autodocs"],
  component: MetadataGroup,
} satisfies Meta<typeof MetadataGroup>;
export default meta;

type Story = StoryObj<typeof MetadataGroup>;
export const Default: Story = {
  args: mapMovieToMetadata(interstellarMovie)[3],
};
