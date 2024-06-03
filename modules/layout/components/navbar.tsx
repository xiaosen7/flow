import { SignedIn, UserButton } from "@clerk/nextjs";
import { mergeClassAndStyleProps } from "@lib/utils";
import { ThemeSwitcher } from "@modules/theme";
import { IComponentBaseProps } from "@types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { GlobalSearch } from "./global-search";
import { MobileNav } from "./mobile-nav";

export interface INavbarProps extends IComponentBaseProps {}

export const Navbar: React.FC<INavbarProps> = (props) => {
  return mergeClassAndStyleProps(
    props,
    <nav className="flex-between background-light900_dark200 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src={"/assets/images/site-logo.svg"}
          width={23}
          height={23}
          alt="DevFlow"
        />

        <p className="h2-bold font-spaceGrotesk text-dark-100 dark:text-light-900 max-sm:hidden">
          Dev <span className="text-primary-500">Overflow</span>
        </p>
      </Link>

      <GlobalSearch className="max-lg:hidden max-w-[600px] flex-1" />

      <div className="flex-between gap-5">
        <ThemeSwitcher />

        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                avatarBox: "h-10 w-10",
              },
              variables: {
                colorPrimary: "#ff7000",
              },
            }}
          />
        </SignedIn>

        <MobileNav
          className="sm:hidden" // 大于640时隐藏
        />
      </div>
    </nav>
  );
};
