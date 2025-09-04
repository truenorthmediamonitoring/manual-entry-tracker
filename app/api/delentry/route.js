import dbConnect from "@/app/lib/models/db";
import Entry from "@/app/lib/models/Entry";

export async function POST(request) {

    const req = await request.json()

    try {
        console.log("Connecting to database...");
        await dbConnect();
        console.log("Connected.");

        console.log(req);

        console.log("Deleting  Entry...");
        const delentry = await Entry.findByIdAndDelete({ _id: req.id });
        console.log(delentry);

        return Response.json({ okay: "Entry deleted" }, { status: 200 });

    } catch (error) {
        console.error('An error occured', error);
        return Response.json({ error: 'An error occured' }, { status: 500 });
    }
}