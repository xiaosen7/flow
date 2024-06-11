import { Meta, StoryFn } from "@storybook/react";

import { range } from "lodash-es";
import { TagsEditor } from "./tags-editor";

export default {
  component: TagsEditor,
  args: {},
} as Meta<typeof TagsEditor>;

export const Base: StoryFn<typeof TagsEditor> = () => (
  <TagsEditor
    defaultValue={range(20).map((x) => `tag${x}`)}
    onChange={console.log}
  />
);
