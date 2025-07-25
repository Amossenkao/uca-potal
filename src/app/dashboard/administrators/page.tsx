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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal, Search, UserPlus, Mail, Phone, Lock, ShieldAlert } from "lucide-react";

// Mock admin data
const ADMINISTRATORS = [
  {
    id: "ADM001",
    name: "Thomas Wilson",
    role: "Principal",
    department: "Administration",
    email: "thomas.wilson@school.edu",
    phone: "+1234567890",
    access: "full-access",
    lastActive: "Today, 9:30 AM",
    status: "active"
  },
  {
    id: "ADM002",
    name: "Jessica Martinez",
    role: "Vice Principal",
    department: "Academic Affairs",
    email: "jessica.martinez@school.edu",
    phone: "+1987654321",
    access: "full-access",
    lastActive: "Today, 8:45 AM",
    status: "active"
  },
  {
    id: "ADM003",
    name: "Richard Thompson",
    role: "Finance Director",
    department: "Finance",
    email: "richard.thompson@school.edu",
    phone: "+1122334455",
    access: "restricted",
    lastActive: "Yesterday",
    status: "active"
  },
  {
    id: "ADM004",
    name: "Mary Johnson",
    role: "HR Manager",
    department: "Human Resources",
    email: "mary.johnson@school.edu",
    phone: "+1567890123",
    access: "restricted",
    lastActive: "2 days ago",
    status: "active"
  },
  {
    id: "ADM005",
    name: "Daniel Brown",
    role: "IT Administrator",
    department: "Information Technology",
    email: "daniel.brown@school.edu",
    phone: "+1345678901",
    access: "system-admin",
    lastActive: "Today, 11:15 AM",
    status: "active"
  },
  {
    id: "ADM006",
    name: "Patricia Davis",
    role: "Registrar",
    department: "Admissions",
    email: "patricia.davis@school.edu",
    phone: "+1234098765",
    access: "restricted",
    lastActive: "3 days ago",
    status: "inactive"
  },
  {
    id: "ADM007",
    name: "Michael Smith",
    role: "Facilities Manager",
    department: "Facilities",
    email: "michael.smith@school.edu",
    phone: "+1678901234",
    access: "limited",
    lastActive: "Yesterday",
    status: "active"
  }
];

