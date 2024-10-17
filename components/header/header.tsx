import { MyUser } from "@/types";
import React from "react";
import { Button } from "../ui/button";
import UserInfo from "./user-info";
import HeaderTitle from "./headerTitle";
import Link from "next/link";
import { Card } from "../ui/card";
import { ModeToggle } from "../mode-toggle";

const HeaderComponent = ({
  userInfo,
}: {
  userInfo: MyUser | null
}) => {
  return (
    <div className="sticky top-0 z-10 flex w-full items-center justify-between border-b border-primary/20 px-2 py-3 backdrop-blur md:top-4 md:rounded-xl md:border-2">
      <div>header title</div>
      <div className="inline-flex items-center space-x-4">
        {!userInfo ? (
          <Button
            variant={"outline"}
            size={"sm"}
            asChild
            className="rounded-full"
          >
            <Link href={"/login"}>Sign In</Link>
          </Button>
        ) : (
          <UserInfo userInfo={userInfo} />
        )}
      </div>
    </div>
  );
};

export default HeaderComponent;
