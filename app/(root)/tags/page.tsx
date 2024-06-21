import { prisma } from "@/prisma";
import { IPageProps, List, MODEL_NAME, NoResults } from "@/shared";
import { TagCard } from "@/tag";
import React from "react";

const TagsPage: React.FC<IPageProps<{}, { q: string }>> = async (props) => {
  const { searchParams } = props;

  const { items: tags, total } = await prisma.tag.search({
    include: { questions: true },
    searchParams,
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
      items={tags}
      modelFilter={{
        name: MODEL_NAME.Tag,
      }}
      renderItem={(tag) => (
        <TagCard tag={tag} totalQuestions={tag.questions.length} />
      )}
      search={{ placeholder: "Search by tag name..." }}
      title={"Tags"}
      total={total}
    />
  );
};

export default TagsPage;
