import dbConnect from "./models/db";
import Entry from "./models/Entry";

export default async function getUserEntries() {

    try {
        console.log("Connecting to database...");
        await dbConnect();
        console.log("Connected");

        const res = await Entry.find({});
        console.log("All Entries available");
        // console.log(res);
        return res

    } catch (error) {
        console.error(error);
    }

}
