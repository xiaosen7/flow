import Link from "next/link";

import { ListPageLayout } from "@/layout";
import { prisma } from "@/prisma";
import { QUESTION_FILTER_OPTIONS, QuestionCard } from "@/question";
import { Button, List, NoResults } from "@/shared";

export default async function Home() {
  const questions = await prisma.question.findMany({
    include: {
      author: true,
      tags: true,
    },
  });
  return (
    <ListPageLayout
      search={{
        placeholder: "Search for amazing minds",
      }}
      filter={{
        options: QUESTION_FILTER_OPTIONS,
      }}
      title={"All Questions"}
      titleExtra={
        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="min-h-[46px] w-full" variant={"primary-gradient"}>
            Ask a Question
          </Button>
        </Link>
      }
    >
      <List
        items={questions}
        renderItem={(question) => (
          <QuestionCard
            question={question}
            creator={question.author}
            tags={question.tags}
          />
        )}
        empty={
          <NoResults
            titleSubject="questions"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the
        discussion. our query could be the next big thing others learn from. Get
        involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        }
      />
    </ListPageLayout>
  );
}
