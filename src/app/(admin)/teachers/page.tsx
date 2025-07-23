"use client"
import React, { useState, useMemo } from "react";
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
import { MoreHorizontal, Search, Filter, UserPlus, Calendar, FileText, Star, Clock, CheckCircle, AlertCircle, Clock3 } from "lucide-react";


interface TeacherInfo {
  id: string;
  name: string;
  subjects: string[];
  levels: string[];
  email?: string;
  phone: string;
  status: string;
  lessonPlan: string,
  testScript: string,
  sponsorClass?: string;
}

const TEACHERS: TeacherInfo[] = [
  {
    id: "UCA001",
    name: "Amos Senkao",
    subjects: ["Computer"],
    levels: ["Elementry", "Junior High"],
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
    levels: ["Elementry", "Junior High"],
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
    levels: ["Elementry"],
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
    levels: ["Elementry"],
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
    levels: ["Elementry", "Junior High"],
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
    levels: ["Elementry", "Junior High"],
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
    levels: ["Elementry"],
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


function editDetails(teacher: TeacherInfo) {
  alert(`${teacher.name}'s details will be edited`)
}

function deactivate(teacher: TeacherInfo) {
  alert(`${teacher.name} will be deactivated`)
}

function viewLessonPlan(teacher: TeacherInfo) {
  alert(`${teacher.name}'s Lesson Plan`)
}

function getProfile(teacher: TeacherInfo) {
  alert(`${teacher.name}`)
}

function getSchedule(teacher: TeacherInfo) {
  alert(`${teacher.name}'s schedule`)
}

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------
function dedupe<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

function statusBadgeVariant(status: string) {
  return status === "active" ? "default" : "secondary";
}

function workBadge(status: string) {
  const s = status.toLowerCase();
  if (s === "completed") {
    return (
      <Badge
        variant="default"
        className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      >
        <CheckCircle className="mr-1 h-3 w-3" /> Complete
      </Badge>
    );
  }
  if (s === "pending") {
    return (
      <Badge variant="secondary">
        <Clock className="mr-1 h-3 w-3" /> Pending
      </Badge>
    );
  }
  if (s === "overdue") {
    return (
      <Badge variant="destructive">
        <AlertCircle className="mr-1 h-3 w-3" /> Overdue
      </Badge>
    );
  }
  return <Badge variant="secondary">Unknown</Badge>;
}

// -----------------------------------------------------------------------------
// Pagination utility
// -----------------------------------------------------------------------------
function paginate<T>(items: T[], page: number, perPage: number): T[] {
  const start = (page - 1) * perPage;
  const end = start + perPage;
  return items.slice(start, end);
}

// -----------------------------------------------------------------------------
// Teachers Component (Paginated + Page Size Select)
// -----------------------------------------------------------------------------
export default function Teachers() {
  // ---------------------------------------------------------------------------
  // Filters & Search
  // ---------------------------------------------------------------------------
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevels, setSelectedLevels] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [showInactive, setShowInactive] = useState<boolean>(false);

  // ---------------------------------------------------------------------------
  // Pagination State
  // ---------------------------------------------------------------------------
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  // Whenever a top-level filter changes, reset to page 1 so the user sees results.
  const resetPage = () => setCurrentPage(1);

  // ---------------------------------------------------------------------------
  // Derive list of unique levels for the level filter dropdown
  // ---------------------------------------------------------------------------
  const allLevels = useMemo(() => {
    const levels = TEACHERS.flatMap((t) => t.levels ?? []);
    return ["All", ...dedupe(levels)];
  }, []);

  // ---------------------------------------------------------------------------
  // Filtered Teachers (based on search, level, status, showInactive)
  // ---------------------------------------------------------------------------
  const filteredTeachers = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const levelFilterActive = selectedLevels && selectedLevels !== "All";
    const statusFilterActive = statusFilter && statusFilter !== "All";

    return TEACHERS.filter((teacher) => {
      // Search match (name, id, any subject)
      const matchesSearch = !q
        ? true
        : teacher.name.toLowerCase().includes(q) ||
          teacher.id.toLowerCase().includes(q) ||
          teacher.subjects.some((subj: string) => subj.toLowerCase().includes(q));

      // Levels filter
      const matchesLevels = levelFilterActive
        ? teacher.levels.includes(selectedLevels)
        : true;

      // Status filter (dropdown)
      const matchesStatus = statusFilterActive
        ? teacher.status === statusFilter
        : true;

      // Show Inactive switch overrides? Here we interpret it as:
      // - If switch ON => include inactive regardless of dropdown (unless dropdown set specifically).
      //   i.e., if statusFilterActive we respect the dropdown; else show all incl inactive.
      const passesShowInactive = showInactive || teacher.status === "active" || statusFilterActive;

      return matchesSearch && matchesLevels && matchesStatus && passesShowInactive;
    });
  }, [searchQuery, selectedLevels, statusFilter, showInactive]);

  // ---------------------------------------------------------------------------
  // Pagination calculations for filtered results
  // ---------------------------------------------------------------------------
  const totalPages = Math.max(1, Math.ceil(filteredTeachers.length / rowsPerPage));
  const currentPageSafe = Math.min(currentPage, totalPages);
  const currentSlice = paginate(filteredTeachers, currentPageSafe, rowsPerPage);

  // Derived counts for UI text (1-based indices for human display)
  const startIndexDisplay = filteredTeachers.length === 0 ? 0 : (currentPageSafe - 1) * rowsPerPage + 1;
  const endIndexDisplay = Math.min(currentPageSafe * rowsPerPage, filteredTeachers.length);

  // ---------------------------------------------------------------------------
  // Handlers
  // ---------------------------------------------------------------------------
  const handleRowsPerPageChange = (value: string) => {
    setRowsPerPage(Number(value));
    resetPage();
  };

  const handleLevelChange = (value: string) => {
    setSelectedLevels(value);
    resetPage();
  };

  const handleStatusChange = (value: string) => {

    setStatusFilter(value);

    resetPage();
  };

  const nextPage = () => {
    setCurrentPage((p) => Math.min(p + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((p) => Math.max(p - 1, 1));
  };

  // Jump to a specific page (if we later show numeric page buttons)
  const gotoPage = (page: number) => {
    const p = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(p);
  };

  // ---------------------------------------------------------------------------
  // Tab-derived subsets (Sponsors / Committee) — simple examples
  // ---------------------------------------------------------------------------
  const sponsorTeachers = useMemo(
    () => TEACHERS.filter((t) => t.sponsorClass),
    []
  );
  const committeeTeachers = useMemo(
    () => TEACHERS.filter((t) => t.sponsorClass),
    []
  );

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  return (
    <div className="space-y-6">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
        <h1 className="text-3xl font-bold tracking-tight">Teachers Management</h1>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" /> Add New Teacher
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4 w-full sm:w-auto">
          <TabsTrigger value="all">All Teachers</TabsTrigger>
          <TabsTrigger value="sponsors">Sponsors</TabsTrigger>
          <TabsTrigger value="committee">Committee Members</TabsTrigger>
        </TabsList>

        {/* ------------------------------------------------------------------- */}
        {/* All Teachers Tab */}
        {/* ------------------------------------------------------------------- */}
        <TabsContent value="all" className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Teachers Directory</CardTitle>
              <CardDescription>View and manage teacher information</CardDescription>

              {/* Filters Row */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 items-start sm:items-center justify-between">
                {/* Search */}
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, ID or subject..."
                    className="pl-8 w-full"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      resetPage();
                    }}
                  />
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-4 items-center">
                  
                  {/* Roles per page */}

                  <div className="flex items-center space-x-2">
                  <span className="text-sm">Rows per page:</span>
                  <Select
                    value={rowsPerPage.toString()}
                    onValueChange={handleRowsPerPageChange}
                  >
                    <SelectTrigger className="w-[80px]">
                      <SelectValue placeholder="Rows" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="25">25</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                  {/* Show Inactive Switch */}
                  <div className="flex items-center gap-2">
                    <label htmlFor="show-inactive" className="text-sm">
                      Show Inactive
                    </label>
                    <Switch
                      id="show-inactive"
                      checked={showInactive}
                      onCheckedChange={(v) => {
                        setShowInactive(v);
                        if (showInactive) {
                          setStatusFilter("active");
                        } else {
                          setStatusFilter("All");
                        }
                        resetPage();
                      }}
                    />
                  </div>

                  {/* Levels Select */}
                  <Select value={selectedLevels} onValueChange={handleLevelChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Levels" />
                    </SelectTrigger>
                    <SelectContent>
                      {allLevels.map((lvl) => (
                        <SelectItem key={lvl} value={lvl}>
                          {lvl === "All" ? "All Levels" : lvl}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Status Select */}
                  <Select value={showInactive ? statusFilter: "active"}
                    onValueChange={handleStatusChange} disabled={!showInactive}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              {/* Teachers Table */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Teacher</TableHead>
                    <TableHead>Subjects</TableHead>
                    <TableHead>Levels</TableHead>
                    <TableHead>Lesson Plans</TableHead>
                    <TableHead>Test Scripts</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentSlice.map((teacher) => (
                    <TableRow key={teacher.id}>
                      {/* Teacher Col */}
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>
                              {teacher.name
                                .split(" ")
                                .map((n: string) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{teacher.name}</p>
                            <p className="text-sm text-muted-foreground">{teacher.id}</p>
                          </div>
                        </div>
                      </TableCell>

                      {/* Subjects */}
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {teacher.subjects.map((subject: string, i: number) => (
                            <Badge key={i} variant="outline">
                              {subject}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>

                      {/* Levels */}
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {teacher.levels.map((level: string, i: number) => (
                            <Badge key={i} variant="outline">
                              {level}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>

                      {/* Lesson Plan */}
                      <TableCell>{workBadge(teacher.lessonPlan)}</TableCell>

                      {/* Test Script */}
                      <TableCell>{workBadge(teacher.testScript)}</TableCell>

                      {/* Status */}
                      <TableCell>
                        <Badge variant={statusBadgeVariant(teacher.status)}>
                          {teacher.status === "active" ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>

                      {/* Actions */}
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
                            <DropdownMenuItem
                              className="cursor-pointer"
                              onClick={() => getProfile(teacher)}
                            >
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="cursor-pointer"
                              onClick={() => editDetails(teacher)}
                            >
                              Edit Details
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => getSchedule(teacher)}>
                              <Calendar className="mr-2 h-4 w-4" />
                              View Schedule
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => viewLessonPlan(teacher)}>
                              <FileText className="mr-2 h-4 w-4" />
                              View Lesson Plans
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-600 cursor-pointer"
                              onClick={() => deactivate(teacher)}
                            >
                              Deactivate
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}

                  {currentSlice.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        No teachers found matching your filters.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>

              {/* Pagination Controls */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
                {/* Range Display */}
                <div className="text-sm text-muted-foreground">
                  Showing <strong>{startIndexDisplay}</strong>–<strong>{endIndexDisplay}</strong> of{" "}
                  <strong>{filteredTeachers.length}</strong> teachers
                </div>

                {/* Pagination Buttons */}
                <div className="flex items-center space-x-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={prevPage}
                    disabled={currentPageSafe === 1}
                    className="outline"
                  >
                    Previous
                  </Button>

                  {/* Example numeric page indicator (simple). For large page counts, you might add ellipsis logic. */}
                  <div className="text-sm">
                    Page {currentPageSafe} of {totalPages}
                  </div>

                  <Button
                    variant="default"
                    size="sm"
                    onClick={nextPage}
                    disabled={currentPageSafe === totalPages}
                    className="outline"
                  >
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ------------------------------------------------------------------- */}
        {/* Sponsors Tab (placeholder) */}
        {/* ------------------------------------------------------------------- */}
        <TabsContent value="sponsors" className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold">Class Sponsors</h3>
              <p className="text-muted-foreground">
                Teachers who are currently sponsors ({sponsorTeachers.length}).
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ------------------------------------------------------------------- */}
        {/* Committee Tab (placeholder) */}
        {/* ------------------------------------------------------------------- */}
        <TabsContent value="committee" className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold">Committee Members</h3>
              <p className="text-muted-foreground">
                Teachers who are part of administrative committees ({committeeTeachers.length}).
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Level Distribution</CardTitle>
                <CardDescription>Teachers by level</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {allLevels.filter((l) => l!== "All").map((level, i) => {
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

