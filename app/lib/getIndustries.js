import dbConnect from "./models/db";
import Industry from "./models/Industry";

export default async function getAllIndustries() {
    try {
        console.log("Connecting to database...");
        await dbConnect();
        console.log("Connected");

        console.log("Getting all industries...");
        const res = await Industry.find({});
        // console.log(res);

        console.log("All industries available.");
        return res

    } catch (error) {
        console.log(error);
    }
}