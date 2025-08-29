import dbConnect from "@/app/lib/models/db";
import Station from "@/app/lib/models/Station";

export async function POST(request) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
        const req = await request.json();
        const { station, type, country, region, city } = req;
        console.log(req);

        console.log("Connecting to database...");
        await dbConnect();
        console.log("Connected.");

        console.log("Creating document...");
        const newstation = await Station({
            name: station,
            type,
            country,
            region,
            city,
        }).save();
        console.log("Station saved...");
        console.log(newstation);

        return Response.json({ okay: "Station saved" }, { status: 200 });

    } catch (error) {
        console.error('An error occured', error);
        return Response.json({ error: 'An error occured' }, { status: 500 });
    }
}