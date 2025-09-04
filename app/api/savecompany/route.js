import dbConnect from "@/app/lib/models/db";
import Company from "@/app/lib/models/Company";

export async function POST(request) {
    // await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
        const req = await request.json();
        const { variantId, company, country } = req;
        console.log(req);

        console.log("Connecting to database...");
        await dbConnect();
        console.log("Connected.");

        console.log("Creating new document and given Variant and adding company...");
        const newCompany = new Company({ variant: variantId, company, country });
        await newCompany.save();
        console.log("Document created, Company added...");

        return Response.json({ okay: "Company saved" }, { status: 200 });


        // console.log("Checking if Company document exists for given Variant...");
        // const existing = await Company.findOne({ variant: variantId });

        // if (existing) {
        //     console.log("Company document exists for given Variant.");
        //     if (!existing.companies.includes(company)) {
        //         console.log("Adding Company to array...");
        //         existing.companies.push(company);
        //         await existing.save();
        //         console.log("Company added...");
        //     }
        //     console.log("Company ready.");
        //     return Response.json({ okay: existing }, { status: 200 });
        // }

        // console.log("Creating new document and for given Variant and adding company...");
        // const newCompany = new Company({ variant: variantId, companies: [company] });
        // await newCompany.save();
        // console.log("Document created, Company added...");

    } catch (error) {
        console.error('An error occured', error);
        return Response.json({ error: 'An error occured' }, { status: 500 });
    }
}