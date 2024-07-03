import { IPageProps } from "@/shared";
import React from "react";

const LoadingPage: React.FC<IPageProps> = async () => {
  return <div className="flex-center h-screen">loading...</div>;
};

export default LoadingPage;
