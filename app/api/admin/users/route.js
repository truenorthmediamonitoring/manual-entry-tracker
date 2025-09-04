import dbConnect from "@/app/lib/models/db";
import User from "@/app/lib/models/User";

// GET all users with just fname, lname and email fields
export async function GET() {

    try {
        await dbConnect();
        const users = await User.find({}, 'fname lname email country').lean();
        return new Response(JSON.stringify(users), { status: 200 });
    } catch (error) {
        console.error('An error occured', error);
        return Response.json({ error: 'An error occured' }, { status: 500 });
    }

}
