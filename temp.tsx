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
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MoreHorizontal, Search, Filter, UserPlus, Calendar, FileText, Star, Clock, CheckCircle, AlertCircle, Clock3, ChevronLeft, ChevronRight } from "lucide-react";

interface TeacherInfo {
  id: string;
  name: string;
  subjects: string[];
  levels: string[];
  email?: string;
  phone: string;
  status: string;
  lessonPlan: string;
  testScript: string;
  sponsorClass?: string;
}

const TEACHERS: TeacherInfo[] = [
  {
    id: "UCA001",
    name: "Amos Senkao",
    subjects: ["Computer"],
    levels: ["Elementary", "Junior High"],
    email: "senkao.a@outlook.jp",
    phone: "0776949463",
    status: "active",
    sponsorClass: "Grade 4",
    lessonPlan: "Completed",
    testScript: "pending",
  },
  {
    id: "UCA002",
    name: "Mark Dolo",
    subjects: ["English", "Science"],
    levels: ["Elementary", "Junior High"],
    email: "mark@uca.com.lr",
    phone: "077545246",
    status: "active",
    sponsorClass: "Grade 9",
    lessonPlan: "Completed",
    testScript: "completed"
  },
  {
    id: "UCA003",
    name: "Rachel Gbassay",
    subjects: ["Mathematics"],
    levels: ["Junior High"],
    phone: "0771234567",
    status: "active",
    sponsorClass: "Grade 8",
    lessonPlan: "Completed",
    testScript: "completed"
  },
  {
    id: "UCA004",
    name: "Timothy Kollie",
    subjects: ["Biology", "Chemistry"],
    levels: ["Senior High"],
    phone: "0558746321",
    status: "inactive",
    lessonPlan: "Pending",
    testScript: "pending"
  },
  {
    id: "UCA005",
    name: "Grace Wesseh",
    subjects: ["English"],
    levels: ["Senior High"],
    phone: "0887321456",
    status: "active",
    sponsorClass: "Grade 12",
    lessonPlan: "Completed",
    testScript: "completed"
  },
  {
    id: "UCA006",
    name: "Samuel Johnson",
    subjects: ["Physics", "Mathematics"],
    levels: ["Senior High"],
    phone: "0779893421",
    status: "active",
    lessonPlan: "Pending",
    testScript: "completed"
  },
  {
    id: "UCA007",
    name: "Martha Cooper",
    subjects: ["Reading", "Writing"],
    levels: ["Elementary"],
    phone: "0888321223",
    status: "active",
    sponsorClass: "Grade 2",
    lessonPlan: "Completed",
    testScript: "pending"
  },
  {
    id: "UCA008",
    name: "Peter Harris",
    subjects: ["Geography", "Civics"],
    levels: ["Junior High", "Senior High"],
    phone: "0776623456",
    status: "inactive",
    lessonPlan: "Pending",
    testScript: "pending"
  },
  {
    id: "UCA009",
    name: "Linda Brooks",
    subjects: ["History", "Social Studies"],
    levels: ["Junior High"],
    phone: "0559123123",
    status: "active",
    sponsorClass: "Grade 7",
    lessonPlan: "Completed",
    testScript: "completed"
  },
  {
    id: "UCA010",
    name: "Thomas Doe",
    subjects: ["Business Math", "Economics"],
    levels: ["Senior High"],
    phone: "0887345231",
    status: "active",
    lessonPlan: "Pending",
    testScript: "completed"
  },
  {
    id: "UCA011",
    name: "Angela Freeman",
    subjects: ["Art", "Handwriting"],
    levels: ["Elementary"],
    phone: "0771238976",
    status: "active",
    sponsorClass: "Grade 3",
    lessonPlan: "Completed",
    testScript: "pending"
  },
  {
    id: "UCA012",
    name: "James Dorbor",
    subjects: ["PE", "Health Science"],
    levels: ["Junior High", "Senior High"],
    phone: "0887341234",
    status: "active",
    lessonPlan: "Completed",
    testScript: "pending"
  },
  {
    id: "UCA013",
    name: "Jessica Kennedy",
    subjects: ["Music"],
    levels: ["Elementary", "Junior High"],
    phone: "0774567890",
    status: "inactive",
    lessonPlan: "Pending",
    testScript: "pending"
  },
  {
    id: "UCA014",
    name: "Victor Kollie",
    subjects: ["Chemistry"],
    levels: ["Senior High"],
    phone: "0558765432",
    status: "active",
    sponsorClass: "Grade 11",
    lessonPlan: "Completed",
    testScript: "completed"
  },
  {
    id: "UCA015",
    name: "Deborah Johnson",
    subjects: ["Kindergarten Basics"],
    levels: ["Self Contained"],
    phone: "0887456789",
    status: "active",
    sponsorClass: "KG 2",
    lessonPlan: "Completed",
    testScript: "pending"
  },
  {
    id: "UCA016",
    name: "Frank Kumeh",
    subjects: ["Algebra", "Geometry"],
    levels: ["Junior High"],
    phone: "0775566778",
    status: "active",
    lessonPlan: "Pending",
    testScript: "completed"
  },
  {
    id: "UCA017",
    name: "Gloria Nyepan",
    subjects: ["Christian Education"],
    levels: ["Elementary", "Junior High"],
    phone: "0887543210",
    status: "active",
    sponsorClass: "Grade 6",
    lessonPlan: "Completed",
    testScript: "completed"
  },
  {
    id: "UCA018",
    name: "Aaron Taylor",
    subjects: ["Literature", "Grammar"],
    levels: ["Senior High"],
    phone: "0779900112",
    status: "inactive",
    lessonPlan: "Pending",
    testScript: "pending"
  },
  {
    id: "UCA019",
    name: "Precious Sumo",
    subjects: ["Science"],
    levels: ["Junior High"],
    phone: "0559988776",
    status: "active",
    sponsorClass: "Grade 7",
    lessonPlan: "Completed",
    testScript: "completed"
  },
  {
    id: "UCA020",
    name: "Daniel Moore",
    subjects: ["Mathematics", "Statistics"],
    levels: ["Senior High"],
    phone: "0888765432",
    status: "active",
    lessonPlan: "Pending",
    testScript: "completed"
  },
  {
    id: "UCA021",
    name: "Comfort Flomo",
    subjects: ["Reading", "Phonics"],
    levels: ["Self Contained"],
    phone: "0771239876",
    status: "active",
    sponsorClass: "Grade 1",
    lessonPlan: "Completed",
    testScript: "pending"
  },
  {
    id: "UCA022",
    name: "Henry Doe",
    subjects: ["Basic Science"],
    levels: ["Elementary"],
    phone: "0887123456",
    status: "inactive",
    lessonPlan: "Pending",
    testScript: "pending"
  },
  {
    id: "UCA023",
    name: "Mary Gaye",
    subjects: ["English"],
    levels: ["Junior High"],
    phone: "0557111222",
    status: "active",
    sponsorClass: "Grade 9",
    lessonPlan: "Completed",
    testScript: "completed"
  },
  {
    id: "UCA024",
    name: "Joseph Nagbe",
    subjects: ["ICT"],
    levels: ["Junior High", "Senior High"],
    phone: "0777766554",
    status: "active",
    lessonPlan: "Completed",
    testScript: "pending"
  },
  {
    id: "UCA025",
    name: "Esther Wallace",
    subjects: ["French"],
    levels: ["Junior High", "Senior High"],
    phone: "0887665544",
    status: "active",
    sponsorClass: "Grade 10",
    lessonPlan: "Completed",
    testScript: "completed"
  }
];

