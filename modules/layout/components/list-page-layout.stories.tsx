import { Meta, StoryFn } from "@storybook/react";

import { ListPageLayout } from "./list-page-layout";

export default {
  component: ListPageLayout,
  args: { children: "content" },
} as Meta<typeof ListPageLayout>;

export const Base: StoryFn<typeof ListPageLayout> = () => (
  <ListPageLayout
    className="w-full"
    filter={{
      options: [
        {
          label: "option",
          value: "option",
        },
      ],
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
