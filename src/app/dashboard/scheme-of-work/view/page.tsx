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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Search,
  FileText,
  Download,
  Calendar,
  Eye,
  MoreHorizontal,
  Filter,
  ArrowDownToLine,
  Printer,
  BookOpen,
  CheckCircle,
  ArrowRight,
  Clock,
} from "lucide-react";

// Mock scheme of work data
const SCHEMES_OF_WORK = [
  {
    id: "SOW001",
    subject: "Mathematics",
    class: "Grade 10A",
    term: "Term 1",
    academicYear: "2023-2024",
    teacher: "Dr. Robert Johnson",
    teacherId: "TCH001",
    status: "complete",
    approvedBy: "Jessica Martinez",
    approvedOn: "2023-09-05",
    lastModified: "1 week ago",
    progress: 100,
    topicsCovered: [
      { 
        week: 1, 
        topic: "Number Systems and Operations", 
        completed: true,
        status: "complete"
      },
      { 
        week: 2, 
        topic: "Algebraic Expressions and Equations", 
        completed: true,
        status: "complete"
      },
      { 
        week: 3, 
        topic: "Linear Equations and Inequalities", 
        completed: true,
        status: "complete"
      },
      { 
        week: 4, 
        topic: "Quadratic Equations", 
        completed: true,
        status: "complete"
      },
      { 
        week: 5, 
        topic: "Functions and Graphs", 
        completed: true,
        status: "complete"
      }
    ]
  },
  {
    id: "SOW002",
    subject: "English Literature",
    class: "Grade 10A",
    term: "Term 1",
    academicYear: "2023-2024",
    teacher: "Prof. Sarah Williams",
    teacherId: "TCH002",
    status: "in-progress",
    approvedBy: "Jessica Martinez",
    approvedOn: "2023-09-08",
    lastModified: "3 days ago",
    progress: 60,
    topicsCovered: [
      { 
        week: 1, 
        topic: "Introduction to Literary Analysis", 
        completed: true,
        status: "complete"
      },
      { 
        week: 2, 
        topic: "Poetry and Poetic Devices", 
        completed: true,
        status: "complete"
      },
      { 
        week: 3, 
        topic: "Shakespeare's Macbeth: Introduction", 
        completed: true,
        status: "complete"
      },
      { 
        week: 4, 
        topic: "Macbeth: Character Analysis", 
        completed: false,
        status: "in-progress"
      },
      { 
        week: 5, 
        topic: "Macbeth: Themes and Motifs", 
        completed: false,
        status: "pending"
      }
    ]
  },
  {
    id: "SOW003",
    subject: "Chemistry",
    class: "Grade 10B",
    term: "Term 1",
    academicYear: "2023-2024",
    teacher: "Dr. James Miller",
    teacherId: "TCH003",
    status: "in-progress",
    approvedBy: "Thomas Wilson",
    approvedOn: "2023-09-10",
    lastModified: "2 days ago",
    progress: 40,
    topicsCovered: [
      { 
        week: 1, 
        topic: "Atomic Structure and Periodic Table", 
        completed: true,
        status: "complete"
      },
      { 
        week: 2, 
        topic: "Chemical Bonding", 
        completed: true,
        status: "complete"
      },
      { 
        week: 3, 
        topic: "Chemical Reactions and Equations", 
        completed: false,
        status: "in-progress"
      },
      { 
        week: 4, 
        topic: "Acids, Bases, and Salts", 
        completed: false,
        status: "pending"
      },
      { 
        week: 5, 
        topic: "Organic Chemistry Introduction", 
        completed: false,
        status: "pending"
      }
    ]
  },
  {
    id: "SOW004",
    subject: "History",
    class: "Grade 9A",
    term: "Term 1",
    academicYear: "2023-2024",
    teacher: "Prof. Emily Davis",
    teacherId: "TCH004",
    status: "in-progress",
    approvedBy: "Jessica Martinez",
    approvedOn: "2023-09-07",
    lastModified: "5 days ago",
    progress: 80,
    topicsCovered: [
      { 
        week: 1, 
        topic: "Introduction to World History", 
        completed: true,
        status: "complete"
      },
      { 
        week: 2, 
        topic: "Ancient Civilizations", 
        completed: true,
        status: "complete"
      },
      { 
        week: 3, 
        topic: "Medieval Period", 
        completed: true,
        status: "complete"
      },
      { 
        week: 4, 
        topic: "Renaissance and Reformation", 
        completed: true,
        status: "complete"
      },
      { 
        week: 5, 
        topic: "World Wars", 
        completed: false,
        status: "in-progress"
      }
    ]
  },
  {
    id: "SOW005",
    subject: "Computer Science",
    class: "Grade 11B",
    term: "Term 1",
    academicYear: "2023-2024",
    teacher: "Dr. Michael Brown",
    teacherId: "TCH005",
    status: "pending",
    approvedBy: null,
    approvedOn: null,
    lastModified: "1 day ago",
    progress: 0,
    topicsCovered: [
      { 
        week: 1, 
        topic: "Introduction to Programming Concepts", 
        completed: false,
        status: "pending"
      },
      { 
        week: 2, 
        topic: "Python Basics", 
        completed: false,
        status: "pending"
      },
      { 
        week: 3, 
        topic: "Control Structures", 
        completed: false,
        status: "pending"
      },
      { 
        week: 4, 
        topic: "Functions and Modules", 
        completed: false,
        status: "pending"
      },
      { 
        week: 5, 
        topic: "Data Structures", 
        completed: false,
        status: "pending"
      }
    ]
  }
];

