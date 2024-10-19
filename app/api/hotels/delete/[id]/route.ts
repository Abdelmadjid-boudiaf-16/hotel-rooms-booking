import { NextResponse } from "next/server";
import { prisma } from "@/prisma";
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  const hotelId = params.id;
  try {
    const existingHotel = await prisma.hotel.findUnique({
      where: { id: hotelId },
    });

    if (!existingHotel) {
      return NextResponse.json(
        { message: "Hotel not found!" },
        { status: 404 },
      );
    }
    await prisma.hotel.delete({
      where: { id: hotelId },
    });

    return NextResponse.json(
      { message: "Hotel deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting hotel:", error);
    return NextResponse.json(
      { error: "Failed to delete hotel" },
      { status: 500 },
    );
  }
}
