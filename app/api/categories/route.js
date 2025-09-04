import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/models/db";
import Category from "@/app/lib/models/Category";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const industry = searchParams.get('industry');

    try {
        console.log("Connecting to database...");
        await dbConnect();
        console.log("Connected.");

        if (!industry) {
            console.log("No industry ID passed.");
            return NextResponse.json({ error: 'Missing industry ID' }, { status: 400 });
        }

        console.log("Finding Category...");
        const categoryDoc = await Category.findOne({ industry });
        if (!categoryDoc) {
            return NextResponse.json({ categories: [] });
        }
        
        console.log(categoryDoc);
        return NextResponse.json({ categories: categoryDoc.categories });
        
    } catch (error) {
        console.error('An error occured', error);
        return Response.json({ error: 'An error occured' }, { status: 500 });
    }

}