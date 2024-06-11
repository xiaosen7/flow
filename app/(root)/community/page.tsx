import { ListPageLayout } from "@/layout";
import { prisma } from "@/prisma";
import { NoResults } from "@/shared";
import { UserCard } from "@/user";
import React from "react";

const Page: React.FC = async () => {
  const users = await prisma.user.findMany({
    include: {
      tags: true,
    },
  });

  return (
    <ListPageLayout title={"All Users"}>
      <section className="mt-12 flex flex-wrap gap-4">
        {users.length === 0 && (
          <NoResults
            titleSubject="Users"
            description="Be the first to break the silence! 🚀 Sign up to be the first and kickstart the community. Get involved! 💡"
            link="/sign-up"
            linkTitle="Sign Up"
          />
        )}

        {users.map((user) => (
          <UserCard key={user.id} user={user} tags={user.tags} />
        ))}
      </section>
    </ListPageLayout>
  );
};

export default Page;
