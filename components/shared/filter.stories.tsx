import { Meta, StoryFn } from "@storybook/react";

import { Filter } from "./filter";

export default {
  component: Filter,
  args: {
    placeholder: "Placeholder",
    options: [
      {
        value: "light",
        label: "Light",
      },
      {
        value: "dark",
        label: "Dark",
      },
    ],
  },
} as Meta<typeof Filter>;

export const Base: StoryFn<typeof Filter> = (args) => <Filter {...args} />;
