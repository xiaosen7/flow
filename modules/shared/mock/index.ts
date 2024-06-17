import { EXAMPLE_MARKDOWN } from "@/markdown/constants/example-markdown";
import { isArray, random, range, uniqueId } from "lodash-es";
import type { IFilterOption } from "../components";
import type { IAnswer, IQuestion, ITag, IUser } from "../types";

export namespace mock {
  export function tag(): ITag {
    const id = uniqueId("mocked-tag");
    return {
      id,
      createdOn: date(),
      name: `tag${id}`,
      description: `tag${id} description`,
    };
  }

  tag.createMany = create.bind(null, tag);

  export function user(): IUser {
    const id = uniqueId("mocked-user");
    return {
      id,
      email: `user${id}@email.com`,
      clerkId: "user" + id,
      imageUrl: imageUrl(),
      fullName: `fullName of ${id}`,
      joinedAt: date(),
      username: `username of ${id}`,
      bio: `bio of ${id}`,
      location: `location of ${id}`,
      portfolioWebsite: `http://www.${id}.com`,
    };
  }

  user.createMany = create.bind(null, user);

  export function question(): IQuestion {
    const id = uniqueId("mocked-question");

    return {
      id,
      title: `This is question title of ${id}`,
      content: EXAMPLE_MARKDOWN,
      createdAt: date(),
      authorId: uniqueId("mocked-user"),
      views: random(0, 99999999),
    };
  }

  question.createMany = create.bind(null, question);

  export function answer(): IAnswer {
    const id = uniqueId("mocked-answer");
    return {
      id,
      content: `answer${id}`,
      createdAt: date(),
      authorId: uniqueId("mocked-user"),
      questionId: uniqueId("mocked-question"),
    };
  }

  answer.createMany = create.bind(null, answer);

  export function date() {
    return new Date(random(2000, 2020), 1, 1);
  }

  export function imageUrl(
    width: number = 100,
    height: number = 100,
    seed: number = random(0, 10000)
  ) {
    return `https://picsum.photos/${width}/${height}?random=${seed}`;
  }

  imageUrl.createMany = create.bind(null, imageUrl);

  export function filterOption(): IFilterOption {
    const value = uniqueId("mocked-filter-option-value");
    const label = uniqueId("mocked-filter-option-label");

    return { value, label };
  }

  filterOption.createMany = create.bind(null, filterOption);

  export function create<T>(
    creator: () => T,
    count: number | [number, number]
  ): T[] {
    if (isArray(count)) {
      count = random(count[0], count[1]);
    }

    return range(count).map(() => creator());
  }
}
