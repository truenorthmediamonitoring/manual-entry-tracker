import dbConnect from "@/app/lib/models/db";
import Variant from "@/app/lib/models/Variant";


export async function POST(request) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const { variant, country } = await request.json();

    try {
        console.log("Connecting to database...");
        await dbConnect();
        console.log("Connected.");

        console.log("Creating document...");
        const newvariant = await Variant({
            variant,
            country,
        }).save()
        console.log("Variant saved...");
        console.log(newvariant);
        return Response.json({ okay: "Variant saved" }, { status: 200 });

    } catch (error) {
        console.error('An error occured', error);
        return Response.json({ error: 'An error occured' }, { status: 500 });
    }
}