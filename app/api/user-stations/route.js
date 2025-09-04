import dbConnect from "@/app/lib/models/db";
import User from "@/app/lib/models/User";
import Station from "@/app/lib/models/Station";

export async function GET(req) {

    try {
        await dbConnect();
        const url = new URL(req.url);
        const userId = url.searchParams.get('userId');
        const user = await User.findById(userId).populate('assignedStations');
        if (!user) {
            return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
        }
        // console.log(user.assignedStations);
        
        return new Response(JSON.stringify(user.assignedStations), { status: 200 });

    } catch (error) {
        console.error('An error occured', error);
        return Response.json({ error: 'An error occured' }, { status: 500 });
    }

}