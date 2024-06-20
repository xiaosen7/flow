import { questionActions } from "@/actions";
import { QuestionForm } from "@/question";
import React from "react";

const AskQuestionPage: React.FC = () => {
  return <QuestionForm onSubmit={questionActions.create} />;
};

export default AskQuestionPage;
