import { IPageProps } from "@/shared";
import { userActions } from "@/user";
import { RedirectType, redirect } from "next/navigation";
import React from "react";

const ProfilePage: React.FC<IPageProps> = async () => {
  const user = await userActions.getCurrentOrThrow();
  redirect(`/profile/${user.id}`, RedirectType.replace);
};

export default ProfilePage;
