import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, User, Users, Shield, Eye, EyeOff, RefreshCw, Camera } from 'lucide-react';

const MultiStepUserModal = ({ showModal, onClose, onUserCreated }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userType, setUserType] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isValidating, setIsValidating] = useState(false);

  // Form data state aligned with schema
  const [formData, setFormData] = useState({
    // Base User fields
    firstName: '',
    middleName: '',
    lastName: '',
    username: '',
    password: '',
    nickName: '',
    dateOfBirth: '',
    phone: '',
    email: '',
    address: '',
    bio: '',
    photo: '',
    
    // Student specific
    classId: '',
    guardian: {
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      phone: '',
      address: ''
    },
    
    // Teacher specific
    subjects: [], // Array of {subject: string, level: ClassLevel}
    sponsorClass: null,
    
    // Administrator specific
    position: '',
    permissions: []
  });

  // Constants from schema
  const classLevels = ["Self Contained", "Elementary", "Junior High", "Senior High"];
  
  const classIds = [
    { id: "nursery", name: "Nursery", level: "Self Contained" },
    { id: "kOne", name: "Kindergarten 1", level: "Self Contained" },
    { id: "kTwo", name: "Kindergarten 2", level: "Self Contained" },
    { id: "one", name: "Grade 1", level: "Elementary" },
    { id: "two", name: "Grade 2", level: "Elementary" },
    { id: "three", name: "Grade 3", level: "Elementary" },
    { id: "four", name: "Grade 4", level: "Elementary" },
    { id: "five", name: "Grade 5", level: "Elementary" },
    { id: "six", name: "Grade 6", level: "Elementary" },
    { id: "seven", name: "Grade 7", level: "Junior High" },
    { id: "eight", name: "Grade 8", level: "Junior High" },
    { id: "nine", name: "Grade 9", level: "Junior High" },
    { id: "tenOne", name: "Grade 10-1", level: "Senior High" },
    { id: "tenTwo", name: "Grade 10-2", level: "Senior High" },
    { id: "elevenOne", name: "Grade 11-1", level: "Senior High" },
    { id: "elevenTwo", name: "Grade 11-2", level: "Senior High" },
    { id: "twelveOne", name: "Grade 12-1", level: "Senior High" },
    { id: "twelveTwo", name: "Grade 12-2", level: "Senior High" }
  ];

  const subjects = [
    'Mathematics', 'English', 'Science', 'Social Studies', 'Art',
    'Music', 'Physical Education', 'Computer Science', 'Literature',
    'Physics', 'Chemistry', 'Biology', 'History', 'Geography',
    'French', 'Spanish', 'Religious Studies', 'Health Education'
  ];

  const adminPositions = [
    'Principal', 'Vice Principal', 'Academic Director', 'Dean of Students',
    'Registrar', 'Finance Officer', 'IT Administrator', 'HR Manager',
    'Guidance Counselor', 'Librarian', 'Secretary'
  ];

  const adminPermissions = [
    'user_management', 'grade_management', 'schedule_management',
    'financial_management', 'system_administration', 'reporting',
    'student_records', 'teacher_records', 'academic_planning'
  ];

  // Mock existing data for validation
  const existingUsers = [
    { username: 'john.doe', email: 'john@school.edu' },
    { username: 'jane.smith', email: 'jane@school.edu' }
  ];

  // Helper functions
  const generateUsername = () => {
    const { firstName, lastName } = formData;
    if (!firstName || !lastName) return '';
    
    const base = `${firstName.toLowerCase()}.${lastName.toLowerCase()}`;
    const variations = [
      base,
      `${firstName.toLowerCase()}${lastName.charAt(0).toLowerCase()}`,
      `${firstName.charAt(0).toLowerCase()}${lastName.toLowerCase()}`,
      `${base}${Math.floor(Math.random() * 100)}`
    ];
    
    for (let variation of variations) {
      if (!existingUsers.find(user => user.username === variation)) {
        return variation;
      }
    }
    return `${base}${Math.floor(Math.random() * 1000)}`;
  };

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  const generateUserId = () => {
    const prefix = userType === 'student' ? 'STU' : userType === 'teacher' ? 'TCH' : 'ADM';
    return `${prefix}${Date.now()}${Math.floor(Math.random() * 1000)}`;
  };

  // Validation functions
  const validateStep = async (step) => {
    setIsValidating(true);
    const newErrors = {};

    switch (step) {
      case 2: // Personal Information
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        
        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = 'Invalid email format';
        }
        if (formData.email && existingUsers.find(user => user.email === formData.email)) {
          newErrors.email = 'Email already registered';
        }
        break;

      case 3: // Role-specific information
        if (userType === 'student') {
          if (!formData.classId) newErrors.classId = 'Class selection is required';
          
          // Guardian validation
          if (!formData.guardian.firstName.trim()) {
            newErrors.guardianFirstName = 'Guardian first name is required';
          }
          if (!formData.guardian.lastName.trim()) {
            newErrors.guardianLastName = 'Guardian last name is required';
          }
          if (!formData.guardian.phone.trim()) {
            newErrors.guardianPhone = 'Guardian phone is required';
          }
          if (!formData.guardian.address.trim()) {
            newErrors.guardianAddress = 'Guardian address is required';
          }
        } else if (userType === 'teacher') {
          if (formData.subjects.length === 0) {
            newErrors.subjects = 'At least one subject must be selected';
          }
        } else if (userType === 'administrator') {
          if (!formData.position) newErrors.position = 'Position is required';
          if (formData.permissions.length === 0) {
            newErrors.permissions = 'At least one permission must be selected';
          }
        }
        break;

      case 4: // Account credentials
        if (!formData.username.trim()) newErrors.username = 'Username is required';
        if (!formData.password.trim()) newErrors.password = 'Password is required';
        if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
        if (existingUsers.find(user => user.username === formData.username)) {
          newErrors.username = 'Username already exists';
        }
        break;
    }

    setErrors(newErrors);
    setIsValidating(false);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (await validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubjectChange = (subject, level, checked) => {
    let updatedSubjects = [...formData.subjects];
    const existingIndex = updatedSubjects.findIndex(s => s.subject === subject && s.level === level);
    
    if (checked && existingIndex === -1) {
      updatedSubjects.push({ subject, level });
    } else if (!checked && existingIndex !== -1) {
      updatedSubjects.splice(existingIndex, 1);
    }
    
    setFormData({ ...formData, subjects: updatedSubjects });
  };

  const handleSelfContainedToggle = (checked) => {
    let updatedSubjects = [...formData.subjects];
    
    if (checked) {
      // Add all subjects for Self Contained level
      subjects.forEach(subject => {
        const existingIndex = updatedSubjects.findIndex(s => s.subject === subject && s.level === 'Self Contained');
        if (existingIndex === -1) {
          updatedSubjects.push({ subject, level: 'Self Contained' });
        }
      });
    } else {
      // Remove all Self Contained subjects
      updatedSubjects = updatedSubjects.filter(s => s.level !== 'Self Contained');
    }
    
    setFormData({ ...formData, subjects: updatedSubjects });
  };

  const handlePermissionChange = (permission, checked) => {
    let updatedPermissions = [...formData.permissions];
    
    if (checked && !updatedPermissions.includes(permission)) {
      updatedPermissions.push(permission);
    } else if (!checked) {
      updatedPermissions = updatedPermissions.filter(p => p !== permission);
    }
    
    setFormData({ ...formData, permissions: updatedPermissions });
  };

  const handleSubmit = () => {
    // Create user object based on schema
    const baseUser = {
      id: generateUserId(),
      role: userType,
      firstName: formData.firstName,
      middleName: formData.middleName || undefined,
      lastName: formData.lastName,
      username: formData.username,
      password: formData.password,
      nickName: formData.nickName || undefined,
      dateOfBirth: formData.dateOfBirth,
      isActive: true,
      mustChangePassword: true,
      phone: formData.phone,
      email: formData.email || undefined,
      address: formData.address,
      bio: formData.bio || undefined,
      photo: formData.photo || undefined,
      messages: []
    };

    let userData;

    switch (userType) {
      case 'student':
        userData = {
          ...baseUser,
          studentId: baseUser.id,
          classId: formData.classId,
          requiresOtp: false,
          guardian: formData.guardian,
          grades: []
        };
        break;
        
      case 'teacher':
        userData = {
          ...baseUser,
          teacherId: baseUser.id,
          requiresOtp: false,
          subjects: formData.subjects,
          sponsorClass: formData.sponsorClass || null,
          grades: []
        };
        break;
        
      case 'administrator':
        userData = {
          ...baseUser,
          adminId: baseUser.id,
          position: formData.position,
          permissions: formData.permissions,
          requiresOtp: false
        };
        break;
        
      default:
        userData = baseUser;
    }

    console.log('Creating user:', userData);
    
    if (onUserCreated) {
      onUserCreated(userData);
    }
    
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setCurrentStep(1);
    setUserType('');
    setFormData({
      firstName: '', middleName: '', lastName: '', username: '', password: '',
      nickName: '', dateOfBirth: '', phone: '', email: '', address: '',
      bio: '', photo: '', classId: '',
      guardian: { firstName: '', middleName: '', lastName: '', email: '', phone: '', address: '' },
      subjects: [], sponsorClass: null, position: '', permissions: []
    });
    setErrors({});
  };

  const getTotalSteps = () => 4;

  const isSelfContainedSelected = () => {
    return formData.subjects.some(s => s.level === 'Self Contained');
  };

  const areAllSelfContainedSubjectsSelected = () => {
    const selfContainedSubjects = formData.subjects.filter(s => s.level === 'Self Contained');
    return selfContainedSubjects.length === subjects.length;
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-1000">
      <div className="bg-background rounded-lg border shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b bg-muted">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Create New User</h2>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
              ✕
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center space-x-2">
              {Array.from({ length: getTotalSteps() }, (_, i) => (
                <div key={i} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    i + 1 <= currentStep ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    {i + 1}
                  </div>
                  {i < getTotalSteps() - 1 && (
                    <div className={`w-12 h-1 mx-2 transition-colors ${
                      i + 1 < currentStep ? 'bg-primary' : 'bg-muted'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              Step {currentStep} of {getTotalSteps()}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {/* Step 1: User Type Selection */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-foreground">Select User Type</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { type: 'student', icon: User, label: 'Student', desc: 'Create a new student account' },
                  { type: 'teacher', icon: Users, label: 'Teacher', desc: 'Create a new teacher account' },
                  { type: 'administrator', icon: Shield, label: 'Administrator', desc: 'Create a new admin account' }
                ].map(({ type, icon: Icon, label, desc }) => (
                  <button
                    key={type}
                    onClick={() => setUserType(type)}
                    className={`p-4 border-2 rounded-lg text-left transition-all hover:bg-muted ${
                      userType === type 
                        ? 'border-primary bg-primary/10' 
                        : 'border-border hover:border-muted-foreground'
                    }`}
                  >
                    <Icon className={`w-8 h-8 mb-2 ${userType === type ? 'text-primary' : 'text-muted-foreground'}`} />
                    <h4 className="font-medium text-foreground">{label}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Personal Information */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-foreground">Personal Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className={`w-full p-3 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.firstName ? 'border-destructive' : 'border-border'
                    }`}
                    placeholder="Enter first name"
                  />
                  {errors.firstName && <p className="text-destructive text-sm mt-1">{errors.firstName}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Middle Name</label>
                  <input
                    type="text"
                    value={formData.middleName}
                    onChange={(e) => setFormData({ ...formData, middleName: e.target.value })}
                    className="w-full p-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter middle name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className={`w-full p-3 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.lastName ? 'border-destructive' : 'border-border'
                    }`}
                    placeholder="Enter last name"
                  />
                  {errors.lastName && <p className="text-destructive text-sm mt-1">{errors.lastName}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    className={`w-full p-3 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.dateOfBirth ? 'border-destructive' : 'border-border'
                    }`}
                  />
                  {errors.dateOfBirth && <p className="text-destructive text-sm mt-1">{errors.dateOfBirth}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full p-3 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.phone ? 'border-destructive' : 'border-border'
                    }`}
                    placeholder="Enter phone number"
                  />
                  {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full p-3 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.email ? 'border-destructive' : 'border-border'
                    }`}
                    placeholder="Enter email address"
                  />
                  {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Nickname</label>
                  <input
                    type="text"
                    value={formData.nickName}
                    onChange={(e) => setFormData({ ...formData, nickName: e.target.value })}
                    className="w-full p-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter nickname (optional)"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Address *
                  </label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className={`w-full p-3 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.address ? 'border-destructive' : 'border-border'
                    }`}
                    rows="3"
                    placeholder="Enter full address"
                  />
                  {errors.address && <p className="text-destructive text-sm mt-1">{errors.address}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Bio</label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="w-full p-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    rows="3"
                    placeholder="Enter a brief bio (optional)"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Role-specific Information */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-foreground">
                {userType === 'student' && 'Student Information'}
                {userType === 'teacher' && 'Teaching Information'}
                {userType === 'administrator' && 'Administrative Information'}
              </h3>
              
              {/* Student specific fields */}
              {userType === 'student' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Class Assignment *
                    </label>
                    <select
                      value={formData.classId}
                      onChange={(e) => setFormData({ ...formData, classId: e.target.value })}
                      className={`w-full p-3 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                        errors.classId ? 'border-destructive' : 'border-border'
                      }`}
                    >
                      <option value="">Select a class</option>
                      {classIds.map((cls) => (
                        <option key={cls.id} value={cls.id}>
                          {cls.name} ({cls.level})
                        </option>
                      ))}
                    </select>
                    {errors.classId && <p className="text-destructive text-sm mt-1">{errors.classId}</p>}
                  </div>

                  <div className="border-t pt-6">
                    <h4 className="text-md font-medium text-foreground mb-4">Guardian Information</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Guardian First Name *
                        </label>
                        <input
                          type="text"
                          value={formData.guardian.firstName}
                          onChange={(e) => setFormData({ 
                            ...formData, 
                            guardian: { ...formData.guardian, firstName: e.target.value }
                          })}
                          className={`w-full p-3 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                            errors.guardianFirstName ? 'border-destructive' : 'border-border'
                          }`}
                          placeholder="Guardian first name"
                        />
                        {errors.guardianFirstName && <p className="text-destructive text-sm mt-1">{errors.guardianFirstName}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Guardian Middle Name</label>
                        <input
                          type="text"
                          value={formData.guardian.middleName}
                          onChange={(e) => setFormData({ 
                            ...formData, 
                            guardian: { ...formData.guardian, middleName: e.target.value }
                          })}
                          className="w-full p-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Guardian middle name"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Guardian Last Name *
                        </label>
                        <input
                          type="text"
                          value={formData.guardian.lastName}
                          onChange={(e) => setFormData({ 
                            ...formData, 
                            guardian: { ...formData.guardian, lastName: e.target.value }
                          })}
                          className={`w-full p-3 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                            errors.guardianLastName ? 'border-destructive' : 'border-border'
                          }`}
                          placeholder="Guardian last name"
                        />
                        {errors.guardianLastName && <p className="text-destructive text-sm mt-1">{errors.guardianLastName}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Guardian Phone *
                        </label>
                        <input
                          type="tel"
                          value={formData.guardian.phone}
                          onChange={(e) => setFormData({ 
                            ...formData, 
                            guardian: { ...formData.guardian, phone: e.target.value }
                          })}
                          className={`w-full p-3 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                            errors.guardianPhone ? 'border-destructive' : 'border-border'
                          }`}
                          placeholder="Guardian phone number"
                        />
                        {errors.guardianPhone && <p className="text-destructive text-sm mt-1">{errors.guardianPhone}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Guardian Email</label>
                        <input
                          type="email"
                          value={formData.guardian.email}
                          onChange={(e) => setFormData({ 
                            ...formData, 
                            guardian: { ...formData.guardian, email: e.target.value }
                          })}
                          className="w-full p-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Guardian email address"
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Guardian Address *
                      </label>
                      <textarea
                        value={formData.guardian.address}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          guardian: { ...formData.guardian, address: e.target.value }
                        })}
                        className={`w-full p-3 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                          errors.guardianAddress ? 'border-destructive' : 'border-border'
                        }`}
                        rows="3"
                        placeholder="Guardian full address"
                      />
                      {errors.guardianAddress && <p className="text-destructive text-sm mt-1">{errors.guardianAddress}</p>}
                    </div>
                  </div>
                </>
              )}

              {/* Teacher specific fields */}
              {userType === 'teacher' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-3">
                      Subjects & Education Levels *
                    </label>
                    
                    {/* Self Contained Quick Select */}
                    <div className="mb-4 p-4 border border-border rounded-lg bg-muted/50">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={areAllSelfContainedSubjectsSelected()}
                          onChange={(e) => handleSelfContainedToggle(e.target.checked)}
                          className="mr-3 accent-primary"
                        />
                        <span className="font-medium text-foreground">
                          Self Contained (All Subjects)
                        </span>
                      </label>
                      <p className="text-sm text-muted-foreground mt-1">
                        Check this if the teacher will teach all subjects to one self-contained class
                      </p>
                    </div>
                    
                    <div className="space-y-4 max-h-64 overflow-y-auto">
                      {subjects.map((subject) => (
                        <div key={subject} className="border border-border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-medium text-foreground">{subject}</span>
                          </div>
                          <div className="flex flex-wrap gap-3">
                            {classLevels.map((level) => (
                              <label key={level} className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={formData.subjects.some(s => s.subject === subject && s.level === level)}
                                  onChange={(e) => handleSubjectChange(subject, level, e.target.checked)}
                                  className="mr-2 accent-primary"
                                />
                                <span className="text-sm text-muted-foreground">{level}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    {errors.subjects && <p className="text-destructive text-sm mt-1">{errors.subjects}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Class Sponsorship (Optional)
                    </label>
                    <select
                      value={formData.sponsorClass || ''}
                      onChange={(e) => setFormData({ ...formData, sponsorClass: e.target.value || null })}
                      className="w-full p-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">No class sponsorship</option>
                      {classIds.map((cls) => (
                        <option key={cls.id} value={cls.id}>
                          {cls.name} ({cls.level})
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}

              {/* Administrator specific fields */}
              {userType === 'administrator' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Position *
                    </label>
                    <select
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      className={`w-full p-3 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                        errors.position ? 'border-destructive' : 'border-border'
                      }`}
                    >
                      <option value="">Select position</option>
                      {adminPositions.map((position) => (
                        <option key={position} value={position}>{position}</option>
                      ))}
                    </select>
                    {errors.position && <p className="text-destructive text-sm mt-1">{errors.position}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-3">
                      Permissions *
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-48 overflow-y-auto">
                      {adminPermissions.map((permission) => (
                        <label key={permission} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.permissions.includes(permission)}
                            onChange={(e) => handlePermissionChange(permission, e.target.checked)}
                            className="mr-3 accent-primary"
                          />
                          <span className="text-sm text-foreground capitalize">
                            {permission.replace('_', ' ')}
                          </span>
                        </label>
                      ))}
                    </div>
                    {errors.permissions && <p className="text-destructive text-sm mt-1">{errors.permissions}</p>}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Step 4: Account Credentials */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-foreground">Account Credentials</h3>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Username *
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className={`flex-1 p-3 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.username ? 'border-destructive' : 'border-border'
                    }`}
                    placeholder="Enter username"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, username: generateUsername() })}
                    className="px-4 py-3 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors flex items-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Generate
                  </button>
                </div>
                {errors.username && <p className="text-destructive text-sm mt-1">{errors.username}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Password *
                </label>
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className={`w-full p-3 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary pr-10 ${
                        errors.password ? 'border-destructive' : 'border-border'
                      }`}
                      placeholder="Enter password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, password: generatePassword() })}
                    className="px-4 py-3 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors flex items-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Generate
                  </button>
                </div>
                {errors.password && <p className="text-destructive text-sm mt-1">{errors.password}</p>}
                <p className="text-sm text-muted-foreground mt-1">
                  User will be required to change password on first login
                </p>
              </div>

              {/* Summary Section */}
              <div className="border-t pt-6">
                <h4 className="text-md font-medium text-foreground mb-4">Account Summary</h4>
                <div className="bg-muted rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">User Type:</span>
                    <span className="text-sm font-medium text-foreground capitalize">{userType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Full Name:</span>
                    <span className="text-sm font-medium text-foreground">
                      {formData.firstName} {formData.middleName} {formData.lastName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Username:</span>
                    <span className="text-sm font-medium text-foreground">{formData.username}</span>
                  </div>
                  {userType === 'student' && formData.classId && (
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Class:</span>
                      <span className="text-sm font-medium text-foreground">
                        {classIds.find(c => c.id === formData.classId)?.name}
                      </span>
                    </div>
                  )}
                  {userType === 'teacher' && formData.subjects.length > 0 && (
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Subjects:</span>
                      <span className="text-sm font-medium text-foreground">
                        {formData.subjects.length} subject(s) assigned
                      </span>
                    </div>
                  )}
                  {userType === 'administrator' && formData.position && (
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Position:</span>
                      <span className="text-sm font-medium text-foreground">{formData.position}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-muted flex justify-between">
          <button
            onClick={currentStep === 1 ? onClose : handlePrevious}
            className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
            disabled={isValidating}
          >
            <ChevronLeft className="w-4 h-4" />
            {currentStep === 1 ? 'Cancel' : 'Previous'}
          </button>

          {currentStep < getTotalSteps() ? (
            <button
              onClick={handleNext}
              disabled={isValidating || (currentStep === 1 && !userType)}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isValidating ? 'Validating...' : 'Next'}
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isValidating}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isValidating ? 'Creating...' : 'Create User'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiStepUserModal;