import { Prisma } from "@prisma/client";
import { IsEqual } from "type-fest";

export type IGetModelInclude<TModelName extends Prisma.ModelName> =
  IsEqual<TModelName, "Question"> extends true ? Prisma.QuestionInclude : never;
