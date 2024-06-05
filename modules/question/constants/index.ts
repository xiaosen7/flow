import { IFilterOption } from "@components/shared";
import * as z from "zod";

export const QUESTION_FILTER_OPTIONS: IFilterOption[] = [
  { label: "Newest", value: "newest" },
  { label: "Recommended", value: "recommended" },
  { label: "Frequent", value: "frequent" },
  { label: "Unanswered", value: "unanswered" },
];

export const QUESTION_SCHEMA = z.object({
  title: z.string().min(5).max(130),
  explanation: z.string().min(20),
  tags: z.array(z.string().min(1).max(20)).min(1).max(3),
});
