"use client"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MoreHorizontal, Search, Filter, UserPlus, Calendar, FileText, Star, Clock, CheckCircle, AlertCircle, Clock3 } from "lucide-react";

// Mock teacher data
const TEACHERS = [
  {
    id: "TCH001",
    name: "Dr. Robert Johnson",
    subjects: ["Mathematics", "Physics"],
    department: "Science",
    qualification: "Ph.D. Mathematics",
    joinDate: "2018-05-12",
    contactNumber: "+1234567890",
    email: "robert.johnson@school.edu",
    status: "active",
    lessonPlanStatus: "completed",
    performanceRating: 4.8
  },
  {
    id: "TCH002",
    name: "Prof. Sarah Williams",
    subjects: ["English Literature", "Language Arts"],
    department: "Languages",
    qualification: "M.A. English Literature",
    joinDate: "2017-08-03",
    contactNumber: "+1987654321",
    email: "sarah.williams@school.edu",
    status: "active",
    lessonPlanStatus: "pending",
    performanceRating: 4.5
  },
  {
    id: "TCH003",
    name: "Dr. James Miller",
    subjects: ["Chemistry", "Biology"],
    department: "Science",
    qualification: "Ph.D. Chemistry",
    joinDate: "2019-02-15",
    contactNumber: "+1122334455",
    email: "james.miller@school.edu",
    status: "active",
    lessonPlanStatus: "completed",
    performanceRating: 4.7
  },
  {
    id: "TCH004",
    name: "Prof. Emily Davis",
    subjects: ["History", "Social Studies"],
    department: "Humanities",
    qualification: "M.A. History",
    joinDate: "2016-11-22",
    contactNumber: "+1567890123",
    email: "emily.davis@school.edu",
    status: "active",
    lessonPlanStatus: "completed",
    performanceRating: 4.9
  },
  {
    id: "TCH005",
    name: "Dr. Michael Brown",
    subjects: ["Computer Science", "Mathematics"],
    department: "Technology",
    qualification: "Ph.D. Computer Science",
    joinDate: "2020-01-08",
    contactNumber: "+1345678901",
    email: "michael.brown@school.edu",
    status: "active",
    lessonPlanStatus: "overdue",
    performanceRating: 4.2
  },
  {
    id: "TCH006",
    name: "Prof. Jennifer Smith",
    subjects: ["Art", "Design"],
    department: "Arts",
    qualification: "M.F.A. Fine Arts",
    joinDate: "2018-09-17",
    contactNumber: "+1234098765",
    email: "jennifer.smith@school.edu",
    status: "active",
    lessonPlanStatus: "completed",
    performanceRating: 4.6
  },
  {
    id: "TCH007",
    name: "Dr. David Wilson",
    subjects: ["Economics", "Business Studies"],
    department: "Commerce",
    qualification: "Ph.D. Economics",
    joinDate: "2017-06-30",
    contactNumber: "+1678901234",
    email: "david.wilson@school.edu",
    status: "inactive",
    lessonPlanStatus: "pending",
    performanceRating: 4.3
  },
  {
    id: "TCH008",
    name: "Prof. Maria Garcia",
    subjects: ["Spanish", "French"],
    department: "Languages",
    qualification: "M.A. Foreign Languages",
    joinDate: "2019-04-05",
    contactNumber: "+1890123456",
    email: "maria.garcia@school.edu",
    status: "active",
    lessonPlanStatus: "completed",
    performanceRating: 4.7
  }
];

