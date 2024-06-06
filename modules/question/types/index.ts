import { IAuthor } from "@/author";
import { ITag } from "@/tag";
import { z } from "zod";
import { QUESTION_SCHEMA } from "../constants";

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

export type IQuestionSchema = typeof QUESTION_SCHEMA;

export type IQuestionPostValue = z.infer<IQuestionSchema>;
