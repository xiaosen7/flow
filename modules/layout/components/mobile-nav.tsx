"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SignedOut } from "@clerk/nextjs";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { SIDEBAR_LINKS } from "../constants";

interface INavContentProps {}
const NavContent: React.FC<INavContentProps> = () => {
  const pathname = usePathname();
  return (
    <section className="flex flex-col gap-6 overflow-auto">
      {SIDEBAR_LINKS.map(({ imgURL, label, route }) => {
        const isActive = pathname.includes(route);
        return (
          <SheetClose asChild key={route}>
            <Link
              href={route}
              className={clsx(
                isActive
                  ? "primary-gradient rounded-lg text-light-900"
                  : "text-dark300_light900",
                "flex items-center justify-start gap-4 bg-transparent p-4"
              )}
            >
              <Image
                src={imgURL}
                width={20}
                height={20}
                alt={label}
                className={clsx(!isActive && "invert-colors")}
              />
              <p className={clsx(isActive ? "base-bold" : "base-medium")}>
                {label}
              </p>
            </Link>
          </SheetClose>
        );
      })}
    </section>
  );
};

export interface IMobileNavProps {}

export const MobileNav: React.FC<IMobileNavProps> = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src="/assets/icons/hamburger.svg"
          width={36}
          height={36}
          alt="Menu"
          className="invert-colors sm:hidden"
        />
      </SheetTrigger>

      <SheetContent
        side={"left"}
        className="background-light900_dark200 flex flex-col justify-between border-none"
      >
        <Link href="/" className="flex items-center gap-1">
          <Image
            src={"/assets/images/site-logo.svg"}
            width={23}
            height={23}
            alt="DevFlow"
          />

          <p className="h2-bold text-dark100_light900 font-spaceGrotesk">
            Dev <span className="text-primary-500">Overflow</span>
          </p>
        </Link>

        <NavContent />

        <SignedOut>
          {/* only rendered when signed out */}
          <div className="flex flex-col gap-3">
            <SheetClose asChild>
              <Link href={"/sign-in"}>
                <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3">
                  <span className="primary-text-gradient">Log In</span>
                </Button>
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link href={"/sign-up"}>
                <Button className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                  Sign Up
                </Button>
              </Link>
            </SheetClose>
          </div>
        </SignedOut>
      </SheetContent>
    </Sheet>
  );
};
