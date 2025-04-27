import dbConnect from '../../../lib/mongoose.js';
import JobOffer from '../../../models/JobOffer.js';

export async function GET() {
  await dbConnect();

  try {
    const jobs = await JobOffer.find({});
    return Response.json({ success: true, data: jobs }, { status: 200 });
  } catch (error) {
    return Response.json({ success: false }, { status: 400 });
  }
}
