"use client"
import React, { useState } from 'react';
import { Document, Page, PDFViewer, Text, View, Image } from '@react-pdf/renderer';

// Styles for the PDF
const styles = {
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 15,
    fontSize: 9
  },
  schoolHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    borderBottom: 2,
    borderBottomColor: '#000',
    paddingBottom: 10
  },
  schoolInfo: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1
  },
  schoolName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 3
  },
  schoolDetails: {
    fontSize: 8,
    textAlign: 'center',
    marginBottom: 1
  },
  reportTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 8,
    color: '#1a365d'
  },
  teacherSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    padding: 8,
    backgroundColor: '#f7fafc',
    borderWidth: 1,
    borderColor: '#000'
  },
  teacherInfo: {
    fontSize: 10,
    fontWeight: 'bold'
  },
  table: {
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 15
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#2d3748',
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 7,
    minHeight: 30
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: 1,
    borderBottomColor: '#000',
    minHeight: 20
  },
  noCell: {
    width: 25,
    padding: 3,
    borderRight: 1,
    borderRightColor: '#000',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 7
  },
  studentNameCell: {
    width: 100,
    padding: 3,
    borderRight: 1,
    borderRightColor: '#000',
    justifyContent: 'center',
    fontSize: 7
  },
  gradeCell: {
    width: 40,
    padding: 3,
    borderRight: 1,
    borderRightColor: '#000',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 7
  },
  headerCell: {
    padding: 3,
    borderRight: 1,
    borderRightColor: '#ffffff',
    textAlign: 'center',
    justifyContent: 'center'
  },
  footer: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  gradingScale: {
    flex: 1,
    marginRight: 20
  },
  gradingTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
    fontSize: 10
  },
  gradingText: {
    fontSize: 8,
    marginBottom: 1
  },
  signature: {
    flex: 1,
    alignItems: 'flex-end'
  }
};

const sampleStudents = Array.from({ length: 50 }, (_, i) => ({
  name: `Student ${i + 1}`,
  id: `UCA2025${(i + 1).toString().padStart(3, '0')}`,
  grades: {
    p1: i % 10 === 0 ? null : 65 + Math.floor(Math.random() * 35),
    p2: 65 + Math.floor(Math.random() * 35),
    p3: 65 + Math.floor(Math.random() * 35),
    exam1: 65 + Math.floor(Math.random() * 35),
    sem1Avg: 65 + Math.floor(Math.random() * 35),
    p4: 65 + Math.floor(Math.random() * 35),
    p5: 65 + Math.floor(Math.random() * 35),
    p6: 65 + Math.floor(Math.random() * 35),
    exam2: 65 + Math.floor(Math.random() * 35),
    sem2Avg: 65 + Math.floor(Math.random() * 35),
    yearlyAvg: i % 11 === 0 ? null : 65 + Math.floor(Math.random() * 35)
  }
}));

function gradeStyle(score) {
  if (score === null || score === undefined) {
    return {
      ...styles.gradeCell,
      backgroundColor: '#ffeb3b',
      color: '#d32f2f',
      fontWeight: 'bold'
    };
  }
  return {
    ...styles.gradeCell,
    color: Number(score) < 70 ? "red" : "blue"
  };
}

// Helper function to calculate statistics for each period
function calculatePeriodStats(students, periods) {
  const stats = {
    incompletes: {},
    pass: {},
    fail: {},
    average: {}
  };

  periods.forEach(period => {
    const grades = students.map(s => s.grades[period]).filter(g => g !== null && g !== undefined);
    const incompleteCount = students.filter(s => s.grades[period] === null || s.grades[period] === undefined).length;
    const passCount = grades.filter(g => g >= 70).length; // Changed from 50 to 70
    const failCount = grades.filter(g => g < 70).length;   // Changed from 50 to 70
    const average = grades.length > 0 ? (grades.reduce((a, b) => a + b, 0) / grades.length).toFixed(1) : 'N/A';

    stats.incompletes[period] = incompleteCount;
    stats.pass[period] = passCount;
    stats.fail[period] = failCount;
    stats.average[period] = average;
  });

  return stats;
}

