import dbConnect from "@/app/lib/models/db";
import Brand from "@/app/lib/models/Brand";
import { NextResponse } from "next/server";

export async function GET(request) {

    const { searchParams } = new URL(request.url);
    const company = searchParams.get('company');

    try {
        console.log("Connecting to database...");
        await dbConnect();
        console.log("Connected.");

        if (!company) {
            console.log("No Company ID passed.");
            return NextResponse.json({ error: 'Missing Company ID' }, { status: 400 });
        }

        console.log("Finding Company...");
        const brandDoc = await Brand.findOne({ company });
        if (!brandDoc) {
            console.log("Finding Brands.");
            return NextResponse.json({ brands: [] });
        }

        console.log(brandDoc);
        return NextResponse.json({ brands: brandDoc.brands });

    } catch (error) {
        console.error('An error occured', error);
        return Response.json({ error: 'An error occured' }, { status: 500 });
    }

}