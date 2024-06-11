import { Meta, StoryFn } from "@storybook/react";
import React from "react";

import { range } from "lodash-es";
import { List } from "./list";

export default {
  component: List,
} as Meta<typeof List>;

export const Base: StoryFn<typeof List> = () => (
  <List
    items={range(10).map((id) => ({ id, name: id }))}
    empty="No items"
    renderItem={(x) => <div>{x.name}</div>}
  />
);
