"use client";
import HeaderComponent from "@/components/header/header";
import { Icons } from "@/components/icons";
import { MyUser } from "@/types";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import { ReactNode, useEffect, useState } from "react";

const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const [user, setUser] = useState<MyUser | null>(null);
  const { data: session } = useSession();
  useEffect(() => {
    const fetchUser = async (id: string) => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/users/${id}`);
        const fetchedUser = await response.json();
        setUser(fetchedUser);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (session?.user?.id) {
      fetchUser(session.user.id);
    }
  }, [session?.user?.id]);

  if (!user && (pathname === "/login" || pathname === "/register")) {
    return <div>{children}</div>;
  }
  if(isLoading) return (
    <div className="flex min-h-screen items-center justify-center">
      <Icons.spinner className="mr-2 h-10 w-10 animate-spin" />
    </div>
    );
  return (
    <div className="container mx-auto xl:max-w-7xl">
      <HeaderComponent userInfo={user} />
      <main className="px-2 py-16">{children}</main>
    </div>
  );
};

export default LayoutProvider;
