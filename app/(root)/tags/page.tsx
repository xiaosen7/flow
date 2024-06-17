import { prisma } from "@/prisma";
import { List, NoResults } from "@/shared";
import { TAG_FILTERS, TagCard } from "@/tag";
import React from "react";

const TagsPage: React.FC = async () => {
  const tags = await prisma.tag.findMany({
    include: { questions: true },
  });

  return (
    <List
      empty={
        <NoResults
          description="It appears that there are not tags found at the moment 😔. Ask a Question and kickstart the
          discussion with tags. our query could be the next big thing others learn from. Get
          involved! 💡"
          link="/ask-question"
          linkTitle="Ask a Question"
          topic="Tags"
        />
      }
      filter={{
        options: TAG_FILTERS,
      }}
      items={tags}
      renderItem={(tag) => (
        <TagCard tag={tag} totalQuestions={tag.questions.length} />
      )}
      search={{ placeholder: "Search by tag name..." }}
      title={"Tags"}
    />
  );
};

export default TagsPage;
