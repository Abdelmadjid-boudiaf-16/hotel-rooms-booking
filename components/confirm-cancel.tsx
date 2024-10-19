import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import Link from "next/link";
export const CancelConfirm = () => {
  return (
    <Dialog>
      <Button asChild variant={"outline"} type="button">
        <DialogTrigger>Cancel</DialogTrigger>
      </Button>
      <DialogContent className="flex items-center justify-between">
        <div className="text-sm">Confirm Cancel?</div>
        <DialogTrigger>
          <Button variant={"outline"} type="button" asChild>
            <Link href={"/admin/hotels"}>Cancel</Link>
          </Button>
        </DialogTrigger>
      </DialogContent>
    </Dialog>
  );
};