import { Meta, StoryFn } from "@storybook/react";

import { UIExplanationEditor } from "./explanation-editor";

export default {
  component: UIExplanationEditor,
  args: {},
} as Meta<typeof UIExplanationEditor>;

export const Base: StoryFn<typeof UIExplanationEditor> = (args) => (
  <UIExplanationEditor {...args} />
);
