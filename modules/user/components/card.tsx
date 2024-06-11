import { Badge, IComponentBaseProps, mp } from "@/shared";
import { CTag, ITag } from "@/tag";
import Image from "next/image";
import Link from "next/link";
import { IUser } from "../types";

export interface IUserCardProps extends IComponentBaseProps {
  user: IUser;
  tags: ITag[];
}

export const UserCard = (props: IUserCardProps) => {
  const { user, tags } = props;
  return mp(
    props,
    <Link
      href={`/profile/${user.id}`}
      className="shadow-light100_darknone  max-xs:min-w-full xs:w-[260px]"
    >
      <article className="background-light900_dark200 light-border flex flex-col items-center justify-center rounded-2xl border p-8">
        <Image
          src={user.imageUrl}
          alt="User profile picture"
          width={100}
          height={100}
          className="rounded-full"
        />
        <div className="mt-4 text-center">
          <h3 className="h3-bold text-dark200_light900 line-clamp-1">
            {user.fullName}
          </h3>
          <p className="body-regular text-dark500_light500 mt-2">
            @{user.username}
          </p>
        </div>

        <div className="mt-5">
          {tags.length > 0 ? (
            <div className="flex items-center gap-2">
              {tags.map((tag) => (
                <CTag key={tag.id} tag={tag} />
              ))}
            </div>
          ) : (
            <Badge>No tags yet</Badge>
          )}
        </div>
      </article>
    </Link>
  );
};