export default function ViewSchemeOfWork() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [viewScheme, setViewScheme] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState<string | null>(null);
  
  // Apply filters to scheme of work data
  const filteredSchemes = SCHEMES_OF_WORK.filter(scheme => {
    const matchesSearch = scheme.teacher.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubject ? scheme.subject === selectedSubject : true;
    const matchesClass = selectedClass ? scheme.class === selectedClass : true;
    const matchesStatus = selectedStatus ? scheme.status === selectedStatus : true;
    
    return matchesSearch && matchesSubject && matchesClass && matchesStatus;
  });
  
  // Get unique values for filters
  const getUniqueValues = (field: string) => {
    return Array.from(new Set(SCHEMES_OF_WORK.map((item: any) => item[field])));
  };
  
  const subjects = getUniqueValues("subject");
  const classes = getUniqueValues("class");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Schemes of Work</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            Print View
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Schemes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{SCHEMES_OF_WORK.length}</div>
            <p className="text-xs text-muted-foreground">
              Across {getUniqueValues("class").length} different classes
            </p>
            <div className="mt-4 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-2 bg-blue-500 rounded-full"
                style={{ width: "100%" }}
              ></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(SCHEMES_OF_WORK.reduce((sum, scheme) => sum + scheme.progress, 0) / SCHEMES_OF_WORK.length)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Overall progress for Term 1
            </p>
            <div className="mt-4 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-2 bg-green-500 rounded-full"
                style={{ width: `${Math.round(SCHEMES_OF_WORK.reduce((sum, scheme) => sum + scheme.progress, 0) / SCHEMES_OF_WORK.length)}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Status Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center gap-4">
              <div className="flex flex-col items-center">
                <div className="text-xl font-bold text-green-500">{SCHEMES_OF_WORK.filter(s => s.status === "complete").length}</div>
                <p className="text-xs text-muted-foreground">Complete</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-xl font-bold text-amber-500">{SCHEMES_OF_WORK.filter(s => s.status === "in-progress").length}</div>
                <p className="text-xs text-muted-foreground">In Progress</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-xl font-bold text-blue-500">{SCHEMES_OF_WORK.filter(s => s.status === "pending").length}</div>
                <p className="text-xs text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>All Schemes of Work</CardTitle>
          <CardDescription>View and track curriculum implementation progress</CardDescription>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4 items-start sm:items-center justify-between">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by subject or teacher..."
                className="pl-8 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-2 items-center">
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
              
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Statuses</SelectItem>
                  <SelectItem value="complete">Complete</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject & Class</TableHead>
                <TableHead>Teacher</TableHead>
                <TableHead>Academic Year</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Approval Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSchemes.map((scheme) => (
                <TableRow key={scheme.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{scheme.subject}</p>
                      <p className="text-sm text-muted-foreground">{scheme.class} • {scheme.term}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{scheme.teacher.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{scheme.teacher}</span>
                    </div>
                  </TableCell>
                  <TableCell>{scheme.academicYear}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-full max-w-[100px] bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            scheme.progress === 100 ? "bg-green-500" : 
                            scheme.progress > 60 ? "bg-blue-500" : 
                            scheme.progress > 30 ? "bg-amber-500" : 
                            "bg-orange-500"
                          }`}
                          style={{ width: `${scheme.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{scheme.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      scheme.status === "complete" ? "outline" :
                      scheme.status === "in-progress" ? "secondary" :
                      "default"
                    } className={
                      scheme.status === "complete" ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400" : ""
                    }>
                      {scheme.status === "complete" && "Complete"}
                      {scheme.status === "in-progress" && "In Progress"}
                      {scheme.status === "pending" && "Pending"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{scheme.lastModified}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline" 
                        size="sm" 
                        className="h-8"
                        onClick={() => {
                          setSelectedScheme(scheme.id);
                          setViewScheme(true);
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
                          <DropdownMenuItem>View Complete Scheme</DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" />
                            Download PDF
                          </DropdownMenuItem>
                          <DropdownMenuItem>View Related Lesson Plans</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Track Progress</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredSchemes.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No schemes of work found matching your criteria
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between pt-2">
          <div className="text-sm text-muted-foreground">
            Showing <strong>{filteredSchemes.length}</strong> of <strong>{SCHEMES_OF_WORK.length}</strong> schemes
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filters
          </Button>
        </CardFooter>
      </Card>

      {/* View Scheme of Work Detail Dialog */}
      <Dialog open={viewScheme} onOpenChange={setViewScheme}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Scheme of Work Details</DialogTitle>
            <DialogDescription>
              {selectedScheme && (
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline">{SCHEMES_OF_WORK.find(s => s.id === selectedScheme)?.subject}</Badge>
                  <Badge variant="outline">{SCHEMES_OF_WORK.find(s => s.id === selectedScheme)?.class}</Badge>
                  <Badge variant="outline">{SCHEMES_OF_WORK.find(s => s.id === selectedScheme)?.term}</Badge>
                  <Badge variant="outline">{SCHEMES_OF_WORK.find(s => s.id === selectedScheme)?.academicYear}</Badge>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>

          {selectedScheme && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Teacher</p>
                  <p className="font-medium">{SCHEMES_OF_WORK.find(s => s.id === selectedScheme)?.teacher}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge variant={
                    SCHEMES_OF_WORK.find(s => s.id === selectedScheme)?.status === "complete" ? "outline" :
                    SCHEMES_OF_WORK.find(s => s.id === selectedScheme)?.status === "in-progress" ? "secondary" :
                    "default"
                  } className={
                    SCHEMES_OF_WORK.find(s => s.id === selectedScheme)?.status === "complete" ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400" : ""
                  }>
                    {SCHEMES_OF_WORK.find(s => s.id === selectedScheme)?.status === "complete" && "Complete"}
                    {SCHEMES_OF_WORK.find(s => s.id === selectedScheme)?.status === "in-progress" && "In Progress"}
                    {SCHEMES_OF_WORK.find(s => s.id === selectedScheme)?.status === "pending" && "Pending"}
                  </Badge>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Progress</p>
                  <p className="font-medium">{SCHEMES_OF_WORK.find(s => s.id === selectedScheme)?.progress}% Complete</p>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                <div
                  className={`h-2 rounded-full ${
                    SCHEMES_OF_WORK.find(s => s.id === selectedScheme)?.progress === 100 ? "bg-green-500" : 
                    SCHEMES_OF_WORK.find(s => s.id === selectedScheme)?.progress > 60 ? "bg-blue-500" : 
                    SCHEMES_OF_WORK.find(s => s.id === selectedScheme)?.progress > 30 ? "bg-amber-500" : 
                    "bg-orange-500"
                  }`}
                  style={{ width: `${SCHEMES_OF_WORK.find(s => s.id === selectedScheme)?.progress}%` }}
                ></div>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-medium mb-3">Weekly Breakdown</h4>
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-20">Week</TableHead>
                        <TableHead>Topic</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {SCHEMES_OF_WORK.find(s => s.id === selectedScheme)?.topicsCovered.map((topic) => (
                        <TableRow key={topic.week}>
                          <TableCell>Week {topic.week}</TableCell>
                          <TableCell>{topic.topic}</TableCell>
                          <TableCell className="text-center">
                            <Badge variant={
                              topic.status === "complete" ? "outline" :
                              topic.status === "in-progress" ? "secondary" : "default"
                            } className={
                              topic.status === "complete" ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400" :
                              topic.status === "in-progress" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400" : ""
                            }>
                              {topic.status === "complete" && (
                                <><CheckCircle className="h-3.5 w-3.5 mr-1" /> Complete</>
                              )}
                              {topic.status === "in-progress" && "In Progress"}
                              {topic.status === "pending" && "Pending"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">View Lesson Plan</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-medium mb-3">Resources & Materials</h4>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="textbooks">
                    <AccordionTrigger>Textbooks & Core Materials</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Primary Textbook: "Comprehensive Mathematics for Grade 10"</li>
                        <li>Workbook: "Mathematics Practice Exercises"</li>
                        <li>Supplementary Materials: "Advanced Problem Solving in Mathematics"</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="assessments">
                    <AccordionTrigger>Assessment Plan</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Weekly quizzes (10% of total grade)</li>
                        <li>Mid-term examination (30% of total grade)</li>
                        <li>Final examination (40% of total grade)</li>
                        <li>Assignments and projects (20% of total grade)</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="teaching">
                    <AccordionTrigger>Teaching Methods</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Lecture-based instruction with interactive examples</li>
                        <li>Group problem-solving activities</li>
                        <li>Individual practice exercises</li>
                        <li>Peer teaching opportunities</li>
                        <li>Use of visual aids and technological tools</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2 sm:gap-0">
            <div className="flex gap-2">
              <Button variant="outline">
                <ArrowDownToLine className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
              <Button variant="outline">
                <Printer className="mr-2 h-4 w-4" />
                Print
              </Button>
            </div>
            <Button>
              <BookOpen className="mr-2 h-4 w-4" />
              View Related Lesson Plans
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}