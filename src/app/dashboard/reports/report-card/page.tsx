"use client"
import React, {useEffect, useState} from 'react';
import { Document, Page, PDFViewer, Text, View, Image } from '@react-pdf/renderer';
import axios from 'axios';
import styles from './styles';

import { PageLoading } from '@/components/loading';

function gradeStyle(score: string | number) {
  if (Number(score) < 70) {
    return {
      ...styles.tableCell,
      color: "red",
      fontSize: 10,
    }
  } else {
        return {
      ...styles.tableCell,
          color: "blue",
      fontSize: 10,
    }
  }
}

interface Student {
  firstName: string;
  middleName: string;
  lastName: string;
  class: string;
  id: string;
  academicYear: string;
  grade: string;
  nextGrade: string;
  nextAcademicYear: string;
  sponsor: string;
  grades: any[];
}

interface Subject {
  name: string;
  firstSemester: {
    ca1: number;
    ca2: number;
    ca3: number;
    exam: number;
    average: number;
  };
  secondSemester: {
    ca1: number;
    ca2: number;
    ca3: number;
    exam: number;
    average: number;
  };
  yearlyAverage: number;
}

interface StudentData {
  student: Student;
  subjects: Subject[];
}

function ReportCard({ids, classId}: {ids?: string[], classId?: string}) {
  const [studentsData, setStudentsData] = useState<StudentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudentsData = async () => {
      try {
        const reportType = "reportcard";
        const role = "student";

        // Use provided ids or default to a single student
        const studentIds = ["UCA2025019", "UCA2025011", "UCA2025010", "UCA2025012"];
        const params = classId 
        ? { classId, reportType, role }
        : { ids: studentIds, reportType, role };

        const response = await axios.get("/api/reports", { 
          params: params
        });
        
        if (response.data) {
          // Assuming the API returns an array of student data or a single student
          const responseData = Array.isArray(response.data) ? response.data : [response.data];
          
          const transformedStudentsData: StudentData[] = responseData.map((studentData: any) => {
            let subjects: Subject[] = [];
            
            // Transform the grades data into subjects array
            if (studentData.grades && studentData.grades[0]) {
              const gradesData = studentData.grades[0];
              const subjectNames = Object.keys(gradesData.firstPeriod).filter(key => key !== 'Rank');
              
              subjects = subjectNames.map(subjectName => ({
                name: subjectName,
                firstSemester: {
                  ca1: gradesData.firstPeriod[subjectName] || 0,
                  ca2: gradesData.secondPeriod[subjectName] || 0,
                  ca3: gradesData.thirdPeriod[subjectName] || 0,
                  exam: gradesData.thirdPeriodExam[subjectName] || 0,
                  average: gradesData.firstSemesterAverage[subjectName] || 0
                },
                secondSemester: {
                  ca1: gradesData.fourthPeriod[subjectName] || 0,
                  ca2: gradesData.fifthPeriod[subjectName] || 0,
                  ca3: gradesData.sixthPeriod[subjectName] || 0,
                  exam: gradesData.sixthPeriodExam[subjectName] || 0,
                  average: gradesData.secondSemesterAverage[subjectName] || 0
                },
                yearlyAverage: gradesData.yearlyAverage[subjectName] || 0
              }));
            }
            
            return {
              student: studentData,
              subjects: subjects
            };
          });
          
          setStudentsData(transformedStudentsData);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching students data:', err);
        setError('Failed to load students data');
        setLoading(false);
      }
    };

    fetchStudentsData();
  }, [ids]);

  if (loading) {
    return <PageLoading fullScreen={false}/>
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!studentsData || studentsData.length === 0) {
    return <div>No student data found</div>;
  }

  const title = studentsData.length == 1 ? `Report Card - ${studentsData[0].student.firstName} 
  ${studentsData[0].student.middleName} ${studentsData[0].student.lastName}` :
    `Report Card - ${studentsData[0].student.grade}`
    

  return (
    <PDFViewer className='w-full h-screen'>
      <Document title={title}>
        {studentsData.map((studentData, studentIndex) => {
          const { student, subjects } = studentData;
          
          return (
            <React.Fragment key={studentIndex}>
              {/* First Page - Grades */}
              <Page size="A4" orientation="landscape" style={styles.page}>
                {/* Watermark */}
                <View style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(150%, 50%)',
                  opacity: 0.1,
                  zIndex: -1
                }}>
                  
                  <Image 
                    src="https://res.cloudinary.com/dcalueltd/image/upload/v1753368074/school-management-system/uca/Logo.png" 
                    style={{
                      width: 200,
                      height: 200,
                      opacity: 0.1
                    }}
                  />
                 
                </View>

                {/* Header */}
                <View style={styles.topRow}>
                  <View style={styles.headerLeft}>
                    <Text style={{ fontWeight: "bold" }}>Name: {student.firstName} {student.middleName} {student.lastName}</Text>
                    <Text>Class: {student.class || 'N/A'}</Text>
                    <Text>ID: {student.id}</Text>
                  </View>
                  <View style={styles.headerRight}>
                    <Text style={{ fontWeight: "bold", opacity: "0" }}>Academic Year: {student.academicYear || '2024/2025'}</Text>
                    <Text style={{ fontWeight: "bold", opacity: "0" }}>Academic Year: {student.academicYear || '2024/2025'}</Text>
                    <Text style={{ fontWeight: "bold", opacity: "0" }}>Academic Year: {student.academicYear || '2024/2025'}</Text>
                    <Text style={{ fontWeight: "bold" }}>Academic Year: {student.academicYear || '2024/2025'}</Text>
                  </View>
                </View>

                {/* Grades Table */}
                <View style={styles.gradesContainer}>
                  {/* First Semester */}
                  <View style={styles.semester}>
                    <Text style={styles.semesterHeader}>First Semester</Text>
                  
                    {/* Table Header */}
                    <View style={styles.tableHeader}>
                      <Text style={styles.subjectCell}>Subject</Text>
                      <Text style={styles.tableCell}>1st Period</Text>
                      <Text style={styles.tableCell}>2nd Period</Text>
                      <Text style={styles.tableCell}>3rd Period</Text>
                      <Text style={styles.tableCell}>Exam</Text>
                      <Text style={styles.tableCell}>Average</Text>
                    </View>
                  
                    {/* Subject Rows */}
                    {subjects.map((subject, index) => (
                      <View key={index} style={styles.tableRow}>
                        <Text style={styles.subjectCell}>{subject.name}</Text>
                        <Text style={gradeStyle(subject.firstSemester.ca1)}>
                          {subject.firstSemester.ca1}
                        </Text>
                        <Text style={gradeStyle(subject.firstSemester.ca2)}>
                          {subject.firstSemester.ca2}
                        </Text>
                        <Text style={gradeStyle(subject.firstSemester.ca3)}>
                          {subject.firstSemester.ca3}
                        </Text>
                        <Text style={gradeStyle(subject.firstSemester.exam)}>
                          {subject.firstSemester.exam}
                        </Text>
                        <Text style={gradeStyle(subject.firstSemester.average)}>
                          {subject.firstSemester.average}
                        </Text>
                      </View>
                    ))}
                  </View>

                  {/* Second Semester */}
                  <View style={styles.lastSemester}>
                    <Text style={styles.semesterHeader}>Second Semester</Text>
                  
                    {/* Table Header */}
                    <View style={styles.tableHeader}>
                      <Text style={styles.tableCell}>4th Period</Text>
                      <Text style={styles.tableCell}>5th Period</Text>
                      <Text style={styles.tableCell}>6th Period</Text>
                      <Text style={styles.tableCell}>Exam</Text>
                      <Text style={styles.tableCell}>Average</Text>
                      <Text style={styles.lastCell}>Yearly Average</Text>
                    </View>
                  
                    {/* Subject Rows */}
                    {subjects.map((subject, index) => (
                      <View key={index} style={styles.tableRow}>
                        <Text style={gradeStyle(subject.secondSemester.ca1)}>
                          {subject.secondSemester.ca1}
                        </Text>
                        <Text style={gradeStyle(subject.secondSemester.ca2)}>
                          {subject.secondSemester.ca2}
                        </Text>
                        <Text style={gradeStyle(subject.secondSemester.ca3)}>
                          {subject.secondSemester.ca3}
                        </Text>
                        <Text style={gradeStyle(subject.secondSemester.exam)}>
                          {subject.secondSemester.exam}
                        </Text>
                        <Text style={gradeStyle(subject.secondSemester.average)}>
                          {subject.secondSemester.average}
                        </Text>
                        <Text style={gradeStyle(subject.yearlyAverage)}>
                          {subject.yearlyAverage}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>

                {/* Bottom Section */}
                <View style={styles.bottomSection}>
                  <View style={styles.leftBottom}>
                    <View style={styles.gradingMethod}>
                      <Text style={styles.gradingTitle}>METHOD OF GRADING</Text>
                      <Text style={styles.gradingText}>A = 90 - 100 Excellent</Text>
                      <Text style={styles.gradingText}>B = 80 - 89 Very Good</Text>
                      <Text style={styles.gradingText}>C = 75 - 79 Good</Text>
                      <Text style={styles.gradingText}>D = 70 - 74 Fair</Text>
                      <Text style={styles.gradingText}>F = Below 70 Fail</Text>
                    </View>
                  </View>
                
                  <View style={styles.rightBottom}>
                    <Text style={styles.promotionText}>
                      Yearly Average below 70 will not be eligible for promotion.
                    </Text>
                  
                    <View style={styles.signatureSection}>
                      <Text>Teachers Remark: ____________________________</Text>
                      <Text style={{ marginTop: 20 }}>Signed: _________________________</Text>
                      <Text style={{ marginTop: 10, marginLeft: 50 }}>{student.sponsor || 'Class Sponsor'}, Class Sponsor</Text>
                    </View>
                  </View>
                </View>
              </Page>

              {/* Second Page - School Info and Parent Section */}
              <Page size="A4" orientation="landscape" style={styles.page}>
                {/* Watermark */}
                <View style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(100%, 1%)',
                  opacity: 0.2,
                  zIndex: -1
                }}>
                  
                  <Image 
                    src="https://res.cloudinary.com/dcalueltd/image/upload/v1753368074/school-management-system/uca/Logo.png" 
                    style={{
                      width: 200,
                      height: 200,
                      opacity: 0.1
                    }}
                  />
                 
                </View>

                {/* Two Column Container */}
                <View style={styles.pageTwoContainer}>
                
                  {/* Left Column - Promotion Statement */}
                  <View style={{ flex: 1, marginRight: 10, borderWidth: 1, borderColor: '#000', padding: 10 }}>
                    <Text style={styles.parentsSectionTitle}>TO OUR PARENTS & GUARDIANS</Text>
                  
                    <Text style={{ fontSize: 10, marginTop: 20, marginBottom: 30, textAlign: "justify", lineHeight: 1.7 }}>
                      This report will be periodically for your inspection. It is a pupil
                      progress report by which pupils' work could result in lack
                      of study, irregular attendance or something that could be
                      connected, special attention should be paid to ensure that the
                      child improves. Moreover, parent conferences with parent(s) or
                      guardians are encouraged, and it will serve to secure the best
                      co-operation for your child.
                    </Text>

                    <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 30, textAlign: "center" }}>Promotion Statement</Text>
                  
                    <Text style={{ fontSize: 11, marginBottom: 15, fontStyle: "italic", color: "royalblue" }}>
                      This is to certify that <Text style={{ textDecoration: "underline" }}>{student.firstName} {student.middleName} {student.lastName}</Text>  has satisfactorily
                      completed the work of <Text style={{ textDecoration: "underline" }}>{student.grade || '7th Grade'} </Text>and is promoted to <Text style={{ textDecoration: "underline" }}>{student.nextGrade || '8th grade'} </Text>
                      for Academic Year {student.nextAcademicYear || '2025/2026'}.
                    </Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, marginTop: 40 }}>
                      <Text>Date: ____________________</Text>
                      <Text>Principal: __________________</Text>
                    </View>

                    {/* QR Code placeholder */}
                    <View style={{
                      width: 80,
                      height: 80,
                      backgroundColor: '#e2e8f0',
                      alignSelf: 'center',
                      marginTop: 80,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderWidth: 1,
                      borderColor: '#000',
                      left: -120
                    }}>
                      <Text style={{ fontSize: 8, textAlign: 'center' }}>QR CODE{'\n'}PLACEHOLDER</Text>
                    </View>

                  </View>

                  {/* Right Column - School Information */}
                  <View style={{ flex: 1, marginLeft: 10, borderWidth: 1, borderColor: '#000', padding: 10 }}>
                    <View style={styles.schoolHeader}>
                      {/* School Avatar/Logo placeholder */}
                      <Text style={styles.schoolName}>UPSTAIRS CHRISTIAN ACADEMY</Text>
                      <View>
                        <View style={{
                          alignSelf: 'center',
                          marginBottom: 10,
                          justifyContent: 'center',
                          alignItems: 'center',
                          left: -140,
                          bottom: -8
                        }}>
                          <Image 
                          src="https://res.cloudinary.com/dcalueltd/image/upload/v1753484515/uca_logo2_kqlgdl.png" 
                          style={{
                            width: 65,
                            height: 65,
                          }}
                        />
                        </View>

                        <Text style={styles.schoolDetails}>Daycare, Nursery, Kindergarten, Elem, Junior & Senior High</Text>
                        <Text style={styles.schoolDetails}>Unity Town, Pipeline Road, Lower Johnsonville</Text>
                        <Text style={styles.schoolDetails}>P.O Box 2523 Montserrado County-Liberia</Text>
                        <Text style={styles.schoolDetails}>Email: ucacademy2011@gmail.com</Text>
                        <Text style={styles.schoolDetails}>Website: www.uca.con.lr</Text>
                      
                        <View style={{

                          alignSelf: 'center',
                          marginBottom: 10,
                          justifyContent: 'center',
                          alignItems: 'center',
                          top: -130,
                          right: -145
                        }}>
                          <Image 
                          src="https://res.cloudinary.com/dcalueltd/image/upload/v1753368074/school-management-system/uca/Logo.png" 
                          style={{
                            width: 65,
                            height: 65,
                          }}
                        />
                        </View>
                      </View>
                              
                      <Text style={styles.reportTitle}>JUNIOR HIGH PROGRESS REPORT</Text>
                    </View>

                    <View style={styles.studentInfo}>
                      <View style={{ display: 'flex', flexDirection: "row", gap: 14}}>
                        <Text>Name: <Text style={{fontWeight: "bold"}}>{student.firstName} {student.middleName} {student.lastName}</Text></Text>
                        <Text>ID: <Text style={{fontWeight: "bold"}}>{student.id}</Text></Text>
                      </View>

                      <View style={{flexDirection: "row", gap: 78}}>

                        <Text>Class: <Text style={{fontWeight: "bold"}}>{student.class}</Text></Text>
                        <Text>Academic Year: <Text style={{ fontWeight: "bold" }}>{student.academicYear || '2024/2025'}

                        </Text>
                        </Text>
                      </View>
                    </View>

                    <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 10, textAlign: "center", marginTop: 15 }}>PARENTS OR GUARDIANS</Text>
                  
                    <Text style={{ fontSize: 10, marginBottom: 12, textAlign: "justify", fontStyle: "italic" }}>
                      Please sign below as evidence that you have examined this report
                      with possible recommendation or invitation to your son(s) or
                      daughter(s) as this instrument could shape your child's destiny.
                    </Text>

                    {/* Signature table */}
                    <View style={{ borderWidth: 1, borderColor: '#000', marginBottom: 6 }}>
                      <View style={{
                        flexDirection: 'row', backgroundColor: '#f0f0f0', fontSize: 14, fontWeight: "bold"
                      }}>
                        <Text style={{ flex: 2, padding: 3, borderRight: 0.5, borderRightColor: '#000', textAlign: 'center', fontSize: 8 }}>Parent</Text>
                        <Text style={{ flex: 3, padding: 3, borderRight: 0.5, borderRightColor: '#000', textAlign: 'center', fontSize: 8 }}>Class Teacher</Text>
                        <Text style={{ flex: 3, padding: 3, textAlign: 'center', fontSize: 8 }}>Parent/Guardian</Text>
                      </View>
                      {["1st ", "2nd ", "3rd ", "4th ", "5th ", "6th "].map((row) => (
                        <View key={row} style={{ flexDirection: 'row', minHeight: 15 }}>
                          <Text style={{ flex: 2, padding: 3, borderRight: 0.5, borderRightColor: '#000', borderTop: 0.5, borderTopColor: '#000', textAlign: "center", fontSize: 10, color: "royalblue" }}>{row}</Text>
                          <Text style={{ flex: 3, padding: 3, borderRight: 0.5, borderRightColor: '#000', borderTop: 0.5, borderTopColor: '#000' }}></Text>
                          <Text style={{ flex: 3, padding: 3, borderTop: 0.5, borderTopColor: '#000' }}></Text>
                        </View>
                      ))}
                    </View>

                    <View style={styles.noteSection}>
                      <Text style={{ fontWeight: 'bold', marginBottom: 5, fontSize: 12, textAlign: "center" }}>Note:</Text>
                      <Text style={{
                        textAlign: "justify",
                        fontSize: 10,
                        fontStyle: "italic"
                      }}>
                        When a student mark is 69 or below in any subject the parent or
                        guardian should give special attention to see that the student
                        does well in all the work required by the teacher, otherwise the
                        student will probably <Text style={{ fontWeight: "bold" }}>REPEAT THE CLASS.</Text>
                      </Text>
                    </View>
                  </View>
                </View>
              </Page>
            </React.Fragment>
          );
        })}
      </Document>
    </PDFViewer>
  );
}

export default ReportCard;