export default function Teachers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");

  // Apply filters to teacher data
  const filteredTeachers = TEACHERS.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.subjects.some(subj => subj.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesDepartment = selectedDepartment ? teacher.department === selectedDepartment : true;
    const matchesStatus = statusFilter ? teacher.status === statusFilter : true;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  // Get unique departments for filter dropdown
  const departments = Array.from(new Set(TEACHERS.map(teacher => teacher.department)));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Teachers Management</h1>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" /> Add New Teacher
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4 w-full sm:w-auto">
          <TabsTrigger value="all">All Teachers</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
          <TabsTrigger value="department">By Department</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Teachers Directory</CardTitle>
              <CardDescription>View and manage teacher information</CardDescription>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4 items-start sm:items-center justify-between">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, ID or subject..."
                    className="pl-8 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex flex-wrap gap-2 items-center">
                  <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Departments</SelectItem>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" /> More Filters
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Teacher</TableHead>
                    <TableHead>Subjects</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Qualification</TableHead>
                    <TableHead>Lesson Plans</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTeachers.map((teacher) => (
                    <TableRow key={teacher.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>{teacher.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{teacher.name}</p>
                            <p className="text-sm text-muted-foreground">{teacher.id}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {teacher.subjects.map((subject, i) => (
                            <Badge key={i} variant="outline">{subject}</Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{teacher.department}</TableCell>
                      <TableCell>{teacher.qualification}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {teacher.lessonPlanStatus === "completed" && (
                            <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                              <CheckCircle className="mr-1 h-3 w-3" /> Complete
                            </Badge>
                          )}
                          {teacher.lessonPlanStatus === "pending" && (
                            <Badge variant="secondary">
                              <Clock className="mr-1 h-3 w-3" /> Pending
                            </Badge>
                          )}
                          {teacher.lessonPlanStatus === "overdue" && (
                            <Badge variant="destructive">
                              <AlertCircle className="mr-1 h-3 w-3" /> Overdue
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {Array(5).fill(0).map((_, i) => (
                            <Star key={i} className={`h-4 w-4 ${i < Math.floor(teacher.performanceRating) ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}`} />
                          ))}
                          <span className="ml-1 text-sm font-medium">{teacher.performanceRating}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={teacher.status === "active" ? "default" : "secondary"}>
                          {teacher.status === "active" ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem>Edit Details</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Calendar className="mr-2 h-4 w-4" />
                              View Schedule
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" />
                              View Lesson Plans
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">Deactivate</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredTeachers.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={8} className="h-24 text-center">
                        No teachers found matching your filters
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-muted-foreground">
                  Showing <strong>{filteredTeachers.length}</strong> of <strong>{TEACHERS.length}</strong> teachers
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" disabled>Previous</Button>
                  <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">1</Button>
                  <Button variant="outline" size="sm">Next</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="active" className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold">Active Teachers</h3>
              <p className="text-muted-foreground">
                Showing teachers with active status
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="inactive" className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold">Inactive Teachers</h3>
              <p className="text-muted-foreground">
                Showing teachers with inactive status
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="department" className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold">Teachers by Department</h3>
              <p className="text-muted-foreground">
                View teachers organized by their department
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Department Distribution</CardTitle>
            <CardDescription>Teachers by department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {departments.map((dept, i) => {
                const count = TEACHERS.filter(t => t.department === dept).length;
                const percentage = Math.round((count / TEACHERS.length) * 100);
                
                return (
                  <div key={dept} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{dept}</span>
                      <span>{count} ({percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ 
                          width: `${percentage}%`,
                          backgroundColor: ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'][i % 5]
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Lesson Plan Compliance</CardTitle>
            <CardDescription>Submission status overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <div className="flex flex-col items-center">
                <div className="relative h-40 w-40">
                  {/* Circular progress chart */}
                  <svg className="h-40 w-40" viewBox="0 0 100 100">
                    {/* Background circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#e2e8f0"
                      strokeWidth="10"
                    />
                    {/* Progress circle - 75% complete */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="10"
                      strokeDasharray="251.2"
                      strokeDashoffset="62.8" // 25% of 251.2
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-3xl font-bold">75%</span>
                    <span className="text-sm text-muted-foreground">Completed</span>
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-3 gap-4 w-full">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mb-1"></div>
                    <span className="text-xs text-muted-foreground">Complete</span>
                    <span className="font-semibold">75%</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-amber-500 mb-1"></div>
                    <span className="text-xs text-muted-foreground">Pending</span>
                    <span className="font-semibold">15%</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 mb-1"></div>
                    <span className="text-xs text-muted-foreground">Overdue</span>
                    <span className="font-semibold">10%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Teaching Experience</CardTitle>
            <CardDescription>Years of service distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-40 flex items-end justify-around">
              {["0-2", "3-5", "6-10", "10+"].map((years, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="h-32 w-12 bg-primary rounded-t-md flex items-end justify-center"
                    style={{ height: `${[40, 90, 60, 30][i]}%`, opacity: 0.6 + (i * 0.1) }}
                  ></div>
                  <div className="mt-2 text-sm text-muted-foreground">{years} yrs</div>
                </div>
              ))}
            </div>
            
            <div className="mt-2 pt-4 border-t">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Average Experience</p>
                  <p className="font-semibold">6.2 years</p>
                </div>
                <Button variant="outline" size="sm">
                  <Clock3 className="mr-2 h-4 w-4" /> View Details
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}