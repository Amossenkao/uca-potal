// /api/payment/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Mock payment database
const paymentDatabase = {
  'lincoln-high': [
    {
      id: 'pay_001',
      studentId: 'stu_001',
      amount: 250.00,
      description: 'Tuition Fee - Fall 2024',
      status: 'paid',
      dueDate: '2024-09-15',
      paidDate: '2024-09-10',
      method: 'credit_card'
    },
    {
      id: 'pay_002',
      studentId: 'stu_002',
      amount: 75.00,
      description: 'Activity Fee',
      status: 'pending',
      dueDate: '2024-10-01',
      paidDate: null,
      method: null
    }
  ],
  'oak-elementary': [
    {
      id: 'pay_003',
      studentId: 'stu_003',
      amount: 45.00,
      description: 'Field Trip Fee',
      status: 'overdue',
      dueDate: '2024-08-20',
      paidDate: null,
      method: null
    }
  ]
};

// Mock student database
const studentDatabase = {
  'lincoln-high': [
    {
      id: 'stu_001',
      firstName: 'John',
      lastName: 'Smith',
      grade: 11,
      email: 'john.smith@student.lincoln-high.edu',
      parentEmail: 'parent.smith@email.com',
      enrollmentDate: '2022-08-15',
      status: 'active',
      gpa: 3.7
    },
    {
      id: 'stu_002',
      firstName: 'Emily',
      lastName: 'Johnson',
      grade: 10,
      email: 'emily.johnson@student.lincoln-high.edu',
      parentEmail: 'johnson.family@email.com',
      enrollmentDate: '2023-08-20',
      status: 'active',
      gpa: 3.9
    }
  ],
  'oak-elementary': [
    {
      id: 'stu_003',
      firstName: 'Michael',
      lastName: 'Brown',
      grade: 3,
      email: null,
      parentEmail: 'brown.parents@email.com',
      enrollmentDate: '2021-08-25',
      status: 'active',
      gpa: null
    }
  ]
};

// Utility function to extract subdomain
function extractSubdomain(req: NextRequest): string | null {
  const host = req.headers.get('host');
  if (!host) return null;
  
  const hostParts = host.split('.');
  if (hostParts.length >= 3) {
    return hostParts[0];
  } else if (hostParts.length === 2 && hostParts[0] !== 'localhost') {
    return hostParts[0];
  }
  return null;
}

// PAYMENT ROUTES
export async function GET(req: NextRequest) {
  const { pathname } = new URL(req.url);
  
  if (pathname.includes('/payment')) {
    return handlePaymentGet(req);
  } else if (pathname.includes('/student')) {
    return handleStudentGet(req);
  }
  
  return NextResponse.json({ error: 'Route not found' }, { status: 404 });
}

export async function POST(req: NextRequest) {
  const { pathname } = new URL(req.url);
  
  if (pathname.includes('/payment')) {
    return handlePaymentPost(req);
  } else if (pathname.includes('/student')) {
    return handleStudentPost(req);
  }
  
  return NextResponse.json({ error: 'Route not found' }, { status: 404 });
}

