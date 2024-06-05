import { DefaultLayout } from "@modules/layout";
import React from "react";

interface ILayoutProps extends React.PropsWithChildren {}

const Layout: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <main className="background-light850_dark100">
      <DefaultLayout className="h-screen">
        <section className="mx-auto flex w-full flex-col px-6 pb-6 max-md:pb-14 sm:px-14">
          {children}
        </section>
      </DefaultLayout>
    </main>
  );
};

export default Layout;
