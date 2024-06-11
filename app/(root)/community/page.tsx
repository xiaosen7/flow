import { ListPageLayout } from "@/layout";
import { prisma } from "@/prisma";
import { List, NoResults } from "@/shared";
import { USER_FILTER_OPTIONS, UserCard } from "@/user";
import React from "react";

const Page: React.FC = async () => {
  const users = await prisma.user.findMany({
    include: {
      tags: true,
    },
  });

  return (
    <ListPageLayout
      title={"All Users"}
      filter={{
        options: USER_FILTER_OPTIONS,
      }}
      search={{
        placeholder: "Search amazing minds here...",
      }}
    >
      <section className="mt-12 flex flex-wrap gap-4">
        <List
          items={users}
          renderItem={(user) => (
            <UserCard key={user.id} user={user} tags={user.tags} />
          )}
          empty={
            <NoResults
              titleSubject="Users"
              description="Be the first to break the silence! 🚀 Sign up to be the first and kickstart the community. Get involved! 💡"
              link="/sign-up"
              linkTitle="Sign Up"
            />
          }
        />
      </section>
    </ListPageLayout>
  );
};

export default Page;
