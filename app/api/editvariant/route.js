import dbConnect from "@/app/lib/models/db";
import Variant from "@/app/lib/models/Variant";

export async function POST(request) {

    const { id, variant } = await request.json();

    try {
        console.log("Connecting to database...");
        await dbConnect();
        console.log("Connected.");

        console.log("Editing document...");
        
        const editvariant = await Variant.findByIdAndUpdate(
            id,
            { variant }
        )
        // const thevariant = await Variant.findOne({ _id: id }); 

        console.log(editvariant);
        return Response.json({ okay: "Variant edited" }, { status: 200 });


    } catch (error) {
        console.error('An error occured', error);
        return Response.json({ error: 'An error occured' }, { status: 500 });
    }

}