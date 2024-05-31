import { Meta, StoryObj } from "@storybook/react";

import { Button } from "./button";

export default {
  component: Button,
  args: {
    children: "Button",
  },
} as Meta<typeof Button>;

export const Base: StoryObj<typeof Button> = {
  args: {},
};