export default function Administrators() {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Apply filters to admin data
  const filteredAdmins = ADMINISTRATORS.filter(admin => {
    const matchesSearch = admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.department.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Administrators Management</h1>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" /> Add New Administrator
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>School Administration</CardTitle>
          <CardDescription>Manage administrative staff and their system access</CardDescription>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4 items-start sm:items-center justify-between">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, role or department..."
                className="pl-8 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Access Level</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAdmins.map((admin) => (
                <TableRow key={admin.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{admin.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{admin.name}</p>
                        <p className="text-sm text-muted-foreground">{admin.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{admin.role}</TableCell>
                  <TableCell>{admin.department}</TableCell>
                  <TableCell>
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center text-sm">
                        <Mail className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                        <span className="text-muted-foreground">{admin.email}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                        <span className="text-muted-foreground">{admin.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      admin.access === "full-access" ? "default" :
                      admin.access === "system-admin" ? "destructive" :
                      admin.access === "restricted" ? "secondary" : "outline"
                    }>
                      {admin.access === "full-access" && "Full Access"}
                      {admin.access === "system-admin" && "System Admin"}
                      {admin.access === "restricted" && "Restricted"}
                      {admin.access === "limited" && "Limited"}
                    </Badge>
                  </TableCell>
                  <TableCell>{admin.lastActive}</TableCell>
                  <TableCell>
                    <Badge variant={admin.status === "active" ? "outline" : "secondary"} className={admin.status === "active" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" : ""}>
                      {admin.status === "active" ? "Active" : "Inactive"}
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
                          <Lock className="mr-2 h-4 w-4" />
                          Manage Permissions
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <ShieldAlert className="mr-2 h-4 w-4" />
                          Security Log
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {admin.status === "active" ? (
                          <DropdownMenuItem className="text-red-600">Deactivate Account</DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem className="text-green-600">Activate Account</DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {filteredAdmins.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center">
                    No administrators found matching your search
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Administrative Hierarchy</CardTitle>
            <CardDescription>School management structure</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col items-center">
              <div className="bg-primary/10 p-3 rounded-lg w-64 mb-4 text-center border border-primary/20">
                <div className="font-semibold">Principal</div>
                <div className="text-sm text-muted-foreground">Thomas Wilson</div>
              </div>
              
              <div className="h-8 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
              
              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="flex flex-col items-center">
                  <div className="h-8 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
                  <div className="bg-blue-50 p-3 rounded-lg w-full text-center border border-blue-100 dark:bg-blue-900/20 dark:border-blue-800">
                    <div className="font-semibold">Vice Principal</div>
                    <div className="text-sm text-muted-foreground">Jessica Martinez</div>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="h-8 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
                  <div className="bg-amber-50 p-3 rounded-lg w-full text-center border border-amber-100 dark:bg-amber-900/20 dark:border-amber-800">
                    <div className="font-semibold">Finance Director</div>
                    <div className="text-sm text-muted-foreground">Richard Thompson</div>
                  </div>
                </div>
              </div>
              
              <div className="h-8 w-full flex items-center justify-center">
                <div className="w-3/4 h-0.5 bg-gray-200 dark:bg-gray-700"></div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 w-full">
                <div className="bg-gray-50 p-2 rounded-lg text-center border border-gray-100 dark:bg-gray-800 dark:border-gray-700 text-sm">
                  <div className="font-medium">HR Manager</div>
                  <div className="text-xs text-muted-foreground truncate">Mary Johnson</div>
                </div>
                <div className="bg-gray-50 p-2 rounded-lg text-center border border-gray-100 dark:bg-gray-800 dark:border-gray-700 text-sm">
                  <div className="font-medium">IT Admin</div>
                  <div className="text-xs text-muted-foreground truncate">Daniel Brown</div>
                </div>
                <div className="bg-gray-50 p-2 rounded-lg text-center border border-gray-100 dark:bg-gray-800 dark:border-gray-700 text-sm">
                  <div className="font-medium">Registrar</div>
                  <div className="text-xs text-muted-foreground truncate">Patricia Davis</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Access Distribution</CardTitle>
            <CardDescription>Administrator permission levels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center pt-4">
              <div className="w-64 h-64">
                <div className="relative h-full w-full rounded-full">
                  {/* Pie chart */}
                  <svg viewBox="0 0 100 100" className="h-full w-full">
                    {/* Full Access - 29% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="#3b82f6"
                      strokeWidth="20"
                      strokeDasharray="251.2"
                      strokeDashoffset="178.35" // 251.2 * (1 - 0.29)
                      transform="rotate(-90 50 50)"
                    />
                    {/* System Admin - 14% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="#ef4444"
                      strokeWidth="20"
                      strokeDasharray="251.2"
                      strokeDashoffset="216.03" // 251.2 * (1 - 0.14)
                      transform="rotate(14.4 50 50)" // -90 + (0.29 * 360)
                    />
                    {/* Restricted - 43% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="#a855f7"
                      strokeWidth="20"
                      strokeDasharray="251.2"
                      strokeDashoffset="143.18" // 251.2 * (1 - 0.43)
                      transform="rotate(64.8 50 50)" // -90 + (0.29 + 0.14) * 360
                    />
                    {/* Limited - 14% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="#94a3b8"
                      strokeWidth="20"
                      strokeDasharray="251.2"
                      strokeDashoffset="216.03" // 251.2 * (1 - 0.14)
                      transform="rotate(219.6 50 50)" // -90 + (0.29 + 0.14 + 0.43) * 360
                    />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                <div className="flex justify-between items-center w-full">
                  <span className="text-sm font-medium">Full Access</span>
                  <span className="text-sm text-muted-foreground">29%</span>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <div className="flex justify-between items-center w-full">
                  <span className="text-sm font-medium">System Admin</span>
                  <span className="text-sm text-muted-foreground">14%</span>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                <div className="flex justify-between items-center w-full">
                  <span className="text-sm font-medium">Restricted</span>
                  <span className="text-sm text-muted-foreground">43%</span>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-slate-400 mr-2"></div>
                <div className="flex justify-between items-center w-full">
                  <span className="text-sm font-medium">Limited</span>
                  <span className="text-sm text-muted-foreground">14%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}