import { NextRequest, NextResponse } from 'next/server';
import {connectDB} from '@/lib/mongoose'; 
import User from '@/models/User';

export async function GET(request: NextRequest) {
  console.log("get request")
  await connectDB();

  const { searchParams } = new URL(request.url);
  const role = searchParams.get('role');
  const id = searchParams.get('id');
  const reportType = searchParams.get("reportType");

  if (!role || !id || !reportType) {
    console.log("missing argument")
    return NextResponse.json({ error: 'Missing required paremter' }, { status: 400 });
  }

  if (reportType?.toLocaleLowerCase() == "reportcard" && role == "student") {
    const user = await User.findOne({ id })
    if (user) {
      const { id, firstName, middleName, lastName, grades} = user;
      return NextResponse.json({ id, firstName, middleName, lastName, grades} );
    }
    console.log("No user")
    return NextResponse.json({ error: 'No uer found' }, { status: 400 });
  }
  return NextResponse.json({ error: 'Missing required paremter' }, { status: 400 });

}