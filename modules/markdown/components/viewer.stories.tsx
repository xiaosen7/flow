import { Meta, StoryFn } from "@storybook/react";

import value from "../assets/example-value.md?raw";
import { MarkdownViewer } from "./viewer";

export default {
  component: MarkdownViewer,
} as Meta<typeof MarkdownViewer>;

export const Base: StoryFn<typeof MarkdownViewer> = () => (
  <MarkdownViewer value={value} />
);
