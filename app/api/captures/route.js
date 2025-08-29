import dbConnect from "@/app/lib/models/db";
import Capture from "@/app/lib/models/Capture";
import User from "@/app/lib/models/User";


export async function GET(req) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {

        await dbConnect();
        const url = new URL(req.url);
        const userId = url.searchParams.get('userId');
        const stationId = url.searchParams.get('stationId');
        const month = url.searchParams.get('month');
        const record = await Capture.findOne({ userId, stationId, month });
        return new Response(JSON.stringify(record || { completedDays: [] }), { status: 200 });

    } catch (error) {
        console.error('An error occured', error);
        return Response.json({ error: 'An error occured' }, { status: 500 });
    }
}

export async function POST(req) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {

        await dbConnect();
        const body = await req.json();
        const { userId, stationId, month, completedDays } = body;

        // First check if a record exists
        let capture = await Capture.findOne({ userId, stationId, month });

        if (!capture) {
            // If it doesn't exist, create a new one
            capture = await Capture.create({ userId, stationId, month, completedDays });
        } else {
            // If it exists, update it
            capture.completedDays = completedDays;
            await capture.save();
        }

        return new Response(JSON.stringify(capture), { status: 200 });

    } catch (error) {
        console.error('An error occured', error);
        return Response.json({ error: 'An error occured' }, { status: 500 });
    }

}
