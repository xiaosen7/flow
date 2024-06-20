import Link from "next/link";

import { SearchUtil, prisma } from "@/prisma";
import { QUESTION_FILTER_OPTIONS, QuestionList } from "@/question";
import { Button, IPageProps, NoResults } from "@/shared";

export default async function Home(props: IPageProps) {
  const { searchParams } = props;

  const searchUtil = SearchUtil.create(SearchUtil.kind.Question, searchParams);
  const [questions, total] = await prisma.$transaction([
    prisma.question.findMany({
      include: {
        author: true,
        tags: true,
        upvotes: true,
      },
      ...searchUtil.args,
    }),
    searchUtil.count(),
  ]);

  return (
    <QuestionList
      empty={
        <NoResults
          description="Be the first to break the silence! 🚀 Ask a Question and kickstart the
        discussion. our query could be the next big thing others learn from. Get
        involved! 💡"
          link="/ask-question"
          linkTitle="Ask a Question"
          topic="questions"
        />
      }
      filter={{
        options: QUESTION_FILTER_OPTIONS,
      }}
      getAuthor={(question) => question.author}
      getTags={(question) => question.tags}
      getVotes={(question) => question.upvotes}
      questions={questions}
      search={{
        placeholder: "Search for amazing minds",
      }}
      title={"All Questions"}
      titleExtra={
        <Link className="flex justify-end max-sm:w-full" href="/ask-question">
          <Button className="min-h-[46px] w-full" variant={"primary-gradient"}>
            Ask a Question
          </Button>
        </Link>
      }
      total={total}
    />
  );
}
