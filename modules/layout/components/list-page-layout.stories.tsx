import { Meta, StoryFn } from "@storybook/react";

import { CListPageLayout } from "./list-page-layout";

export default {
  component: CListPageLayout,
  args: { children: "content" },
} as Meta<typeof CListPageLayout>;

export const Base: StoryFn<typeof CListPageLayout> = () => (
  <CListPageLayout
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
  </CListPageLayout>
);
