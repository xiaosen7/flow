import { Meta, StoryFn } from "@storybook/react";

import { range } from "lodash-es";
import { QuestionCard } from "./card";

export default {
  component: QuestionCard,
  args: {
    question: {
      id: "1",
      title:
        "Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?",
      tags: range(10).map((id) => ({
        id: String(id),
        name: `javascript${id}`,
        totalQuestions: 0,
      })),
      metrics: {
        answers: 100,
        views: 1000,
        votes: 10000,
      },
      author: {
        avatarUrl: "https://api.dicebear.com/8.x/pixel-art/svg",
        id: "1",
        name: "Author name",
      },
      createAt: new Date(),
    },
  },
} as Meta<typeof QuestionCard>;

export const Base: StoryFn<typeof QuestionCard> = (args) => (
  <QuestionCard {...args} />
);
