import { Meta, StoryFn } from "@storybook/react";

import { mock } from "../mock";
import { Filter } from "./filter";

export default {
  component: Filter,
  args: {
    placeholder: "Placeholder",
    options: mock.create(mock.filterOption, 10),
  },
} as Meta<typeof Filter>;

export const Base: StoryFn<typeof Filter> = (args) => <Filter {...args} />;
