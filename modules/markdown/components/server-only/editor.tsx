import React from "react";
import { IMarkdownEditorProps } from "../types";

export const MarkdownEditor: React.FC<IMarkdownEditorProps> = (props) => {
  const { value, defaultValue } = props;
  console.log("server-side-only editor", { value });
  return <textarea defaultValue={defaultValue ?? value} />;
};
