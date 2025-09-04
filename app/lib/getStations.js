import dbConnect from "./models/db";
import Station from "./models/Station";

export async function getStations() {
    // await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
        console.log("Connecting to database...");
        await dbConnect();
        console.log("Connected.");

        console.log("Getting all Categories.");
        const res = await Station.find()
        // console.log(res);
        console.log("All Stations available.");
        return res;

    } catch (error) {
        console.error(error);
    }

}