"use client";
import { IComponentBaseProps, mp } from "@/shared";
import { imageStarFilledSrc } from "@/shared/assets/icons/star-filled";
import { imageStarRedSrc } from "@/shared/assets/icons/star-red";
import Image from "next/image";
import React from "react";

export interface ICollectProps extends IComponentBaseProps {
  collected?: boolean;
  onChange?: (collected: boolean) => void;
}

export const Collect: React.FC<ICollectProps> = (props) => {
  const { collected, onChange } = props;
  return mp(
    props,
    <Image
      src={collected ? imageStarFilledSrc : imageStarRedSrc}
      width={18}
      height={18}
      alt="star"
      className="cursor-pointer"
      onClick={() => onChange?.(!collected)}
    />
  );
};
