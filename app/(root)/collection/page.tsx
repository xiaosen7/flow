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
      search={{
        placeholder: "Search for amazing minds",
      }}
      filter={{
        options: QUESTION_FILTER_OPTIONS,
      }}
      title={"Saved Questions"}
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
