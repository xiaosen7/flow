import value from "@/markdown/assets/example-value.md?raw";
import { MarkdownViewer } from "@/markdown/components/client-only/viewer";
import React from "react";

const Page: React.FC = () => {
  return <MarkdownViewer value={value} />;
};

export default Page;
