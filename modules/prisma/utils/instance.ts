import { ESearchParamKey, ISearchParams } from "@/search-params";
import { IBetterOmit, ISafeAny } from "@/shared";
import { Prisma, PrismaClient } from "@prisma/client";
import { merge, omit } from "lodash-es";

const globalThis = global as unknown as {
  prisma: ReturnType<typeof createInstance> | undefined;
};

function createInstance() {
  return new PrismaClient().$extends({
    model: {
      $allModels: {
        search<T, A>(
          this: T,
          args: IBetterOmit<
            Prisma.Exact<A, Prisma.Args<T, "findMany">>,
            "take" | "skip"
          > & {
            searchParams?: IPrismaSearchParams;
          }
        ) {
          const { searchParams } = args;
          const userArgs = omit(args, "searchParams");
          const context = Prisma.getExtensionContext(this) as any;
          const modelName = context.name as Prisma.ModelName;

          const finalArgs = getArgs(modelName, searchParams, userArgs);

          return prisma.$transaction(async () => {
            const items = (await context.findMany(finalArgs)) as Prisma.Result<
              T,
              A,
              "findMany"
            >;

            const total = (await context.count({
              where: finalArgs.where,
            })) as number;

            return { items, total };
          });
        },
      },
    },
  });
}

export const prisma = globalThis.prisma || createInstance();

// we do not need to update the prisma instance when code has been changed in development.
if (process.env.NODE_ENV === "development") globalThis.prisma = prisma;

const modelMap = {
  [Prisma.ModelName.Question]: {
    searchableFields: [
      prisma.question.fields.title.name,
      prisma.question.fields.content.name,
    ],
  },
  [Prisma.ModelName.Tag]: {
    searchableFields: [prisma.tag.fields.name.name],
  },
  [Prisma.ModelName.User]: {
    searchableFields: [
      prisma.user.fields.fullName.name,
      prisma.user.fields.username.name,
    ],
  },
  [Prisma.ModelName.Answer]: {
    searchableFields: [prisma.answer.fields.content.name],
  },
} as const;

type IPrismaSearchParams = Pick<
  ISearchParams,
  ESearchParamKey.Q | ESearchParamKey.Page | ESearchParamKey.PageSize
>;

function getArgs(
  modelName: Prisma.ModelName,
  searchParams?: IPrismaSearchParams,
  args?: ISafeAny
) {
  const page = Number(searchParams?.[ESearchParamKey.Page]) || 1;
  const pageSize = Number(searchParams?.[ESearchParamKey.PageSize]) || 20;
  const search = searchParams?.[ESearchParamKey.Q];

  const where = search
    ? {
        OR: modelMap[modelName].searchableFields.map((key) => ({
          [key]: {
            contains: search,
            mode: "insensitive",
          },
        })),
      }
    : undefined;

  return merge(
    {},
    {
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: {
        createdAt: "desc",
      },
    },
    args
  );
}
