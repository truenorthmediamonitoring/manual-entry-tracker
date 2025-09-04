import dbConnect from "@/app/lib/models/db";
import Capture from "@/app/lib/models/Capture";
import Station from "@/app/lib/models/Station";

export async function GET(req) {
  await dbConnect();
  const url = new URL(req.url);
  const month = url.searchParams.get('month');

  // Find capture records for the month and populate station name/type
  const captures = await Capture.find({ month })
    .populate('stationId', 'name type')
    .lean();

  // Return formatted data for frontend use
  const result = captures.map(c => ({
    _id: c._id,
    userId: c.userId.toString(),
    station: c.stationId,
    completedDays: c.completedDays || [],
  }));

  return new Response(JSON.stringify(result), { status: 200 });
}
