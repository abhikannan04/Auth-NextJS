// CLear the Token Out:
import { error } from "console";
import { NextResponse } from "next/server";

export async function GET(){
    try{
        const response = await NextResponse.json({
            message: "Logout Successfully Done",
            success : true
        })

        response.cookies.set("token", "",{
            httpOnly : true  , expires : new Date()
        });

        return response
    }catch(err : any){
       return  NextResponse.json({
         error: error
       },{status:500})
    }
}

