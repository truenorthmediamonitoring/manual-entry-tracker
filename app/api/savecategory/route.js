import dbConnect from "@/app/lib/models/db";
import Category from "@/app/lib/models/Category";

export async function POST(request) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // const body = await request.json();
    // console.log(body);
    const { variantId, category, country } = await request.json();

    try {
        console.log("Connecting to database...");
        await dbConnect();
        console.log("Connected.");


        console.log("Checking if Category document exists for given industry...");

        console.log("Creating new Category document and for given Industry and adding Category...");
        const newCategory = new Category({ variant: variantId, category, country });
        await newCategory.save();
        console.log("Document created, Category added...");
        return Response.json({ okay: "Category saved" }, { status: 200 });

    } catch (error) {
        console.error('An error occured', error);
        return Response.json({ error: 'An error occured' }, { status: 500 });
    }

}