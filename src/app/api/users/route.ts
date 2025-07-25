import { NextRequest, NextResponse } from 'next/server';
import {connectDB} from '@/lib/mongoose'; 
import User from '@/models/User'; // Your Mongoose model

export async function GET(request: NextRequest) {
  console.log("get request")
  await connectDB(); // Ensure DB is connected

  const { searchParams } = new URL(request.url);
  // const role = searchParams.get('role');
  // const id = searchParams.get('id');

  // if (!role || !id) {
  //   return NextResponse.json({ error: 'Missing role or id' }, { status: 400 });
  // }
  console.log(searchParams)
  try {
    const plainParams = Object.fromEntries(searchParams.entries());
    const users = await User.find(plainParams);


    if (!users) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Strip sensitive data like password
    // const { password, ...safeUser } = user.toObject();

    return NextResponse.json(users);
  } catch (error) {
    console.error('User lookup error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
