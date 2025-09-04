import dbConnect from "@/app/lib/models/db";
import Variant from "@/app/lib/models/Variant";

export async function POST(request) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const req = await request.json();

    try {
        console.log("Connecting to database...");
        await dbConnect();
        console.log("Connected.");

        console.log("Finding and deleting entire Variant List document");
        const delvariant = await Variant.findByIdAndDelete(req.id)

        console.log(delvariant);
        return Response.json({ okay: "Variant deleted" }, { status: 200 });

    } catch (error) {
        console.error('An error occured', error);
        return Response.json({ error: 'An error occured' }, { status: 500 });
    }

}