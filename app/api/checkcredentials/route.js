import dbConnect from "@/app/lib/models/db";
import User from "@/app/lib/models/User";
import { comparePass } from "@/app/lib/bcrypt";

export async function POST(request) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
        const { email, country, password } = await request.json();

        if (!email || !country || !password) {
            return Response.json({ error: "Email, country, and password are required" }, { status: 400 });
        }

        console.log("Connecting to database...");
        await dbConnect();
        console.log("Connected.");

        console.log("Finding user...");

        const foundUser = await User.findOne({ email });
        if (!foundUser) {
            return Response.json({ error: "Invalid credentials" }, { status: 401 });
        }

        const isMatch = await comparePass(password, foundUser.password);
        if (!isMatch) {
            return Response.json({ error: "Invalid credentials" }, { status: 401 });
        }

        const user = {
            id: foundUser._id.toString(),
            name: `${foundUser.fname} ${foundUser.lname}`,
            email: foundUser.email,
            country: country,
        };

        console.log(user);

        return Response.json(user, { status: 200 });

    } catch (error) {
        console.error('An error occured', error);
        return Response.json({ error: 'An error occured' }, { status: 500 });
    }

}