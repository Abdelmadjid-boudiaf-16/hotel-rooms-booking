import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
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
    } = await req.json();

    const existingRoom = await prisma.hotel.findFirst({
      where: { name },
    });

    if (existingRoom) {
      return NextResponse.json(
        { message: "Room already exist" },
        { status: 400 },
      );
    }

    await prisma.room.create({
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
      { message: "Room added successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error("add room error:", error);
    return NextResponse.json(
      { message: "An error occurred during adding room" },
      { status: 500 },
    );
  }
}
