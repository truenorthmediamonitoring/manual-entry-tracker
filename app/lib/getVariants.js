import dbConnect from "./models/db";
import Variant from "./models/Variant";

export default async function getAllVariants() {

    try {
        console.log("Connecting to database...");
        await dbConnect();
        console.log("Connected.");

        console.log("Getting all Variants.");
        const res = await Variant.find({})
        console.log("All Variants available.");
        return res;

    } catch (error) {
        console.error(error);
    }
}