"use client"
import React, { useState, useEffect } from 'react';
import { 
  User, 
  Users, 
  GraduationCap, 
  BookOpen, 
  Shield, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  Eye,
  EyeOff,
  UserPlus,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Building,
  Award,
  Clock,
  DollarSign,
  Briefcase
} from 'lucide-react';

const UserCreationForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedUserType, setSelectedUserType] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form data state matching your schema
  const [formData, setFormData] = useState({
    // Common BaseUser fields
    firstName: '',
    middleName: '',
    lastName: '',
    gender: '',
    username: '',
    password: '',
    confirmPassword: '',
    nickName: '',
    dateOfBirth: '',
    phone: '',
    email: '',
    address: '',
    bio: '',

    // Role specific
    role: '',
    
    // Student specific
    currentClass: '', // This maps to 'currentClass' in schema
    status: 'enrolled',
    guardian: {
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      phone: '',
      address: ''
    },

    // Teacher specific
    subjects: [], // Will be converted to TeacherSubject[] format
    isSponsor: false,
    sponsorClass: '',
    department: '',
    qualification: "Bachelor's Degree",
    experience: 0,
    salary: '',
    employmentStatus: 'active',

    // Administrator specific
    position: '',
    permissions: [],
    reportsTo: '',
    supervises: []
  });

  const userTypes = [
    {
      type: 'student',
      label: 'Student',
      icon: GraduationCap,
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      description: 'Enroll a new student with academic tracking'
    },
    {
      type: 'teacher',
      label: 'Teacher',
      icon: BookOpen,
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      description: 'Add a new teacher with subject assignments'
    },
    {
      type: 'administrator',
      label: 'Administrator',
      icon: Shield,
      color: 'from-purple-500 to-violet-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      description: 'Create a new administrative staff member'
    }
  ];

  const grades = [
    'Pre-K', 'Kindergarten', '1st Grade', '2nd Grade', '3rd Grade', '4th Grade',
    '5th Grade', '6th Grade', '7th Grade', '8th Grade', '9th Grade', '10th Grade',
    '11th Grade', '12th Grade'
  ];

  const subjects = [
    'Mathematics', 'English Language Arts', 'Science', 'Social Studies', 'History',
    'Biology', 'Chemistry', 'Physics', 'Geography', 'Art', 'Music', 'Physical Education',
    'Computer Science', 'Foreign Language', 'Literature', 'Economics', 'Psychology',
    'Algebra', 'Geometry', 'Calculus', 'Statistics'
  ];

  const subjectLevels = ['Elementary', 'Middle School', 'High School', 'Advanced Placement'];

  const administratorPositions = [
    { value: 'principal', label: 'Principal' },
    { value: 'vice_principal', label: 'Vice Principal' },
    { value: 'head_of_department', label: 'Head of Department' },
    { value: 'academic_coordinator', label: 'Academic Coordinator' },
    { value: 'discipline_coordinator', label: 'Discipline Coordinator' },
    { value: 'registrar', label: 'Registrar' },
    { value: 'supervisor', label: 'Supervisor' },
    { value: 'proprietor', label: 'Proprietor' },
    { value: 'secretary', label: 'Secretary' },
    { value: 'dean_of_students', label: 'Dean of Students' },
    { value: 'cashier', label: 'Cashier' }
  ];

  const departments = [
    'Mathematics', 'Science', 'English', 'Social Studies', 'Arts', 
    'Physical Education', 'Technology', 'Administration', 'Guidance'
  ];

  const qualifications = [
    "High School Diploma",
    "Associate's Degree",
    "Bachelor's Degree",
    "Master's Degree",
    "Doctorate (Ph.D.)",
    "Professional Certificate"
  ];

  const employmentStatuses = [
    { value: 'active', label: 'Active' },
    { value: 'on_leave', label: 'On Leave' },
    { value: 'terminated', label: 'Terminated' },
    { value: 'retired', label: 'Retired' }
  ];

  const studentStatuses = [
    { value: 'enrolled', label: 'Enrolled' },
    { value: 'graduated', label: 'Graduated' },
    { value: 'transferred', label: 'Transferred' },
    { value: 'dropped', label: 'Dropped' }
  ];

  // Generate unique IDs
  const generateUniqueId = (type) => {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    const prefix = type === 'student' ? 'STU' : type === 'teacher' ? 'TCH' : 'ADM';
    return `${prefix}${timestamp}${random}`.toUpperCase();
  };

  const getSteps = () => {
    const baseSteps = ['User Type', 'Personal Info'];
    
    if (selectedUserType === 'student') {
      return [...baseSteps, 'Academic Info', 'Guardian Info', 'Account Setup'];
    } else if (selectedUserType === 'teacher') {
      return [...baseSteps, 'Teaching Info', 'Employment Info', 'Account Setup'];
    } else if (selectedUserType === 'administrator') {
      return [...baseSteps, 'Administrative Info', 'Employment Info', 'Account Setup'];
    }
    
    return baseSteps;
  };

  const steps = getSteps();

  const handleInputChange = (field, value, isGuardian = false) => {
    if (isGuardian) {
      setFormData(prev => ({
        ...prev,
        guardian: {
          ...prev.guardian,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSubjectChange = (subject, level, classes = []) => {
    setFormData(prev => {
      const existingIndex = prev.subjects.findIndex(s => s.subject === subject);
      const newSubjects = [...prev.subjects];
      
      if (existingIndex >= 0) {
        if (level) {
          newSubjects[existingIndex] = { subject, level, classes };
        } else {
          newSubjects.splice(existingIndex, 1);
        }
      } else if (level) {
        newSubjects.push({ subject, level, classes });
      }
      
      return { ...prev, subjects: newSubjects };
    });
  };

  const generateUsername = () => {
    const { firstName, lastName } = formData;
    if (firstName && lastName) {
      const base = `${firstName.toLowerCase()}.${lastName.toLowerCase()}`;
      const random = Math.floor(Math.random() * 999);
      const username = `${base}${random}`;
      handleInputChange('username', username);
    }
  };

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    handleInputChange('password', password);
    handleInputChange('confirmPassword', password);
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 0: // User Type
        return selectedUserType !== '';
      
      case 1: // Personal Info
        return formData.firstName && formData.lastName && formData.dateOfBirth && 
               formData.gender && formData.phone && formData.address;
      
      case 2: // Role-specific info
        if (selectedUserType === 'student') {
          return formData.currentClass;
        } else if (selectedUserType === 'teacher') {
          return formData.subjects.length > 0;
        } else if (selectedUserType === 'administrator') {
          return formData.position;
        }
        return true;
      
      case 3: // Second role-specific or Guardian Info
        if (selectedUserType === 'student') {
          return formData.guardian.firstName && formData.guardian.lastName && 
                 formData.guardian.phone && formData.guardian.address;
        }
        return true; // Employment info is optional
      
      case 4: // Account Setup
        return formData.username && formData.password && 
               formData.password === formData.confirmPassword && formData.password.length >= 8;
      
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateCurrentStep() && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) return;

    setIsSubmitting(true);
    
    try {
      // Generate unique IDs
      const userId = generateUniqueId('user');
      const roleSpecificId = generateUniqueId(selectedUserType);
      
      // Prepare user data according to schema
      const userData = {
        // Common fields
        userId,
        role: selectedUserType,
        firstName: formData.firstName,
        middleName: formData.middleName || undefined,
        lastName: formData.lastName,
        gender: formData.gender,
        username: formData.username,
        password: formData.password,
        nickName: formData.nickName || undefined,
        dateOfBirth: new Date(formData.dateOfBirth),
        phone: formData.phone,
        email: formData.email || undefined,
        address: formData.address,
        bio: formData.bio || undefined,
        
        // Role-specific fields
        ...(selectedUserType === 'student' && {
          studentId: roleSpecificId,
          currentClass: formData.currentClass, // Schema uses currentClass, not currentClass
          status: formData.status,
          guardian: {
            firstName: formData.guardian.firstName,
            middleName: formData.guardian.middleName || undefined,
            lastName: formData.guardian.lastName,
            email: formData.guardian.email || undefined,
            phone: formData.guardian.phone,
            address: formData.guardian.address,
          },
          academicRecords: [] // Initialize empty
        }),
        
        ...(selectedUserType === 'teacher' && {
          employeeId: roleSpecificId,
          subjects: formData.subjects.map(s => ({
            subject: s.subject,
            level: s.level,
            classes: s.classes || []
          })),
          isSponsor: formData.isSponsor,
          ...(formData.isSponsor && { sponsorClass: formData.sponsorClass }),
          department: formData.department || undefined,
          qualification: formData.qualification,
          experience: parseInt(formData.experience) || 0,
          salary: formData.salary ? parseFloat(formData.salary) : undefined,
          employmentStatus: formData.employmentStatus,
          gradeBooks: [] // Initialize empty
        }),
        
        ...(selectedUserType === 'administrator' && {
          employeeId: roleSpecificId,
          position: formData.position,
          department: formData.department || undefined,
          qualification: formData.qualification,
          experience: parseInt(formData.experience) || 0,
          salary: formData.salary ? parseFloat(formData.salary) : undefined,
          permissions: formData.permissions || [],
          employmentStatus: formData.employmentStatus,
          reportsTo: formData.reportsTo || undefined,
          supervises: formData.supervises || []
        })
      };
      
      // Make API call
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to create user');
      }
      
      // Success handling
      alert(`${selectedUserType.charAt(0).toUpperCase() + selectedUserType.slice(1)} created successfully!\n\nUser ID: ${userId}\n${selectedUserType === 'student' ? 'Student ID' : 'Employee ID'}: ${roleSpecificId}`);
      
      // Reset form
      setFormData({
        firstName: '', middleName: '', lastName: '', gender: '', username: '', password: '', confirmPassword: '',
        nickName: '', dateOfBirth: '', phone: '', email: '', address: '', bio: '', role: '',
        currentClass: '', status: 'enrolled', subjects: [], isSponsor: false, sponsorClass: '', department: '',
        qualification: "Bachelor's Degree", experience: 0, salary: '', employmentStatus: 'active',
        position: '', permissions: [], reportsTo: '', supervises: [],
        guardian: { firstName: '', middleName: '', lastName: '', email: '', phone: '', address: '' }
      });
      setSelectedUserType('');
      setCurrentStep(0);
      
    } catch (error) {
      console.error('Error creating user:', error);
      alert(`Error creating user: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderUserTypeSelection = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-3">
          Select User Type
        </h2>
        <p className="text-gray-600 text-lg">Choose the type of user you want to add to the system</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {userTypes.map((type) => {
          const IconComponent = type.icon;
          return (
            <button
              key={type.type}
              onClick={() => {
                setSelectedUserType(type.type);
                setFormData(prev => ({ ...prev, role: type.type }));
              }}
              className={`group relative p-8 border-2 rounded-2xl transition-all duration-300 flex flex-col items-center space-y-4 min-h-[240px] justify-center transform hover:scale-[1.02] hover:shadow-xl ${
                selectedUserType === type.type
                  ? `${type.borderColor} ${type.bgColor} shadow-lg`
                  : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50'
              }`}
            >
              <div className={`w-20 h-20 bg-gradient-to-br ${type.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                <IconComponent className="w-10 h-10 text-white" />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{type.label}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{type.description}</p>
              </div>
              {selectedUserType === type.type && (
                <div className="absolute top-4 right-4">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );

  const renderPersonalInfo = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-3">
          Personal Information
        </h2>
        <p className="text-gray-600 text-lg">Enter the user's personal details</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            First Name *
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
            placeholder="Enter first name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Middle Name
          </label>
          <input
            type="text"
            value={formData.middleName}
            onChange={(e) => handleInputChange('middleName', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
            placeholder="Enter middle name"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Last Name *
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
            placeholder="Enter last name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Nickname
          </label>
          <input
            type="text"
            value={formData.nickName}
            onChange={(e) => handleInputChange('nickName', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
            placeholder="Enter nickname"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Date of Birth *
          </label>
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Gender *
          </label>
          <select
            value={formData.gender}
            onChange={(e) => handleInputChange('gender', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Phone Number *
          </label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
              placeholder="Enter phone number"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
              placeholder="Enter email address"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Address *
          </label>
          <div className="relative">
            <MapPin className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
            <textarea
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white resize-none"
              rows="3"
              placeholder="Enter full address"
              required
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Bio
          </label>
          <textarea
            value={formData.bio}
            onChange={(e) => handleInputChange('bio', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white resize-none"
            rows="3"
            placeholder="Enter a brief bio (optional)"
          />
        </div>
      </div>
    </div>
  );

  const renderStudentInfo = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-3">
          Academic Information
        </h2>
        <p className="text-gray-600 text-lg">Enter the student's academic details</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Grade/Class *
          </label>
          <select
            value={formData.currentClass}
            onChange={(e) => handleInputChange('currentClass', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
            required
          >
            <option value="">Select Grade</option>
            {grades.map((currentClass) => (
              <option key={currentClass} value={currentClass}>{currentClass}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Enrollment Status
          </label>
          <select
            value={formData.status}
            onChange={(e) => handleInputChange('status', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
          >
            {studentStatuses.map((status) => (
              <option key={status.value} value={status.value}>{status.label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );

  const renderTeacherInfo = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
          Teaching Information
        </h2>
        <p className="text-gray-600 text-lg">Enter the teacher's subject and class details</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-4">
            Subjects Teaching *
          </label>
          <div className="space-y-4">
            {formData.subjects.map((subjectObj, index) => (
              <div key={index} className="flex gap-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <select
                  value={subjectObj.subject}
                  onChange={(e) => {
                    const newSubjects = [...formData.subjects];
                    newSubjects[index] = { ...subjectObj, subject: e.target.value };
                    setFormData(prev => ({ ...prev, subjects: newSubjects }));
                  }}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="">Select Subject</option>
                  {subjects.map((subject) => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
                <select
                  value={subjectObj.level}
                  onChange={(e) => {
                    const newSubjects = [...formData.subjects];
                    newSubjects[index] = { ...subjectObj, level: e.target.value };
                    setFormData(prev => ({ ...prev, subjects: newSubjects }));
                  }}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="">Select Level</option>
                  {subjectLevels.map((level) => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => {
                    const newSubjects = formData.subjects.filter((_, i) => i !== index);
                    setFormData(prev => ({ ...prev, subjects: newSubjects }));
                  }}
                  className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                setFormData(prev => ({
                  ...prev,
                  subjects: [...prev.subjects, { subject: '', level: '', classes: [] }]
                }));
              }}
              className="w-full px-4 py-3 border-2 border-dashed border-blue-300 rounded-xl text-blue-600 hover:bg-blue-50 transition-colors"
            >
              + Add Subject
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center space-x-3 cursor-pointer p-4 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors">
              <input
                type="checkbox"
                checked={formData.isSponsor}
                onChange={(e) => handleInputChange('isSponsor', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-semibold text-gray-700">Is Class Sponsor?</span>
            </label>
          </div>

          {formData.isSponsor && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Sponsor Class *
              </label>
              <select
                value={formData.sponsorClass}
                onChange={(e) => handleInputChange('sponsorClass', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                required
              >
                <option value="">Select Class</option>
                {grades.map((currentClass) => (
                  <option key={currentClass} value={currentClass}>{currentClass}</option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderAdministratorInfo = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent mb-3">
          Administrative Information
        </h2>
        <p className="text-gray-600 text-lg">Enter the administrator's position and responsibilities</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Position *
          </label>
          <select
            value={formData.position}
            onChange={(e) => handleInputChange('position', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
            required
          >
            <option value="">Select Position</option>
            {administratorPositions.map((position) => (
              <option key={position.value} value={position.value}>
                {position.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Department
          </label>
          <select
            value={formData.department}
            onChange={(e) => handleInputChange('department', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );

  const renderEmploymentInfo = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-3">
          Employment Information
        </h2>
        <p className="text-gray-600 text-lg">Enter employment and qualification details</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Qualification *
          </label>
          <select
            value={formData.qualification}
            onChange={(e) => handleInputChange('qualification', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
            required
          >
            {qualifications.map((qual) => (
              <option key={qual} value={qual}>{qual}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Years of Experience
          </label>
          <div className="relative">
            <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="number"
              min="0"
              max="50"
              value={formData.experience}
              onChange={(e) => handleInputChange('experience', e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
              placeholder="0"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Employment Status
          </label>
          <select
            value={formData.employmentStatus}
            onChange={(e) => handleInputChange('employmentStatus', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
          >
            {employmentStatuses.map((status) => (
              <option key={status.value} value={status.value}>{status.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Salary (Optional)
          </label>
          <div className="relative">
            <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="number"
              min="0"
              step="0.01"
              value={formData.salary}
              onChange={(e) => handleInputChange('salary', e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
              placeholder="0.00"
            />
          </div>
        </div>

        {selectedUserType === 'teacher' && !formData.department && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Department
            </label>
            <select
              value={formData.department}
              onChange={(e) => handleInputChange('department', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );

  const renderGuardianInfo = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-3">
          Guardian Information
        </h2>
        <p className="text-gray-600 text-lg">Enter the student's guardian/parent details</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            First Name *
          </label>
          <input
            type="text"
            value={formData.guardian.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value, true)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
            placeholder="Enter guardian's first name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Middle Name
          </label>
          <input
            type="text"
            value={formData.guardian.middleName}
            onChange={(e) => handleInputChange('middleName', e.target.value, true)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
            placeholder="Enter guardian's middle name"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Last Name *
          </label>
          <input
            type="text"
            value={formData.guardian.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value, true)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
            placeholder="Enter guardian's last name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Phone Number *
          </label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="tel"
              value={formData.guardian.phone}
              onChange={(e) => handleInputChange('phone', e.target.value, true)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
              placeholder="Enter guardian's phone"
              required
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              value={formData.guardian.email}
              onChange={(e) => handleInputChange('email', e.target.value, true)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
              placeholder="Enter guardian's email"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Address *
          </label>
          <div className="relative">
            <MapPin className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
            <textarea
              value={formData.guardian.address}
              onChange={(e) => handleInputChange('address', e.target.value, true)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white resize-none"
              rows="3"
              placeholder="Enter guardian's address"
              required
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderAccountSetup = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-3">
          Account Setup
        </h2>
        <p className="text-gray-600 text-lg">Create login credentials for the user</p>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <h3 className="font-semibold text-blue-900">Security Notice</h3>
        </div>
        <p className="text-sm text-blue-800">
          The user will be required to change their password on first login for security purposes.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Username *
          </label>
          <div className="flex space-x-3">
            <input
              type="text"
              value={formData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
              placeholder="Enter username"
              required
            />
            <button
              type="button"
              onClick={generateUsername}
              className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all text-sm font-medium transform hover:scale-105"
              disabled={!formData.firstName || !formData.lastName}
            >
              Auto-generate
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Username will be used for system login
          </p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Temporary Password *
          </label>
          <div className="flex space-x-3">
            <div className="flex-1 relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                placeholder="Enter temporary password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <button
              type="button"
              onClick={generatePassword}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all text-sm font-medium transform hover:scale-105"
            >
              Generate
            </button>
          </div>
          {formData.password && formData.password.length < 8 && (
            <p className="text-red-500 text-xs mt-2">Password must be at least 8 characters long</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Confirm Password *
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
              placeholder="Confirm password"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
            <p className="text-red-500 text-xs mt-2">Passwords do not match</p>
          )}
        </div>
      </div>

      {/* User Summary Card */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-2xl p-6">
        <h3 className="font-bold text-gray-900 mb-4 text-lg">User Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Name:</span>
              <span className="font-semibold text-gray-900">{formData.firstName} {formData.lastName}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Role:</span>
              <span className="font-semibold text-gray-900 capitalize">{selectedUserType}</span>
            </div>
            {formData.gender && (
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Gender:</span>
                <span className="font-semibold text-gray-900 capitalize">{formData.gender}</span>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Username:</span>
              <span className="font-semibold text-gray-900">{formData.username}</span>
            </div>
          </div>
          <div className="space-y-3">
            {selectedUserType === 'student' && formData.currentClass && (
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Grade:</span>
                <span className="font-semibold text-gray-900">{formData.currentClass}</span>
              </div>
            )}
            {selectedUserType === 'teacher' && formData.subjects.length > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Subjects:</span>
                <span className="font-semibold text-gray-900">
                  {formData.subjects.slice(0, 2).map(s => s.subject).join(', ')}
                  {formData.subjects.length > 2 ? '...' : ''}
                </span>
              </div>
            )}
            {selectedUserType === 'administrator' && formData.position && (
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Position:</span>
                <span className="font-semibold text-gray-900">
                  {administratorPositions.find(p => p.value === formData.position)?.label}
                </span>
              </div>
            )}
            {formData.department && (
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Department:</span>
                <span className="font-semibold text-gray-900">{formData.department}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return renderUserTypeSelection();
      case 1:
        return renderPersonalInfo();
      case 2:
        if (selectedUserType === 'student') return renderStudentInfo();
        if (selectedUserType === 'teacher') return renderTeacherInfo();
        if (selectedUserType === 'administrator') return renderAdministratorInfo();
        break;
      case 3:
        if (selectedUserType === 'student') return renderGuardianInfo();
        return renderEmploymentInfo();
      case 4:
        return renderAccountSetup();
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white p-8">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <UserPlus className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">Add New User</h1>
                <p className="text-indigo-100 text-lg">Create a new user account in the system</p>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="px-8 py-6 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-gray-700">
                Step {currentStep + 1} of {steps.length}
              </span>
              <span className="text-sm text-gray-500 bg-gray-200 px-3 py-1 rounded-full">
                {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
              <div 
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 h-3 rounded-full transition-all duration-500 ease-out shadow-lg"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
            <div className="flex justify-between mt-4">
              {steps.map((step, index) => (
                <div 
                  key={step}
                  className={`flex flex-col items-center space-y-2 ${
                    index <= currentStep ? 'text-indigo-600' : 'text-gray-400'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    index < currentStep 
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg' 
                      : index === currentStep 
                      ? 'bg-indigo-100 text-indigo-600 border-2 border-indigo-500 shadow-md' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {index < currentStep ? <Check className="w-5 h-5" /> : index + 1}
                  </div>
                  <span className="text-xs font-semibold text-center hidden md:block max-w-20">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8 min-h-[600px]">
            {renderCurrentStep()}
          </div>

          {/* Footer Navigation */}
          <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <button
                onClick={prevStep}
                disabled={currentStep === 0 || isSubmitting}
                className="flex items-center space-x-2 px-6 py-3 text-gray-600 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Previous</span>
              </button>

              {currentStep === steps.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  disabled={!validateCurrentStep() || isSubmitting}
                  className="flex items-center space-x-3 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold transform hover:scale-105 shadow-lg"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Creating User...</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-5 h-5" />
                      <span>Create User</span>
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={nextStep}
                  disabled={!validateCurrentStep() || isSubmitting}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold transform hover:scale-105 shadow-lg"
                >
                  <span>Next</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCreationForm;