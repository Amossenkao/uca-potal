"use client"
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle, XCircle, AlertTriangle, MoreHorizontal, Search, Filter, Clock, CheckSquare, MessageSquare, Eye } from "lucide-react";

// Mock grade submission data
const GRADE_SUBMISSIONS = [
  {
    id: "SUB001",
    teacher: "Dr. Robert Johnson",
    teacherId: "TCH001",
    class: "Grade 10A",
    subject: "Mathematics",
    term: "Term 1",
    submittedOn: "2023-10-15",
    status: "pending",
    studentCount: 28,
    completionRate: 100,
    lastModified: "2 days ago",
    hasWarnings: false,
    hasNotes: true,
  },
  {
    id: "SUB002",
    teacher: "Prof. Sarah Williams",
    teacherId: "TCH002",
    class: "Grade 10A",
    subject: "English Literature",
    term: "Term 1",
    submittedOn: "2023-10-14",
    status: "pending",
    studentCount: 28,
    completionRate: 100,
    lastModified: "3 days ago",
    hasWarnings: false,
    hasNotes: false,
  },
  {
    id: "SUB003",
    teacher: "Dr. James Miller",
    teacherId: "TCH003",
    class: "Grade 10B",
    subject: "Chemistry",
    term: "Term 1",
    submittedOn: "2023-10-12",
    status: "pending",
    studentCount: 26,
    completionRate: 96,
    lastModified: "5 days ago",
    hasWarnings: true,
    hasNotes: true,
  },
  {
    id: "SUB004",
    teacher: "Prof. Emily Davis",
    teacherId: "TCH004",
    class: "Grade 9A",
    subject: "History",
    term: "Term 1",
    submittedOn: "2023-10-10",
    status: "approved",
    studentCount: 30,
    completionRate: 100,
    lastModified: "1 week ago",
    hasWarnings: false,
    hasNotes: false,
  },
  {
    id: "SUB005",
    teacher: "Dr. Michael Brown",
    teacherId: "TCH005",
    class: "Grade 11B",
    subject: "Computer Science",
    term: "Term 1",
    submittedOn: "2023-10-16",
    status: "pending",
    studentCount: 24,
    completionRate: 92,
    lastModified: "1 day ago",
    hasWarnings: true,
    hasNotes: true,
  },
  {
    id: "SUB006",
    teacher: "Prof. Jennifer Smith",
    teacherId: "TCH006",
    class: "Grade 12A",
    subject: "Art",
    term: "Term 1",
    submittedOn: "2023-10-11",
    status: "rejected",
    studentCount: 22,
    completionRate: 100,
    lastModified: "6 days ago",
    hasWarnings: false,
    hasNotes: true,
  },
  {
    id: "SUB007",
    teacher: "Dr. David Wilson",
    teacherId: "TCH007",
    class: "Grade 11A",
    subject: "Economics",
    term: "Term 1",
    submittedOn: "2023-10-13",
    status: "approved",
    studentCount: 26,
    completionRate: 100,
    lastModified: "4 days ago",
    hasWarnings: false,
    hasNotes: false,
  }
];

// Mock grade details for a submission
const MOCK_GRADE_DETAILS = [
  {
    studentId: "STD001",
    studentName: "John Doe",
    test1: 85,
    test2: 78,
    assignment: 92,
    exam: 88,
    total: 85.5,
    grade: "A",
  },
  {
    studentId: "STD002",
    studentName: "Jane Smith",
    test1: 72,
    test2: 68,
    assignment: 85,
    exam: 75,
    total: 74.2,
    grade: "B",
  },
  {
    studentId: "STD003",
    studentName: "Michael Johnson",
    test1: 90,
    test2: 92,
    assignment: 95,
    exam: 94,
    total: 93.1,
    grade: "A+",
  },
  {
    studentId: "STD004",
    studentName: "Emily Brown",
    test1: 65,
    test2: 70,
    assignment: 80,
    exam: 72,
    total: 71.8,
    grade: "B-",
  },
  {
    studentId: "STD005",
    studentName: "David Wilson",
    test1: 58,
    test2: 60,
    assignment: 70,
    exam: 62,
    total: 62.4,
    grade: "C+",
  }
];

