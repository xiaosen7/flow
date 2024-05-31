"use client";
import { IDENTITY_FN } from "@/constants";
import { cn, mergeClassAndStyleProps } from "@/lib/utils";
import { IComponentBaseProps } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { NAV_LINKS } from "../constants";

export interface INavLinksProps extends IComponentBaseProps {
  renderItem?: (originalNode: React.ReactNode) => React.ReactNode;
  simple?: boolean;
}

export const NavLinks: React.FC<INavLinksProps> = (props) => {
  const { renderItem = IDENTITY_FN, simple } = props;

  const pathname = usePathname() ?? "/";
  return mergeClassAndStyleProps(
    props,
    <section className="flex flex-col gap-6 overflow-auto">
      {NAV_LINKS.map(({ imgURL, label, route }) => {
        const isActive = pathname?.includes(route);
        return (
          <React.Fragment key={route}>
            {renderItem(
              <Link
                href={route}
                className={cn(
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
                  className={cn(!isActive && "invert-colors")}
                />
                <p
                  className={cn(
                    isActive ? "base-bold" : "base-medium",
                    simple && "hidden"
                  )}
                >
                  {label}
                </p>
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </section>
  );
};
