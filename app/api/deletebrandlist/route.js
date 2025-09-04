import dbConnect from "@/app/lib/models/db";
import Brand from "@/app/lib/models/Brand";

export async function POST(request) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const req = await request.json();

    try {
        console.log("Connecting to database...");
        await dbConnect();
        console.log("Connected.");

        console.log("Finding and deleting entire Brand List document");
        const delbranddoc = await Brand.findByIdAndDelete(req.id)

        console.log(delbranddoc);
        return Response.json({ okay: "Brand list deleted" }, { status: 200 });

    } catch (error) {
        console.error('An error occured', error);
        return Response.json({ error: 'An error occured' }, { status: 500 });
    }

}