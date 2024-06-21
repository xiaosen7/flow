import { Meta, StoryFn } from "@storybook/react";

import { mock } from "@/mock";
import { random } from "lodash-es";
import { useState } from "react";
import { Answer } from "./answer";

export default {
  component: Answer,
  args: {
    answer: mock.answer(),
    author: mock.user(),
    upVote: {
      count: random(0, 100),
      voted: false,
    },
    downVote: {
      count: random(0, 100),
      voted: false,
    },
  },
} as Meta<typeof Answer>;

export const Base: StoryFn<typeof Answer> = (args) => <Answer {...args} />;
export const Editable: StoryFn<typeof Answer> = (props) => {
  const [answer, setAnswer] = useState(props.answer);

  return (
    <Answer
      {...props}
      editable
      answer={answer}
      onAnswerSave={(values) =>
        setAnswer({
          ...answer,
          ...values,
        })
      }
    />
  );
};
