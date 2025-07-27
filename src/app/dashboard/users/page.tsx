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
  Briefcase,
  AlertCircle,
  CheckCircle,
  Loader2
} from 'lucide-react';

const UserCreationForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedUserType, setSelectedUserType] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

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
    grade: '', // This maps to 'currentClass' in schema
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
      description: 'Enroll a new student with academic tracking'
    },
    {
      type: 'teacher',
      label: 'Teacher',
      icon: BookOpen,
      description: 'Add a new teacher with subject assignments'
    },
    {
      type: 'administrator',
      label: 'Administrator',
      icon: Shield,
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

  // Backend validation functions
  const validateUsername = async (username) => {
    if (!username) return { isValid: false, message: 'Username is required' };
    
    try {
      const response = await fetch('/api/users/validate-username', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
      });
      
      const result = await response.json();
      return { isValid: response.ok, message: result.message };
    } catch (error) {
      return { isValid: false, message: 'Error validating username' };
    }
  };

  const validateTeacherSubjects = async (subjects) => {
    if (!subjects || subjects.length === 0) {
      return { isValid: false, message: 'At least one subject is required' };
    }
    
    try {
      const response = await fetch('/api/users/validate-teacher-subjects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subjects })
      });
      
      const result = await response.json();
      return { isValid: response.ok, message: result.message, conflicts: result.conflicts };
    } catch (error) {
      return { isValid: false, message: 'Error validating teacher subjects' };
    }
  };

  const validateSponsorClass = async (sponsorClass) => {
    if (!sponsorClass) return { isValid: true };
    
    try {
      const response = await fetch('/api/users/validate-sponsor-class', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sponsorClass })
      });
      
      const result = await response.json();
      return { isValid: response.ok, message: result.message };
    } catch (error) {
      return { isValid: false, message: 'Error validating sponsor class' };
    }
  };

  const validateAdminPosition = async (position) => {
    if (!position) return { isValid: false, message: 'Position is required' };
    
    try {
      const response = await fetch('/api/users/validate-admin-position', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ position })
      });
      
      const result = await response.json();
      return { isValid: response.ok, message: result.message };
    } catch (error) {
      return { isValid: false, message: 'Error validating position' };
    }
  };

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
    
    // Clear validation errors when field changes
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: null }));
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
    
    // Clear validation errors when subjects change
    if (validationErrors.subjects) {
      setValidationErrors(prev => ({ ...prev, subjects: null }));
    }
  };

  const handleGradeSelection = (subjectIndex, selectedGrades) => {
    setFormData(prev => {
      const newSubjects = [...prev.subjects];
      newSubjects[subjectIndex] = {
        ...newSubjects[subjectIndex],
        classes: selectedGrades
      };
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
          return formData.grade;
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

  const performBackendValidation = async () => {
    setIsValidating(true);
    setValidationErrors({});
    
    try {
      const validationPromises = [];
      
      // Always validate username
      if (formData.username) {
        validationPromises.push(
          validateUsername(formData.username).then(result => ({
            field: 'username',
            ...result
          }))
        );
      }
      
      // Role-specific validations
      if (selectedUserType === 'teacher') {
        if (formData.subjects.length > 0) {
          validationPromises.push(
            validateTeacherSubjects(formData.subjects).then(result => ({
              field: 'subjects',
              ...result
            }))
          );
        }
        
        if (formData.isSponsor && formData.sponsorClass) {
          validationPromises.push(
            validateSponsorClass(formData.sponsorClass).then(result => ({
              field: 'sponsorClass',
              ...result
            }))
          );
        }
      } else if (selectedUserType === 'administrator') {
        if (formData.position) {
          validationPromises.push(
            validateAdminPosition(formData.position).then(result => ({
              field: 'position',
              ...result
            }))
          );
        }
      }
      
      const results = await Promise.all(validationPromises);
      const errors = {};
      let hasErrors = false;
      
      results.forEach(result => {
        if (!result.isValid) {
          errors[result.field] = result.message;
          hasErrors = true;
        }
      });
      
      setValidationErrors(errors);
      return !hasErrors;
      
    } catch (error) {
      console.error('Validation error:', error);
      setValidationErrors({ general: 'Validation failed. Please try again.' });
      return false;
    } finally {
      setIsValidating(false);
    }
  };

  const nextStep = async () => {
    if (!validateCurrentStep()) return;
    
    // Perform backend validation on specific steps
    const needsValidation = (
      (currentStep === 4) || // Account setup (username)
      (currentStep === 2 && selectedUserType === 'teacher') || // Teacher subjects
      (currentStep === 2 && selectedUserType === 'administrator') || // Admin position
      (currentStep === 3 && selectedUserType === 'teacher' && formData.isSponsor) // Teacher sponsor
    );
    
    if (needsValidation) {
      const isValid = await performBackendValidation();
      if (!isValid) return;
    }
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setValidationErrors({}); // Clear validation errors when going back
    }
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) return;

    // Final validation before submit
    const isValid = await performBackendValidation();
    if (!isValid) return;

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
          currentClass: formData.grade,
          status: formData.status,
          guardian: {
            firstName: formData.guardian.firstName,
            middleName: formData.guardian.middleName || undefined,
            lastName: formData.guardian.lastName,
            email: formData.guardian.email || undefined,
            phone: formData.guardian.phone,
            address: formData.guardian.address,
          },
          academicRecords: []
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
          gradeBooks: []
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
        grade: '', status: 'enrolled', subjects: [], isSponsor: false, sponsorClass: '', department: '',
        qualification: "Bachelor's Degree", experience: 0, salary: '', employmentStatus: 'active',
        position: '', permissions: [], reportsTo: '', supervises: [],
        guardian: { firstName: '', middleName: '', lastName: '', email: '', phone: '', address: '' }
      });
      setSelectedUserType('');
      setCurrentStep(0);
      setValidationErrors({});
      
    } catch (error) {
      console.error('Error creating user:', error);
      alert(`Error creating user: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderValidationError = (field) => {
    if (!validationErrors[field]) return null;
    
    return (
      <div className="flex items-center space-x-2 mt-2 text-red-500">
        <AlertCircle className="w-4 h-4" />
        <span className="text-sm">{validationErrors[field]}</span>
      </div>
    );
  };

  const renderUserTypeSelection = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-3">
          Select User Type
        </h2>
        <p className="text-muted-foreground text-lg">Choose the type of user you want to add to the system</p>
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
                  ? 'border-primary bg-primary/10 shadow-lg'
                  : 'border-border hover:border-muted-foreground bg-card hover:bg-accent'
              }`}
            >
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg ${
                type.type === 'student' ? 'bg-emerald-500' :
                type.type === 'teacher' ? 'bg-blue-500' : 'bg-purple-500'
              }`}>
                <IconComponent className="w-10 h-10 text-white" />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-foreground mb-2">{type.label}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{type.description}</p>
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
        <h2 className="text-3xl font-bold text-foreground mb-3">
          Personal Information
        </h2>
        <p className="text-muted-foreground text-lg">Enter the user's personal details</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-foreground mb-3">
            First Name *
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-background text-foreground placeholder:text-muted-foreground"
            placeholder="Enter first name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-3">
            Middle Name
          </label>
          <input
            type="text"
            value={formData.middleName}
            onChange={(e) => handleInputChange('middleName', e.target.value)}
            className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-background text-foreground placeholder:text-muted-foreground"
            placeholder="Enter middle name"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-3">
            Last Name *
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-background text-foreground placeholder:text-muted-foreground"
            placeholder="Enter last name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-3">
            Nickname
          </label>
          <input
            type="text"
            value={formData.nickName}
            onChange={(e) => handleInputChange('nickName', e.target.value)}
            className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-background text-foreground placeholder:text-muted-foreground"
            placeholder="Enter nickname"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-3">
            Date of Birth *
          </label>
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-background text-foreground"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-3">
            Gender *
          </label>
          <select
            value={formData.gender}
            onChange={(e) => handleInputChange('gender', e.target.value)}
            className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-background text-foreground"
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-3">
            Phone Number *
          </label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-background text-foreground placeholder:text-muted-foreground"
              placeholder="Enter phone number"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-3">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-background text-foreground placeholder:text-muted-foreground"
              placeholder="Enter email address"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-foreground mb-3">
            Address *
          </label>
          <div className="relative">
            <MapPin className="absolute left-4 top-4 text-muted-foreground w-5 h-5" />
            <textarea
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-background text-foreground placeholder:text-muted-foreground resize-none"
              rows="3"
              placeholder="Enter full address"
              required
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-foreground mb-3">
            Bio
          </label>
          <textarea
            value={formData.bio}
            onChange={(e) => handleInputChange('bio', e.target.value)}
            className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-background text-foreground placeholder:text-muted-foreground resize-none"
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
        <h2 className="text-3xl font-bold text-foreground mb-3">
          Academic Information
        </h2>
        <p className="text-muted-foreground text-lg">Enter the student's academic details</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-foreground mb-3">
            Current Grade/Class *
          </label>
          <select
            value={formData.grade}
            onChange={(e) => handleInputChange('grade', e.target.value)}
            className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-background text-foreground"
            required
          >
            <option value="">Select Grade</option>
            {grades.map((grade) => (
              <option key={grade} value={grade}>{grade}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-3">
            Enrollment Status
          </label>
          <select
            value={formData.status}
            onChange={(e) => handleInputChange('status', e.target.value)}
            className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-background text-foreground"
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
        <h2 className="text-3xl font-bold text-foreground mb-3">
          Teaching Information
        </h2>
        <p className="text-muted-foreground text-lg">Enter the teacher's subject assignments</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-foreground mb-3">
            Subjects & Grade Levels *
          </label>
          <div className="space-y-4">
            {subjects.map((subject) => {
              const subjectData = formData.subjects.find(s => s.subject === subject);
              const isSelected = !!subjectData;
              
              return (
                <div key={subject} className="border border-border rounded-xl p-4 bg-card">
                  <div className="flex items-center space-x-3 mb-3">
                    <input
                      type="checkbox"
                      id={`subject-${subject}`}
                      checked={isSelected}
                      onChange={(e) => {
                        if (e.target.checked) {
                          handleSubjectChange(subject, subjectLevels[0], []);
                        } else {
                          handleSubjectChange(subject, null);
                        }
                      }}
                      className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                    />
                    <label htmlFor={`subject-${subject}`} className="text-sm font-medium text-foreground">
                      {subject}
                    </label>
                  </div>
                  
                  {isSelected && (
                    <div className="space-y-3 ml-7">
                      <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-2">
                          Subject Level
                        </label>
                        <select
                          value={subjectData?.level || ''}
                          onChange={(e) => handleSubjectChange(subject, e.target.value, subjectData?.classes || [])}
                          className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none bg-background text-foreground"
                        >
                          {subjectLevels.map((level) => (
                            <option key={level} value={level}>{level}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-2">
                          Grade Levels (Select multiple)
                        </label>
                        <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto border border-border rounded-lg p-2 bg-background">
                          {grades.map((grade) => (
                            <label key={grade} className="flex items-center space-x-2 text-xs">
                              <input
                                type="checkbox"
                                checked={(subjectData?.classes || []).includes(grade)}
                                onChange={(e) => {
                                  const currentClasses = subjectData?.classes || [];
                                  const newClasses = e.target.checked
                                    ? [...currentClasses, grade]
                                    : currentClasses.filter(g => g !== grade);
                                  handleSubjectChange(subject, subjectData?.level, newClasses);
                                }}
                                className="w-3 h-3 text-primary bg-background border-border rounded focus:ring-primary focus:ring-1"
                              />
                              <span className="text-foreground">{grade}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {renderValidationError('subjects')}
        </div>

        <div className="border-t border-border pt-6">
          <div className="flex items-center space-x-3 mb-4">
            <input
              type="checkbox"
              id="isSponsor"
              checked={formData.isSponsor}
              onChange={(e) => {
                handleInputChange('isSponsor', e.target.checked);
                if (!e.target.checked) {
                  handleInputChange('sponsorClass', '');
                }
              }}
              className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
            />
            <label htmlFor="isSponsor" className="text-sm font-semibold text-foreground">
              Class Sponsor
            </label>
          </div>
          
          {formData.isSponsor && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Sponsor Class *
              </label>
              <select
                value={formData.sponsorClass}
                onChange={(e) => handleInputChange('sponsorClass', e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-background text-foreground"
                required={formData.isSponsor}
              >
                <option value="">Select Class to Sponsor</option>
                {grades.map((grade) => (
                  <option key={grade} value={grade}>{grade}</option>
                ))}
              </select>
              {renderValidationError('sponsorClass')}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderAdministratorInfo = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-3">
          Administrative Information
        </h2>
        <p className="text-muted-foreground text-lg">Enter the administrator's position details</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-foreground mb-3">
            Administrative Position *
          </label>
          <select
            value={formData.position}
            onChange={(e) => handleInputChange('position', e.target.value)}
            className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-background text-foreground"
            required
          >
            <option value="">Select Position</option>
            {administratorPositions.map((position) => (
              <option key={position.value} value={position.value}>
                {position.label}
              </option>
            ))}
          </select>
          {renderValidationError('position')}
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-3">
            Department
          </label>
          <select
            value={formData.department}
            onChange={(e) => handleInputChange('department', e.target.value)}
            className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-background text-foreground"
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-3">
            Reports To
          </label>
          <input
            type="text"
            value={formData.reportsTo}
            onChange={(e) => handleInputChange('reportsTo', e.target.value)}
            className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-background text-foreground placeholder:text-muted-foreground"
            placeholder="Enter supervisor's name or ID"
          />
        </div>
      </div>
    </div>
  );

  const renderGuardianInfo = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-3">
          Guardian Information
        </h2>
        <p className="text-muted-foreground text-lg">Enter the student's guardian details</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-foreground mb-3">
            Guardian First Name *
          </label>
          <input
            type="text"
            value={formData.guardian.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value, true)}
            className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-background text-foreground placeholder:text-muted-foreground"
            placeholder="Enter guardian's first name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-3">
            Guardian Middle Name
          </label>
          <input
            type="text"
            value={formData.guardian.middleName}
            onChange={(e) => handleInputChange('middleName', e.target.value, true)}
            className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-background text-foreground placeholder:text-muted-foreground"
            placeholder="Enter guardian's middle name"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-3">
            Guardian Last Name *
          </label>
          <input
            type="text"
            value={formData.guardian.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value, true)}
            className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-background text-foreground placeholder:text-muted-foreground"
            placeholder="Enter guardian's last name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-3">
            Guardian Phone *
          </label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="tel"
              value={formData.guardian.phone}
              onChange={(e) => handleInputChange('phone', e.target.value, true)}
              className="w-full pl-12 pr-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-background text-foreground placeholder:text-muted-foreground"
              placeholder="Enter guardian's phone"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-3">
            Guardian Email
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="email"
              value={formData.guardian.email}
              onChange={(e) => handleInputChange('email', e.target.value, true)}
              className="w-full pl-12 pr-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-background text-foreground placeholder:text-muted-foreground"
              placeholder="Enter guardian's email"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-foreground mb-3">
            Guardian Address *
          </label>
          <div className="relative">
            <MapPin className="absolute left-4 top-4 text-muted-foreground w-5 h-5" />
            <textarea
              value={formData.guardian.address}
              onChange={(e) => handleInputChange('address', e.target.value, true)}
              className="w-full pl-12 pr-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-background text-foreground placeholder:text-muted-foreground resize-none"
              rows="3"
              placeholder="Enter guardian's full address"
              required
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderEmploymentInfo = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-3">
          Employment Information
        </h2>
        <p className="text-muted-foreground text-lg">Enter employment and qualification details</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-foreground mb-3">
            Department
          </label>
          <select
            value={formData.department}
            onChange={(e) => handleInputChange('department', e.target.value)}
            className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-background text-foreground"
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-3">
            Highest Qualification
          </label>
          <select
            value={formData.qualification}
            onChange={(e) => handleInputChange('qualification', e.target.value)}
            className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-background text-foreground"
          >
            {qualifications.map((qual) => (
              <option key={qual} value={qual}>{qual}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-3">
            Years of Experience
          </label>
          <div className="relative">
            <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="number"
              value={formData.experience}
              onChange={(e) => handleInputChange('experience', e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-background text-foreground placeholder:text-muted-foreground"
              placeholder="Years of experience"
              min="0"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-3">
            Salary
          </label>
          <div className="relative">
            <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="number"
              value={formData.salary}
              onChange={(e) => handleInputChange('salary', e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-background text-foreground placeholder:text-muted-foreground"
              placeholder="Annual salary"
              min="0"
              step="0.01"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-foreground mb-3">
            Employment Status
          </label>
          <select
            value={formData.employmentStatus}
            onChange={(e) => handleInputChange('employmentStatus', e.target.value)}
            className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-background text-foreground"
          >
            {employmentStatuses.map((status) => (
              <option key={status.value} value={status.value}>{status.label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );

  const renderAccountSetup = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-3">
          Account Setup
        </h2>
        <p className="text-muted-foreground text-lg">Create login credentials for the user</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-foreground mb-3">
            Username *
          </label>
          <div className="flex space-x-3">
            <div className="flex-1 relative">
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-background text-foreground placeholder:text-muted-foreground"
                placeholder="Enter username"
                required
              />
            </div>
            <button
              type="button"
              onClick={generateUsername}
              className="px-4 py-3 bg-secondary text-secondary-foreground rounded-xl hover:bg-secondary/80 transition-colors font-medium"
            >
              Generate
            </button>
          </div>
          {renderValidationError('username')}
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-3">
            Password *
          </label>
          <div className="flex space-x-3">
            <div className="flex-1 relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="w-full pl-4 pr-12 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-background text-foreground placeholder:text-muted-foreground"
                placeholder="Enter password"
                required
                minLength="8"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <button
              type="button"
              onClick={generatePassword}
              className="px-4 py-3 bg-secondary text-secondary-foreground rounded-xl hover:bg-secondary/80 transition-colors font-medium"
            >
              Generate
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-3">
            Confirm Password *
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              className="w-full pl-4 pr-12 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-background text-foreground placeholder:text-muted-foreground"
              placeholder="Confirm password"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {formData.password !== formData.confirmPassword && formData.confirmPassword && (
            <div className="flex items-center space-x-2 mt-2 text-red-500">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">Passwords do not match</span>
            </div>
          )}
        </div>

        {formData.password && formData.password.length > 0 && (
          <div className="bg-muted/50 p-4 rounded-xl">
            <h4 className="text-sm font-semibold text-foreground mb-2">Password Strength:</h4>
            <div className="space-y-1">
              <div className={`flex items-center space-x-2 text-sm ${formData.password.length >= 8 ? 'text-green-600' : 'text-red-500'}`}>
                {formData.password.length >= 8 ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                <span>At least 8 characters</span>
              </div>
              <div className={`flex items-center space-x-2 text-sm ${/[A-Z]/.test(formData.password) ? 'text-green-600' : 'text-red-500'}`}>
                {/[A-Z]/.test(formData.password) ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                <span>Contains uppercase letter</span>
              </div>
              <div className={`flex items-center space-x-2 text-sm ${/[0-9]/.test(formData.password) ? 'text-green-600' : 'text-red-500'}`}>
                {/[0-9]/.test(formData.password) ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                <span>Contains number</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderStepContent = () => {
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

  const getNextButtonText = () => {
    if (currentStep === steps.length - 1) return 'Create User';
    return 'Next Step';
  };

  const shouldShowValidationLoading = () => {
    return isValidating && (
      (currentStep === 4) || // Account setup (username)
      (currentStep === 2 && selectedUserType === 'teacher') || // Teacher subjects
      (currentStep === 2 && selectedUserType === 'administrator') || // Admin position
      (currentStep === 3 && selectedUserType === 'teacher' && formData.isSponsor) // Teacher sponsor
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
          <UserPlus className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Create New User</h1>
          <p className="text-muted-foreground">Add a new user to the system</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => (
            <div key={step} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                index <= currentStep 
                  ? 'bg-primary text-primary-foreground shadow-lg' 
                  : 'bg-muted text-muted-foreground'
              }`}>
                {index < currentStep ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-12 h-1 mx-2 transition-all ${
                  index < currentStep ? 'bg-primary' : 'bg-muted'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold text-foreground">{steps[currentStep]}</h3>
          <p className="text-muted-foreground">Step {currentStep + 1} of {steps.length}</p>
        </div>
      </div>

      {/* Main Form Content */}
      <div className="bg-card border border-border rounded-2xl shadow-lg overflow-hidden">
        <div className="p-8">
          {renderStepContent()}
        </div>

        {/* Navigation */}
        <div className="bg-muted/30 px-8 py-6 flex items-center justify-between border-t border-border">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all font-medium ${
              currentStep === 0
                ? 'bg-muted text-muted-foreground cursor-not-allowed'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Previous</span>
          </button>

          <div className="flex items-center space-x-4">
            {validationErrors.general && (
              <div className="flex items-center space-x-2 text-red-500">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">{validationErrors.general}</span>
              </div>
            )}
            
            <button
              type="button"
              onClick={currentStep === steps.length - 1 ? handleSubmit : nextStep}
              disabled={!validateCurrentStep() || shouldShowValidationLoading() || isSubmitting}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all font-medium ${
                !validateCurrentStep() || shouldShowValidationLoading() || isSubmitting
                  ? 'bg-muted text-muted-foreground cursor-not-allowed'
                  : 'bg-primary text-primary-foreground hover:bg-primary/90'
              }`}
            >
              {shouldShowValidationLoading() || isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <ChevronRight className="w-5 h-5" />
              )}
              <span>
                {shouldShowValidationLoading() ? 'Validating...' : 
                 isSubmitting ? 'Creating...' : 
                 getNextButtonText()}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Summary Card - Show on final step */}
      {currentStep === steps.length - 1 && (
        <div className="bg-card border border-border rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-foreground mb-4">User Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-semibold text-muted-foreground">Type:</span>
              <span className="ml-2 text-foreground capitalize">{selectedUserType}</span>
            </div>
            <div>
              <span className="font-semibold text-muted-foreground">Name:</span>
              <span className="ml-2 text-foreground">
                {formData.firstName} {formData.middleName} {formData.lastName}
              </span>
            </div>
            <div>
              <span className="font-semibold text-muted-foreground">Username:</span>
              <span className="ml-2 text-foreground">{formData.username}</span>
            </div>
            <div>
              <span className="font-semibold text-muted-foreground">Phone:</span>
              <span className="ml-2 text-foreground">{formData.phone}</span>
            </div>
            {selectedUserType === 'student' && (
              <>
                <div>
                  <span className="font-semibold text-muted-foreground">Grade:</span>
                  <span className="ml-2 text-foreground">{formData.grade}</span>
                </div>
                <div>
                  <span className="font-semibold text-muted-foreground">Guardian:</span>
                  <span className="ml-2 text-foreground">
                    {formData.guardian.firstName} {formData.guardian.lastName}
                  </span>
                </div>
              </>
            )}
            {selectedUserType === 'teacher' && (
              <>
                <div>
                  <span className="font-semibold text-muted-foreground">Subjects:</span>
                  <span className="ml-2 text-foreground">
                    {formData.subjects.map(s => s.subject).join(', ')}
                  </span>
                </div>
                {formData.isSponsor && (
                  <div>
                    <span className="font-semibold text-muted-foreground">Sponsor Class:</span>
                    <span className="ml-2 text-foreground">{formData.sponsorClass}</span>
                  </div>
                )}
              </>
            )}
            {selectedUserType === 'administrator' && (
              <div>
                <span className="font-semibold text-muted-foreground">Position:</span>
                <span className="ml-2 text-foreground">
                  {administratorPositions.find(p => p.value === formData.position)?.label}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCreationForm;