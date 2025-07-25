"use client"
import React from 'react';
import { Document, Page, PDFViewer, Text, View, StyleSheet } from '@react-pdf/renderer';
import styles from './styles';


const subjects = [
  { name: "Mathematics", scores: { ca1: 65, ca2: 78, ca3: 82, exam: 75, average: 80 } },
  { name: "English", scores: { ca1: 88, ca2: 85, ca3: 90, exam: 82, average: 86 } },
  { name: "Vocubulary", scores: { ca1: 75, ca2: 80, ca3: 78, exam: 85, average: 80 } },
  { name: "French", scores: { ca1: 70, ca2: 72, ca3: 75, exam: 78, average: 74 } },
  { name: "Arabic", scores: { ca1: 82, ca2: 85, ca3: 80, exam: 88, average: 84 } },
  { name: "Science", scores: { ca1: 90, ca2: 88, ca3: 85, exam: 92, average: 89 } },
  { name: "Social Science", scores: { ca1: 78, ca2: 75, ca3: 80, exam: 82, average: 79 } },
  { name: "Religious Studies", scores: { ca1: 85, ca2: 88, ca3: 90, exam: 87, average: 88 } },
  { name: "Computer", scores: { ca1: 92, ca2: 90, ca3: 88, exam: 95, average: 91 } },
  { name: "Physical Education", scores: { ca1: 85, ca2: 82, ca3: 88, exam: 90, average: 86 } },
  { name: "Arts", scores: { ca1: 80, ca2: 85, ca3: 78, exam: 82, average: 81 } },
  { name: "Music", scores: { ca1: 75, ca2: 78, ca3: 80, exam: 85, average: 80 } },
  { name: "Geography", scores: { ca1: 88, ca2: 85, ca3: 82, exam: 90, average: 86 } },
  { name: "History", scores: { ca1: 82, ca2: 80, ca3: 85, exam: 88, average: 84 } },
];

const demoStudent = {
  firstName: "Amos",
  middleName: "",
  lastName: "Senkao",
  grade: "7th Grade",
  academicYear: "2024/2025"
};

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

const ReportCard = ({ students }) => (
  <PDFViewer className='w-full h-screen'>
    <Document>
      {/* First Page - Grades */}
      <Page size="A4" orientation="landscape" style={styles.page}>
        {/* Header */}
        <View style={styles.topRow}>
          <View style={styles.headerLeft}>
            <Text style={{fontWeight: "bold"}}>Name: {demoStudent.firstName} {demoStudent.middleName} {demoStudent.lastName}</Text>
            <Text>Class: {demoStudent.grade}</Text>
            <Text>ID: UCA2025023</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={{fontWeight: "bold", opacity: "0"}}>Academic Year: {demoStudent.academicYear}</Text>
            <Text style={{ fontWeight: "bold", opacity: "0" }}>Academic Year: {demoStudent.academicYear}</Text>
            <Text style={{fontWeight: "bold", opacity: "0"}}>Academic Year: {demoStudent.academicYear}</Text>
            <Text style={{fontWeight: "bold"}}>Academic Year: {demoStudent.academicYear}</Text>
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
                <Text style={gradeStyle(subject.scores.ca1)}>{subject.scores.ca1}</Text>
                <Text style={gradeStyle(subject.scores.ca2)}>{subject.scores.ca2}</Text>
                <Text style={gradeStyle(subject.scores.ca3)}>{subject.scores.ca3}</Text>
                <Text style={gradeStyle(subject.scores.exam)}>{subject.scores.exam}</Text>
                <Text style={gradeStyle(subject.scores.average)}>{subject.scores.average}</Text>
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
                <Text style={gradeStyle(subject.scores.ca1 - 2)}>{subject.scores.ca1 - 2}</Text>
                <Text style={gradeStyle(subject.scores.ca2 - 1)}>{subject.scores.ca2 - 1}</Text>
                <Text style={gradeStyle(subject.scores.ca3 + 1)}>{subject.scores.ca3 + 1}</Text>
                <Text style={gradeStyle(subject.scores.exam - 3)}>{subject.scores.exam - 3}</Text>
                <Text style={gradeStyle(subject.scores.average - 1)}>{subject.scores.average - 1}</Text>
                <Text style={gradeStyle(subject.scores.average)}>{subject.scores.average}</Text>
                
              </View>
            ))}
          </View>
        </View>

        {/* Bottom Section */}
        <View style={styles.bottomSection}>
          <View style={styles.leftBottom}>
            <View style={styles.gradingMethod}>
              <Text style={styles.gradingTitle}>METHOD OF GRADING</Text>
              <Text style={styles.gradingText}>A+ = 95 - 100 Excellent</Text>
              <Text style={styles.gradingText}>A = 90 - 94 Very Good</Text>
              <Text style={styles.gradingText}>B = 80 - 89 Very Good</Text>
              <Text style={styles.gradingText}>C = 70 - 79 Good</Text>
              <Text style={styles.gradingText}>D = 60 - 69 Fair</Text>
              <Text style={styles.gradingText}>F = Below 60 Fail</Text>
            </View>
          </View>
          
          <View style={styles.rightBottom}>
            <Text style={styles.promotionText}>
              Yearly Average below 70 will not be eligible for promotion.
            </Text>
            
            <View style={styles.signatureSection}>
              <Text>Teachers Remark</Text>
              <Text style={{ marginTop: 20 }}>Signed: _________________</Text>
              <Text style={{ marginTop: 10 }}>Class Sponsor</Text>
            </View>
          </View>
        </View>
      </Page>

      {/* Second Page - School Info and Parent Section */}
      <Page size="A4" orientation="landscape" style={styles.page}>
        {/* Two Column Container */}
        <View style={styles.pageTwoContainer}>
          
          {/* Left Column - Promotion Statement */}
          <View style={{ flex: 1, marginRight: 10, borderWidth: 1, borderColor: '#000', padding: 10 }}>
            <Text style={styles.parentsSectionTitle}>PARENTS OR GUARDIANS - PLEASE READ</Text>
            
            <Text style={{ fontSize: 8, marginBottom: 10 }}>
              This report will be periodically for your inspection. It is a pupil 
              progress report by which pupils' work could result in lack 
              of study, irregular attendance or something that could be 
              connected, special attention should be paid to ensure that the 
              child improves. Moreover, parent conferences with parent(s) or 
              guardians are encouraged, and it will serve to secure the best 
              co-operation for your child.
            </Text>

            <Text style={{ fontSize: 10, fontWeight: 'bold', marginBottom: 10 }}>Promotion Statement</Text>
            
            <Text style={{ fontSize: 8, marginBottom: 15 }}>
              This is to certify that {demoStudent.firstName} {demoStudent.middleName} {demoStudent.lastName} has satisfactorily 
              completed the work of 7th Grade and is promoted to 8th grade 
              for Academic Year 2025/2026.
            </Text>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
              <Text>Date: ____________________</Text>
              <Text>Principal: __________________</Text>
            </View>

            {/* QR Code placeholder */}
            <View style={{
              width: 80,
              height: 80,
              backgroundColor: '#e2e8f0',
              alignSelf: 'center',
              marginTop: 30,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#000'
            }}>
              <Text style={{ fontSize: 8, textAlign: 'center' }}>QR CODE{'\n'}PLACEHOLDER</Text>
            </View>

          </View>

          {/* Right Column - School Information */}
          <View style={{ flex: 1, marginLeft: 10, borderWidth: 1, borderColor: '#000', padding: 10 }}>
            <View style={styles.schoolHeader}>
              {/* School Avatar/Logo placeholder */}
              <View style={{
                width: 60,
                height: 60,
                backgroundColor: '#4a5568',
                borderRadius: 30,
                alignSelf: 'center',
                marginBottom: 10,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>UCA</Text>
              </View>
              
              <Text style={styles.schoolName}>UPSTAIRS CHRISTIAN ACADEMY</Text>
              <Text style={styles.schoolDetails}>Monrovia - Central Monrovia, 15th Street</Text>
              <Text style={styles.schoolDetails}>P.O Box 3453 Monrovia-10, Liberia</Text>
              <Text style={styles.schoolDetails}>Email: upstairschristianacademy11@gmail.com</Text>
              <Text style={styles.reportTitle}>JUNIOR HIGH PROGRESS REPORT</Text>
            </View>

            <View style={styles.studentInfo}>
              <Text>Name: {demoStudent.firstName} {demoStudent.middleName} {demoStudent.lastName} ID: UCA2022015</Text>
              <Text>Class: {demoStudent.grade} Academic Year: {demoStudent.academicYear}</Text>
            </View>

            <Text style={{ fontSize: 10, fontWeight: 'bold', marginBottom: 10 }}>PARENTS OR GUARDIANS</Text>
            
            <Text style={{ fontSize: 8, marginBottom: 10 }}>
              Please sign below as evidence that you have examined this report 
              with possible recommendation or invitation to your son(s) or 
              daughter(s) as this instrument could shape your child's destiny.
            </Text>

            {/* Signature table */}
            <View style={{ borderWidth: 1, borderColor: '#000', marginBottom: 15 }}>
              <View style={{ flexDirection: 'row', backgroundColor: '#f0f0f0' }}>
                <Text style={{ flex: 1, padding: 3, borderRight: 0.5, borderRightColor: '#000', textAlign: 'center', fontSize: 8 }}>Parent</Text>
                <Text style={{ flex: 1, padding: 3, borderRight: 0.5, borderRightColor: '#000', textAlign: 'center', fontSize: 8 }}>Class Teacher</Text>
                <Text style={{ flex: 1, padding: 3, textAlign: 'center', fontSize: 8 }}>Parent/Guardian</Text>
              </View>
              {[1, 2, 3].map((row) => (
                <View key={row} style={{ flexDirection: 'row', minHeight: 15 }}>
                  <Text style={{ flex: 1, padding: 3, borderRight: 0.5, borderRightColor: '#000', borderTop: 0.5, borderTopColor: '#000' }}></Text>
                  <Text style={{ flex: 1, padding: 3, borderRight: 0.5, borderRightColor: '#000', borderTop: 0.5, borderTopColor: '#000' }}></Text>
                  <Text style={{ flex: 1, padding: 3, borderTop: 0.5, borderTopColor: '#000' }}></Text>
                </View>
              ))}
            </View>

            <View style={styles.noteSection}>
              <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Note:</Text>
              <Text>
                When a student mark is 69 or below in any subject the parent or 
                guardian should give special attention to see that the student 
                does well in all the work required by the teacher, otherwise the 
                student will probably REPEAT THE GRADE.
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  </PDFViewer>
);

export default ReportCard;


