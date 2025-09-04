import dbConnect from "./models/db";
import Category from "./models/Category";
import Industry from "./models/Industry";

export default async function getAllCategories() {
    try {
        console.log("Connecting to database...");
        await dbConnect();
        console.log("Connected.");

        console.log("Getting all Categories.");
        const res = await Category.find({})
        console.log("All Categories available.");
        return res;

    } catch (error) {
        console.error(error);
    }

}