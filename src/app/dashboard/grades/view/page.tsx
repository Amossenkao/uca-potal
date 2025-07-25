"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Download, Printer, BarChart3, FileSpreadsheet } from "lucide-react";

// Mock grade data
const GRADES_DATA = [
  {
    studentId: "STD001",
    studentName: "John Doe",
    class: "Grade 10A",
    subject: "Mathematics",
    term: "Term 1",
    test1: 85,
    test2: 78,
    assignment: 92,
    exam: 88,
    total: 85.5,
    grade: "A",
    teacherComment: "Excellent work. Shows great understanding of concepts.",
    submissionStatus: "approved"
  },
  {
    studentId: "STD002",
    studentName: "Jane Smith",
    class: "Grade 10A",
    subject: "Mathematics",
    term: "Term 1",
    test1: 72,
    test2: 68,
    assignment: 85,
    exam: 75,
    total: 74.2,
    grade: "B",
    teacherComment: "Good effort. Needs more practice with complex problems.",
    submissionStatus: "approved"
  },
  {
    studentId: "STD003",
    studentName: "Michael Johnson",
    class: "Grade 10B",
    subject: "Mathematics",
    term: "Term 1",
    test1: 90,
    test2: 92,
    assignment: 95,
    exam: 94,
    total: 93.1,
    grade: "A+",
    teacherComment: "Outstanding performance. Consistently excellent work.",
    submissionStatus: "approved"
  },
  {
    studentId: "STD004",
    studentName: "Emily Brown",
    class: "Grade 9A",
    subject: "Science",
    term: "Term 1",
    test1: 65,
    test2: 70,
    assignment: 80,
    exam: 72,
    total: 71.8,
    grade: "B-",
    teacherComment: "Satisfactory work. Needs to focus more on theory questions.",
    submissionStatus: "pending"
  },
  {
    studentId: "STD005",
    studentName: "David Wilson",
    class: "Grade 9B",
    subject: "Science",
    term: "Term 1",
    test1: 58,
    test2: 60,
    assignment: 70,
    exam: 62,
    total: 62.4,
    grade: "C+",
    teacherComment: "Making progress but needs more consistent study habits.",
    submissionStatus: "pending"
  },
  {
    studentId: "STD006",
    studentName: "Sophia Martinez",
    class: "Grade 11A",
    subject: "History",
    term: "Term 1",
    test1: 88,
    test2: 92,
    assignment: 95,
    exam: 90,
    total: 91.3,
    grade: "A+",
    teacherComment: "Excellent analysis and research skills. Well done!",
    submissionStatus: "approved"
  },
  {
    studentId: "STD007",
    studentName: "Ethan Taylor",
    class: "Grade 11B",
    subject: "English",
    term: "Term 1",
    test1: 75,
    test2: 80,
    assignment: 85,
    exam: 78,
    total: 79.5,
    grade: "B+",
    teacherComment: "Good writing skills. Needs improvement in critical analysis.",
    submissionStatus: "approved"
  },
  {
    studentId: "STD008",
    studentName: "Olivia Anderson",
    class: "Grade 12A",
    subject: "Physics",
    term: "Term 1",
    test1: 92,
    test2: 88,
    assignment: 95,
    exam: 94,
    total: 92.3,
    grade: "A+",
    teacherComment: "Exceptional understanding of complex concepts. Outstanding work.",
    submissionStatus: "approved"
  }
];

// Get unique values for filters
const getUniqueValues = (data: any[], field: string) => {
  return Array.from(new Set(data.map(item => item[field])));
};

const classes = getUniqueValues(GRADES_DATA, "class");
const subjects = getUniqueValues(GRADES_DATA, "subject");
const terms = getUniqueValues(GRADES_DATA, "term");

