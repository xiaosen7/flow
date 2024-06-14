import {
  QUESTION_FILTER_OPTIONS,
  QuestionCard,
  questionActions,
} from "@/question";
import { List, NoResults } from "@/shared";

export default async function Home() {
  const questions = await questionActions.getCollected();

  return (
    <List
      search={{
        placeholder: "Search for amazing minds",
      }}
      filter={{
        options: QUESTION_FILTER_OPTIONS,
      }}
      title={"Saved Questions"}
      direction="column"
      items={questions}
      renderItem={(question) => (
        <QuestionCard
          question={question}
          creator={question.author}
          tags={question.tags}
          votes={question.upvotes.length}
        />
      )}
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
    ></List>
  );
}
