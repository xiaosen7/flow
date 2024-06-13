import { prisma } from "@/prisma";
import { List, NoResults } from "@/shared";
import { USER_FILTER_OPTIONS, UserCard } from "@/user";
import React from "react";

const CommunityPage: React.FC = async () => {
  const users = await prisma.user.findMany({
    include: {
      tags: true,
    },
  });

  return (
    <List
      title={"All Users"}
      filter={{
        options: USER_FILTER_OPTIONS,
      }}
      search={{
        placeholder: "Search amazing minds here...",
      }}
      items={users}
      renderItem={(user) => (
        <UserCard key={user.id} user={user} tags={user.tags} />
      )}
      empty={
        <NoResults
          topic="Users"
          description="Be the first to break the silence! 🚀 Sign up to be the first and kickstart the community. Get involved! 💡"
          link="/sign-up"
          linkTitle="Sign Up"
        />
      }
    />
  );
};

export default CommunityPage;
