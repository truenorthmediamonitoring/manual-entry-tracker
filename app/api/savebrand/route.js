import dbConnect from "@/app/lib/models/db";
import Brand from "@/app/lib/models/Brand";


export async function POST(request) {
    // await new Promise((resolve) => setTimeout(resolve, 1000));

    const { variantId, brand , country } = await request.json();

    try {
        console.log("Connecting to database...");
        await dbConnect();
        console.log("Connected.");

        console.log("Creating new document for given Variant and adding brand...");
        const newBrand = new Brand({ variant: variantId, brand, country });
        await newBrand.save();
        console.log("Document created, Brand added...");

        return Response.json({ okay: "Brand saved" }, { status: 200 });

        // console.log("Checking if Brand document exists for given Company...");
        // const existing = await Brand.findOne({ company: companyId });

        // if (existing) {
        //     console.log("Brand document exists for given company.");
        //     if (!existing.brands.includes(brand)) {
        //         console.log("Adding Brand to array...");
        //         existing.brands.push(brand);
        //         await existing.save();
        //         console.log("Brand added...");
        //     }
        //     console.log("Brands ready.");
        //     return Response.json({ okay: existing }, { status: 200 });
        // }

    } catch (error) {
        console.error('An error occured', error);
        return Response.json({ error: 'An error occured' }, { status: 500 });
    }

}