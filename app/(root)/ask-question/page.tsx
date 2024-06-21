import { actions } from "@/actions";
import { QuestionForm } from "@/question";
import React from "react";

const AskQuestionPage: React.FC = () => {
  return <QuestionForm onSubmit={actions.question.create} />;
};

export default AskQuestionPage;
