import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import prisma from "@/db";

const Signup = z.object({
    username: z.string().min(1),
    password: z.string().min(1)
})

export async function POST(req: NextRequest) {
    const parsedResult = Signup.safeParse(await req.json())
    if (!parsedResult.success) {
        return NextResponse.json(
            { message: "Invalid Input" },
            { status: 404 }
        )
    }

    const { username, password } = parsedResult.data
    const hashedPassword = await bcrypt.hash(password, 5)

    try {
        await prisma.user.create({
            data: {
                username,
                password: hashedPassword
            }
        })

        return NextResponse.json({
            message: "User Signed Up Successfully"
        })

    } catch (error) {
        return NextResponse.json(
            { message: "There was some error" },
            { status: 404 }
        )    
    }

}