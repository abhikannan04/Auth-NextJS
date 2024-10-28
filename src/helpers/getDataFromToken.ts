import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
    try {
        // Retrieve the token from cookies
        const token = request.cookies.get("token")?.value || '';
        console.log(token);
        
        if (!token) {
            throw new Error("Token missing from request.");
        }

        // Decode the token
        const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
        console.log(decodedToken);
        
        return decodedToken.userId;
        
    } catch (error: any) {
        if (error.name === 'JsonWebTokenError') {
            throw new Error("Invalid token.");
        } else if (error.name === 'TokenExpiredError') {
            throw new Error("Token has expired.");
        } else {
            throw new Error("An error occurred while verifying the token.");
        }
    }
};
