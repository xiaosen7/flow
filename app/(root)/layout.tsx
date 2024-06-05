import { DefaultLayout } from "@modules/layout";
import React from "react";
import simpleGit from "simple-git";

const git = simpleGit();

interface ILayoutProps extends React.PropsWithChildren {}

const Layout: React.FC<ILayoutProps> = async ({ children }) => {
  const log = await git.log();
  return (
    <main className="background-light850_dark100">
      <DefaultLayout className="h-screen">
        <section className="mx-auto flex w-full flex-col px-6 pb-6 max-md:pb-14 sm:px-14">
          {children}

          <p className="text-light400_light500 flex justify-between pt-6 text-sm">
            <span>update at :{log?.latest?.date}</span>
            {log?.latest?.message}
          </p>
        </section>
      </DefaultLayout>
    </main>
  );
};

export default Layout;
