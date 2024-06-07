import Link from "next/link";

import { UIQuestionFilter } from "@/question";
import { Button, NoResults, SearchInput } from "@/shared";

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

        <UIQuestionFilter />

        <div className="mt-10 flex w-full flex-col gap-6">
          <NoResults
            titleName="questions"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the
          discussion. our query could be the next big thing others learn from. Get
          involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        </div>
      </div>
    </>
  );
}
