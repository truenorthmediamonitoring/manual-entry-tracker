import dbConnect from "@/app/lib/models/db";
import Brand from "@/app/lib/models/Brand";

export async function POST(request) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const { id, brand } = await request.json();

    try {

        console.log("Connecting to database...");
        await dbConnect();
        console.log("Connected.");

        console.log("Checking if Brand document exists for given Company...");
        const existing = await Brand.findOne({ _id: id });

        if (existing.brands.includes(brand)) {
            console.log("Deleting brand...");
            existing.brands.pop(brand);
            await existing.save();
        }
        return Response.json({ okay: existing }, { status: 200 });

    } catch (error) {
        console.error('An error occured', error);
        return Response.json({ error: 'An error occured' }, { status: 500 });
    }

}