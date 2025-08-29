import dbConnect from "@/app/lib/models/db";
import Program from "@/app/lib/models/Program";

export async function POST(request) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const { id, program } = await request.json();

    try {
        console.log("Connecting to database...");
        await dbConnect();
        console.log("Connected.");

        console.log("Checking if Program document exists for given Station...");
        const existing = await Program.findOne({ _id: id });

        if (existing.programs.includes(program)) {
            console.log("Deleting Program...");
            existing.programs.pop(program);
            await existing.save();
        }
        return Response.json({ okay: existing }, { status: 200 });
    } catch (error) {
        console.error('An error occured', error);
        return Response.json({ error: 'An error occured' }, { status: 500 });
    }

}