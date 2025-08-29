import dbConnect from "./models/db";
import User from "./models/User";

export default async function userAccess(email) {
    try {
        console.log("Connecting to database...");
        await dbConnect();
        console.log("Connected");

        console.log("Finding User...");
        const user = await User.findOne({ email: email });
        // console.log(user);

        return user.access

    } catch (error) {
        console.error(error);
    }
}