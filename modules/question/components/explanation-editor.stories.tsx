import { Meta, StoryFn } from "@storybook/react";

import { ExplanationEditor } from "./explanation-editor";

export default {
  component: ExplanationEditor,
  args: {},
} as Meta<typeof ExplanationEditor>;

export const Base: StoryFn<typeof ExplanationEditor> = (args) => (
  <ExplanationEditor {...args} />
);
