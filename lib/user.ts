import { prisma } from "@/prisma";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return null;
    return user;
  } catch (error) {
    console.log("Get user by email error: ===", error);
  }
};
export const getUserById = async (id: string) => {
    try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return null;
    return user;
  } catch (error) {
    console.log("Get user by Id error: ===", error);
  }
};
