"use client"

import React, { useState, useMemo } from 'react';
import { Search, Plus, Filter, MoreVertical, Edit, Trash2, UserCheck, Users, GraduationCap, BookOpen, Shield, ChevronLeft, ChevronRight, ArrowUpDown, ArrowUp, ArrowDown, X, Eye, EyeOff } from 'lucide-react';
import MultiStepUserModal from '@/components/modal';
import Button from '@/components/ui/button/Button';

const UserManagementDashboard = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState('student');
  const [editingUser, setEditingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);
  const [adminPassword, setAdminPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [editStep, setEditStep] = useState(1);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Sorting state
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  // Filter state
  const [statusFilter, setStatusFilter] = useState('all');
  const [gradeFilter, setGradeFilter] = useState('all');
  const [subjectFilter, setSubjectFilter] = useState('all');

  // Sample data - expanded for pagination demo
const [users, setUsers] = useState([
  { id: 1, name: 'Allison Hill', email: 'allison.hill@school.edu', type: 'student', grade: '11th Grade', status: 'active', joinDate: '2022-07-18', gpa: 2.87, phone: '218.196.0013', address: '386 Shane Harbors' },
  { id: 2, name: 'Abigail Shaffer', email: 'abigail.shaffer@school.edu', type: 'administrator', role: 'Principal', status: 'active', joinDate: '2022-10-25', phone: '001-654-235-1161x559', office: 'C301' },
  { id: 3, name: 'Monica Herrera', email: 'monica.herrera@school.edu', type: 'administrator', role: 'Coordinator', status: 'active', joinDate: '2023-10-20', phone: '(184)959-3103x4131', office: 'A101' },
  { id: 4, name: 'Eliot Scott', email: 'eliot.scott@school.edu', type: 'student', grade: '12th Grade', status: 'active', joinDate: '2023-01-12', gpa: 3.64, phone: '429.271.6743', address: '4783 Giles Street' },
  { id: 5, name: 'Ruth Cook', email: 'ruth.cook@school.edu', type: 'student', grade: '10th Grade', status: 'active', joinDate: '2022-11-02', gpa: 2.31, phone: '284.174.0654', address: '1836 Victoria Station' },
  { id: 6, name: 'James Holloway', email: 'james.holloway@school.edu', type: 'administrator', role: 'Dean', status: 'active', joinDate: '2021-03-14', phone: '274-205-3701', office: 'B210' },
  { id: 7, name: 'Natalie Greer', email: 'natalie.greer@school.edu', type: 'student', grade: '9th Grade', status: 'inactive', joinDate: '2023-05-30', gpa: 1.98, phone: '982-781-0341', address: '296 Sunset Avenue' },
  { id: 8, name: 'Isaiah Watkins', email: 'isaiah.watkins@school.edu', type: 'administrator', role: 'Counselor', status: 'active', joinDate: '2020-09-01', phone: '417-223-8822', office: 'C120' },
  { id: 9, name: 'Olivia Dean', email: 'olivia.dean@school.edu', type: 'student', grade: '12th Grade', status: 'active', joinDate: '2023-04-14', gpa: 3.91, phone: '319-001-7745', address: '17 Elk Drive' },
  { id: 10, name: 'Caleb Lewis', email: 'caleb.lewis@school.edu', type: 'student', grade: '11th Grade', status: 'active', joinDate: '2022-09-19', gpa: 2.45, phone: '508-311-6671', address: '56 Longfield Road' },
  { id: 11, name: 'Ella Morgan', email: 'ella.morgan@school.edu', type: 'student', grade: '10th Grade', status: 'inactive', joinDate: '2023-03-22', gpa: 1.75, phone: '404-332-1197', address: '99 Poplar Avenue' },
  { id: 12, name: 'Daniel Perry', email: 'daniel.perry@school.edu', type: 'student', grade: '11th Grade', status: 'active', joinDate: '2021-11-18', gpa: 3.02, phone: '607-120-4488', address: '341 River Road' },
  { id: 13, name: 'Sophie Grant', email: 'sophie.grant@school.edu', type: 'administrator', role: 'Vice Principal', status: 'active', joinDate: '2019-06-09', phone: '339-876-0152', office: 'D401' },
  { id: 14, name: 'Levi Sanders', email: 'levi.sanders@school.edu', type: 'student', grade: '9th Grade', status: 'active', joinDate: '2022-08-27', gpa: 2.66, phone: '412-450-8213', address: '88 Kennedy Lane' },
  { id: 15, name: 'Victoria Adams', email: 'victoria.adams@school.edu', type: 'administrator', role: 'Registrar', status: 'active', joinDate: '2020-12-01', phone: '913-267-0098', office: 'Admin' },
  { id: 16, name: 'Liam Murphy', email: 'liam.murphy@school.edu', type: 'student', grade: '10th Grade', status: 'active', joinDate: '2023-07-08', gpa: 2.74, phone: '205-441-0085', address: '44 Fairview Terrace' },
  { id: 17, name: 'Zoey Foster', email: 'zoey.foster@school.edu', type: 'student', grade: '12th Grade', status: 'inactive', joinDate: '2021-05-13', gpa: 1.59, phone: '718-395-0193', address: '161 Aspen Drive' },
  { id: 18, name: 'Jack Nelson', email: 'jack.nelson@school.edu', type: 'administrator', role: 'IT Manager', status: 'active', joinDate: '2018-04-03', phone: '847-668-0029', office: 'Tech Lab' },
  { id: 19, name: 'Aria Bell', email: 'aria.bell@school.edu', type: 'student', grade: '11th Grade', status: 'active', joinDate: '2023-02-21', gpa: 3.15, phone: '646-001-1190', address: '10 Maplewood Crescent' },
  { id: 20, name: 'Owen Martinez', email: 'owen.martinez@school.edu', type: 'student', grade: '9th Grade', status: 'active', joinDate: '2023-06-25', gpa: 2.22, phone: '303-551-2284', address: '7 Kings Way' },
  { id: 21, name: 'Camila Torres', email: 'camila.torres@school.edu', type: 'student', grade: '12th Grade', status: 'active', joinDate: '2021-01-09', gpa: 3.67, phone: '520-319-6612', address: '73 Forest Circle' },
  { id: 22, name: 'Henry Powell', email: 'henry.powell@school.edu', type: 'administrator', role: 'Examiner', status: 'active', joinDate: '2020-08-12', phone: '608-495-7744', office: 'E300' },
  { id: 23, name: 'Avery Jenkins', email: 'avery.jenkins@school.edu', type: 'student', grade: '10th Grade', status: 'active', joinDate: '2023-10-01', gpa: 2.98, phone: '508-839-5531', address: '6 Riverbend Street' },
  { id: 24, name: 'Ethan Brooks', email: 'ethan.brooks@school.edu', type: 'administrator', role: 'Librarian', status: 'active', joinDate: '2017-03-03', phone: '217-428-9192', office: 'Library' },
  { id: 25, name: 'Mila Mitchell', email: 'mila.mitchell@school.edu', type: 'student', grade: '11th Grade', status: 'active', joinDate: '2023-09-16', gpa: 3.12, phone: '712-234-7812', address: '22 Woodland Drive' },
  { id: 26, name: 'Logan Hayes', email: 'logan.hayes@school.edu', type: 'student', grade: '10th Grade', status: 'active', joinDate: '2022-05-11', gpa: 2.88, phone: '987-654-3210', address: '1234 Pine Hill' },
  { id: 27, name: 'Stella Morris', email: 'stella.morris@school.edu', type: 'student', grade: '9th Grade', status: 'inactive', joinDate: '2023-04-29', gpa: 1.92, phone: '909-888-2345', address: '75 Ocean View Rd' },
  { id: 28, name: 'William Reed', email: 'william.reed@school.edu', type: 'administrator', role: 'Janitor', status: 'active', joinDate: '2016-01-15', phone: '201-111-1234', office: 'Facilities' },
  { id: 29, name: 'Chloe Ross', email: 'chloe.ross@school.edu', type: 'student', grade: '12th Grade', status: 'active', joinDate: '2023-02-12', gpa: 3.84, phone: '219-884-3333', address: '199 Elm Tree Circle' },
  { id: 30, name: 'Benjamin James', email: 'benjamin.james@school.edu', type: 'student', grade: '11th Grade', status: 'active', joinDate: '2022-12-01', gpa: 2.41, phone: '800-123-9876', address: '1011 Birch Street' },
  { id: 31, name: 'Nora Griffin', email: 'nora.griffin@school.edu', type: 'student', grade: '10th Grade', status: 'active', joinDate: '2022-01-07', gpa: 2.79, phone: '212-988-2222', address: '9 Rose Lane' },
  { id: 32, name: 'Wyatt Kim', email: 'wyatt.kim@school.edu', type: 'student', grade: '9th Grade', status: 'active', joinDate: '2023-03-05', gpa: 2.91, phone: '402-555-1313', address: '33 Eastview Blvd' },
  { id: 33, name: 'Hazel Rivera', email: 'hazel.rivera@school.edu', type: 'student', grade: '11th Grade', status: 'inactive', joinDate: '2022-10-08', gpa: 1.73, phone: '315-901-1414', address: '201 Magnolia Ave' },
  { id: 34, name: 'Leo Cooper', email: 'leo.cooper@school.edu', type: 'administrator', role: 'Security', status: 'active', joinDate: '2015-05-25', phone: '914-202-7777', office: 'Gate House' },
  { id: 35, name: 'Grace Foster', email: 'grace.foster@school.edu', type: 'student', grade: '12th Grade', status: 'active', joinDate: '2022-06-19', gpa: 3.42, phone: '617-884-8899', address: '8 Greenwood Drive' },
  { id: 36, name: 'Lucas Bennett', email: 'lucas.bennett@school.edu', type: 'student', grade: '9th Grade', status: 'active', joinDate: '2023-11-07', gpa: 2.37, phone: '929-101-2222', address: '17 Hickory St' },
  { id: 37, name: 'Penelope Carter', email: 'penelope.carter@school.edu', type: 'student', grade: '10th Grade', status: 'active', joinDate: '2023-01-14', gpa: 2.92, phone: '804-711-4444', address: '56 Ridgeview Rd' },
  { id: 38, name: 'Henry Cooper', email: 'henry.cooper@school.edu', type: 'student', grade: '11th Grade', status: 'active', joinDate: '2021-09-30', gpa: 2.99, phone: '845-222-8899', address: '11 Birchwood Place' },
  { id: 39, name: 'Ella Simmons', email: 'ella.simmons@school.edu', type: 'administrator', role: 'Accountant', status: 'active', joinDate: '2019-02-01', phone: '718-333-7788', office: 'Finance' },
  { id: 40, name: 'Alexander Gray', email: 'alexander.gray@school.edu', type: 'student', grade: '12th Grade', status: 'active', joinDate: '2023-08-21', gpa: 3.26, phone: '914-111-5656', address: '112 Meadow Lane' }
]);


  const userTypes = [
    { key: 'all', label: 'All Users', icon: Users, count: users.length },
    { key: 'student', label: 'Students', icon: GraduationCap, count: users.filter(u => u.type === 'student').length },
    { key: 'teacher', label: 'Teachers', icon: BookOpen, count: users.filter(u => u.type === 'teacher').length },
    { key: 'administrator', label: 'Administrators', icon: Shield, count: users.filter(u => u.type === 'administrator').length },
  ];

  // Filtered and sorted users
  const filteredAndSortedUsers = useMemo(() => {
    let filtered = users.filter(user => {
      const matchesTab = activeTab === 'all' || user.type === activeTab;
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
      const matchesGrade = gradeFilter === 'all' || user.grade === gradeFilter;
      const matchesSubject = subjectFilter === 'all' || user.subject === subjectFilter;
      
      return matchesTab && matchesSearch && matchesStatus && matchesGrade && matchesSubject;
    });

    // Sort users
    filtered.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      
      if (sortField === 'joinDate') {
        aVal = new Date(aVal);
        bVal = new Date(bVal);
      }
      
      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }
      
      if (sortDirection === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    return filtered;
  }, [users, activeTab, searchTerm, statusFilter, gradeFilter, subjectFilter, sortField, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredAndSortedUsers.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return <ArrowUpDown className="h-4 w-4" />;
    return sortDirection === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />;
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setEditStep(1);
    setShowEditModal(true);
  };

  const handleDelete = (user) => {
    setDeletingUser(user);
    setShowDeleteModal(true);
  };

  const handleToggleStatus = (userId) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
  };

  const confirmDelete = () => {
    if (adminPassword === 'admin123') { // Mock password check
      setUsers(users.filter(user => user.id !== deletingUser.id));
      setShowDeleteModal(false);
      setDeletingUser(null);
      setAdminPassword('');
    } else {
      alert('Incorrect password');
    }
  };

  const resetFilters = () => {
    setStatusFilter('all');
    setGradeFilter('all');
    setSubjectFilter('all');
  };

  const getStatusColor = (status) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const getUserTypeColor = (type) => {
    switch (type) {
      case 'student': return 'bg-blue-100 text-blue-800';
      case 'teacher': return 'bg-purple-100 text-purple-800';
      case 'administrator': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const EditModal = () => {
    if (!editingUser) return null;

    const renderStep1 = () => (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Basic Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
            <input 
              type="text" 
              defaultValue={editingUser.name}
              className="w-full p-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Email</label>
            <input 
              type="email" 
              defaultValue={editingUser.email}
              className="w-full p-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
            <input 
              type="tel" 
              defaultValue={editingUser.phone}
              className="w-full p-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Status</label>
            <select 
              defaultValue={editingUser.status}
              className="w-full p-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>
    );

    const renderStep2 = () => (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">
          {editingUser.type === 'student' ? 'Academic Information' : 
           editingUser.type === 'teacher' ? 'Teaching Information' : 
           'Administrative Information'}
        </h3>
        
        {editingUser.type === 'student' && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Grade</label>
              <select 
                defaultValue={editingUser.grade}
                className="w-full p-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="9th Grade">9th Grade</option>
                <option value="10th Grade">10th Grade</option>
                <option value="11th Grade">11th Grade</option>
                <option value="12th Grade">12th Grade</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">GPA</label>
              <input 
                type="number" 
                step="0.1"
                min="0"
                max="4.0"
                defaultValue={editingUser.gpa}
                className="w-full p-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-foreground mb-2">Address</label>
              <textarea 
                defaultValue={editingUser.address}
                className="w-full p-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                rows="3"
              />
            </div>
          </div>
        )}

        {editingUser.type === 'teacher' && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Subject</label>
              <input 
                type="text" 
                defaultValue={editingUser.subject}
                className="w-full p-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Department</label>
              <select 
                defaultValue={editingUser.department}
                className="w-full p-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="STEM">STEM</option>
                <option value="Humanities">Humanities</option>
                <option value="Arts">Arts</option>
                <option value="Physical Education">Physical Education</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Years of Experience</label>
              <input 
                type="number" 
                min="0"
                defaultValue={editingUser.experience}
                className="w-full p-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        )}

        {editingUser.type === 'administrator' && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Role</label>
              <select 
                defaultValue={editingUser.role}
                className="w-full p-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="Principal">Principal</option>
                <option value="Vice Principal">Vice Principal</option>
                <option value="Dean">Dean</option>
                <option value="Coordinator">Coordinator</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Office</label>
              <input 
                type="text" 
                defaultValue={editingUser.office}
                className="w-full p-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        )}
      </div>
    );

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-card rounded-lg border border-border p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">
              Edit {editingUser.type.charAt(0).toUpperCase() + editingUser.type.slice(1)}
            </h2>
            <button 
              onClick={() => setShowEditModal(false)}
              className="p-1 hover:bg-muted rounded text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center mb-6">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
              editStep >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}>
              1
            </div>
            <div className={`flex-1 h-1 mx-2 ${editStep >= 2 ? 'bg-primary' : 'bg-muted'}`}></div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
              editStep >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}>
              2
            </div>
          </div>

          {editStep === 1 ? renderStep1() : renderStep2()}

          <div className="flex justify-between mt-8">
            <button 
              onClick={() => editStep > 1 ? setEditStep(editStep - 1) : setShowEditModal(false)}
              className="px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors"
            >
              {editStep > 1 ? 'Previous' : 'Cancel'}
            </button>
            <button 
              onClick={() => editStep < 2 ? setEditStep(editStep + 1) : setShowEditModal(false)}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              {editStep < 2 ? 'Next' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">User Management</h1>
              <p className="text-muted-foreground">Manage students, teachers, and administrators</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {userTypes.map((type) => {
            const IconComponent = type.icon;
            return (
              <div
                key={type.key}
                className={`p-6 rounded-lg border cursor-pointer transition-all ${
                  activeTab === type.key 
                    ? 'bg-primary/5 border-primary' 
                    : 'bg-card border-border hover:bg-card/80'
                }`}
                onClick={() => {
                  setActiveTab(type.key);
                  setCurrentPage(1);
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{type.label}</p>
                    <p className="text-2xl font-bold text-foreground">{type.count}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${
                    type.key === 'student' ? 'bg-blue-100' :
                    type.key === 'teacher' ? 'bg-purple-100' :
                    type.key === 'administrator' ? 'bg-orange-100' : 'bg-gray-100'
                  }`}>
                    <IconComponent className={`h-6 w-6 ${
                      type.key === 'student' ? 'text-blue-600' :
                      type.key === 'teacher' ? 'text-purple-600' :
                      type.key === 'administrator' ? 'text-orange-600' : 'text-gray-600'
                    }`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              type="text"
              placeholder="Search users..."
              className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setShowFilterModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg hover:bg-card/80 transition-colors"
            >
              <Filter className="h-4 w-4" />
              Filter
            </button>
            <button 
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Add User
            </button>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-muted/70"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center gap-1">
                      User
                      {getSortIcon('name')}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Details</th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-muted/70"
                    onClick={() => handleSort('status')}
                  >
                    <div className="flex items-center gap-1">
                      Status
                      {getSortIcon('status')}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-muted/70"
                    onClick={() => handleSort('joinDate')}
                  >
                    <div className="flex items-center gap-1">
                      Join Date
                      {getSortIcon('joinDate')}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {paginatedUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-medium text-primary">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-foreground">{user.name}</div>
                          <div className="text-sm text-muted-foreground">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getUserTypeColor(user.type)}`}>
                        {user.type.charAt(0).toUpperCase() + user.type.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {user.type === 'student' && user.grade}
                      {user.type === 'teacher' && user.subject}
                      {user.type === 'administrator' && user.role}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {new Date(user.joinDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleEdit(user)}
                          className="p-1 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors"
                          title="Edit User"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleToggleStatus(user.id)}
                          className="p-1 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors"
                          title="Toggle Status"
                        >
                          <UserCheck className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(user)}
                          className="p-1 hover:bg-muted rounded text-muted-foreground hover:text-red-500 transition-colors"
                          title="Delete User"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                        <button className="p-1 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between p-4 border-t border-border">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Show</span>
              <select 
                value={itemsPerPage} 
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="bg-background border border-border rounded px-2 py-1 text-sm"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <span className="text-sm text-muted-foreground">
                of {filteredAndSortedUsers.length} results
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Button 
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded hover:bg-muted disabled:opacity-50 disabled:hover:bg-transparent"
                variant='outline'
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              
              <div className="flex gap-0.5">
                {totalPages <= 5 ? (
                  // If 5 or fewer pages, show them all
                  Array.from({ length: totalPages }, (_, i) => {
                    const page = i + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-1 rounded text-sm ${
                          currentPage === page
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-muted text-muted-foreground'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })
                ) : (
                  // More than 5 pages
                  <>
                    {/* First Page */}
                    <button
                      onClick={() => setCurrentPage(1)}
                      className={`px-3 py-1 rounded text-sm ${
                        currentPage === 1
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted text-muted-foreground'
                      }`}
                    >
                      1
                    </button>

                    {/* Ellipsis if currentPage is far from beginning */}
                    {currentPage > 3 && <span className="px-2">...</span>}

                    {/* Middle Pages */}
                    {currentPage > 1 && currentPage < totalPages && (
                      <button
                        onClick={() => setCurrentPage(currentPage)}
                        className="px-3 py-1 rounded text-sm bg-primary text-primary-foreground"
                      >
                        {currentPage}
                      </button>
                    )}

                    {/* Ellipsis if currentPage is far from end */}
                    {currentPage < totalPages - 2 && <span className="px-2">...</span>}

                    {/* Last Page */}
                    <button
                      onClick={() => setCurrentPage(totalPages)}
                      className={`px-3 py-1 rounded text-sm ${
                        currentPage === totalPages
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted text-muted-foreground'
                      }`}
                    >
                      {totalPages}
                    </button>
                  </>
                )}
              </div>

              
              <Button 
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded hover:bg-muted disabled:opacity-50 disabled:hover:bg-transparent"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Filter Modal */}
        {showFilterModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-card rounded-lg border border-border p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">Filter Users</h2>
                <button 
                  onClick={() => setShowFilterModal(false)}
                  className="p-1 hover:bg-muted rounded text-muted-foreground hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Status</label>
                  <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full p-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Grade (Students)</label>
                  <select 
                    value={gradeFilter}
                    onChange={(e) => setGradeFilter(e.target.value)}
                    className="w-full p-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="all">All Grades</option>
                    <option value="9th Grade">9th Grade</option>
                    <option value="10th Grade">10th Grade</option>
                    <option value="11th Grade">11th Grade</option>
                    <option value="12th Grade">12th Grade</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Subject (Teachers)</label>
                  <select 
                    value={subjectFilter}
                    onChange={(e) => setSubjectFilter(e.target.value)}
                    className="w-full p-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="all">All Subjects</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Science">Science</option>
                    <option value="English">English</option>
                    <option value="History">History</option>
                  </select>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button 
                  onClick={resetFilters}
                  className="flex-1 px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors"
                >
                  Reset
                </button>
                <button 
                  onClick={() => {
                    setShowFilterModal(false);
                    setCurrentPage(1);
                  }}
                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && deletingUser && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-card rounded-lg border border-border p-6 w-full max-w-md">
              <h2 className="text-lg font-semibold text-foreground mb-4">Confirm Deletion</h2>
              <p className="text-sm text-muted-foreground mb-4">
                You are about to delete <strong>{deletingUser.name}</strong>. This action cannot be undone.
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                Please enter your admin password to confirm:
              </p>
              
              <div className="relative mb-4">
                <input 
                  type={showPassword ? "text" : "password"}
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full p-2 pr-10 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => {
                    setShowDeleteModal(false);
                    setDeletingUser(null);
                    setAdminPassword('');
                    setShowPassword(false);
                  }}
                  className="flex-1 px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmDelete}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  disabled={!adminPassword}
                >
                  Delete User
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {showEditModal && <EditModal />}

              {/* The Modal */}
      <MultiStepUserModal 
        showModal={showAddModal}
        onClose={() => setShowAddModal(false)}
      />

      </div>
    </div>
  );
};

export default UserManagementDashboard;