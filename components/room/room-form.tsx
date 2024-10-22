"use client";
import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { roomSchema } from "@/form-schemas";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { CancelConfirm } from "../confirm-cancel";
import { useToast } from "@/hooks/use-toast";
import { Icons } from "../icons";
import Image from "next/image";
import { Hotel, Room } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const RoomForm = ({
  title,
  type = "add",
  room,
  hotels,
}: {
  title: string;
  type?: string;
  room?: Room;
  hotels: Hotel[];    
  }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  let form;
  if (type === "add" || !room) {
    form = useForm<z.infer<typeof roomSchema>>({
      resolver: zodResolver(roomSchema),
      defaultValues: {
        name: "",
        type: "",
        roomNumber: '1',
        rentPerDay: '1',
        amenities: "",
        bedRooms: '1',
        hotelName: "",
        images: [],
      },
    });
  } else {
    form = useForm<z.infer<typeof roomSchema>>({
      resolver: zodResolver(roomSchema),
      defaultValues: {
        name: room.name,
        type: room.type,
        roomNumber: room.roomNumber,
        rentPerDay: room.amenities,
        amenities: room.amenities,
        bedRooms: room.bedRooms,
        hotelName: room.hotelName,
        images: room.images,
      },
    });
  }

  const onSubmit = async (values: z.infer<typeof roomSchema>) => {
    setIsLoading(true);
    let response: any = null;
    if (type === "add" || !room) {
      response = await fetch("/api/rooms/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
    } else {
      response = await fetch(`/api/rooms/edit/${room.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
    }

    if (response.ok) {
      if (type === "add") {
        toast({
          title: "Add room",
          description: "Add room successful",
        });
      } else {
        toast({
          title: "Edit room.",
          description: "Edit room successful!",
        });
      }
    } else {
      const errorData = await response.json();
      toast({
        variant: "destructive",
        title: type === "add" ? "add room failed" : "Edit room failed",
        description: errorData.message,
      });
    }
    setIsLoading(false);
    router.push("/admin/rooms");
  };

  return (
    <div className="flex w-full max-w-2xl flex-col gap-y-6 rounded-lg border p-8">
      <h1 className="text-4xl font-bold">{title}</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <FormField
            control={form.control}
            name="hotelName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hotel</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Hotel" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {hotels.map((hotel) => (
                      <SelectItem value={hotel.name} key={hotel.id}>
                        {hotel.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Name <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} type="text" placeholder="room Name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="roomNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Room Number <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} type="text" placeholder="room number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={"clasic"}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="clasic">Clasic</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="plus">Plus</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bedRooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {" "}
                  Bed Rooms Number <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} type="text" placeholder="bed rooms number"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rentPerDay"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Rent Per Day <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} type="text" placeholder="rent per day (1-2-3...)" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amenities"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Amenities <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} type="text" placeholder="Tv, Ac..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <div>
                    <CldUploadWidget
                      uploadPreset={`${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}`}
                      onSuccess={(result, { widget }) => {
                        const info = result.info as {
                          secure_url: string;
                        };
                        field.value = [...field.value, info.secure_url];
                        field.onChange(field.value);
                      }}
                      options={{
                        multiple: true,
                      }}
                    >
                      {({ open }) => {
                        return (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => open()}
                          >
                            Upload Images
                          </Button>
                        );
                      }}
                    </CldUploadWidget>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {field.value.map((url, index) => (
                        <div className="relative" key={index}>
                          <Image
                            src={url}
                            alt={`Uploaded image ${index + 1}`}
                            className="h-24 w-24 object-cover"
                            width={96}
                            height={96}
                          />
                          <Button
                            type="button"
                            onClick={() => {
                              const newImages = [...field.value];
                              newImages.splice(index, 1);
                              field.onChange(newImages);
                            }}
                            className="absolute -right-2 -top-2 h-5 w-5 rounded-full bg-red-500 p-1 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                          >
                            <Icons.close className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <div className="flex items-center justify-end space-x-4">
              <CancelConfirm />
              <Button disabled={isLoading}>
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Save
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RoomForm;
