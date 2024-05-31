import { Button } from "@/components/ui/button";
import { IDENTITY_FN } from "@/constants";
import { cn, mergeClassAndStyleProps } from "@/lib/utils";
import { IComponentBaseProps } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export interface INavButtonsProps extends IComponentBaseProps {
  renderItem?: (originNode: React.ReactNode) => React.ReactNode;
  simple?: boolean;
}

export const NavButtons: React.FC<INavButtonsProps> = (props) => {
  const { renderItem = IDENTITY_FN, simple } = props;
  return mergeClassAndStyleProps(
    props,
    <div className="flex flex-col gap-3">
      {renderItem(
        <Link href={"/sign-in"}>
          <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3">
            <Image
              alt="Log In"
              src="/assets/icons/account.svg"
              width={20}
              height={20}
              className={cn("invert-colors", !simple && "hidden")} // < 1024px
            />
            <span
              className={cn("primary-text-gradient", simple && "hidden")} // > 1024px
            >
              Log In
            </span>
          </Button>
        </Link>
      )}

      {renderItem(
        <Link href={"/sign-up"}>
          <Button className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
            <Image
              alt="Sign Up"
              src="/assets/icons/sign-up.svg"
              width={20}
              height={20}
              className={cn("invert-colors", !simple && "hidden")} // < 1024
            />
            <span
              className={cn(simple && "hidden")} // > 1024
            >
              Sign Up
            </span>
          </Button>
        </Link>
      )}
    </div>
  );
};
