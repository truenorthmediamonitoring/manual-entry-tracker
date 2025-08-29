import dbConnect from "@/app/lib/models/db";
import Program from "@/app/lib/models/Program";

export async function POST(request) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const { stationId, program } = await request.json();

    try {
        console.log("Connecting to database...");
        await dbConnect();
        console.log("Connected.");

        console.log("Checking if Program document exists for given station...");
        const existing = await Program.findOne({ station: stationId });

        if (existing) {
            console.log("Program document exists for given station.");
            if (!existing.programs.includes(program)) {
                console.log("Adding Program to array...");
                existing.programs.push(program);
                await existing.save();
                console.log("Program added...");
            }
            console.log("Programs ready.");
            return Response.json({ okay: existing }, { status: 200 });
            // return NextResponse.json({ success: true, category: existing });
        }

        console.log("Creating new Program document and for given Station and adding Program...");
        const newProgram = new Program({ station: stationId, programs: [program] });
        await newProgram.save();
        console.log("Document created, Program added...");
        return Response.json({ okay: "Program saved" }, { status: 200 });

    } catch (error) {
        console.error('An error occured', error);
        return Response.json({ error: 'An error occured' }, { status: 500 });
    }
}