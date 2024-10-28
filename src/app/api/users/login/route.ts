import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        {
          error: "User does not exist",
        },
        { status: 400 }
      );
    }

    // Check password
    const isValidPassword = await bcryptjs.compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json(
        {
          error: "Invalid password",
        },
        { status: 401 }
      );
    }

    // Create Token Data
    const tokenData = {
      userId: user._id,
      username: user.username,
      email: user.email,
    };

    // Ensure TOKEN_SECRET is defined
    if (!process.env.TOKEN_SECRET) {
      return NextResponse.json(
        {
          error: "Token secret is not defined.",
        },
        { status: 500 }
      );
    }

    // Create Token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });

    // Set in user cookie
    const response = NextResponse.json({
      message: "Login successfully",
      success: true,
      user: {
        username: user.username,
        email: user.email,
      },
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    console.error(error); // Log the error
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
