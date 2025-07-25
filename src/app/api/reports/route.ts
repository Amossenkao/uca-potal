import { NextRequest, NextResponse } from 'next/server';
import jsPDF from 'jspdf';

// Import autoTable plugin
import autoTable from 'jspdf-autotable';

// Extended jsPDF type to include autoTable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: typeof autoTable;
  }
}

// Sample student and grade data structure
interface GradeData {
  subject: string;
  firstSemester: {
    test: number;
    project: number;
    exam: number;
    average: number;
  };
  secondSemester: {
    test: number;
    project: number;
    exam: number;
    average: number;
  };
  yearlyAverage: number;
}

interface StudentReportData {
  id: string;
  name: string;
  academicYear: string;
  class: string;
  grades: GradeData[];
  totalAverage: number;
  isEligibleForPromotion: boolean;
  teacherRemarks: string;
  principalSignature: string;
  classSponsor: string;
}

// Mock database - replace with actual database queries
const mockStudentData: Record<string, StudentReportData> = {
  'stu_001': {
    id: 'stu_001',
    name: 'Jalloh Mohammed U.',
    academicYear: '2024/2025',
    class: '7th Grade',
    grades: [
      {
        subject: 'Mathematics',
        firstSemester: { test: 85, project: 78, exam: 82, average: 82 },
        secondSemester: { test: 88, project: 85, exam: 87, average: 87 },
        yearlyAverage: 84
      },
      {
        subject: 'English Language',
        firstSemester: { test: 75, project: 80, exam: 77, average: 77 },
        secondSemester: { test: 82, project: 78, exam: 80, average: 80 },
        yearlyAverage: 79
      },
      {
        subject: 'Social Studies',
        firstSemester: { test: 90, project: 88, exam: 89, average: 89 },
        secondSemester: { test: 92, project: 90, exam: 91, average: 91 },
        yearlyAverage: 90
      },
      {
        subject: 'Science',
        firstSemester: { test: 78, project: 82, exam: 80, average: 80 },
        secondSemester: { test: 85, project: 83, exam: 84, average: 84 },
        yearlyAverage: 82
      },
      {
        subject: 'French',
        firstSemester: { test: 70, project: 75, exam: 72, average: 72 },
        secondSemester: { test: 76, project: 78, exam: 77, average: 77 },
        yearlyAverage: 75
      }
    ],
    totalAverage: 82,
    isEligibleForPromotion: true,
    teacherRemarks: 'Excellent performance. Keep up the good work!',
    principalSignature: 'Dr. Principal',
    classSponsor: 'Mrs. Johnson'
  }
};



