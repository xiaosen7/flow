import { DefaultLayout } from "@/layout";
import React from "react";

interface ILayoutProps extends React.PropsWithChildren {}

const Layout: React.FC<ILayoutProps> = async ({ children }) => {
  return (
    <main className="background-light850_dark100">
      <DefaultLayout className="h-screen">{children}</DefaultLayout>
    </main>
  );
};

export default Layout;