export default function ApproveGrades() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedSubmission, setSelectedSubmission] = useState<string | null>(null);
  const [viewGradeDetails, setViewGradeDetails] = useState(false);
  
  // Apply filters to submission data
  const filteredSubmissions = GRADE_SUBMISSIONS.filter(submission => {
    const matchesSearch = submission.teacher.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = selectedClass ? submission.class === selectedClass : true;
    const matchesSubject = selectedSubject ? submission.subject === selectedSubject : true;
    const matchesStatus = selectedStatus ? submission.status === selectedStatus : true;
    
    return matchesSearch && matchesClass && matchesSubject && matchesStatus;
  });
  
  // Get unique values for filters
  const getUniqueValues = (field: string) => {
    return Array.from(new Set(GRADE_SUBMISSIONS.map((item: any) => item[field])));
  };
  
  const classes = getUniqueValues("class");
  const subjects = getUniqueValues("subject");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Approve Grade Submissions</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Advanced Filters
          </Button>
          <Button>
            <CheckSquare className="mr-2 h-4 w-4" />
            Batch Approve
          </Button>
        </div>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="pending">Pending Approval ({GRADE_SUBMISSIONS.filter(s => s.status === "pending").length})</TabsTrigger>
          <TabsTrigger value="approved">Approved ({GRADE_SUBMISSIONS.filter(s => s.status === "approved").length})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({GRADE_SUBMISSIONS.filter(s => s.status === "rejected").length})</TabsTrigger>
          <TabsTrigger value="all">All Submissions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending" className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Pending Grade Submissions</CardTitle>
              <CardDescription>Review and approve grade submissions from teachers</CardDescription>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4 items-start sm:items-center justify-between">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by teacher or subject..."
                    className="pl-8 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex flex-wrap gap-2 items-center">
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Filter by Class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Classes</SelectItem>
                      {classes.map((cls) => (
                        <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Filter by Subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Subjects</SelectItem>
                      {subjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>{subject}</SelectItem>
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
                    <TableHead className="w-12">
                      <Checkbox id="select-all" />
                    </TableHead>
                    <TableHead>Teacher</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead className="text-center">Students</TableHead>
                    <TableHead className="text-center">Completion</TableHead>
                    <TableHead className="text-center">Issues</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubmissions
                    .filter(submission => submission.status === "pending")
                    .map((submission) => (
                    <TableRow key={submission.id}>
                      <TableCell>
                        <Checkbox id={`select-${submission.id}`} />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{submission.teacher.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{submission.teacher}</p>
                            <p className="text-xs text-muted-foreground">{submission.teacherId}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{submission.class}</TableCell>
                      <TableCell>{submission.subject}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-sm">{submission.submittedOn}</span>
                          <span className="text-xs text-muted-foreground">
                            <Clock className="inline h-3 w-3 mr-1" />
                            {submission.lastModified}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">{submission.studentCount}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant={submission.completionRate < 100 ? "outline" : "secondary"} className={submission.completionRate === 100 ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" : ""}>
                          {submission.completionRate}%
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center items-center gap-1.5">
                          {submission.hasWarnings && (
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-700">
                              <AlertTriangle className="h-3.5 w-3.5" />
                            </span>
                          )}
                          {submission.hasNotes && (
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700">
                              <MessageSquare className="h-3.5 w-3.5" />
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline" 
                            size="sm" 
                            className="h-8"
                            onClick={() => {
                              setSelectedSubmission(submission.id);
                              setViewGradeDetails(true);
                            }}
                          >
                            <Eye className="h-3.5 w-3.5 mr-1" />
                            View
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>View Submission Details</DropdownMenuItem>
                              <DropdownMenuItem>Teacher Profile</DropdownMenuItem>
                              <DropdownMenuItem>Class Report</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-green-600">Approve Submission</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">Reject Submission</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredSubmissions.filter(s => s.status === "pending").length === 0 && (
                    <TableRow>
                      <TableCell colSpan={9} className="h-24 text-center">
                        No pending grade submissions found
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
              <h3 className="text-lg font-semibold">Approved Submissions</h3>
              <p className="text-muted-foreground">
                Grade submissions that have been reviewed and approved
              </p>
              {/* Similar table structure as above, filtered for approved submissions */}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="rejected" className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold">Rejected Submissions</h3>
              <p className="text-muted-foreground">
                Grade submissions that have been reviewed and rejected
              </p>
              {/* Similar table structure as above, filtered for rejected submissions */}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="all" className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold">All Grade Submissions</h3>
              <p className="text-muted-foreground">
                Complete history of all grade submissions
              </p>
              {/* Similar table structure as above, showing all submissions */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Grade Details Dialog */}
      <Dialog open={viewGradeDetails} onOpenChange={setViewGradeDetails}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Grade Submission Details</DialogTitle>
            <DialogDescription>
              {selectedSubmission && (
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline">{GRADE_SUBMISSIONS.find(s => s.id === selectedSubmission)?.class}</Badge>
                  <Badge variant="outline">{GRADE_SUBMISSIONS.find(s => s.id === selectedSubmission)?.subject}</Badge>
                  <Badge variant="outline">{GRADE_SUBMISSIONS.find(s => s.id === selectedSubmission)?.term}</Badge>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead className="text-center">Test 1</TableHead>
                  <TableHead className="text-center">Test 2</TableHead>
                  <TableHead className="text-center">Assignment</TableHead>
                  <TableHead className="text-center">Exam</TableHead>
                  <TableHead className="text-center">Total</TableHead>
                  <TableHead className="text-center">Grade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_GRADE_DETAILS.map((grade) => (
                  <TableRow key={grade.studentId}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{grade.studentName}</p>
                        <p className="text-xs text-muted-foreground">{grade.studentId}</p>
                      </div>
                    </TableCell>
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold mb-2">Notes</h4>
              <Textarea 
                placeholder="Add your feedback or notes about this submission..."
                className="min-h-24"
              />
            </div>
          </div>
          
          <DialogFooter className="gap-2 sm:justify-between sm:gap-0">
            <Button variant="outline" className="w-full sm:w-auto">
              <MessageSquare className="mr-2 h-4 w-4" />
              Request Changes
            </Button>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button variant="destructive" className="flex-1 sm:flex-initial">
                <XCircle className="mr-2 h-4 w-4" />
                Reject
              </Button>
              <Button className="flex-1 sm:flex-initial">
                <CheckCircle className="mr-2 h-4 w-4" />
                Approve
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}