import dbConnect from "@/app/lib/models/db";
import Category from "@/app/lib/models/Category";

export async function POST(request) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const { id, cate } = await request.json();

    try {
        console.log("Connecting to database...");
        await dbConnect();
        console.log("Connected.");

        console.log("Checking if Category document exists for given industry...");
        const existing = await Category.findOne({ _id: id });

        if (existing.categories.includes(cate)) {
            console.log("Deleting Cate...");
            existing.categories.pop(cate);
            await existing.save();
        }
        return Response.json({ okay: existing }, { status: 200 });

    } catch (error) {
        console.error('An error occured', error);
        return Response.json({ error: 'An error occured' }, { status: 500 });
    }

}