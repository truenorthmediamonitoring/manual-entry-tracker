import dbConnect from "@/app/lib/models/db";
import User from "@/app/lib/models/User";

export async function POST(request) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
        const req = await request.json();
        console.log(req);

        console.log("Connecting to database...");
        await dbConnect();
        console.log("Connected.");

        console.log("Deleting  User...");
        const deluser = await User.findByIdAndDelete({ _id: req.id });
        console.log(deluser);
        
        return Response.json({ okay: "Success" }, { status: 200 });
    } catch (error) {
        console.error('An error occured', error);
        return Response.json({ error: 'An error occured' }, { status: 500 });
    }
}