function editDetails() {
  alert("Edit details functionality to be implemented")
}

function deactivate() {
  alert("Deactivate functionality to be implemented")
}

function viewLessonPlan() {
  alert("View lesson plan functionality to be implemented")
}

function getProfile() {
  alert("Get profile functionality to be implemented")
}

function getSchedule() {
  alert("Get schedule functionality to be implemented")
}


export default function Teachers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("all");
  const itemsPerPage = 10;

  // Get filtered teachers based on active tab and filters
  const getFilteredTeachers = () => {
    let filtered = TEACHERS;

    // Filter by tab
    if (activeTab !== "all") {
      if (activeTab === "sponsors") {
        filtered = filtered.filter(teacher => teacher.sponsorClass);
      } else {
        filtered = filtered.filter(teacher => 
          teacher.levels.some(level => level.toLowerCase() === activeTab.toLowerCase())
        );
      }
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(teacher => 
        teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.subjects.some(subj => subj.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply level filter
    if (selectedLevel && selectedLevel !== "all") {
      filtered = filtered.filter(teacher => 
        teacher.levels.some(level => level.toLowerCase() === selectedLevel.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter && statusFilter !== "all") {
      filtered = filtered.filter(teacher => teacher.status === statusFilter);
    }

    return filtered;
  };

  const filteredTeachers = getFilteredTeachers();
  
  // Pagination
  const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTeachers = filteredTeachers.slice(startIndex, endIndex);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedLevel, statusFilter, activeTab]);

  // Get unique levels for filter dropdown
  const allLevels = Array.from(new Set(TEACHERS.flatMap(teacher => teacher.levels)));

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderTeacherTable = (teachers: TeacherInfo[]) => (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4 font-medium">Teacher</th>
              <th className="text-left p-4 font-medium">Subjects</th>
              <th className="text-left p-4 font-medium">Levels</th>
              <th className="text-left p-4 font-medium">Lesson Plans</th>
              <th className="text-left p-4 font-medium">Test Scripts</th>
              <th className="text-left p-4 font-medium">Status</th>
              <th className="text-right p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher.id} className="border-b hover:bg-gray-50">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{teacher.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{teacher.name}</p>
                      <p className="text-sm text-gray-500">{teacher.id}</p>
                      {teacher.sponsorClass && (
                        <p className="text-xs text-blue-600">Sponsors: {teacher.sponsorClass}</p>
                      )}
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-1">
                    {teacher.subjects.map((subject, i) => (
                      <Badge key={i} variant="outline">{subject}</Badge>
                    ))}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-1">
                    {teacher.levels.map((level, i) => (
                      <Badge key={i} variant="outline">{level}</Badge>
                    ))}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    {teacher.lessonPlan.toLowerCase() === "completed" && (
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        <CheckCircle className="mr-1 h-3 w-3" /> Complete
                      </Badge>
                    )}
                    {teacher.lessonPlan.toLowerCase() === "pending" && (
                      <Badge variant="secondary">
                        <Clock className="mr-1 h-3 w-3" /> Pending
                      </Badge>
                    )}
                    {teacher.lessonPlan.toLowerCase() === "overdue" && (
                      <Badge variant="destructive">
                        <AlertCircle className="mr-1 h-3 w-3" /> Overdue
                      </Badge>
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    {teacher.testScript.toLowerCase() === "completed" && (
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        <CheckCircle className="mr-1 h-3 w-3" /> Complete
                      </Badge>
                    )}
                    {teacher.testScript.toLowerCase() === "pending" && (
                      <Badge variant="secondary">
                        <Clock className="mr-1 h-3 w-3" /> Pending
                      </Badge>
                    )}
                    {teacher.testScript.toLowerCase() === "overdue" && (
                      <Badge variant="destructive">
                        <AlertCircle className="mr-1 h-3 w-3" /> Overdue
                      </Badge>
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <Badge variant={teacher.status === "active" ? "default" : "secondary"}>
                    {teacher.status === "active" ? "Active" : "Inactive"}
                  </Badge>
                </td>
                <td className="p-4 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={getProfile}>View Profile</DropdownMenuItem>
                      <DropdownMenuItem onClick={editDetails}>Edit Details</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={getSchedule}>
                        <Calendar className="mr-2 h-4 w-4" />
                        View Schedule
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={viewLessonPlan}>
                        <FileText className="mr-2 h-4 w-4" />
                        View Lesson Plans
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600" onClick={deactivate}>Deactivate</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
            {teachers.length === 0 && (
              <tr>
                <td colSpan={7} className="h-24 text-center">
                  No teachers found matching your filters
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {filteredTeachers.length > itemsPerPage && (
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-500">
            Showing <strong>{startIndex + 1}</strong> to <strong>{Math.min(endIndex, filteredTeachers.length)}</strong> of <strong>{filteredTeachers.length}</strong> teachers
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    className="w-8 h-8 p-0"
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </>
  );

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Teachers Management</h1>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" /> Add New Teacher
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4 w-full sm:w-auto">
          <TabsTrigger value="all">All Teachers</TabsTrigger>
          <TabsTrigger value="sponsors">Sponsors</TabsTrigger>
          <TabsTrigger value="committee">Committee Members</TabsTrigger>
        </TabsList>
        
        {["all","sponsors", "committee"].map((tabValue) => (
          <TabsContent key={tabValue} value={tabValue}>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>
                  {tabValue === "all" ? "Teachers Directory" : 
                   tabValue === "sponsors" ? "Class Sponsors" :
                   `${tabValue.charAt(0).toUpperCase() + tabValue.slice(1)} Teachers`}
                </CardTitle>
                <CardDescription>
                  {tabValue === "all" ? "View and manage all teacher information" :
                   tabValue === "sponsors" ? "Teachers who sponsor classes" :
                   `Teachers teaching at ${tabValue} level`}
                </CardDescription>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-4 items-start sm:items-center justify-between">
                  <div className="relative w-full max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search by name, ID or subject..."
                      className="pl-8 w-full"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex flex-wrap gap-2 items-center">
                    <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                      <SelectItem value="all" onSelect={(value) => setSelectedLevel(value)}>All Levels</SelectItem>
                      {allLevels.map((level) => (
                        <SelectItem key={level} value={level.toLowerCase()} onSelect={(value) => setSelectedLevel(value)}>
                          {level}
                        </SelectItem>
                      ))}
                    </Select>
                    
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectItem value="all" onSelect={(value) => setStatusFilter(value)}>All Status</SelectItem>
                      <SelectItem value="active" onSelect={(value) => setStatusFilter(value)}>Active</SelectItem>
                      <SelectItem value="inactive" onSelect={(value) => setStatusFilter(value)}>Inactive</SelectItem>
                    </Select>
                    
                    <Button variant="outline" onClick={() => {
                      setSearchQuery("");
                      setSelectedLevel("");
                      setStatusFilter("");
                    }}>
                      <Filter className="mr-2 h-4 w-4" /> Clear Filters
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {renderTeacherTable(currentTeachers)}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Level Distribution</CardTitle>
            <CardDescription>Teachers by level</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {allLevels.map((level, i) => {
                const count = TEACHERS.filter(t => t.levels.includes(level)).length;
                const percentage = Math.round((count / TEACHERS.length) * 100);
                
                return (
                  <div key={level} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{level}</span>
                      <span>{count} ({percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full" 
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
                  <svg className="h-40 w-40" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#e2e8f0"
                      strokeWidth="10"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="10"
                      strokeDasharray="251.2"
                      strokeDashoffset="62.8"
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-3xl font-bold">75%</span>
                    <span className="text-sm text-gray-500">Completed</span>
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-3 gap-4 w-full">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mb-1"></div>
                    <span className="text-xs text-gray-500">Complete</span>
                    <span className="font-semibold">75%</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-amber-500 mb-1"></div>
                    <span className="text-xs text-gray-500">Pending</span>
                    <span className="font-semibold">15%</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 mb-1"></div>
                    <span className="text-xs text-gray-500">Overdue</span>
                    <span className="font-semibold">10%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Status Overview</CardTitle>
            <CardDescription>Active vs Inactive teachers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="font-medium">Active</span>
                </div>
                <span className="font-semibold">{TEACHERS.filter(t => t.status === 'active').length}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                  <span className="font-medium">Inactive</span>
                </div>
                <span className="font-semibold">{TEACHERS.filter(t => t.status === 'inactive').length}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-blue-500" />
                  <span className="font-medium">Class Sponsors</span>
                </div>
                <span className="font-semibold">{TEACHERS.filter(t => t.sponsorClass).length}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}