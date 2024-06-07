import { Meta, StoryFn } from "@storybook/react";

import { range } from "lodash-es";
import { UITagsEditor } from "./tags-editor";

export default {
  component: UITagsEditor,
  args: {},
} as Meta<typeof UITagsEditor>;

export const Base: StoryFn<typeof UITagsEditor> = () => (
  <UITagsEditor
    defaultValue={range(20).map((x) => `tag${x}`)}
    onChange={console.log}
  />
);
