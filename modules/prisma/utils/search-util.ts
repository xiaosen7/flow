import { ESearchParamKey, ISearchParams } from "@/search-params";
import { Prisma } from "@prisma/client";
import { camelCase } from "change-case";
import { CamelCase } from "type-fest";
import { prisma } from "./instance";

const WHERE_FIELDS = {
  [Prisma.ModelName.Question]: [
    prisma.question.fields.title.name,
    prisma.question.fields.content.name,
  ],
  [Prisma.ModelName.Tag]: [prisma.tag.fields.name.name],
  [Prisma.ModelName.User]: [
    prisma.user.fields.fullName.name,
    prisma.user.fields.username.name,
  ],
  [Prisma.ModelName.Answer]: [prisma.answer.fields.content.name],
} as const;

export class SearchUtil<TModelName extends Prisma.ModelName> {
  readonly args: {
    where: { OR: { [x: string]: { contains: string } }[] } | undefined;
    skip: number;
    take: number;
    orderBy: { createdAt: "desc" };
  };
  private readonly where:
    | { OR: { [x: string]: { contains: string } }[] }
    | undefined;

  constructor(
    private modelName: TModelName,
    private searchParams: Pick<
      ISearchParams,
      ESearchParamKey.Q | ESearchParamKey.Page
    >
  ) {
    const search = this.searchParams[ESearchParamKey.Q];
    this.where = search
      ? {
          OR: WHERE_FIELDS[this.modelName].map((key) => ({
            [key]: {
              contains: search,
            },
          })),
        }
      : undefined;

    const page = Number(this.searchParams[ESearchParamKey.Page] || "1");
    this.args = {
      where: this.where,
      skip: (page - 1) * 20,
      take: 20,
      orderBy: {
        createdAt: "desc",
      },
    };
  }

  async count() {
    return prisma[
      camelCase(this.modelName) as CamelCase<Prisma.ModelName>
      // @ts-ignore
    ].count({
      where: this.where,
    }) as Promise<number>;
  }
}
