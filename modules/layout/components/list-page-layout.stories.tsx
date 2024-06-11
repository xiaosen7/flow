import { Meta, StoryFn } from "@storybook/react";

import { mock } from "@/shared";
import { ListPageLayout } from "./list-page-layout";

export default {
  component: ListPageLayout,
  args: { children: "content" },
} as Meta<typeof ListPageLayout>;

export const Base: StoryFn<typeof ListPageLayout> = () => (
  <ListPageLayout
    className="w-full"
    filter={{
      options: mock.create(mock.filterOption, 10),
    }}
    search={{
      placeholder: "Search something...",
    }}
    title={"Title"}
    titleExtra={"Title Extra"}
  >
    <div>content</div>
  </ListPageLayout>
);
