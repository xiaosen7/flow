import Link from "next/link";

import { prisma } from "@/prisma";
import { QUESTION_FILTER_OPTIONS, QuestionList } from "@/question";
import { Button, NoResults } from "@/shared";

export default async function Home() {
  const questions = await prisma.question.findMany({
    include: {
      author: true,
      tags: true,
      upvotes: true,
    },
  });
  return (
    <QuestionList
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
      questions={questions}
      getAuthor={(question) => question.author}
      getTags={(question) => question.tags}
      getVotes={(question) => question.upvotes}
      empty={
        <NoResults
          topic="questions"
          description="Be the first to break the silence! 🚀 Ask a Question and kickstart the
        discussion. our query could be the next big thing others learn from. Get
        involved! 💡"
          link="/ask-question"
          linkTitle="Ask a Question"
        />
      }
    />
  );
}
