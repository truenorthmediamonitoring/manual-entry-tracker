import dbConnect from "./models/db";
import Program from "./models/Program";

export default async function getAllPrograms() {

    try {
        console.log("Connecting to database...");
        await dbConnect();
        console.log("Connected.");

        console.log("Getting all Programs.");
        const res = await Program.find({})
        console.log("All Programs available.");
        return res;
        
    } catch (error) {
        console.error(error);
    }

}
