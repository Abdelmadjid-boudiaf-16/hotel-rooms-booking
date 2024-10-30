import { auth } from "@/auth";
import UserProfile from "@/components/user/user-profile";
import { prisma } from "@/prisma";
import { Booking, MyUser } from "@/types";
import React from "react";

const UserProfilePage = async () => {
  const session = await auth();
  const response = await prisma.user.findUnique({
    where: { id: session?.user.id },
    include: {bookings: true}
  });
  const user: MyUser & {bookings: Booking[]} = JSON.parse(JSON.stringify(response));
  return <UserProfile user={user} />;
};

export default UserProfilePage;
