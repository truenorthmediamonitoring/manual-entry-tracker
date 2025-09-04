import dbConnect from "@/app/lib/models/db";
import Program from "@/app/lib/models/Program";

export async function POST(request) {
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    const req = await request.json();

    try {
        console.log("Connecting to database...");
        await dbConnect();
        console.log("Connected.");

        console.log("Finding and deleting entire Program List document");
        const delprogramoc = await Program.findByIdAndDelete(req.id)

        console.log(delprogramoc);
        return Response.json({ okay: "Program list deleted" }, { status: 200 });
    } catch (error) {
        console.error('An error occured', error);
        return Response.json({ error: 'An error occured' }, { status: 500 });
    }

}