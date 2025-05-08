import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import prisma from "@/db";

const Signin = z.object({
    username: z.string().min(1),
    password: z.string().min(1)
})

export async function POST(req: NextRequest) {
    const parsedResult = Signin.safeParse(await req.json())
    if (!parsedResult.success) {
        return NextResponse.json(
            { message: "Invalid Input" },
            { status: 404 }
        )
    }

    const { username, password } = parsedResult.data
    
    try {
        const user = await prisma.user.findFirst({
            where: {
                username
            }
        })

        if (!user) {
            return NextResponse.json(
                { message: "Not Signed Up" },
                { status: 404 }
            )
        }

        const hashedPassword = await bcrypt.compare(password, user.password)

        if (!hashedPassword) {
            return NextResponse.json(
                { message: "Wrong Password" },
                { status: 404 }
            )    
        }

        return NextResponse.json({
            message: "User Signed In Successfully"
        })

    } catch (error) {
        return NextResponse.json(
            { message: "There was some error" },
            { status: 404 }
        )    
    }

}