import { DefaultLayout } from "@modules/layout";
import React from "react";

interface ILayoutProps extends React.PropsWithChildren {}

const Layout: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <main className="background-light850_dark100">
      <DefaultLayout>
        <section className="mx-auto flex w-full max-w-5xl flex-col px-6 pb-6 max-md:pb-14 sm:px-14">
          {children}
        </section>
      </DefaultLayout>
    </main>
  );
};

export default Layout;
