import { StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 20,
    fontSize: 8,
  },
  
  // Header section
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingBottom: 5,
    borderBottom: 1,
    borderBottomColor: '#000',
  },
  
  headerLeft: {
    flexDirection: 'column',
  },
  
  headerRight: {
    flexDirection: 'column',
    alignItems: 'flex-end',
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
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderBottom: 1,
    borderBottomColor: '#000',
  },
  
  tableRow: {
    flexDirection: 'row',
    borderBottom: 0.5,
    borderBottomColor: '#000',
    minHeight: 12,
  },
  
  tableCell: {
    flex: 1,
    padding: 2,
    borderRight: 0.5,
    borderRightColor: '#000',
    textAlign: 'center',
    fontSize: 7,
  },
  
  subjectCell: {
    flex: 2,
    padding: 2,
    borderRight: 0.5,
    borderRightColor: '#000',
    textAlign: 'left',
    fontSize: 7,
  },
  
  lastCell: {
    flex: 1,
    padding: 2,
    textAlign: 'center',
    fontSize: 7,
  },
  
  // Bottom section
  bottomSection: {
    flexDirection: 'row',
    marginTop: 10,
  },
  
  leftBottom: {
    flex: 1,
    marginRight: 10,
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
    fontSize: 6,
    marginBottom: 2,
  },
  
  promotionText: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 8,
  },
  
  signatureSection: {
    marginTop: 20,
    textAlign: 'center',
  },
  
  // Second page styles
  schoolHeader: {
    textAlign: 'center',
    marginBottom: 20,
  },
  
  schoolName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  
  schoolDetails: {
    fontSize: 10,
    marginBottom: 2,
  },
  
  reportTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
  },
  
  studentInfo: {
    marginBottom: 15,
    fontSize: 10,
  },
  
  parentsSection: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
  },
  
  parentsSectionTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  
  noteSection: {
    marginTop: 15,
    fontSize: 8,
  },
});

export default styles;