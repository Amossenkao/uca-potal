import React from 'react';
import { Document, Page, PDFViewer, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 25,
    fontSize: 12,
  },
  
  // Header section
  topRow: {
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 20,
    borderBottom: 1,
    borderBottomColor: '#787',
    overflow: "hidden",
  },
  
  headerLeft: {
    flexDirection: 'column',
    width: 700,
    gap: 6,
    paddingBottom: 4,
  },
  
  headerRight: {
    flexDirection: 'column',
    width: 700,
    paddingLeft: 120,
  },
  
  // Main grades section
  gradesContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#000',
    gap: 40
  },
  
  semester: {
    flex: 1,
    borderRight: 1,
    borderRightColor: '#000',
  },
  
  lastSemester: {
    flex: 1,
    borderLeft: 1,
  },
  
  semesterHeader: {
    backgroundColor: '#f0f0f0',
    padding: 5,
    textAlign: 'center',
    borderBottom: 1,
    borderBottomColor: '#000',
    fontWeight: 'bold',
  },

  // Table styles
  subjectCell: {
    flex: 2,
    padding: 2,
    borderRight: 0.5,
    borderRightColor: '#000',
    textAlign: 'left',
    fontSize: 8,
    fontWeight: "bold"
  },
  
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderBottom: 1,
    borderBottomColor: '#000',
    fontSize: 14,
    fontWeight: "bold",
  },
  
  tableRow: {
    flexDirection: 'row',
    borderBottom: 0.5,
    borderBottomColor: '#000',
    height: 16,
    fontSize: 12,
  },
  
  tableCell: {
    flex: 1,
    padding: 2,
    borderRight: 0.5,
    borderRightColor: '#000',
    textAlign: 'center',
    fontSize: 8,
  },
  
  lastCell: {
    flex: 1,
    padding: 2,
    textAlign: 'center',
    fontSize: 8,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center"
  },
  
  // Bottom section
  bottomSection: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: "space-around"
  },
  
  leftBottom: {
    flex: 1,
    marginRight: 40,
  },
  
  rightBottom: {
    flex: 1,
  },
  
  gradingMethod: {
    marginBottom: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: '#000',
  },
  
  gradingTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  
  gradingText: {
    fontSize: 10,
    marginBottom: 2,
  },
  
  promotionText: {
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 10,
    paddingLeft: 50,
  },
  
  signatureSection: {
    marginTop: 20,
    paddingLeft: 50,
  },
  
  // Second page styles
  pageTwoContainer: {
    flexDirection: "row",
    height: "100%",
    gap: 25,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  schoolHeader: {
    textAlign: 'center',
    marginBottom: 20,
  },

  schoolName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 10
  },
  
  schoolDetails: {
    fontSize: 10,
    marginBottom: 2,
    top: -75
  },
  
  reportTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: -110,
  },
  
  studentInfo: {
    marginBottom: 15,
    fontSize: 12,
    gap: 4,
    paddingLeft: 20
  },
  
  parentsSection: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#000',
  },
  
  parentsSectionTitle: {
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  
  noteSection: {
    marginTop: 15,
    fontSize: 8,
  },
});

function gradeStyle(score) {
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

// Sample data for students
const sampleStudents = [
  {
    id: "UCA2025001",
    firstName: "John",
    middleName: "Michael",
    lastName: "Smith",
    class: "Grade 7",
    grade: "7th Grade",
    nextGrade: "8th Grade",
    academicYear: "2024/2025",
    nextAcademicYear: "2025/2026",
    sponsor: "Mrs. Johnson"
  },
  {
    id: "UCA2025002",
    firstName: "Sarah",
    middleName: "Elizabeth",
    lastName: "Williams",
    class: "Grade 8",
    grade: "8th Grade",
    nextGrade: "9th Grade",
    academicYear: "2024/2025",
    nextAcademicYear: "2025/2026",
    sponsor: "Mr. Davis"
  },
  {
    id: "UCA2025003",
    firstName: "David",
    middleName: "James",
    lastName: "Brown",
    class: "Grade 9",
    grade: "9th Grade",
    nextGrade: "10th Grade",
    academicYear: "2024/2025",
    nextAcademicYear: "2025/2026",
    sponsor: "Ms. Wilson"
  },
  {
    id: "UCA2025004",
    firstName: "Emily",
    middleName: "Rose",
    lastName: "Johnson",
    class: "Grade 7",
    grade: "7th Grade",
    nextGrade: "8th Grade",
    academicYear: "2024/2025",
    nextAcademicYear: "2025/2026",
    sponsor: "Mrs. Anderson"
  },
  {
    id: "UCA2025005",
    firstName: "Michael",
    middleName: "Alexander",
    lastName: "Davis",
    class: "Grade 8",
    grade: "8th Grade",
    nextGrade: "9th Grade",
    academicYear: "2024/2025",
    nextAcademicYear: "2025/2026",
    sponsor: "Mr. Thompson"
  }
];

// Sample subjects data generator
const generateSampleSubjects = () => {
  const subjectNames = [
    "Mathematics", "Health Science", "English", "General Science", "Civics", 
    "Geography", "Literature", "Vocabulary", "Computer", "Phonics",
    "Agriculture", "Bible", "French", "History"
  ];
  
  const subjects = subjectNames.map(name => {
    // Generate more realistic grades with some variation
    const generateGrade = () => Math.floor(Math.random() * 55) + 45; // 45-100
    
    return {
      name,
      firstSemester: {
        ca1: generateGrade(),
        ca2: generateGrade(),
        ca3: generateGrade(),
        exam: generateGrade(),
        average: generateGrade()
      },
      secondSemester: {
        ca1: generateGrade(),
        ca2: generateGrade(),
        ca3: generateGrade(),
        exam: generateGrade(),
        average: generateGrade()
      },
      yearlyAverage: generateGrade()
    };
  });

  // Calculate averages for each period
  const calculatePeriodAverage = (subjects, semester, period) => {
    const total = subjects.reduce((sum, subject) => sum + subject[semester][period], 0);
    return Math.round(total / subjects.length);
  };

  // Calculate ranks (1-based ranking, lower is better)
  const calculateRank = () => Math.floor(Math.random() * 50) + 1; // 1-50

  // Add Average and Rank rows
  const averageRow = {
    name: "Average",
    firstSemester: {
      ca1: calculatePeriodAverage(subjects, 'firstSemester', 'ca1'),
      ca2: calculatePeriodAverage(subjects, 'firstSemester', 'ca2'),
      ca3: calculatePeriodAverage(subjects, 'firstSemester', 'ca3'),
      exam: calculatePeriodAverage(subjects, 'firstSemester', 'exam'),
      average: calculatePeriodAverage(subjects, 'firstSemester', 'average')
    },
    secondSemester: {
      ca1: calculatePeriodAverage(subjects, 'secondSemester', 'ca1'),
      ca2: calculatePeriodAverage(subjects, 'secondSemester', 'ca2'),
      ca3: calculatePeriodAverage(subjects, 'secondSemester', 'ca3'),
      exam: calculatePeriodAverage(subjects, 'secondSemester', 'exam'),
      average: calculatePeriodAverage(subjects, 'secondSemester', 'average')
    },
    yearlyAverage: Math.round((subjects.reduce((sum, subject) => sum + subject.yearlyAverage, 0)) / subjects.length)
  };

  const rankRow = {
    name: "Rank",
    firstSemester: {
      ca1: calculateRank(),
      ca2: calculateRank(),
      ca3: calculateRank(),
      exam: calculateRank(),
      average: calculateRank()
    },
    secondSemester: {
      ca1: calculateRank(),
      ca2: calculateRank(),
      ca3: calculateRank(),
      exam: calculateRank(),
      average: calculateRank()
    },
    yearlyAverage: calculateRank()
  };

  return [...subjects, averageRow, rankRow];
};

function YearlyReports() {
  // Generate report cards for all students
  const generateReportPages = () => {
    const pages = [];
    
    sampleStudents.forEach((student) => {
      const subjects = generateSampleSubjects();
      
      // First Page - Grades
      pages.push(
        <Page key={`${student.id}-grades`} size="A4" orientation="landscape" style={styles.page}>
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
      );

      // Second Page - School Info and Parent Section
      pages.push(
        <Page key={`${student.id}-info`} size="A4" orientation="landscape" style={styles.page}>
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
                  <Text>Academic Year: <Text style={{ fontWeight: "bold" }}>{student.academicYear || '2024/2025'}</Text></Text>
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
      );
    });
    
    return pages;
  };

  return (
    <div className="w-full h-screen">
      <PDFViewer className='w-full h-full'>
        <Document>
          {generateReportPages()}
        </Document>
      </PDFViewer>
    </div>
  );
}

export default YearlyReports;