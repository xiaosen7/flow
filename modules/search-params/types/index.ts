import { ESearchParamKey } from "../constants";

export interface ISearchParams {
  [ESearchParamKey.Q]?: string;
  [ESearchParamKey.GQ]?: string;
  [ESearchParamKey.Page]?: string;
  [ESearchParamKey.AnsweredQuestionPage]?: string;
  [ESearchParamKey.questionPage]?: string;
}
