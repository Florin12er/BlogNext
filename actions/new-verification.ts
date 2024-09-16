"use server";

import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verfication-token";

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { error: "Token does not exist!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    // Check if there's a user with this email as their newEmail
    const userWithNewEmail = await db.user.findFirst({
      where: { newEmail: existingToken.email },
    });

    if (!userWithNewEmail) {
      return { error: "Email does not exist" };
    }

    // Update the user's email and clear the newEmail field
    await db.user.update({
      where: { id: userWithNewEmail.id },
      data: {
        emailVerified: new Date(),
        email: existingToken.email,
        newEmail: null,
      },
    });
  } else {
    // If the user already exists with this email, just mark it as verified
    await db.user.update({
      where: { id: existingUser.id },
      data: {
        emailVerified: new Date(),
      },
    });
  }

  await db.verificationToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Email verified!" };
};
