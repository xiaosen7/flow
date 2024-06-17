import { Meta, StoryFn } from "@storybook/react";

import defaultValue from "../assets/example-value.md?raw";
import { MarkdownEditor } from "./editor";

export default {
  component: MarkdownEditor,
  args: {},
} as Meta<typeof MarkdownEditor>;

export const Base: StoryFn<typeof MarkdownEditor> = () => (
  <MarkdownEditor
    className="h-[90vh]"
    defaultValue={defaultValue}
    onChange={console.log}
  />
);
