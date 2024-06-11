import { Meta, StoryFn } from "@storybook/react";

import { mock } from "@/shared";
import { TagCard } from "@/tag";
import { List } from "./list";

export default {
  component: List,
  args: { children: "content" },
} as Meta<typeof List>;

export const Base: StoryFn<typeof List> = () => (
  <List
    items={mock.create(mock.tag, 10)}
    renderItem={(item) => <TagCard tag={item} totalQuestions={10} />}
    empty={<>No results</>}
    className="w-full"
    filter={{
      options: mock.create(mock.filterOption, 10),
    }}
    search={{
      placeholder: "Search something...",
    }}
    title={"Title"}
    titleExtra={"Title Extra"}
  />
);
