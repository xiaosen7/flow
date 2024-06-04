import { imageHomeSrc } from "@components/asset/icons/home";
import { imageQuestionSrc } from "@components/asset/icons/question";
import { imageStarSrc } from "@components/asset/icons/star";
import { imageSuitcaseSrc } from "@components/asset/icons/suitcase";
import { imageTagSrc } from "@components/asset/icons/tag";
import { imageUserSrc } from "@components/asset/icons/user";
import { imageUsersSrc } from "@components/asset/icons/users";
import { ISidebarLink } from "@modules/layout";

export const NAV_LINKS: ISidebarLink[] = [
  {
    imgURL: imageHomeSrc,
    route: "/",
    label: "Home",
  },
  {
    imgURL: imageUsersSrc,
    route: "/community",
    label: "Community",
  },
  {
    imgURL: imageStarSrc,
    route: "/collection",
    label: "Collections",
  },
  {
    imgURL: imageSuitcaseSrc,
    route: "/jobs",
    label: "Find Jobs",
  },
  {
    imgURL: imageTagSrc,
    route: "/tags",
    label: "Tags",
  },
  {
    imgURL: imageUserSrc,
    route: "/profile",
    label: "Profile",
  },
  {
    imgURL: imageQuestionSrc,
    route: "/ask-question",
    label: "Ask a question",
  },
];
