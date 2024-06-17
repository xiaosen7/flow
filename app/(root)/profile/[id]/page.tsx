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
      <ProfileBase user={profileUser} editable={editable} />
      <ProfileStats
        totalAnswers={profileUser.answers.length}
        totalQuestions={profileUser.questions.length}
        badges={badges}
        reputation={0}
      />

      <div className="mt-10 flex gap-10">
        <Tabs defaultValue="top-posts" className="flex-1">
          <TabsList className="background-light800_dark400 min-h-[42px] p-1">
            <TabsTrigger value="top-posts" className="tab">
              Top Posts
            </TabsTrigger>
            <TabsTrigger value="answers" className="tab">
              Answers
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="top-posts"
            className="mt-5 flex w-full flex-col gap-6"
          >
            {profileUser.questions.map((question) => (
              <ProfileTopQuestionCard
                key={question.id}
                question={question}
                user={profileUser}
                tags={question.tags}
                votes={question.upvotes.length}
              />
            ))}
          </TabsContent>
          <TabsContent value="answers" className="flex w-full flex-col gap-6">
            {profileUser.answers.map((answer) => (
              <ProfileAnsweredQuestionCard
                key={answer.id}
                question={answer.question}
                upVotes={answer.question.upvotes.length}
                editable={editable}
                user={answer.question.author}
                answer={answer}
              />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProFileDetailPage;
