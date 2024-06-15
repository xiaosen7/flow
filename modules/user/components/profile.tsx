import {
  Button,
  IAnswer,
  IComponentBaseProps,
  IQuestion,
  IUser,
  Linkable,
  cn,
  formatJoinedAt,
  formatNumber,
  mp,
} from "@/shared";
import { imageCalendarSrc } from "@/shared/assets/icons/calendar";
import { imageLinkSrc } from "@/shared/assets/icons/link";
import { imageLocationSrc } from "@/shared/assets/icons/location";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export interface IUserProfileProps
  extends IComponentBaseProps,
    IProfileBaseProps,
    IProfileStatsProps,
    IProFileTabsProps {}

export const UserProfile: React.FC<IUserProfileProps> = (props) => {
  const {
    user,
    showEdit,
    totalQuestions,
    totalAnswers,
    gold,
    silver,
    bronze,
    reputation,
    topPosts,
    topAnswers,
  } = props;
  return mp(
    props,
    <div>
      <ProfileBase user={user} showEdit={showEdit} />

      <ProfileStats
        totalQuestions={totalQuestions}
        totalAnswers={totalAnswers}
        gold={gold}
        silver={silver}
        bronze={bronze}
        reputation={reputation}
      />

      <ProFileTabs topAnswers={topAnswers} topPosts={topPosts} />
    </div>
  );
};

interface IProfileBaseProps extends IComponentBaseProps {
  user: IUser;
  showEdit?: boolean;
}

const ProfileBase: React.FC<IProfileBaseProps> = (props) => {
  const { user, showEdit } = props;
  return mp(
    props,
    <div>
      <div className="flex flex-col items-start gap-4 lg:flex-row">
        <Image
          src={user.imageUrl}
          alt="profile picture"
          width={140}
          height={140}
          className="rounded-full object-cover"
        />

        <div className="mt-3">
          <h2 className="h2-bold text-dark100_light900">{user.fullName}</h2>
          <p className="paragraph-regular text-dark200_light800">
            @{user.username}
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-start gap-5">
            {user.portfolioWebsite && (
              <ProfileLink iconSrc={imageLinkSrc} href={user.portfolioWebsite}>
                {user.portfolioWebsite}
              </ProfileLink>
            )}

            {user.location && (
              <ProfileLink iconSrc={imageLocationSrc}>
                {user.location}
              </ProfileLink>
            )}

            <ProfileLink iconSrc={imageCalendarSrc}>
              {formatJoinedAt(user.joinedAt)}
            </ProfileLink>
          </div>

          {user.bio && (
            <p className="paragraph-regular text-dark400_light800 mt-8">
              {user.bio}
            </p>
          )}
        </div>
      </div>

      {showEdit && (
        <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
          <Link href="/profile/edit">
            <Button className="paragraph-medium btn-secondary text-dark300_light900 min-h-[46px] min-w-[175px] px-4 py-3">
              Edit Profile
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

function ProfileLink(props: {
  iconSrc: string;
  href?: string;
  children: React.ReactNode;
}) {
  const { iconSrc, href, children } = props;
  return (
    <div className="flex-center gap-1">
      <Image src={iconSrc} alt="icon" width={20} height={20} />

      <Linkable href={href} target="_blank">
        <span
          className={cn(
            href
              ? "paragraph-medium text-blue-500"
              : "paragraph-medium text-dark400_light700"
          )}
        >
          {children}
        </span>
      </Linkable>
    </div>
  );
}

interface IProfileStatsProps extends IComponentBaseProps {
  totalQuestions: number;
  totalAnswers: number;
  gold: number;
  silver: number;
  bronze: number;
  reputation: number;
}

const ProfileStats: React.FC<IProfileStatsProps> = (props) => {
  const { totalQuestions, totalAnswers, gold, silver, bronze, reputation } =
    props;
  return mp(
    props,
    <div className="mt-10">
      <h4 className="h3-semibold text-dark200_light900">
        Stats - {reputation}
      </h4>

      <div className="mt-5 grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-4">
        <div className="light-border background-light900_dark300 flex flex-wrap items-center justify-evenly gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200">
          <div>
            <p className="paragraph-semibold text-dark200_light900">
              {formatNumber(totalQuestions)}
            </p>
            <p className="body-medium text-dark400_light700">Questions</p>
          </div>
          <div>
            <p className="paragraph-semibold text-dark200_light900">
              {formatNumber(totalAnswers)}
            </p>
            <p className="body-medium text-dark400_light700">Answers</p>
          </div>
        </div>

        <StatsCard
          imgUrl="/assets/icons/gold-medal.svg"
          value={gold}
          title="Gold Badges"
        />

        <StatsCard
          imgUrl="/assets/icons/silver-medal.svg"
          value={silver}
          title="Silver Badges"
        />

        <StatsCard
          imgUrl="/assets/icons/bronze-medal.svg"
          value={bronze}
          title="Bronze Badges"
        />
      </div>
    </div>
  );
};

const StatsCard = ({
  imgUrl,
  value,
  title,
}: {
  imgUrl: string;
  value: number;
  title: string;
}) => {
  return (
    <div className="light-border background-light900_dark300 flex flex-wrap items-center justify-start gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200">
      <Image src={imgUrl} alt={title} width={40} height={50} />
      <div>
        <p className="paragraph-semibold text-dark200_light900">{value}</p>
        <p className="body-medium text-dark400_light700">{title}</p>
      </div>
    </div>
  );
};

interface IProFileTabsProps {
  topPosts: IQuestion[];
  topAnswers: IAnswer[];
}
const ProFileTabs: React.FC<IProFileTabsProps> = (props) => {
  return <>tab</>;
};
