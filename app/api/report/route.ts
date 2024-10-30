import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { checkIn, checkOut } = await req.json();

    if (!checkIn) {
      return NextResponse.json(
        { success: false, error: "Missing required parameter: checkIn" },
        { status: 400 },
      );
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = checkOut ? new Date(checkOut) : null;

    const bookings = await prisma.booking.findMany({
      where: {
        checkIn: { lte: checkOutDate ? checkOutDate : checkInDate },
        checkOut: { gte: checkInDate },
        bookingStatus: { not: "cancelled" },
      },
      include: {
        hotel: true,
        room: true,
        user: true,
      },
    });

    return NextResponse.json({ success: true, bookings }, { status: 200 });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}