import { IFilterOption } from "@/shared";
import { z } from "zod";

export const ANSWER_FILTER_OPTIONS: IFilterOption[] = [
  { label: "Highest Upvotes", value: "highestUpvotes" },
  { label: "Lowest Upvotes", value: "lowestUpvotes" },
  { label: "Most Recent", value: "recent" },
  { label: "Oldest", value: "old" },
];

export const ANSWER_SCHEMA = z.object({
  content: z.string().min(10),
});
