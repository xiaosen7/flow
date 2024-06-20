import { IGlobalSearchResult } from "@/layout";
import { ESearchParamKey, ISearchParams } from "@/search-params";
import { IAnswer, IQuestion, ITag, IUser } from "@/shared";
import { Prisma } from "@prisma/client";
import { camelCase } from "change-case";
import { CamelCase } from "type-fest";
import { prisma } from "./instance";

export class SearchUtil<TModelName extends Prisma.ModelName> {
  static kind = Prisma.ModelName;

  static create<T extends Prisma.ModelName>(
    modelName: T,
    searchParams: ISearchUtilSearchParams
  ): IModelTypeMap[T]["util"] {
    return new modelMap[modelName].SearchConstructor(searchParams);
  }

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
    private searchParams: ISearchUtilSearchParams
  ) {
    const search = this.searchParams[ESearchParamKey.Q];
    this.where = search
      ? {
          OR: modelMap[this.modelName].searchableFields.map((key) => ({
            [key]: {
              contains: search,
              mode: "insensitive",
            },
          })),
        }
      : undefined;

    const page = Number(this.searchParams[ESearchParamKey.Page]) || 1;
    const pageSize = Number(this.searchParams[ESearchParamKey.PageSize]) || 20;
    this.args = {
      where: this.where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: {
        createdAt: "desc",
      },
    };
  }

  count(): Prisma.PrismaPromise<number> {
    return prisma[
      camelCase(this.modelName) as CamelCase<Prisma.ModelName>
      // @ts-ignore
    ].count({
      where: this.where,
    });
  }

  async findMany(): Promise<IModelTypeMap[TModelName]["type"][]> {
    // @ts-ignore
    return prisma[camelCase(this.modelName) as CamelCase<TModelName>].findMany({
      ...this.args,
    });
  }
}

class QuestionSearchUtil extends SearchUtil<typeof Prisma.ModelName.Question> {
  constructor(searchParams: ISearchParams) {
    super(Prisma.ModelName.Question, searchParams);
  }

  async globalSearch(): Promise<IGlobalSearchResult> {
    const questions = await prisma.question.findMany(this.args);

    return questions.map((question) => ({
      key: question.id,
      link: `/question/${question.id}`,
      title: question.title,
      type: Prisma.ModelName.Question,
    }));
  }
}

class AnswerSearchUtil extends SearchUtil<typeof Prisma.ModelName.Answer> {
  constructor(searchParams: ISearchParams) {
    super(Prisma.ModelName.Answer, searchParams);
  }

  async globalSearch(): Promise<IGlobalSearchResult> {
    const answers = await prisma.answer.findMany({
      ...this.args,
      include: {
        question: true,
      },
    });

    return answers.map((answer) => ({
      key: answer.id,
      link: `/question/${answer.questionId}`,
      title: "Answers containing text",
      type: Prisma.ModelName.Answer,
    }));
  }
}

class TagSearchUtil extends SearchUtil<typeof Prisma.ModelName.Tag> {
  constructor(searchParams: ISearchParams) {
    super(Prisma.ModelName.Tag, searchParams);
  }

  async globalSearch(): Promise<IGlobalSearchResult> {
    const tags = await prisma.tag.findMany(this.args);

    return tags.map((tag) => ({
      key: tag.id,
      link: `/tags/${tag.id}`,
      title: tag.name,
      type: Prisma.ModelName.Tag,
    }));
  }
}

class UserSearchUtil extends SearchUtil<typeof Prisma.ModelName.User> {
  constructor(searchParams: ISearchParams) {
    super(Prisma.ModelName.User, searchParams);
  }

  async globalSearch(): Promise<IGlobalSearchResult> {
    const users = await prisma.user.findMany(this.args);

    return users.map((user) => ({
      key: user.id,
      link: `/profile/${user.id}`,
      title: user.username,
      type: Prisma.ModelName.User,
    }));
  }
}

const modelMap = {
  [Prisma.ModelName.Question]: {
    searchableFields: [
      prisma.question.fields.title.name,
      prisma.question.fields.content.name,
    ],
    SearchConstructor: QuestionSearchUtil,
  },
  [Prisma.ModelName.Tag]: {
    searchableFields: [prisma.tag.fields.name.name],
    SearchConstructor: TagSearchUtil,
  },
  [Prisma.ModelName.User]: {
    searchableFields: [
      prisma.user.fields.fullName.name,
      prisma.user.fields.username.name,
    ],
    SearchConstructor: UserSearchUtil,
  },
  [Prisma.ModelName.Answer]: {
    searchableFields: [prisma.answer.fields.content.name],
    SearchConstructor: AnswerSearchUtil,
  },
} as const;

type IModelTypeMap = {
  [Prisma.ModelName.Answer]: {
    name: "answer";
    type: IAnswer;
    include: Prisma.AnswerInclude;
    util: AnswerSearchUtil;
  };
  [Prisma.ModelName.Question]: {
    name: "question,";
    type: IQuestion;
    include: Prisma.QuestionInclude;
    util: QuestionSearchUtil;
  };
  [Prisma.ModelName.Tag]: {
    name: "tag";
    type: ITag;
    include: Prisma.TagInclude;
    util: TagSearchUtil;
  };
  [Prisma.ModelName.User]: {
    name: "user";
    type: IUser;
    include: Prisma.UserInclude;
    util: UserSearchUtil;
  };
};

type ISearchUtilSearchParams = Pick<
  ISearchParams,
  ESearchParamKey.Q | ESearchParamKey.Page | ESearchParamKey.PageSize
>;