// PAYMENT HANDLERS
async function handlePaymentGet(req: NextRequest) {
  try {
    const subdomain = extractSubdomain(req);
    if (!subdomain) {
      return NextResponse.json({ error: 'Invalid subdomain' }, { status: 400 });
    }

    const { searchParams } = new URL(req.url);
    const studentId = searchParams.get('studentId');
    const status = searchParams.get('status');

    let payments = paymentDatabase[subdomain] || [];

    // Filter by student ID if provided
    if (studentId) {
      payments = payments.filter(payment => payment.studentId === studentId);
    }

    // Filter by status if provided
    if (status) {
      payments = payments.filter(payment => payment.status === status);
    }

    return NextResponse.json({
      success: true,
      subdomain,
      payments,
      total: payments.length
    });

  } catch (error) {
    console.error('Payment GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function handlePaymentPost(req: NextRequest) {
  try {
    const subdomain = extractSubdomain(req);
    if (!subdomain) {
      return NextResponse.json({ error: 'Invalid subdomain' }, { status: 400 });
    }

    const body = await req.json();
    const { action, paymentId, amount, method } = body;

    if (action === 'process_payment') {
      // Process payment logic
      const payments = paymentDatabase[subdomain] || [];
      const paymentIndex = payments.findIndex(p => p.id === paymentId);

      if (paymentIndex === -1) {
        return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
      }

      // Update payment status
      payments[paymentIndex] = {
        ...payments[paymentIndex],
        status: 'paid',
        paidDate: new Date().toISOString().split('T')[0],
        method: method || 'credit_card'
      };

      return NextResponse.json({
        success: true,
        message: 'Payment processed successfully',
        payment: payments[paymentIndex]
      });

    } else if (action === 'create_payment') {
      // Create new payment
      const newPayment = {
        id: `pay_${Date.now()}`,
        studentId: body.studentId,
        amount: amount,
        description: body.description,
        status: 'pending',
        dueDate: body.dueDate,
        paidDate: null,
        method: null
      };

      if (!paymentDatabase[subdomain]) {
        paymentDatabase[subdomain] = [];
      }
      paymentDatabase[subdomain].push(newPayment);

      return NextResponse.json({
        success: true,
        message: 'Payment created successfully',
        payment: newPayment
      });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });

  } catch (error) {
    console.error('Payment POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// STUDENT HANDLERS
async function handleStudentGet(req: NextRequest) {
  try {
    const subdomain = extractSubdomain(req);
    if (!subdomain) {
      return NextResponse.json({ error: 'Invalid subdomain' }, { status: 400 });
    }

    const { searchParams } = new URL(req.url);
    const studentId = searchParams.get('id');
    const grade = searchParams.get('grade');
    const status = searchParams.get('status');

    let students = studentDatabase[subdomain] || [];

    // Get specific student by ID
    if (studentId) {
      const student = students.find(s => s.id === studentId);
      if (!student) {
        return NextResponse.json({ error: 'Student not found' }, { status: 404 });
      }
      return NextResponse.json({
        success: true,
        subdomain,
        student
      });
    }

    // Filter by grade if provided
    if (grade) {
      students = students.filter(student => student.grade === parseInt(grade));
    }

    // Filter by status if provided
    if (status) {
      students = students.filter(student => student.status === status);
    }

    return NextResponse.json({
      success: true,
      subdomain,
      students,
      total: students.length
    });

  } catch (error) {
    console.error('Student GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function handleStudentPost(req: NextRequest) {
  try {
    const subdomain = extractSubdomain(req);
    if (!subdomain) {
      return NextResponse.json({ error: 'Invalid subdomain' }, { status: 400 });
    }

    const body = await req.json();
    const { action } = body;

    if (action === 'create_student') {
      // Create new student
      const newStudent = {
        id: `stu_${Date.now()}`,
        firstName: body.firstName,
        lastName: body.lastName,
        grade: body.grade,
        email: body.email,
        parentEmail: body.parentEmail,
        enrollmentDate: new Date().toISOString().split('T')[0],
        status: 'active',
        gpa: body.gpa || null
      };

      if (!studentDatabase[subdomain]) {
        studentDatabase[subdomain] = [];
      }
      studentDatabase[subdomain].push(newStudent);

      return NextResponse.json({
        success: true,
        message: 'Student created successfully',
        student: newStudent
      });

    } else if (action === 'update_student') {
      // Update existing student
      const students = studentDatabase[subdomain] || [];
      const studentIndex = students.findIndex(s => s.id === body.studentId);

      if (studentIndex === -1) {
        return NextResponse.json({ error: 'Student not found' }, { status: 404 });
      }

      // Update student data
      students[studentIndex] = {
        ...students[studentIndex],
        ...body.updates
      };

      return NextResponse.json({
        success: true,
        message: 'Student updated successfully',
        student: students[studentIndex]
      });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });

  } catch (error) {
    console.error('Student POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Additional route handlers for PUT and DELETE
export async function PUT(req: NextRequest) {
  const { pathname } = new URL(req.url);
  
  if (pathname.includes('/payment')) {
    return handlePaymentPost(req); // Reuse POST logic for updates
  } else if (pathname.includes('/student')) {
    return handleStudentPost(req); // Reuse POST logic for updates
  }
  
  return NextResponse.json({ error: 'Route not found' }, { status: 404 });
}

export async function DELETE(req: NextRequest) {
  try {
    const subdomain = extractSubdomain(req);
    if (!subdomain) {
      return NextResponse.json({ error: 'Invalid subdomain' }, { status: 400 });
    }

    const { searchParams, pathname } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID parameter required' }, { status: 400 });
    }

    if (pathname.includes('/payment')) {
      const payments = paymentDatabase[subdomain] || [];
      const paymentIndex = payments.findIndex(p => p.id === id);
      
      if (paymentIndex === -1) {
        return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
      }

      payments.splice(paymentIndex, 1);
      return NextResponse.json({ success: true, message: 'Payment deleted' });

    } else if (pathname.includes('/student')) {
      const students = studentDatabase[subdomain] || [];
      const studentIndex = students.findIndex(s => s.id === id);
      
      if (studentIndex === -1) {
        return NextResponse.json({ error: 'Student not found' }, { status: 404 });
      }

      students.splice(studentIndex, 1);
      return NextResponse.json({ success: true, message: 'Student deleted' });
    }

    return NextResponse.json({ error: 'Route not found' }, { status: 404 });

  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}