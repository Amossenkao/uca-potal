"use client"

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  School, 
  Settings, 
  Plus, 
  Edit3, 
  Eye, 
  Trash2, 
  Search, 
  Filter,
  Building,
  UserCheck,
  GraduationCap,
  Shield,
  ChevronRight,
  Calendar,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  AlertCircle,
  Clock
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);
  const [showTenantDetails, setShowTenantDetails] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data for demonstration
  const [tenants, setTenants] = useState([
    {
      id: 1,
      schoolName: "Sunrise Elementary School",
      location: "Monrovia, Liberia",
      status: "active",
      studentsCount: 450,
      teachersCount: 25,
      adminCount: 3,
      systemAdmin: {
        name: "John Doe",
        email: "admin@sunrise.edu.lr",
        phone: "+231-777-123456"
      },
      createdDate: "2024-01-15",
      lastActive: "2025-01-27"
    },
    {
      id: 2,
      schoolName: "Liberty High School",
      location: "Paynesville, Liberia",
      status: "pending",
      studentsCount: 0,
      teachersCount: 0,
      adminCount: 0,
      systemAdmin: {
        name: "Mary Johnson",
        email: "admin@liberty.edu.lr",
        phone: "+231-888-654321"
      },
      createdDate: "2025-01-20",
      lastActive: "2025-01-26"
    },
    {
      id: 3,
      schoolName: "Future Leaders Academy",
      location: "Gbarnga, Liberia",
      status: "inactive",
      studentsCount: 200,
      teachersCount: 15,
      adminCount: 2,
      systemAdmin: {
        name: "Samuel Roberts",
        email: "admin@futureleaders.edu.lr",
        phone: "+231-555-987654"
      },
      createdDate: "2023-09-10",
      lastActive: "2024-12-15"
    }
  ]);

  const [onboardingData, setOnboardingData] = useState({
    // School Information
    schoolName: '',
    schoolAddress: '',
    schoolPhone: '',
    schoolEmail: '',
    establishedYear: '',
    schoolType: 'public',
    
    // System Admin Information
    adminFirstName: '',
    adminMiddleName: '',
    adminLastName: '',
    adminEmail: '',
    adminPhone: '',
    adminAddress: '',
    adminDateOfBirth: '',
    adminGender: 'male',
    
    // School Settings
    studentsCanLogin: true,
    teachersCanLogin: true,
    administratorsCanLogin: true,
    teachersCanSubmitGrades: false,
    studentsCanViewPeriodicReports: true,
    studentsCanViewYearlyReports: false,
    
    // Academic Configuration
    academicYear: '2024-2025',
    numberOfTerms: 3,
    termStructure: 'semester'
  });

  const filteredTenants = tenants.filter(tenant => {
    const matchesSearch = tenant.schoolName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tenant.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || tenant.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'inactive': return <AlertCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const handleInputChange = (field, value) => {
    setOnboardingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleOnboardingSubmit = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to create the tenant
    const newTenant = {
      id: tenants.length + 1,
      schoolName: onboardingData.schoolName,
      location: onboardingData.schoolAddress,
      status: 'pending',
      studentsCount: 0,
      teachersCount: 0,
      adminCount: 1,
      systemAdmin: {
        name: `${onboardingData.adminFirstName} ${onboardingData.adminLastName}`,
        email: onboardingData.adminEmail,
        phone: onboardingData.adminPhone
      },
      createdDate: new Date().toISOString().split('T')[0],
      lastActive: new Date().toISOString().split('T')[0]
    };
    
    setTenants([...tenants, newTenant]);
    setShowOnboardingModal(false);
    
    // Reset form
    setOnboardingData({
      schoolName: '',
      schoolAddress: '',
      schoolPhone: '',
      schoolEmail: '',
      establishedYear: '',
      schoolType: 'public',
      adminFirstName: '',
      adminMiddleName: '',
      adminLastName: '',
      adminEmail: '',
      adminPhone: '',
      adminAddress: '',
      adminDateOfBirth: '',
      adminGender: 'male',
      studentsCanLogin: true,
      teachersCanLogin: true,
      administratorsCanLogin: true,
      teachersCanSubmitGrades: false,
      studentsCanViewPeriodicReports: true,
      studentsCanViewYearlyReports: false,
      academicYear: '2024-2025',
      numberOfTerms: 3,
      termStructure: 'semester'
    });
  };

  const DashboardStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Schools</p>
            <p className="text-3xl font-bold text-gray-900">{tenants.length}</p>
          </div>
          <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Building className="h-6 w-6 text-blue-600" />
          </div>
        </div>
        <div className="mt-4">
          <span className="text-green-600 text-sm font-medium">+2 this month</span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Active Schools</p>
            <p className="text-3xl font-bold text-gray-900">
              {tenants.filter(t => t.status === 'active').length}
            </p>
          </div>
          <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
        </div>
        <div className="mt-4">
          <span className="text-green-600 text-sm font-medium">98% uptime</span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Students</p>
            <p className="text-3xl font-bold text-gray-900">
              {tenants.reduce((sum, t) => sum + t.studentsCount, 0)}
            </p>
          </div>
          <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <GraduationCap className="h-6 w-6 text-purple-600" />
          </div>
        </div>
        <div className="mt-4">
          <span className="text-green-600 text-sm font-medium">+45 this week</span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Teachers</p>
            <p className="text-3xl font-bold text-gray-900">
              {tenants.reduce((sum, t) => sum + t.teachersCount, 0)}
            </p>
          </div>
          <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
            <Users className="h-6 w-6 text-orange-600" />
          </div>
        </div>
        <div className="mt-4">
          <span className="text-green-600 text-sm font-medium">+8 this week</span>
        </div>
      </div>
    </div>
  );

  const TenantsTable = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-xl font-semibold text-gray-900">School Tenants</h2>
          <button
            onClick={() => setShowOnboardingModal(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New School
          </button>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search schools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                School
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Users
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                System Admin
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTenants.map((tenant) => (
              <tr key={tenant.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{tenant.schoolName}</div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {tenant.location}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(tenant.status)}`}>
                    {getStatusIcon(tenant.status)}
                    <span className="ml-1 capitalize">{tenant.status}</span>
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="space-y-1">
                    <div>{tenant.studentsCount} Students</div>
                    <div>{tenant.teachersCount} Teachers</div>
                    <div>{tenant.adminCount} Admins</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{tenant.systemAdmin.name}</div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <Mail className="w-3 h-3 mr-1" />
                      {tenant.systemAdmin.email}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <Phone className="w-3 h-3 mr-1" />
                      {tenant.systemAdmin.phone}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {tenant.createdDate}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        setSelectedTenant(tenant);
                        setShowTenantDetails(true);
                      }}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="text-green-600 hover:text-green-900">
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const OnboardingModal = () => (
    showOnboardingModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Onboard New School</h2>
            <p className="text-gray-600 mt-1">Set up a new school tenant with system admin account</p>
          </div>
          
          <form onSubmit={handleOnboardingSubmit} className="p-6 space-y-8">
            {/* School Information Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <School className="w-5 h-5 mr-2" />
                School Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">School Name *</label>
                  <input
                    type="text"
                    required
                    value={onboardingData.schoolName}
                    onChange={(e) => handleInputChange('schoolName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter school name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">School Type</label>
                  <select
                    value={onboardingData.schoolType}
                    onChange={(e) => handleInputChange('schoolType', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="public">Public School</option>
                    <option value="private">Private School</option>
                    <option value="charter">Charter School</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">School Address *</label>
                  <textarea
                    required
                    value={onboardingData.schoolAddress}
                    onChange={(e) => handleInputChange('schoolAddress', e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter complete school address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">School Phone</label>
                  <input
                    type="tel"
                    value={onboardingData.schoolPhone}
                    onChange={(e) => handleInputChange('schoolPhone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+231-XXX-XXXXXX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">School Email</label>
                  <input
                    type="email"
                    value={onboardingData.schoolEmail}
                    onChange={(e) => handleInputChange('schoolEmail', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="info@school.edu.lr"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Established Year</label>
                  <input
                    type="number"
                    min="1900"
                    max={new Date().getFullYear()}
                    value={onboardingData.establishedYear}
                    onChange={(e) => handleInputChange('establishedYear', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="2020"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Academic Year</label>
                  <input
                    type="text"
                    value={onboardingData.academicYear}
                    onChange={(e) => handleInputChange('academicYear', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="2024-2025"
                  />
                </div>
              </div>
            </div>

            {/* System Admin Information Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                System Administrator Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                  <input
                    type="text"
                    required
                    value={onboardingData.adminFirstName}
                    onChange={(e) => handleInputChange('adminFirstName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Middle Name</label>
                  <input
                    type="text"
                    value={onboardingData.adminMiddleName}
                    onChange={(e) => handleInputChange('adminMiddleName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="William"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                  <input
                    type="text"
                    required
                    value={onboardingData.adminLastName}
                    onChange={(e) => handleInputChange('adminLastName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
                  <select
                    required
                    value={onboardingData.adminGender}
                    onChange={(e) => handleInputChange('adminGender', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={onboardingData.adminEmail}
                    onChange={(e) => handleInputChange('adminEmail', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="admin@school.edu.lr"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={onboardingData.adminPhone}
                    onChange={(e) => handleInputChange('adminPhone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+231-XXX-XXXXXX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
                  <input
                    type="date"
                    required
                    value={onboardingData.adminDateOfBirth}
                    onChange={(e) => handleInputChange('adminDateOfBirth', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                  <textarea
                    required
                    value={onboardingData.adminAddress}
                    onChange={(e) => handleInputChange('adminAddress', e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter complete address"
                  />
                </div>
              </div>
            </div>

            {/* System Settings Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Initial System Settings
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-800">Login Permissions</h4>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={onboardingData.studentsCanLogin}
                        onChange={(e) => handleInputChange('studentsCanLogin', e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Students can login</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={onboardingData.teachersCanLogin}
                        onChange={(e) => handleInputChange('teachersCanLogin', e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Teachers can login</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={onboardingData.administratorsCanLogin}
                        onChange={(e) => handleInputChange('administratorsCanLogin', e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Administrators can login</span>
                    </label>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-800">Feature Permissions</h4>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={onboardingData.teachersCanSubmitGrades}
                        onChange={(e) => handleInputChange('teachersCanSubmitGrades', e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Teachers can submit grades</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={onboardingData.studentsCanViewPeriodicReports}
                        onChange={(e) => handleInputChange('studentsCanViewPeriodicReports', e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Students can view periodic reports</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={onboardingData.studentsCanViewYearlyReports}
                        onChange={(e) => handleInputChange('studentsCanViewYearlyReports', e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Students can view yearly reports</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setShowOnboardingModal(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create School Tenant
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );

  const TenantDetailsModal = () => (
    showTenantDetails && selectedTenant && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{selectedTenant.schoolName}</h2>
              <p className="text-gray-600 mt-1">School tenant details and management</p>
            </div>
            <button
              onClick={() => setShowTenantDetails(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* School Information */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <School className="w-5 h-5 mr-2" />
                    School Information
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">Status:</span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedTenant.status)}`}>
                        {getStatusIcon(selectedTenant.status)}
                        <span className="ml-1 capitalize">{selectedTenant.status}</span>
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">Location:</span>
                      <span className="text-sm text-gray-900">{selectedTenant.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">Created:</span>
                      <span className="text-sm text-gray-900">{selectedTenant.createdDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">Last Active:</span>
                      <span className="text-sm text-gray-900">{selectedTenant.lastActive}</span>
                    </div>
                  </div>
                </div>

                {/* User Statistics */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    User Statistics
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">{selectedTenant.studentsCount}</div>
                      <div className="text-sm text-blue-800">Students</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">{selectedTenant.teachersCount}</div>
                      <div className="text-sm text-green-800">Teachers</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-purple-600">{selectedTenant.adminCount}</div>
                      <div className="text-sm text-purple-800">Admins</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* System Admin Details */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    System Administrator
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">Name:</span>
                      <span className="text-sm text-gray-900">{selectedTenant.systemAdmin.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">Email:</span>
                      <span className="text-sm text-gray-900">{selectedTenant.systemAdmin.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">Phone:</span>
                      <span className="text-sm text-gray-900">{selectedTenant.systemAdmin.phone}</span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-between p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                      <span className="flex items-center">
                        <UserCheck className="w-4 h-4 mr-2" />
                        Reset System Admin Password
                      </span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
                      <span className="flex items-center">
                        <Settings className="w-4 h-4 mr-2" />
                        Configure School Settings
                      </span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 transition-colors">
                      <span className="flex items-center">
                        <AlertCircle className="w-4 h-4 mr-2" />
                        {selectedTenant.status === 'active' ? 'Suspend School' : 'Activate School'}
                      </span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors">
                      <span className="flex items-center">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete School Tenant
                      </span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">School Management Platform</h1>
              <p className="text-gray-600 mt-1">Tenant Administration Dashboard</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span>System Online</span>
              </div>
              <button
                onClick={() => setShowOnboardingModal(true)}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                New School
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', name: 'Overview', icon: Building },
              { id: 'tenants', name: 'School Tenants', icon: School },
              { id: 'settings', name: 'System Settings', icon: Settings }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div>
            <DashboardStats />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">New school onboarded</p>
                      <p className="text-xs text-gray-500">Liberty High School - 2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">System admin created</p>
                      <p className="text-xs text-gray-500">Future Leaders Academy - 1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                      <AlertCircle className="w-4 h-4 text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Settings updated</p>
                      <p className="text-xs text-gray-500">Sunrise Elementary - 3 days ago</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* System Health */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Database Connection</span>
                    <span className="text-sm font-medium text-green-600">Healthy</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Server Response Time</span>
                    <span className="text-sm font-medium text-green-600">145ms</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Active Sessions</span>
                    <span className="text-sm font-medium text-blue-600">2,847</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Storage Usage</span>
                    <span className="text-sm font-medium text-yellow-600">67% Used</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tenants' && <TenantsTable />}

        {activeTab === 'settings' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">System Settings</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Platform Configuration</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Maximum Schools per Instance
                    </label>
                    <input
                      type="number"
                      defaultValue="100"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Default Academic Year Format
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>YYYY-YYYY</option>
                      <option>YYYY/YY</option>
                      <option>YYYY</option>
                    </select>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Security Settings</h3>
                <div className="space-y-4">
                  <label className="flex items-center">
                    <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="ml-2 text-sm text-gray-700">Require 2FA for System Admins</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="ml-2 text-sm text-gray-700">Enable login attempt monitoring</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="ml-2 text-sm text-gray-700">Auto-lock inactive accounts</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <OnboardingModal />
      <TenantDetailsModal />
    </div>
  );
};

export default AdminDashboard;