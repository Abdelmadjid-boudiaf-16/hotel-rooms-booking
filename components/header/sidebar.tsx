"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  BedDoubleIcon,
  Building,
  HomeIcon,
  ListIcon,
  NotebookPen,
  User2,
  UsersIcon,
} from "lucide-react";
import { ModeToggle } from "../mode-toggle";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

export function SheetDemo({ isAdmin }: { isAdmin: boolean | null }) {
  const pathname = usePathname();
  const iconSize = 20;
  const adminItems = [
    {
      name: "Home",
      icon: <HomeIcon size={iconSize} />,
      path: "/",
    },
    {
      name: "Hotels",
      icon: <Building size={iconSize} />,
      path: "/admin/hotels",
    },
    {
      name: "Rooms",
      icon: <BedDoubleIcon size={iconSize} />,
      path: "/admin/rooms",
    },
    {
      name: "Users",
      icon: <UsersIcon size={iconSize} />,
      path: "/admin/users",
    },
    {
      name: "Reports",
      icon: <NotebookPen size={iconSize} />,
      path: "/admin/reports",
    },
  ];
  const userItems = [
    {
      name: "Home",
      icon: <HomeIcon size={iconSize} />,
      path: "/",
    },
    {
      name: "Bookings",
      icon: <ListIcon size={iconSize} />,
      path: "/user/bookings",
    },
    {
      name: "Profile",
      icon: <User2 size={iconSize} />,
      path: "/user/profile",
    },
  ];
  const itemsToShow = isAdmin ? adminItems : userItems;
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="rounded-none border-0 border-l">
          <User2 />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className="flex flex-col justify-between">
          {/* .... */}
          <ul className="my-20 flex flex-1 flex-col gap-3">
            {itemsToShow.map((item, index) => (
              <li
                key={index}
                className={cn(
                  "flex items-center space-x-4 border-b px-6 py-4 transition-all duration-500 hover:translate-x-2 hover:bg-foreground/5",
                  index === itemsToShow.length - 1 ? "border-b-0" : "",
                  pathname === item.path
                    ? "bg-foreground font-bold text-primary-foreground hover:text-foreground"
                    : "",
                )}
              >
                <span>{item.icon}</span>
                <SheetClose asChild className="flex-1">
                  <Link href={item.path}>{item.name}</Link>
                </SheetClose>
              </li>
            ))}
          </ul>
          <SheetFooter className="mt-10 flex items-center justify-between">
            <ModeToggle />
            <SheetClose asChild>
              <Button
                variant={"outline"}
                onClick={() => signOut({ redirectTo: "/login" })}
              >
                Sign Out
              </Button>
            </SheetClose>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}
