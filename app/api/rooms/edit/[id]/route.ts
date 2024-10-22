import { NextResponse } from "next/server";
import { prisma } from "@/prisma";

// PUT request handler to update a hotel
export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  const roomId = params.id;

  try {
    const {
      hotelName,
      name,
      rentPerDay,
      type,
      roomNumber,
      amenities,
      bedRooms,
      images,
    } = await request.json();
    const existingRoom = await prisma.room.findUnique({
      where: { id: roomId },
    });
    if (!existingRoom) {
      return NextResponse.json({ message: "Room not found!" }, { status: 404 });
    }

    await prisma.room.update({
      where: { id: roomId },
      data: {
        hotelName,
        name,
        rentPerDay,
        type,
        roomNumber,
        amenities,
        bedRooms,
        images,
      },
    });

    return NextResponse.json(
      { message: "Room updated successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating room:", error);
    return NextResponse.json(
      { error: "Failed to update room" },
      { status: 500 },
    );
  }
}
