import { NextRequest, NextResponse } from 'next/server';
import {connectDB} from '@/lib/mongoose'; 
import User from '@/models/User';

export async function GET(request: NextRequest) {
  console.log("get request")
  await connectDB();

  async function getStudentsReport(ids: string[]): Promise<any[]> {
    try {
      // Find all users with IDs in the provided array
      const users = await User.find({ 
        id: { $in: ids },
        role: "student"
      });

      // Transform the data for each student
      const studentsData = users.map(user => transformStudentData(user));
      return studentsData;
    } catch (error) {
      console.error('Error fetching students by IDs:', error);
      throw error;
    }
  }

  async function getStudentsByClass(classId: string): Promise<any[]> {
    try {
      // Find all students in the specified class
      const users = await User.find({ 
        currentClass: classId,
        role: "student"
      });

      // Transform the data for each student
      const studentsData = users.map(user => transformStudentData(user));
      return studentsData;
    } catch (error) {
      console.error('Error fetching students by class:', error);
      throw error;
    }
  }

  // Helper function to transform student data
  function transformStudentData(user: any) {
    const { id, firstName, middleName, lastName, grades, currentClass } = user;
    return {
      id,
      firstName,
      middleName,
      lastName,
      grades,
      sponsor: "Isaac D. Jallah",
      class: currentClass || "Grade 9",
      academicYear: "2024/2025",
      grade: currentClass || "9th Grade",
      nextGrade: getNextGrade(currentClass || "Grade 9"),
      nextAcademicYear: "2025/2026"
    };
  }

  // Helper function to determine next grade
  function getNextGrade(currentGrade: string): string {
    const gradeMap: { [key: string]: string } = {
      "Grade 1": "Grade 2",
      "Grade 2": "Grade 3",
      "Grade 3": "Grade 4",
      "Grade 4": "Grade 5",
      "Grade 5": "Grade 6",
      "Grade 6": "Grade 7",
      "Grade 7": "Grade 8",
      "Grade 8": "Grade 9",
      "Grade 9": "Grade 10",
      "Grade 10": "Grade 11",
      "Grade 11": "Grade 12",
      "Grade 12": "Graduate"
    };
    return gradeMap[currentGrade] || "Next Grade";
  }

  const { searchParams } = new URL(request.url);
  const role = searchParams.get('role');
  const reportType = searchParams.get("reportType");
  
  // Handle both 'ids' and 'ids[]' parameters
  const idsParam = searchParams.get('ids') || searchParams.getAll('ids[]').join(',');
  const classId = searchParams.get('classId');

  console.log("Role:", role);
  console.log("IDs:", idsParam);
  console.log("Class ID:", classId);
  console.log("Report Type:", reportType);

  if (!role || !reportType) {
    console.log("missing role or reportType");
    return NextResponse.json({ error: 'Missing required parameters: role and reportType' }, { status: 400 });
  }

  // Check if either classId or ids are provided
  if (!classId && !idsParam) {
    console.log("missing classId or ids");
    return NextResponse.json({ error: 'Either classId or ids parameter is required' }, { status: 400 });
  }

  if (reportType?.toLowerCase() === "reportcard" && role === "student") {
    try {
      let studentsData: any[] = [];

      // Priority: classId takes precedence over individual ids
      if (classId) {
        console.log("Fetching students by class:", classId);
        studentsData = await getStudentsByClass(classId);
        
        if (studentsData.length === 0) {
          console.log("No students found in class:", classId);
          return NextResponse.json({ error: `No students found in class: ${classId}` }, { status: 404 });
        }
        
        console.log(`Found ${studentsData.length} students in class ${classId}`);
        return NextResponse.json(studentsData);
        
      } else if (idsParam) {
        // Parse the ids parameter - it could be a single ID or comma-separated IDs
        let ids: string[];
        
        if (idsParam.includes(',')) {
          // Multiple IDs separated by commas
          ids = idsParam.split(',').map(id => id.trim()).filter(id => id.length > 0);
        } else {
          // Single ID
          ids = [idsParam.trim()];
        }

        if (ids.length === 0) {
          return NextResponse.json({ error: 'No valid IDs provided' }, { status: 400 });
        }

        console.log("Processing IDs:", ids);
        studentsData = await getStudentsReport(ids);

        if (studentsData.length === 0) {
          console.log("No students found for provided IDs");
          return NextResponse.json({ error: 'No students found for the provided IDs' }, { status: 404 });
        }

        // Return single student object if only one ID was requested (for backward compatibility)
        // Return array if multiple IDs were requested
        if (ids.length === 1) {
          console.log("Returning single student");
          return NextResponse.json(studentsData[0]);
        } else {
          console.log(`Returning ${studentsData.length} students`);
          return NextResponse.json(studentsData);
        }
      }

    } catch (error) {
      console.error('Error processing request:', error);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  }

  return NextResponse.json({ error: 'Invalid request parameters' }, { status: 400 });
}