function generateReportCardPDF(studentData: StudentReportData): Buffer {
  const doc = new jsPDF('l', 'mm', 'a4'); // 'l' for landscape orientation
  const pageWidth = doc.internal.pageSize.width;  // 297mm in landscape
  const pageHeight = doc.internal.pageSize.height; // 210mm in landscape
  const halfPage = pageWidth / 2; // 148.5mm - fold line

  // Helper function to draw table manually
  const drawTable = (x: number, y: number, width: number, headers: string[], data: string[][], title: string) => {
    const cellHeight = 6;
    const headerHeight = 8;
    const colWidth = width / headers.length;

    // Draw title
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(title, x, y - 3);

    // Draw header background
    doc.setFillColor(200, 200, 200);
    doc.rect(x, y, width, headerHeight, 'F');

    // Draw header borders and text
    doc.setDrawColor(0);
    doc.setLineWidth(0.1);
    for (let i = 0; i < headers.length; i++) {
      doc.rect(x + (i * colWidth), y, colWidth, headerHeight);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.text(headers[i], x + (i * colWidth) + 2, y + 5);
    }

    // Draw data rows
    doc.setFont('helvetica', 'normal');
    for (let row = 0; row < data.length; row++) {
      const rowY = y + headerHeight + (row * cellHeight);
      for (let col = 0; col < data[row].length; col++) {
        doc.rect(x + (col * colWidth), rowY, colWidth, cellHeight);
        doc.text(data[row][col] || '', x + (col * colWidth) + 2, rowY + 4);
      }
    }

    return y + headerHeight + (data.length * cellHeight);
  };

  // Draw fold line helper
  const drawFoldLine = () => {
    doc.setDrawColor(150, 150, 150);
    doc.setLineDashPattern([2, 2], 0);
    doc.setLineWidth(0.2);
    doc.line(halfPage, 0, halfPage, pageHeight);
    doc.setLineDashPattern([], 0); // Reset dash pattern
    doc.setDrawColor(0);
  };

  // ========================
  // PAGE 1 - GRADES (Left and Right Halves)
  // ========================

  // PAGE 1 - LEFT HALF: First Semester
  const leftMargin = 15;
  const rightMargin = halfPage - 15;
  const topMargin = 20;
  const sectionWidth = halfPage - 30; // Width for each semester section

  // First Semester Header (Left Half)
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('First Semester', leftMargin + (sectionWidth / 2), topMargin, { align: 'center' });

  // Student Info (Left Half)
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Name: ${studentData.name}`, leftMargin, topMargin + 15);
  doc.text(`Academic Year: ${studentData.academicYear}`, leftMargin, topMargin + 25);
  doc.text(`Class: ${studentData.class}`, leftMargin, topMargin + 35);

  // First Semester Table
  const firstSemesterData = studentData.grades.map(grade => [
    grade.subject,
    grade.firstSemester.test.toString(),
    grade.firstSemester.project.toString(),
    grade.firstSemester.exam.toString(),
    grade.firstSemester.average.toString()
  ]);

  const firstTableY = topMargin + 50;
  drawTable(leftMargin, firstTableY, sectionWidth, 
    ['Subject', 'Test', 'Project', 'Exam', 'Average'], 
    firstSemesterData, '');

  // PAGE 1 - RIGHT HALF: Second Semester
  const rightHalfStart = halfPage + 15;

  // Second Semester Header (Right Half)
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Second Semester', rightHalfStart + (sectionWidth / 2), topMargin, { align: 'center' });

  // Student Info (Right Half - Mirror of left)
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Name: ${studentData.name}`, rightHalfStart, topMargin + 15);
  doc.text(`Academic Year: ${studentData.academicYear}`, rightHalfStart, topMargin + 25);
  doc.text(`Class: ${studentData.class}`, rightHalfStart, topMargin + 35);

  // Second Semester Table
  const secondSemesterData = studentData.grades.map(grade => [
    grade.subject,
    grade.secondSemester.test.toString(),
    grade.secondSemester.project.toString(),
    grade.secondSemester.exam.toString(),
    grade.secondSemester.average.toString(),
    grade.yearlyAverage.toString()
  ]);

  drawTable(rightHalfStart, firstTableY, sectionWidth, 
    ['Subject', 'Test', 'Project', 'Exam', 'Average', 'Yearly'], 
    secondSemesterData, '');

  // Draw fold line on page 1
  drawFoldLine();

  // ========================
  // PAGE 2 - SCHOOL INFO & PROMOTION (Left and Right Halves)
  // ========================
  doc.addPage();

  // PAGE 2 - LEFT HALF: School Information & Grading Method
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('UPSTAIRS CHRISTIAN ACADEMY', leftMargin + (sectionWidth / 2), topMargin + 10, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('P.O Box 2023 Monrovia, County Liberia', leftMargin + (sectionWidth / 2), topMargin + 20, { align: 'center' });
  doc.text('Email: ucastairway17@gmail.com', leftMargin + (sectionWidth / 2), topMargin + 28, { align: 'center' });

  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('JUNIOR HIGH PROGRESS REPORT', leftMargin + (sectionWidth / 2), topMargin + 40, { align: 'center' });

  // Grading Method (Left Half)
  const gradingY = topMargin + 60;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('METHOD OF GRADING', leftMargin, gradingY);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text('A+ = 90 - 100 Excellent', leftMargin, gradingY + 15);
  doc.text('B = 80 - 89 Very Good', leftMargin, gradingY + 25);
  doc.text('C = 75 - 79 Good', leftMargin, gradingY + 35);
  doc.text('D = 70 - 74 Fair', leftMargin, gradingY + 45);

  // Parent/Guardian Instructions (Left Half)
  const parentInstructY = gradingY + 65;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('PARENTS OR GUARDIANS - PLEASE READ', leftMargin, parentInstructY);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  const instructionText = `This report will be periodically for your inspection. It is a pupil progress report. Any grade below 70 in any subject should be a lack of study, irregular attendance or something that could be corrected. Special attention should be made to ensure that the child improves. Moreover, parent conferences with parents or guardians are encouraged. It will help to secure the best environment for your child.`;
  
  const splitInstructions = doc.splitTextToSize(instructionText, sectionWidth - 10);
  doc.text(splitInstructions, leftMargin, parentInstructY + 15);

  // PAGE 2 - RIGHT HALF: Promotion & Signatures
  
  // Promotion Statement (Right Half)
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Promotion Statement', rightHalfStart, topMargin + 10);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  const promotionText = studentData.isEligibleForPromotion 
    ? `This is to certify that ${studentData.name} has satisfactorily completed the work of 7th Grade and is promoted to 8th grade.`
    : `${studentData.name} - Yearly Average below 70 will not be eligible for promotion.`;
  
  const splitPromotion = doc.splitTextToSize(promotionText, sectionWidth - 10);
  doc.text(splitPromotion, rightHalfStart, topMargin + 25);

  // Teacher Remarks (Right Half)
  const remarksY = topMargin + 50;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Teachers Remark', rightHalfStart, remarksY);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  const splitRemarks = doc.splitTextToSize(studentData.teacherRemarks, sectionWidth - 10);
  doc.text(splitRemarks, rightHalfStart, remarksY + 15);

  // Signatures (Right Half)
  const signatureY = remarksY + 40;
  doc.setFontSize(10);
  doc.text('Date: _______________', rightHalfStart, signatureY);
  doc.text('Principal: _______________', rightHalfStart, signatureY + 15);
  doc.text(`Class Sponsor: ${studentData.classSponsor}`, rightHalfStart, signatureY + 30);

  // Parent Signature Section (Right Half)
  const parentSigY = signatureY + 50;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('PARENTS OR GUARDIANS', rightHalfStart, parentSigY);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  const parentSigText = `Please sign below as evidence that you have examined this report with possible recommendation or motivation to your son or daughter(s) as this instrument could shape your child's destiny.`;
  
  const splitParentSig = doc.splitTextToSize(parentSigText, sectionWidth - 10);
  doc.text(splitParentSig, rightHalfStart, parentSigY + 15);

  // Parent signature table (Right Half)
  const signatureTableY = parentSigY + 35;
  const signatureHeaders = ['Parent', 'Class Teacher', 'Parent/Guardian'];
  const signatureData = [['', '', ''], ['', '', ''], ['', '', '']];
  
  // Adjust table width for right half
  const tableWidth = sectionWidth - 10;
  const cellWidth = tableWidth / 3;
  const tableHeight = 25;
  
  // Draw signature table manually
  doc.setDrawColor(0);
  doc.setLineWidth(0.5);
  
  // Table headers
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  for (let i = 0; i < signatureHeaders.length; i++) {
    doc.rect(rightHalfStart + (i * cellWidth), signatureTableY, cellWidth, 8);
    doc.text(signatureHeaders[i], rightHalfStart + (i * cellWidth) + 2, signatureTableY + 6);
  }
  
  // Table rows
  for (let row = 0; row < 3; row++) {
    const rowY = signatureTableY + 8 + (row * 8);
    for (let col = 0; col < 3; col++) {
      doc.rect(rightHalfStart + (col * cellWidth), rowY, cellWidth, 8);
    }
  }

  // Note at bottom (Right Half)
  const noteY = signatureTableY + 40;
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('Note:', rightHalfStart, noteY);
  doc.setFont('helvetica', 'normal');
  const noteText = `When a student mark is 69 or below in any subject the parent or guardian should give special attention to see that the student does well in all the work required by the teacher, otherwise the student will probably REPEAT THE CLASS.`;
  
  const splitNote = doc.splitTextToSize(noteText, sectionWidth - 10);
  doc.text(splitNote, rightHalfStart, noteY + 8);

  // Draw fold line on page 2
  drawFoldLine();

  return Buffer.from(doc.output('arraybuffer'));
}

export async function GET(req: NextRequest) {
  try {

    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');
    const studentId = searchParams.get('id');

    if (type !== 'reportCard') {
      return NextResponse.json({ error: 'Invalid report type' }, { status: 400 });
    }

    if (!studentId) {
      return NextResponse.json({ error: 'Student ID is required' }, { status: 400 });
    }

    // Get student data (replace with actual database query)
    const studentData = mockStudentData[studentId];
    if (!studentData) {
      console.log("NOT FOUND")
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    // Generate PDF
    const pdfBuffer = generateReportCardPDF(studentData);

    // Return PDF response
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="report-card-${studentData.name.replace(/\s+/g, '-')}.pdf"`,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });

  } catch (error) {
    console.error('Report generation error:', error);
    return NextResponse.json({ 
      error: 'Failed to generate report',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}