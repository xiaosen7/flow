import Link from "next/link";

import { NoResults, SearchInput } from "@components/shared";
import { Button } from "@components/ui";
import { IQuestion, QuestionCard, QuestionFilter } from "@modules/question";
import { random, range } from "lodash-es";

const result = {
  questions: range(random(100)).map((id) => ({
    id: String(id),
    author: {
      id: "1",
      avatarUrl: "https://api.dicebear.com/8.x/lorelei/svg",
      name: "Pedro Duarte",
    },
    createAt: new Date(),
    metrics: {
      answers: random(999999999),
      views: random(999999999),
      votes: random(999999999),
    },
    tags: range(random(20)).map((id) => ({
      id: String(id),
      name: `tag ${id}`,
      totalQuestions: 0,
    })),
    title: `Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?`,
  })) satisfies IQuestion[],
};

export default async function Home() {
  return (
    <>
      <div className="flex w-full flex-col-reverse items-center justify-between gap-4 sm:flex-row">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>

        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="min-h-[46px] w-full" variant={"primary-gradient"}>
            Ask a Question
          </Button>
        </Link>
      </div>

      <div className="mt-11 flex flex-wrap justify-between gap-5 max-sm:flex-col sm:items-center">
        <SearchInput
          placeholder="Search for amazing minds"
          className="flex-1"
        />

        <QuestionFilter />

        <div className="mt-10 flex w-full flex-col gap-6">
          {result.questions.length > 0 ? (
            result.questions.map((question) => (
              <QuestionCard key={question.id} question={question} />
            ))
          ) : (
            <NoResults
              titleName="questions"
              description="Be the first to break the silence! 🚀 Ask a Question and kickstart the
          discussion. our query could be the next big thing others learn from. Get
          involved! 💡"
              link="/ask-question"
              linkTitle="Ask a Question"
            />
          )}
        </div>
      </div>
    </>
  );
}
