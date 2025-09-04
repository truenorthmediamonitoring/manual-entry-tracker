import dbConnect from "./models/db";
import User from "./models/User";

export default async function userCountry(email) {
    try {
        console.log("Connecting to database...");
        await dbConnect();
        console.log("Connected");

        console.log("Finding User...");
        const user = await User.findOne({ email });

        return user.country

    } catch (error) {
        console.error(error);
    }
}