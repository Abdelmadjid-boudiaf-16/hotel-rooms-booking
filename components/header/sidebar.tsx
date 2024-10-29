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
import { ScrollArea } from "../ui/scroll-area";

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
      path: "/hotels",
    },
    {
      name: "Rooms",
      icon: <BedDoubleIcon size={iconSize} />,
      path: "/rooms",
    },
    {
      name: "Users",
      icon: <UsersIcon size={iconSize} />,
      path: "/users",
    },
    {
      name: "Reports",
      icon: <NotebookPen size={iconSize} />,
      path: "/reports",
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
      path: "/bookings",
    },
    {
      name: "Profile",
      icon: <User2 size={iconSize} />,
      path: "/profile",
    },
  ];
  const modifyPaths = (
    items: {
      name: string;
      icon: JSX.Element;
      path: string;
    }[],
    prefix: string,
  ) =>
    items.map((item) => ({
      ...item,
      path: item.name === "Home" ? "/" : `${prefix}${item.path}`,
    }));

  const adminItemsWithPaths = modifyPaths(adminItems, "/admin");
  const userItemsWithPaths = isAdmin
    ? modifyPaths(userItems, "/admin")
    : modifyPaths(userItems, "/user");

  // Filter unique items for the final list
  const uniqueUserItems = userItemsWithPaths.filter(
    (userItem) =>
      !adminItemsWithPaths.some(
        (adminItem) => adminItem.name === userItem.name,
      ),
  );

  // Combine items conditionally
  const itemsToShow = isAdmin
    ? [...adminItemsWithPaths, ...uniqueUserItems]
    : userItemsWithPaths;

  //  const uniqueUserItems = userItems.filter(
  //    (userItem) =>
  //      !adminItems.some((adminItem) => adminItem.name === userItem.name),
  //  );
  //  const itemsToShow = isAdmin ? [...adminItems, ...uniqueUserItems] : userItems;
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="rounded-none border-0 border-l">
          <User2 />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <ScrollArea className="h-full">
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
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
