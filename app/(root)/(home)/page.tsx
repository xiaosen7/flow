import Link from "next/link";

import { ListPageLayout } from "@/layout";
import { CQuestionCards, QUESTION_FILTER_OPTIONS } from "@/question";
import { Button } from "@/shared";

export default async function Home() {
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
      <CQuestionCards />
    </ListPageLayout>
  );
}
