import { Question } from "@prisma/client";
import { z } from "zod";
import { QUESTION_SCHEMA } from "../constants";

export interface IQuestion extends Question {}

export type IQuestionSchema = typeof QUESTION_SCHEMA;

export type IQuestionPostValue = z.infer<IQuestionSchema>;