export default function ViewGrades() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedTerm, setSelectedTerm] = useState<string>("");
  
  // Apply filters to grade data
  const filteredGrades = GRADES_DATA.filter(grade => {
    const matchesSearch = grade.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      grade.studentId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = selectedClass ? grade.class === selectedClass : true;
    const matchesSubject = selectedSubject ? grade.subject === selectedSubject : true;
    const matchesTerm = selectedTerm ? grade.term === selectedTerm : true;
    
    return matchesSearch && matchesClass && matchesSubject && matchesTerm;
  });
  
  // Calculate performance metrics
  const calculatePerformanceMetrics = () => {
    if (filteredGrades.length === 0) return { avgScore: 0, passRate: 0, topGrade: 0 };
    
    const totalScore = filteredGrades.reduce((sum, grade) => sum + grade.total, 0);
    const avgScore = totalScore / filteredGrades.length;
    
    const passCount = filteredGrades.filter(grade => grade.total >= 60).length;
    const passRate = (passCount / filteredGrades.length) * 100;
    
    const aCount = filteredGrades.filter(grade => grade.grade.startsWith('A')).length;
    const topGrade = (aCount / filteredGrades.length) * 100;
    
    return { avgScore, passRate, topGrade };
  };
  
  const { avgScore, passRate, topGrade } = calculatePerformanceMetrics();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">View Grades</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgScore.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              {avgScore > 75 ? "Above" : "Below"} target by {Math.abs(avgScore - 75).toFixed(1)}%
            </p>
            <div className="mt-4 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-2 bg-blue-500 rounded-full"
                style={{ width: `${avgScore}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pass Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{passRate.toFixed(0)}%</div>
            <p className="text-xs text-muted-foreground">
              {passRate - 80 > 0 ? "+" : ""}{(passRate - 80).toFixed(1)}% from target
            </p>
            <div className="mt-4 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-2 rounded-full ${passRate >= 80 ? "bg-green-500" : "bg-amber-500"}`}
                style={{ width: `${passRate}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Top Grades (A/A+)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{topGrade.toFixed(0)}%</div>
            <p className="text-xs text-muted-foreground">
              {topGrade - 30 > 0 ? "+" : ""}{(topGrade - 30).toFixed(1)}% from previous term
            </p>
            <div className="mt-4 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-2 bg-purple-500 rounded-full"
                style={{ width: `${topGrade}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Grades</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="charts">Performance Charts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Grade Records</CardTitle>
              <CardDescription>View and filter student academic performance</CardDescription>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4 items-start sm:items-center justify-between">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by student name or ID..."
                    className="pl-8 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex flex-wrap gap-2 items-center">
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Classes</SelectItem>
                      {classes.map((cls) => (
                        <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Subjects</SelectItem>
                      {subjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={selectedTerm} onValueChange={setSelectedTerm}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Term" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Terms</SelectItem>
                      {terms.map((term) => (
                        <SelectItem key={term} value={term}>{term}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead className="text-center">Test 1</TableHead>
                    <TableHead className="text-center">Test 2</TableHead>
                    <TableHead className="text-center">Assignment</TableHead>
                    <TableHead className="text-center">Exam</TableHead>
                    <TableHead className="text-center">Total</TableHead>
                    <TableHead className="text-center">Grade</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredGrades.map((grade) => (
                    <TableRow key={`${grade.studentId}-${grade.subject}`}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{grade.studentName}</p>
                          <p className="text-sm text-muted-foreground">{grade.studentId}</p>
                        </div>
                      </TableCell>
                      <TableCell>{grade.class}</TableCell>
                      <TableCell>{grade.subject}</TableCell>
                      <TableCell className="text-center">{grade.test1}</TableCell>
                      <TableCell className="text-center">{grade.test2}</TableCell>
                      <TableCell className="text-center">{grade.assignment}</TableCell>
                      <TableCell className="text-center">{grade.exam}</TableCell>
                      <TableCell className="text-center font-medium">{grade.total}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant={
                          grade.grade.startsWith('A') ? "default" :
                          grade.grade.startsWith('B') ? "outline" :
                          grade.grade.startsWith('C') ? "secondary" : "destructive"
                        }>
                          {grade.grade}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant={grade.submissionStatus === "approved" ? "outline" : "secondary"} 
                          className={grade.submissionStatus === "approved" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" : ""}>
                          {grade.submissionStatus === "approved" ? "Approved" : "Pending"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredGrades.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={10} className="h-24 text-center">
                        No grade records found matching your filters
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="approved" className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold">Approved Grades</h3>
              <p className="text-muted-foreground">
                View only approved and published grade records
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pending" className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold">Pending Grades</h3>
              <p className="text-muted-foreground">
                View grade records waiting for approval
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="charts" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Grade Distribution</CardTitle>
                <CardDescription>Overall performance breakdown</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-64 flex items-end justify-around gap-4">
                  {["A+", "A", "B+", "B", "C+", "C", "D", "F"].map((grade, i) => {
                    // Mock data for visualization
                    const heights = [90, 70, 60, 50, 30, 20, 15, 10];
                    const colors = [
                      "bg-green-500", "bg-green-400", 
                      "bg-blue-500", "bg-blue-400",
                      "bg-amber-500", "bg-amber-400",
                      "bg-orange-400", "bg-red-500"
                    ];
                    
                    return (
                      <div key={grade} className="flex flex-col items-center w-full">
                        <div 
                          className={`rounded-t-md w-full ${colors[i]}`}
                          style={{ height: `${heights[i]}%` }}
                        ></div>
                        <div className="mt-2 text-sm text-center">{grade}</div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="mt-6 text-center">
                  <Button variant="outline">
                    <FileSpreadsheet className="mr-2 h-4 w-4" />
                    Export Chart Data
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Subject Performance</CardTitle>
                <CardDescription>Average scores by subject</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {subjects.map((subject, i) => {
                    // Mock data for visualization
                    const scores = [88, 76, 91, 82];
                    const colors = ["bg-blue-500", "bg-purple-500", "bg-green-500", "bg-amber-500"];
                    
                    return (
                      <div key={subject} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{subject}</span>
                          <span>{scores[i]}%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2.5 dark:bg-gray-700">
                          <div 
                            className={`h-2.5 rounded-full ${colors[i % colors.length]}`} 
                            style={{ width: `${scores[i]}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="mt-6 text-center">
                  <Button>
                    <BarChart3 className="mr-2 h-4 w-4" />
                    View Detailed Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}