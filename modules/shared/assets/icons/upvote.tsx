// Do not modify this file, it was generated by _scripts/gen-asset-components.ts

/* eslint-disable jsx-a11y/alt-text */

import { mp } from "@/shared";
import Image, { ImageProps } from "next/image";
import React from "react";

export const ImageUpvote: React.FC<Omit<ImageProps, "src">> = (props) => {
  return mp(props, <Image src={"/assets/icons/upvote.svg"} {...props} />);
};

export const imageUpvoteSrc = "/assets/icons/upvote.svg";
