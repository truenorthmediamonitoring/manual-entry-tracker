import dbConnect from "@/app/lib/models/db";
import Entry from "@/app/lib/models/Entry";

export async function POST(request) {
    // await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
        const {
            country,
            region,
            city,
            type,
            date,
            broadcasttime,
            daypart,
            dayofweek,
            station,
            company,
            brand,
            variant,
            category,
            industry,
            title,
            product,
            duration,
            language,
            program,
            timesubmitted,
            datesubmitted,
            user,
        } = await request.json();

        console.log("Connecting to database...");
        await dbConnect();
        console.log("Connected.");

        console.log("Creating document...");
        const newentry = new Entry({
            country,
            region,
            city,
            type,
            date,
            broadcasttime,
            daypart,
            dayofweek,
            station,
            company,
            brand,
            variant,
            category,
            industry,
            title,
            product,
            duration,
            language,
            program,
            timesubmitted,
            datesubmitted,
            user,
        })

        await newentry.save()
        console.log("Document created.");
        return Response.json({ okay: "Entry saved" }, { status: 200 });

    } catch (error) {
        console.error('An error occured', error);
        return Response.json({ error: 'An error occured' }, { status: 500 });
    }
}