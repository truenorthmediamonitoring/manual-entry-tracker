import dbConnect from "@/app/lib/models/db";
import User from "@/app/lib/models/User";
import { hashPass } from "@/app/lib/bcrypt";

export async function POST(request) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
        const req = await request.json();
        const { firstname, lastname, email, selectedstations, access, country, password } = req;
        const hashedPassword = await hashPass(password);

        console.log(req);

        console.log("Connecting to database...");
        await dbConnect();
        console.log("Connected.");

        console.log("Creating user document...");
        const newuser = await User({
            fname: firstname,
            lname: lastname,
            email,
            assignedStations: selectedstations,
            access,
            country,
            password: hashedPassword,
        }).save()
        console.log("User created successfully...");
        console.log(newuser);

        return Response.json({ okay: "User created" }, { status: 200 });

    } catch (error) {
        console.error('An error occured', error);
        return Response.json({ error: 'An error occured' }, { status: 500 });
    }
}