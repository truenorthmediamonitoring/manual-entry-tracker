import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/models/db";
import Brand from "@/app/lib/models/Brand";
import Company from "@/app/lib/models/Company";
import Industry from "@/app/lib/models/Industry";
import Category from "@/app/lib/models/Category";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const variant = searchParams.get('variant');

    try {

        console.log("Connecting to database...");
        await dbConnect();
        console.log("Connected.");

        if (!variant) {
            console.log("No variant ID passed.");
            return NextResponse.json({ error: 'Missing variant ID' }, { status: 400 });
        }

        console.log("Finding Brand...");
        const BrandDoc = await Brand.findOne({ variant });
        if (!BrandDoc) {
            return NextResponse.json({ brand: "" });
        }

        console.log("Finding Company...");
        const CompanyDoc = await Company.findOne({ variant });
        if (!CompanyDoc) {
            return NextResponse.json({ company: "" });
        }

        console.log("Finding Industry...");
        const IndustryDoc = await Industry.findOne({ variant })
        if (!IndustryDoc) {
            return NextResponse.json({ industry: "" });
        }

        console.log("Finding Category...");
        const CategoryDoc = await Category.findOne({ variant })
        if (!CategoryDoc) {
            return NextResponse.json({ category: "" });
        }

        return NextResponse.json({ 
            brand: BrandDoc.brand, 
            company: CompanyDoc.company, 
            industry: IndustryDoc.industry, 
            category: CategoryDoc.category
        });

    } catch (error) {
        console.error('An error occured', error);
        return Response.json({ error: 'An error occured' }, { status: 500 });
    }

}