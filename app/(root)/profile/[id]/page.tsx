import { prisma } from "@/prisma";
import {
  ProfileAnsweredQuestionCard,
  ProfileBase,
  ProfileStats,
  ProfileTopQuestionCard,
  profileActions,
} from "@/profile";
import { IPageProps, Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared";
import { userActions } from "@/user";
import React from "react";

const ProFileDetailPage: React.FC<IPageProps<{ id: string }>> = async ({
  params: { id },
}) => {
  const profileUser = await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      questions: {
        orderBy: {
          upvotes: {
            _count: "desc",
          },
        },
        include: {
          tags: true,
          answers: true,
          upvotes: true,
        },
      },
      answers: {
        include: {
          question: {
            include: {
              tags: true,
              upvotes: true,
              author: true,
              answers: true,
            },
          },
        },
      },
    },
  });

  const loggedUser = await userActions.getCurrent();
  const editable = loggedUser?.id === profileUser.id;
  const badges = await profileActions.getBadges(profileUser.id);

  return (
    <div>
      <ProfileBase editable={editable} user={profileUser} />
      <ProfileStats
        badges={badges}
        reputation={0}
        totalAnswers={profileUser.answers.length}
        totalQuestions={profileUser.questions.length}
      />

      <div className="mt-10 flex gap-10">
        <Tabs className="flex-1" defaultValue="top-posts">
          <TabsList className="background-light800_dark400 min-h-[42px] p-1">
            <TabsTrigger className="tab" value="top-posts">
              Top Posts
            </TabsTrigger>
            <TabsTrigger className="tab" value="answers">
              Answers
            </TabsTrigger>
          </TabsList>
          <TabsContent className="flex w-full flex-col gap-6" value="top-posts">
            {profileUser.questions.map((question) => (
              <ProfileTopQuestionCard
                key={question.id}
                question={question}
                tags={question.tags}
                user={profileUser}
                votes={question.upvotes.length}
              />
            ))}
          </TabsContent>
          <TabsContent className="flex w-full flex-col gap-6" value="answers">
            {profileUser.answers.map((answer) => (
              <ProfileAnsweredQuestionCard
                key={answer.id}
                answer={answer}
                editable={editable}
                question={answer.question}
                upVotes={answer.question.upvotes.length}
                user={answer.question.author}
              />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProFileDetailPage;
