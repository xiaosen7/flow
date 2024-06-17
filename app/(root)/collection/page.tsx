import {
  QUESTION_FILTER_OPTIONS,
  QuestionList,
  questionActions,
} from "@/question";
import { NoResults } from "@/shared";

export default async function Home() {
  const questions = await questionActions.getCollected();

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
      title={"Saved Questions"}
    />
  );
}
