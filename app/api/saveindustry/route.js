import dbConnect from "@/app/lib/models/db";
import Industry from "@/app/lib/models/Industry";

export async function POST(request) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
        const req = await request.json();
        const { industry, variantId, country } = req;
        console.log(req);

        console.log("Connecting to database...");
        await dbConnect();
        console.log("Connected.");

        console.log("Creating document...");
        const newindustry = await Industry({
            variant: variantId,
            industry,
            country
        }).save()
        console.log(newindustry);

        return Response.json({ okay: "Industry saved" }, { status: 200 });

    } catch (error) {
        console.error('An error occured', error);
        return Response.json({ error: 'An error occured' }, { status: 500 });
    }
}