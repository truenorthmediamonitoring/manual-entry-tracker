import dbConnect from "@/app/lib/models/db";
import Station from "@/app/lib/models/Station";

export async function POST(request) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
        const req = await request.json();
        console.log(req);

        console.log("Connecting to database...");
        await dbConnect();
        console.log("Connected.");

        console.log("Deleting  Station...");
        const delstation = await Station.findByIdAndDelete({ _id: req.id });
        console.log(delstation);
        
        return Response.json({ okay: "Success" }, { status: 200 });
    } catch (error) {
        console.error('An error occured', error);
        return Response.json({ error: 'An error occured' }, { status: 500 });
    }
}