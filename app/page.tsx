import RoomsData from "@/components/room/rooms-data";
import { Suspense } from "react";
import Loading from "./admin/hotels/loading";
import AvailableRooms from "@/components/available-rooms";
import { Separator } from "@/components/ui/separator";

export default async function Home() {

  return (
    <div className="flex flex-col gap-4">
      <AvailableRooms />
      <Separator />
      <Suspense fallback={<Loading />}>
        <RoomsData />
      </Suspense>
    </div>
  );
}
