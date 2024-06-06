"use client";
import {
  IComponentBaseProps,
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
  mergeClassAndStyleProps,
} from "@/shared";
import { ImageHamburger } from "@/shared/assets/icons/hamburger";
import { ImageSiteLogo } from "@/shared/assets/images/site-logo";
import { SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { NavButtons } from "./nav-buttons";
import { NavLinks } from "./nav-links";

export interface IMobileNavProps extends IComponentBaseProps {}

export const MobileNav: React.FC<IMobileNavProps> = (props) => {
  return mergeClassAndStyleProps(
    props,
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <ImageHamburger
            width={36}
            height={36}
            alt="Menu"
            className="invert-colors cursor-pointer"
          />
        </SheetTrigger>

        <SheetContent
          side={"left"}
          className="background-light900_dark200 flex flex-col justify-between border-none"
        >
          <Link href="/" className="flex items-center gap-1">
            <ImageSiteLogo width={23} height={23} alt="DevFlow" />

            <p className="h2-bold text-dark100_light900 font-spaceGrotesk">
              Dev <span className="text-primary-500">Overflow</span>
            </p>
          </Link>

          <NavLinks
            renderItem={(node) => <SheetClose asChild>{node}</SheetClose>}
          />

          <SignedOut>
            <NavButtons
              renderItem={(node) => <SheetClose asChild>{node}</SheetClose>}
            />
          </SignedOut>
        </SheetContent>
      </Sheet>
    </div>
  );
};
