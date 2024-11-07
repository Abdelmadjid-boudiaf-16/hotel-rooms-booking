import { prisma } from "@/prisma";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    const {
      checkIn,
      checkOut,
      roomId,
      totaldays,
      paymentId,
      userId,
      hotelId,
      amount,
      bookingStatus,
    } = await req.json();

    const existingBooking = await prisma.booking.findFirst({
      where: { paymentId },
    });

    if (existingBooking) {
      return NextResponse.json(
        { message: "Room already booked with this payment ID" },
        { status: 400 },
      );
    }

    await prisma.booking.create({
      data: {
        checkIn,
        checkOut,
        totaldays,
        paymentId,
        hotelId,
        roomId,
        userId,
        amount,
        bookingStatus,
      },
    });

    return NextResponse.json(
      { message: "Room booked successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Book room error:", error);
    return NextResponse.json(
      { message: "An error occurred during room booking" },
      { status: 500 },
    );
  }
}
