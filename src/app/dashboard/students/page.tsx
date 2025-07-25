'use client';
import React, { useState } from 'react';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
	ChevronDown,
	MoreHorizontal,
	Filter,
	Search,
	UserPlus,
	Download,
	FileText,
} from 'lucide-react';

const STUDENTS = [
	// ... (same data as before)
	{
		id: 'STD001',
		name: 'John Doe',
		class: 'Grade 10A',
		gender: 'Male',
		guardian: 'Robert Doe',
		contactNumber: '+1234567890',
		status: 'active',
		feeStatus: 'paid',
	},
	// other students...
	{
		id: 'STD010',
		name: 'Ava Jackson',
		class: 'Grade 10B',
		gender: 'Female',
		guardian: 'Robert Jackson',
		contactNumber: '+1012345678',
		status: 'inactive',
		feeStatus: 'overdue',
	},
];

export default function Students() {
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedClass, setSelectedClass] = useState<string>('all');
	const [statusFilter, setStatusFilter] = useState<string>('all');

	const filteredStudents = STUDENTS.filter((student) => {
		const matchesSearch =
			student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			student.id.toLowerCase().includes(searchQuery.toLowerCase());
		const matchesClass =
			selectedClass !== 'all' ? student.class === selectedClass : true;
		const matchesStatus =
			statusFilter !== 'all' ? student.status === statusFilter : true;

		return matchesSearch && matchesClass && matchesStatus;
	});

	const classes = Array.from(new Set(STUDENTS.map((student) => student.class)));

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<h1 className="text-3xl font-bold tracking-tight">Students Management</h1>
				<Button>
					<UserPlus className="mr-2 h-4 w-4" /> Add New Student
				</Button>
			</div>

			<Card>
				<CardHeader className="pb-3">
					<CardTitle>Students Overview</CardTitle>
					<CardDescription>
						Manage students, view their details, and track their progress
					</CardDescription>

					<div className="flex flex-col sm:flex-row gap-4 pt-4 items-start sm:items-center justify-between">
						<div className="relative w-full max-w-sm">
							<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
							<Input
								placeholder="Search by name or ID..."
								className="pl-8 w-full"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
						</div>

						<div className="flex flex-wrap gap-2 items-center">
							<Select value={selectedClass} onValueChange={setSelectedClass}>
								<SelectTrigger className="w-[180px]">
									<SelectValue placeholder="Filter by Class" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">All Classes</SelectItem>
									{classes.map((className) => (
										<SelectItem key={className} value={className}>
											{className}
										</SelectItem>
									))}
								</SelectContent>
							</Select>

							<Select value={statusFilter} onValueChange={setStatusFilter}>
								<SelectTrigger className="w-[180px]">
									<SelectValue placeholder="Filter by Status" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">All Status</SelectItem>
									<SelectItem value="active">Active</SelectItem>
									<SelectItem value="inactive">Inactive</SelectItem>
								</SelectContent>
							</Select>

							<Button variant="outline">
								<Filter className="mr-2 h-4 w-4" /> More Filters
							</Button>

							<Button variant="outline">
								<Download className="mr-2 h-4 w-4" /> Export
							</Button>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Student ID</TableHead>
								<TableHead>Name</TableHead>
								<TableHead>Class</TableHead>
								<TableHead>Guardian</TableHead>
								<TableHead>Contact</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Fees</TableHead>
								<TableHead className="text-right">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filteredStudents.map((student) => (
								<TableRow key={student.id}>
									<TableCell className="font-medium">{student.id}</TableCell>
									<TableCell>{student.name}</TableCell>
									<TableCell>{student.class}</TableCell>
									<TableCell>{student.guardian}</TableCell>
									<TableCell>{student.contactNumber}</TableCell>
									<TableCell>
										<Badge
											variant={
												student.status === 'active' ? 'default' : 'secondary'
											}
										>
											{student.status === 'active' ? 'Active' : 'Inactive'}
										</Badge>
									</TableCell>
									<TableCell>
										<Badge
											variant={
												student.feeStatus === 'paid'
													? 'outline'
													: student.feeStatus === 'pending'
													? 'secondary'
													: 'destructive'
											}
										>
											{student.feeStatus.charAt(0).toUpperCase() +
												student.feeStatus.slice(1)}
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
												<DropdownMenuItem>
													View Academic Record
												</DropdownMenuItem>
												<DropdownMenuSeparator />
												<DropdownMenuItem>Change Class</DropdownMenuItem>
												<DropdownMenuItem className="text-red-600">
													Deactivate
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
							))}
							{filteredStudents.length === 0 && (
								<TableRow>
									<TableCell colSpan={8} className="h-24 text-center">
										No students found matching your filters
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>

					<div className="flex items-center justify-between mt-4">
						<div className="text-sm text-muted-foreground">
							Showing <strong>{filteredStudents.length}</strong> of{' '}
							<strong>{STUDENTS.length}</strong> students
						</div>
						<div className="flex items-center space-x-2">
							<Button variant="outline" size="sm" disabled>
								Previous
							</Button>
							<Button
								variant="outline"
								size="sm"
								className="bg-primary text-primary-foreground"
							>
								1
							</Button>
							<Button variant="outline" size="sm">
								2
							</Button>
							<Button variant="outline" size="sm">
								Next
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>

			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{/* Enrollment Summary */}
				<Card>
					<CardHeader className="pb-2">
						<CardTitle>Student Enrollment</CardTitle>
						<CardDescription>Distribution by grade level</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="h-40 flex items-end justify-around">
							{['9th', '10th', '11th', '12th'].map((grade, i) => (
								<div key={i} className="flex flex-col items-center">
									<div
										className="h-32 w-12 bg-primary rounded-t-md flex items-end justify-center"
										style={{
											height: `${[60, 90, 70, 50][i]}%`,
											opacity: 0.7 + i * 0.1,
										}}
									></div>
									<div className="mt-2 text-sm text-muted-foreground">
										{grade}
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				{/* Gender Summary */}
				<Card>
					<CardHeader className="pb-2">
						<CardTitle>Gender Distribution</CardTitle>
						<CardDescription>Male vs Female ratio</CardDescription>
					</CardHeader>
					<CardContent className="flex justify-center">
						<div className="flex items-center justify-center w-40 h-40 rounded-full border-8 border-primary relative">
							<div className="absolute w-40 h-40 rounded-full overflow-hidden">
								<div className="absolute bg-blue-400 h-full w-1/2 left-0"></div>
								<div className="absolute bg-pink-400 h-full w-1/2 right-0"></div>
							</div>
							<div className="bg-white dark:bg-gray-950 w-28 h-28 rounded-full z-10 flex flex-col items-center justify-center">
								<div className="flex gap-3">
									<div className="flex items-center gap-1">
										<div className="w-3 h-3 bg-blue-400 rounded-full"></div>
										<span className="text-xs">M</span>
									</div>
									<div className="flex items-center gap-1">
										<div className="w-3 h-3 bg-pink-400 rounded-full"></div>
										<span className="text-xs">F</span>
									</div>
								</div>
								<div className="text-2xl font-semibold mt-1">50:50</div>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Fee Status Summary */}
				<Card>
					<CardHeader className="pb-2">
						<CardTitle>Fee Payment Status</CardTitle>
						<CardDescription>Overall payment compliance</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="flex justify-between items-center">
								<span>Paid</span>
								<span>70%</span>
							</div>
							<div className="w-full bg-gray-200 rounded-full h-2.5 ">
								<div
									className="bg-green-500 h-2.5 rounded-full"
									style={{ width: '70%' }}
								></div>
							</div>

							<div className="flex justify-between items-center">
								<span>Pending</span>
								<span>20%</span>
							</div>
							<div className="w-full rounded-full h-2.5 ">
								<div
									className="bg-yellow-500 h-2.5 rounded-full"
									style={{ width: '20%' }}
								></div>
							</div>

							<div className="flex justify-between items-center">
								<span>Overdue</span>
								<span>10%</span>
							</div>
							<div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
								<div
									className="bg-red-500 h-2.5 rounded-full"
									style={{ width: '10%' }}
								></div>
							</div>

							<Button variant="outline" className="w-full mt-4">
								<FileText className="mr-2 h-4 w-4" /> View Detailed Report
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}