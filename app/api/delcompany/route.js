import dbConnect from "@/app/lib/models/db";
import Company from "@/app/lib/models/Company";

export async function POST(request) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const { id, company } = await request.json();

    try {
        console.log("Connecting to database...");
        await dbConnect();
        console.log("Connected.");

        console.log("Checking if document exists...");
        const existing = await Company.findOne({ _id: id });


        if (existing.companies.includes(company)) {
            console.log("Deleting variant...");
            existing.companies.pop(company);
            await existing.save();
        }
        return Response.json({ okay: existing }, { status: 200 });

    } catch (error) {
        console.error('An error occured', error);
        return Response.json({ error: 'An error occured' }, { status: 500 });
    }
}