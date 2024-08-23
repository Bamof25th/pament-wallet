"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function createOnRampTransaction(
  provider: string,
  amount: number
) {
  const session = await getServerSession(authOptions);
  console.log(session);

  if (!session) {
    return {
      message: "Unauthenticated request",
    };
  }

  const token = Math.random().toString(36).substr(2);

  await prisma.onRampTransaction.create({
    data: {
      provider,
      status: "Processing",
      token: token,
      amount: amount,
      startTime: new Date(),
      userId: Number(session?.user?.id),
    },
  });

  return {
    message: "Done",
  };
}
