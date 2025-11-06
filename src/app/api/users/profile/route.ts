import { UserModel } from "@/models/user.model";
import getTokenPayload from "@/utils/getTokenPayload";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
    req: NextRequest
){
    const userPayload: any = await getTokenPayload(req);
    const userPayloadJson = await userPayload.json().then((data: any) => data);

    const user = await UserModel.findOne({
        _id: userPayloadJson.payload.id
    }).select("-password");

    console.log("user", user);

    if(!user){
        return NextResponse.json("User not found", {status: 404});
    }

    return NextResponse.json({user}, {status: 200});

}