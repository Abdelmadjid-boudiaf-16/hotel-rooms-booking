import RoomsData from "@/components/room/rooms-data";
import { Suspense } from "react";
import Loading from "./admin/hotels/loading";

export default async function Home() {

  return (
    <Suspense fallback={<Loading />}>
        <RoomsData />
    </Suspense>
  );
}
