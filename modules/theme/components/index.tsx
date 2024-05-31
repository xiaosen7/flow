"use client";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  EThemeMode,
  EUserThemeMode,
  USER_THEMES,
  USER_THEME_MAP,
  useTheme,
} from "@/modules/theme";
import clsx from "clsx";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export interface IThemeProps {}

const saveUserThemeMode = (userThemeMode: EUserThemeMode) => {
  if (typeof localStorage === "undefined") {
    return;
  }
  localStorage.userThemeMode = userThemeMode;
};

const reloadUserThemeMode = (): EUserThemeMode => {
  if (typeof localStorage === "undefined") {
    return EUserThemeMode.System;
  }
  return localStorage.userThemeMode ?? EUserThemeMode.System;
};

const Theme: React.FC<IThemeProps> = () => {
  const { mode, setMode } = useTheme();
  const [userThemeMode, setUserThemeMode] = useState<EUserThemeMode>(
    reloadUserThemeMode()
  );

  useEffect(() => {
    saveUserThemeMode(userThemeMode);

    switch (userThemeMode) {
      case EUserThemeMode.System:
        {
          const preferDark = !!window.matchMedia("(prefers-color-scheme:dark)")
            .matches;
          setMode(preferDark ? EThemeMode.Dark : EThemeMode.Light);
        }
        break;

      default:
        {
          setMode(userThemeMode as unknown as EThemeMode);
        }
        break;
    }
  }, [userThemeMode, setMode]);

  return (
    <Menubar className="relative border-none bg-transparent shadow-none">
      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer focus:bg-light-900 data-[state=open]:bg-light-900 dark:focus:bg-dark-200 dark:data-[state=open]:bg-dark-200">
          <Image
            src={USER_THEME_MAP[mode].icon}
            alt="moon"
            width={20}
            height={20}
            className="active-theme"
          />
        </MenubarTrigger>

        <MenubarContent className="absolute -right-12 my-2 mt-3 min-w-[120px] rounded border dark:border-dark-400 dark:bg-dark-300">
          {USER_THEMES.map(({ icon, label, value }) => (
            <MenubarItem
              className="flex cursor-pointer items-center gap-4 px-2.5 py-2"
              key={value}
              onClick={() => {
                setUserThemeMode(value);
              }}
            >
              <Image
                src={icon}
                alt={value}
                width={16}
                height={16}
                className={userThemeMode === value ? "active-theme" : ""}
              />

              <p
                className={clsx(
                  "body-semibold text-light-500",
                  userThemeMode === value
                    ? "text-primary-500"
                    : "text-dark100_light900"
                )}
              >
                {label}
              </p>
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export { Theme };
