// Do not modify this file, it was generated by _scripts/gen-asset-components.ts

/* eslint-disable jsx-a11y/alt-text */

import { mp } from "@/shared";
import Image, { ImageProps } from "next/image";
import React from "react";

export const ImageDownvoted: React.FC<Omit<ImageProps, "src">> = (props) => {
  return mp(props, <Image src={"/assets/icons/downvoted.svg"} {...props} />);
};

export const imageDownvotedSrc = "/assets/icons/downvoted.svg";
