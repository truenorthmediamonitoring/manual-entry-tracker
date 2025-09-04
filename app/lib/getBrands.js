import dbConnect from "./models/db";
import Brand from "./models/Brand";

export default async function getAllBrands() {

    try {
        console.log("Connecting to database...");
        await dbConnect();
        console.log("Connected.");

        console.log("Getting all Brands.");
        const res = await Brand.find({})
        console.log("All Brands available.");
        return res;

    } catch (error) {
        console.error(error);
    }

}
