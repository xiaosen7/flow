import { IAuthor } from "@modules/author";
import { ITag } from "@modules/tag";

export interface IQuestion {
  id: string;
  title: string;
  metrics: IQuestionMetrics;
  author: IAuthor;
  createAt: Date;
  tags: ITag[];
}

export interface IQuestionMetrics {
  votes: number;
  answers: number;
  views: number;
}
