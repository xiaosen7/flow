"use server";

import { prisma } from "@/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function getCurrent() {
  const { userId } = auth();
  if (!userId) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
  });
  return user;
}

export const getCurrentOrRedirectSignIn = async () => {
  const user = await getCurrent();

  if (!user) {
    auth().redirectToSignIn();
  }

  return user!;
};

export async function createIfNeeded() {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    return;
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      clerkId: clerkUser.id,
    },
  });
  if (existingUser) {
    return;
  }

  await prisma.user.create({
    data: {
      email: clerkUser.emailAddresses[0].emailAddress ?? "",
      fullName: clerkUser.fullName ?? "",
      clerkId: clerkUser.id,
      imageUrl: clerkUser.imageUrl,
      username: clerkUser.username ?? "",
    },
  });
}
