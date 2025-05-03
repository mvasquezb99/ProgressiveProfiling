import dbConnect from "@/lib/mongoose";
import User from "@/models/User";


export async function POST(request) {
    await dbConnect();

    try {
        const body = await request.json();
        const newUser = await User.create(body);
        return Response.json({ success: true, data: newUser }, { status: 200 });

    } catch (error) {
        return Response.json({ success: false }, { status: 500 });
    }
}

export async function GET(request) {
    await dbConnect();
    const email = request.nextUrl.searchParams.get('email');
    
    if (!email) {    
        return Response.json({ success: false, message: 'Email not provided', status: 400 });
    }
    
    try {
        const user = await User.findOne({ email });
        if (!user) return Response.json({ success: false, message: 'Not found', status: 404 });

        return Response.json({ success: true, data: user }, { status: 200 });
    } catch (error) {

        return Response.json({ success: false }, { status: 500 });
    }
}




