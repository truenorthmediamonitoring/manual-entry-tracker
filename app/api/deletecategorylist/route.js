import dbConnect from "@/app/lib/models/db";
import Category from "@/app/lib/models/Category";

export async function POST(request) {
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    const req = await request.json();

    try {
        console.log("Connecting to database...");
        await dbConnect();
        console.log("Connected.");
        
        console.log("Finding and deleting entire Category List document");
        const delcategorydoc = await Category.findByIdAndDelete(req.id)

        console.log(delcategorydoc);
        return Response.json({ okay: "Category list deleted" }, { status: 200 });


    } catch (error) {
        console.error('An error occured', error);
        return Response.json({ error: 'An error occured' }, { status: 500 });
    }

}