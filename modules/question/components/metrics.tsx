import { IComponentBaseProps, Metric, mp } from "@/shared";
import { imageEyeSrc } from "@/shared/assets/icons/eye";
import { imageLikeSrc } from "@/shared/assets/icons/like";
import { imageMessageSrc } from "@/shared/assets/icons/message";
import React from "react";

export interface IUIQuestionMetricsProps extends IComponentBaseProps {
  answers: number;
  views: number;
  votes: number;
}

export const QuestionMetrics: React.FC<IUIQuestionMetricsProps> = (props) => {
  const { answers, views, votes } = props;
  return mp(
    props,
    <div className="flex items-center gap-3 max-sm:flex-wrap max-sm:justify-start">
      <Metric
        imgUrl={imageLikeSrc}
        value={votes}
        label="Votes"
        classNames={{
          text: "small-medium text-dark400_light800",
        }}
      />
      <Metric
        imgUrl={imageMessageSrc}
        value={answers}
        label="Answers"
        classNames={{
          text: "small-medium text-dark400_light800",
        }}
      />
      <Metric
        imgUrl={imageEyeSrc}
        value={views}
        label="Views"
        classNames={{
          text: "small-medium text-dark400_light800",
        }}
      />
    </div>
  );
};
