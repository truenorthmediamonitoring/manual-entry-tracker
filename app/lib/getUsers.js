import dbConnect from "./models/db";
import User from "./models/User";

export async function getAllUsers() {
    try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        console.log("Connecting to database...");
        await dbConnect();
        console.log("Connected");

        console.log("Getting all users...");
        const res = await User.find();
        console.log(res);

        console.log("All users available.");
        return res

    } catch (error) {
        console.log(error);
    }
}


export async function getUserID(email) {
    try {
        console.log("Connecting to database...");
        await dbConnect();
        console.log("Connected");

        console.log("Getting User...");
        const user = await User.find({ email });
        // console.log(user[0]._id);

        return JSON.parse(JSON.stringify(user[0]._id));

    } catch (error) {
        console.log(error);
    }
}