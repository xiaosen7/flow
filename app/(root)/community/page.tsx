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
      empty={
        <NoResults
          description="Be the first to break the silence! 🚀 Sign up to be the first and kickstart the community. Get involved! 💡"
          link="/sign-up"
          linkTitle="Sign Up"
          topic="Users"
        />
      }
      filter={{
        options: USER_FILTER_OPTIONS,
      }}
      items={users}
      renderItem={(user) => (
        <UserCard key={user.id} tags={user.tags} user={user} />
      )}
      search={{
        placeholder: "Search amazing minds here...",
      }}
      title={"All Users"}
    />
  );
};

export default CommunityPage;
