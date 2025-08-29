import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/models/db";
import Station from "@/app/lib/models/Station";
import Program from "@/app/lib/models/Program";


export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const station = searchParams.get('station');


    try {
        console.log("Connecting to database...");
        await dbConnect();
        console.log("Connected.");

        if (!station) {
            console.log("No Station ID passed.");
            return NextResponse.json({ error: 'Missing Station ID' }, { status: 400 });
        }

        console.log("Finding Station...");
        const stationDoc = await Station.findById({ _id: station });
        console.log(stationDoc);
        if (!stationDoc) {
            return NextResponse.json({ station: {} });
        }

        console.log("Finding Programs...");
        const programDoc = await Program.findOne({ station });
        console.log(programDoc);

        return NextResponse.json({
            region: stationDoc.region,
            city: stationDoc.city,
            type: stationDoc.type,
            programs: programDoc?.programs || [],
        });


    } catch (error) {
        console.error('An error occured', error);
        return Response.json({ error: 'An error occured' }, { status: 500 });
    }

}