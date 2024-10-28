import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        console.log(userId);
        
        if (!userId) {
            return NextResponse.json(
                { message: "User ID not found in token." },
                { status: 401 }
            );
        }

        const user = await User.findOne({ _id: userId }).select("-password");
        console.log(user);
        
        if (!user) {
            return NextResponse.json(
                { message: "User not found." },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: "User found",
            data: user
        });
    } catch (error: any) {
        console.error("Error in fetching user:", error.message);
        return NextResponse.json(
            { error: error.message },
            { status: 400 }
        );
    }
}
