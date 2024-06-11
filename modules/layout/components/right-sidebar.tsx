import { IComponentBaseProps, ITag, mp } from "@/shared";
import { ImageChevronRight } from "@/shared/assets/icons/chevron-right";
import { Tag } from "@/tag";
import Link from "next/link";
import React from "react";

const hotQuestions = [
  {
    id: 1,
    title:
      "Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?",
  },
  { id: 2, title: "Is it only me or the font is bolder than necessary?" },
  { id: 3, title: "Can I get the course for free?" },
  { id: 4, title: "Redux Toolkit Not Updating State as Expected" },
  { id: 5, title: "Async/Await Function Not Handling Errors Properly" },
];
const popularTags: ITag[] = [
  { id: "1", name: "javascript", createdOn: new Date(), description: "" },
  { id: "2", name: "react", createdOn: new Date(), description: "" },
  { id: "3", name: "vuejs", createdOn: new Date(), description: "" },
  { id: "4", name: "redux", createdOn: new Date(), description: "" },
  { id: "5", name: "next", createdOn: new Date(), description: "" },
];

export interface IRightSidebarProps extends IComponentBaseProps {}

export const RightSidebar: React.FC<IRightSidebarProps> = (props) => {
  return mp(
    props,
    <section className="background-light900_dark200 light-border custom-scrollbar sticky right-0 top-0 flex h-full w-[350px] flex-col overflow-y-auto border-l p-6 shadow-light-300 dark:shadow-none">
      <div>
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>

        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {hotQuestions.map((question) => (
            <Link
              href={`/question/${question.id}`}
              key={question.id}
              className="flex cursor-pointer items-center justify-between gap-7"
            >
              <p className="body-medium text-dark500_light700">
                {question.title}
              </p>
              <ImageChevronRight
                alt="chevron right"
                width={20}
                height={20}
                className="invert-colors"
              />
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
        <div className="mt-7 flex flex-col gap-4">
          {popularTags.map((tag) => (
            <Tag key={tag.id} totalQuestions={10} tag={tag} />
          ))}
        </div>
      </div>
    </section>
  );
};
