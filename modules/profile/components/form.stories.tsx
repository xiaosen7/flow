import { Meta, StoryFn } from "@storybook/react";

import { mock } from "@/shared";
import { ProfileForm } from "./form";

export default {
  component: ProfileForm,
  args: {
    onSubmit: console.log,
    user: mock.user(),
  },
} as Meta<typeof ProfileForm>;

export const Base: StoryFn<typeof ProfileForm> = (args) => (
  <ProfileForm {...args} />
);
