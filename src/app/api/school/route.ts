import { NextRequest, NextResponse } from 'next/server';

// Mock database - replace with your actual database connection
const schoolDatabase = {
  'lincoln-high': {
    id: 1,
    name: 'Lincoln High School',
    subdomain: 'uca',
    address: '123 Education St, Springfield, IL',
    principal: 'Dr. Sarah Johnson',
    students: 1250,
    established: 1965
  },
  'oak-elementary': {
    id: 2,
    name: 'Oak Elementary School',
    subdomain: 'oak-elementary',
    address: '456 Learning Ave, Springfield, IL',
    principal: 'Ms. Maria Rodriguez',
    students: 480,
    established: 1978
  },
  'riverside-middle': {
    id: 3,
    name: 'Riverside Middle School',
    subdomain: 'riverside-middle',
    address: '789 Knowledge Blvd, Springfield, IL',
    principal: 'Mr. David Chen',
    students: 650,
    established: 1982
  }
};

export async function GET(req: NextRequest) {
  try {
    // Extract the host from the request headers
    const host = req.headers.get('host');
    
    if (!host) {
      return NextResponse.json(
        { error: 'Host header not found' },
        { status: 400 }
      );
    }

    // Extract subdomain from host
    // Assumes format: subdomain.yourdomain.com
    const hostParts = host.split('.');
    
    // Handle different scenarios
    let subdomain: string;
    
    if (hostParts.length >= 3) {
      // subdomain.domain.com or subdomain.domain.co.uk
      subdomain = hostParts[0];
    } else if (hostParts.length === 2) {
      // For localhost:3000 or domain.com cases
      subdomain = hostParts[0];
    } else {
      return NextResponse.json(
        { error: 'Invalid host format' },
        { status: 400 }
      );
    }

    // Skip 'www' subdomain
    if (subdomain === 'www') {
      return NextResponse.json(
        { error: 'www subdomain not supported' },
        { status: 400 }
      );
    }

    // Skip localhost for development
    if (subdomain === 'localhost') {
      return NextResponse.json(
        { error: 'Please use a valid subdomain' },
        { status: 400 }
      );
    }

    // Query the database for school information
    // Replace this with your actual database query
    const schoolInfo = await findSchoolBySubdomain(subdomain);

    if (!schoolInfo) {
      return NextResponse.json(
        { error: `School not found for subdomain: ${subdomain}` },
        { status: 404 }
      );
    }

    // Return school information
    return NextResponse.json({
      success: true,
      subdomain,
      school: schoolInfo
    });

  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Database query function - replace with your actual database logic
async function findSchoolBySubdomain(subdomain: string) {
  // Simulate database query delay
  await new Promise(resolve => setTimeout(resolve, 100));
  const school = schoolDatabase[subdomain];
  // Mock database lookup
  return school || null;
  
  // Example with actual database (uncomment and modify as needed):
  /*
  try {
    const db = await connectToDatabase(); // Your database connection
    const school = await db.collection('schools').findOne({ subdomain });
    return school;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
  */
}