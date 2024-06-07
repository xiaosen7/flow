import { Button, IComponentBaseProps, mp } from "@/shared";
import { ImageDarkIllustration } from "@/shared/assets/images/dark-illustration";
import { ImageLightIllustration } from "@/shared/assets/images/light-illustration";
import Link from "next/link";
import React from "react";

export interface INoResultsProps extends IComponentBaseProps {
  /**
   * @default 'Results'
   */
  titleName?: React.ReactNode;
  description: React.ReactNode;
  link: string;
  linkTitle: string;
}

export const NoResults: React.FC<INoResultsProps> = (props) => {
  const { titleName = "Results", description, link, linkTitle } = props;
  return mp(
    props,
    <div className="mt-10 flex w-full flex-col items-center justify-center">
      <ImageLightIllustration
        alt="No result illustration"
        width={270}
        height={200}
        className="block object-contain dark:hidden"
      />
      <ImageDarkIllustration
        alt="No result illustration"
        width={270}
        height={200}
        className="hidden object-contain dark:flex"
      />

      <h2 className="h2-bold text-dark200_light900 mt-8 capitalize">
        No {titleName} Found
      </h2>
      <p className="body-regular text-dark500_light700 my-3.5 max-w-md text-center">
        {description}
      </p>

      <Link href={link}>
        <Button variant={"primary"} className="min-h-[46px]">
          {linkTitle}
        </Button>
      </Link>
    </div>
  );
};
