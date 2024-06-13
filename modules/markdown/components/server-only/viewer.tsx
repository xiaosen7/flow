import React from "react";
import Markdown from "react-markdown";
import { IMarkdownViewerProps } from "../types";

export const MarkdownViewer: React.FC<IMarkdownViewerProps> = (props) => {
  const { value } = props;
  console.log("server-side-only viewer", { value });
  return <Markdown>{value}</Markdown>;
};
