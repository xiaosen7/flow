import Link from "next/link";

import { SearchInput } from "@components/shared";
import { Button } from "@components/ui";
import { HomeFilter } from "@modules/flow-home";

export default async function Home() {
  return (
    <>
      <div className="flex w-full flex-col-reverse items-center justify-between gap-4 sm:flex-row">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>

        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] w-full px-4 py-3 !text-light-900">
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
