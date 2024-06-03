import Link from "next/link";

import { SearchInput } from "@components/shared";
import { Button } from "@components/ui";
import { HomeFilter } from "@modules/flow-home";

export default async function Home() {
  const result = {
    questions: [],
  };

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>

        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900 w-full">
            Ask a Question
          </Button>
        </Link>
      </div>

      <div className="mt-11 flex flex-wrap justify-between gap-5 max-sm:flex-col sm:items-center">
        <SearchInput
          placeholder="Search for amazing minds"
          className="flex-1"
        />

        <HomeFilter />
      </div>
    </>
  );
}
