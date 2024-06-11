import { ITag } from "@/tag";
import { IUser } from "@/user";
import { isArray, random, range, uniqueId } from "lodash-es";

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
    };
  }

  export function date() {
    return new Date(random(2000, 2020), 1, 1);
  }

  export function create<T>(
    creator: () => T,
    count: number | [number, number]
  ): T[] {
    if (isArray(count)) {
      count = random(count[0], count[1]);
    }

    return range(count).map(() => creator());
  }

  export function imageUrl(
    width: number = 100,
    height: number = 100,
    seed: number = random(0, 10000)
  ) {
    return `https://picsum.photos/${width}/${height}?random=${seed}`;
  }
}