function MasterGradeSheet() {
  const [teacherName] = useState("Ms. Johnson");
  const [subject] = useState("Mathematics");
  const [className] = useState("Grade 7A");
  const [academicYear] = useState("2024/2025");
  // const teacherName = "Amos Senkao";
  // const className = "9th Grade";
  // const subject = "Computer";
  // const academicYear = "2024/2025"

  const studentsPerPage = 25;
  const paginatedStudents = [];

  for (let i = 0; i < sampleStudents.length; i += studentsPerPage) {
    paginatedStudents.push(sampleStudents.slice(i, i + studentsPerPage));
  }

  const periods = ['p1','p2','p3','exam1','sem1Avg','p4','p5','p6','exam2','sem2Avg','yearlyAvg'];
  const stats = calculatePeriodStats(sampleStudents, periods);

  return (
    <div className="w-full h-screen bg-gray-100">
      <PDFViewer className="w-full h-screen">
        <Document title={`Master Grade Sheet - ${subject} - ${className}`}>
          {paginatedStudents.map((studentsChunk, pageIndex) => {
            const isLastPage = pageIndex === paginatedStudents.length - 1;

            return (
              <Page key={pageIndex} size="A4" style={styles.page}>
                {/* Watermark */}
                <View style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  opacity: 0.05,
                  zIndex: -1
                }}>
                  <Image 
                    src="https://res.cloudinary.com/dcalueltd/image/upload/v1753368074/school-management-system/uca/Logo.png" 
                    style={{ width: 300, height: 300 }}
                  />
                </View>

                {/* Header */}
                <View style={styles.schoolHeader}>
                  <View style={{ width: 50, marginRight: 5 }}>
                    <Image 
                      src="https://res.cloudinary.com/dcalueltd/image/upload/v1753484515/uca_logo2_kqlgdl.png" 
                      style={{ width: 50, height: 50 }}
                    />
                  </View>
                  <View style={styles.schoolInfo}>
                    <Text style={styles.schoolName}>UPSTAIRS CHRISTIAN ACADEMY</Text>
                    <Text style={styles.schoolDetails}>Daycare, Nursery, Kindergarten, Elem, Junior & Senior High</Text>
                    <Text style={styles.schoolDetails}>Unity Town, Pipeline Road, Lower Johnsonville</Text>
                    <Text style={styles.schoolDetails}>P.O Box 2523 Montserrado County-Liberia</Text>
                    <Text style={styles.schoolDetails}>Email: ucacademy2011@gmail.com</Text>
                    <Text style={styles.schoolDetails}>Website: www.uca.con.lr</Text>
                    <Text style={styles.reportTitle}>MASTER GRADE SHEET</Text>
                  </View>
                  <View style={{ width: 50, marginLeft: 5 }}>
                    <Image 
                      src="https://res.cloudinary.com/dcalueltd/image/upload/v1753368074/school-management-system/uca/Logo.png" 
                      style={{ width: 50, height: 50 }}
                    />
                  </View>
                </View>

                {/* Teacher Info */}
                <View style={styles.teacherSection}>
                  <Text style={styles.teacherInfo}>Teacher: {teacherName}</Text>
                  <Text style={styles.teacherInfo}>Subject: {subject}</Text>
                  <Text style={styles.teacherInfo}>Class: {className}</Text>
                  <Text style={styles.teacherInfo}>Academic Year: {academicYear}</Text>
                  <Text style={styles.teacherInfo}>Page: {pageIndex + 1} of {paginatedStudents.length}</Text>
                </View>

                {/* Grade Table */}
                <View style={styles.table}>
                  {/* Table Header */}
                  <View style={styles.tableHeader}>
                    <View style={[styles.headerCell, { width: 25 }]}><Text>No.</Text></View>
                    <View style={[styles.headerCell, { width: 100 }]}><Text>Student Name</Text></View>
                    {["1st Pd", "2nd Pd", "3rd Pd", "Exam", "Average", "4th Pd", "5th Pd", "6th Pd", "Exam", "Average", "Yearly\nAverage"].map((label, i) => (
                      <View key={i} style={[styles.headerCell, { width: i === 4 || i === 9 || i === 10 ? 45 : 40 }]}>
                        <Text>{label}</Text>
                      </View>
                    ))}
                  </View>

                  {/* Student Rows */}
                  {studentsChunk.map((student, idx) => {
                    const no = pageIndex * studentsPerPage + idx + 1;
                    return (
                      <View key={no} style={styles.tableRow}>
                        <View style={styles.noCell}><Text>{no}</Text></View>
                        <View style={styles.studentNameCell}>
                          <Text>{student.name}</Text>
                          <Text style={{ fontSize: 6, color: '#666' }}>ID: {student.id}</Text>
                        </View>
                        {periods.map((key, i) => (
                          <Text key={key} style={{
                            ...(i === 4 || i === 9 || i === 10 ? { 
                              ...gradeStyle(student.grades[key]), 
                              width: 45, 
                              fontWeight: 'bold',
                              backgroundColor: key === 'yearlyAvg' ? '#f0f8ff' : (student.grades[key] === null || student.grades[key] === undefined ? '#ffeb3b' : undefined)
                            } : {
                              ...gradeStyle(student.grades[key]),
                              backgroundColor: student.grades[key] === null || student.grades[key] === undefined ? '#ffeb3b' : undefined
                            })
                          }}>
                            {student.grades[key] ?? 'INC'}
                          </Text>
                        ))}
                      </View>
                    );
                  })}

                  {/* Empty rows if needed */}
                  {Array.from({ length: studentsPerPage - studentsChunk.length }, (_, idx) => (
                    <View key={`empty-${pageIndex}-${idx}`} style={styles.tableRow}>
                      <View style={styles.noCell}></View>
                      <View style={styles.studentNameCell}></View>
                      {[...Array(11)].map((_, i) => (
                        <Text key={i} style={i === 4 || i === 9 || i === 10 ? { ...styles.gradeCell, width: 45 } : styles.gradeCell}></Text>
                      ))}
                    </View>
                  ))}

                  {/* Only on last page: Summary rows */}
                  {isLastPage && (
                    <>
                      {/* Incompletes */}
                      <View style={[styles.tableRow, { backgroundColor: '#fed7d7' }]}>
                        <View style={styles.noCell}><Text></Text></View>
                        <View style={styles.studentNameCell}><Text style={{ fontWeight: 'bold' }}>Incompletes</Text></View>
                        {periods.map((period, i) => (
                          <Text key={period} style={{
                            ...styles.gradeCell,
                            width: (i === 4 || i === 9 || i === 10) ? 45 : 40,
                            fontWeight: 'bold',
                            textAlign: 'center'
                          }}>
                            {stats.incompletes[period]}
                          </Text>
                        ))}
                      </View>

                      {/* Pass */}
                      <View style={[styles.tableRow, { backgroundColor: '#d4edda' }]}>
                        <View style={styles.noCell}><Text></Text></View>
                        <View style={styles.studentNameCell}><Text style={{ fontWeight: 'bold' }}>Pass</Text></View>
                        {periods.map((period, i) => (
                          <Text key={period} style={{
                            ...styles.gradeCell,
                            width: (i === 4 || i === 9 || i === 10) ? 45 : 40,
                            fontWeight: 'bold',
                            textAlign: 'center'
                          }}>
                            {stats.pass[period]}
                          </Text>
                        ))}
                      </View>

                      {/* Fail */}
                      <View style={[styles.tableRow, { backgroundColor: '#f8d7da' }]}>
                        <View style={styles.noCell}><Text></Text></View>
                        <View style={styles.studentNameCell}><Text style={{ fontWeight: 'bold' }}>Fail</Text></View>
                        {periods.map((period, i) => (
                          <Text key={period} style={{
                            ...styles.gradeCell,
                            width: (i === 4 || i === 9 || i === 10) ? 45 : 40,
                            fontWeight: 'bold',
                            textAlign: 'center'
                          }}>
                            {stats.fail[period]}
                          </Text>
                        ))}
                      </View>

                      {/* Class Average */}
                      <View style={[styles.tableRow, { backgroundColor: '#e2e3e5' }]}>
                        <View style={styles.noCell}><Text></Text></View>
                        <View style={styles.studentNameCell}><Text style={{ fontWeight: 'bold' }}>Class Average</Text></View>
                        {periods.map((period, i) => (
                          <Text key={period} style={{
                            ...styles.gradeCell,
                            width: (i === 4 || i === 9 || i === 10) ? 45 : 40,
                            fontWeight: 'bold',
                            textAlign: 'center'
                          }}>
                            {stats.average[period]}
                          </Text>
                        ))}
                      </View>
                    </>
                  )}
                </View>
              </Page>
            );
          })}
        </Document>
      </PDFViewer>
    </div>
  );
}

export default MasterGradeSheet;