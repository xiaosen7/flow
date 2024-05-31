import { Meta, StoryObj } from "@storybook/react";

import { Button } from "./button";

export default {
  component: Button,
  args: {
    children: "Button",
  },
} as Meta<typeof Button>;

export const Secondary: StoryObj<typeof Button> = {
  args: {
    className: "btn-secondary",
  },
};

export const Tertiary: StoryObj<typeof Button> = {
  args: {
    className: "btn-tertiary",
  },
};
