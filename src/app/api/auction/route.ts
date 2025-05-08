import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const AuctionPostSchema = z.object({
    name: z.string().min(1),
    location: z.string().min(1),
    owner: z.string().min(1),
    price: z.string().min(1),
    image: z.string().min(1)
})

export async function POST(req: NextRequest) {
    const parsedResult = AuctionPostSchema.safeParse(await req.json())
    if (!parsedResult.success) {
        return NextResponse.json(
            { message: "Invalid Input" },
            { status: 404 }
        )
    }

    const { name, location, owner, price, image } = parsedResult.data

    try {
        const auction = await prisma.house.create({
            data: {
                name,
                location,
                owner,
                price,
                image
            }
        })

        return NextResponse.json(
            { message: "Listed in Auction" }
        )

    } catch (error) {
        return NextResponse.json(
            { message: "There were some error" },
            { status: 404 }
        )
    }
}