import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, User, Users, Shield, Eye, EyeOff, RefreshCw, Camera } from 'lucide-react';

const MultiStepUserModal = ({ showModal, onClose, onUserCreated }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userType, setUserType] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isValidating, setIsValidating] = useState(false);

  // Form data state
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    middleName: '',
    lastName: '',
    dateOfBirth: '',
    phoneNumber: '',
    email: '',
    address: '',
    gender: '',
    nickname: '',
    bio: '',
    avatar: '',
    
    // Role-specific data
    subjects: [], // For teachers
    classSponsorship: '',
    isClassSponsor: false,
    position: '', // For administrators
    
    // Account credentials
    username: '',
    password: ''
  });

  // Predefined avatars
  const avatars = [
    '👨‍🎓', '👩‍🎓', '👨‍🏫', '👩‍🏫', '👨‍💼', '👩‍💼',
    '🧑‍🎓', '🧑‍🏫', '🧑‍💼', '👨', '👩', '🧑'
  ];

  // Subject options
  const subjects = [
    'Mathematics', 'English', 'Science', 'Social Studies', 'Art',
    'Music', 'Physical Education', 'Computer Science', 'Literature',
    'Physics', 'Chemistry', 'Biology', 'History', 'Geography'
  ];

  // Education levels
  const educationLevels = ['Elementary', 'Junior High', 'Senior High'];

  // Administrator positions
  const adminPositions = [
    'Principal', 'Vice Principal', 'Academic Director', 'Dean of Students',
    'Registrar', 'Finance Officer', 'IT Administrator', 'HR Manager'
  ];

  // Mock existing data for validation
  const existingUsers = [
    { username: 'john.doe', email: 'john@school.edu' },
    { username: 'jane.smith', email: 'jane@school.edu' }
  ];

  const existingTeacherAssignments = [
    { subject: 'Mathematics', level: 'Senior High', teacher: 'Mr. Johnson' },
    { subject: 'English', level: 'Junior High', teacher: 'Ms. Davis' }
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
    
    // Find first available username
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

  // Validation functions
  const validateStep = async (step) => {
    setIsValidating(true);
    const newErrors = {};

    switch (step) {
      case 2: // Personal Information
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
        if (!formData.gender) newErrors.gender = 'Gender is required';
        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = 'Invalid email format';
        }
        if (formData.email && existingUsers.find(user => user.email === formData.email)) {
          newErrors.email = 'Email already registered';
        }
        break;

      case 3: // Role-specific information
        if (userType === 'teacher') {
          if (formData.subjects.length === 0) {
            newErrors.subjects = 'At least one subject must be selected';
          }
          // Check for conflicts with existing teachers
          for (let subject of formData.subjects) {
            for (let level of subject.levels) {
              const conflict = existingTeacherAssignments.find(
                assignment => assignment.subject === subject.name && assignment.level === level
              );
              if (conflict) {
                newErrors.subjects = `${conflict.teacher} already teaches ${subject.name} at ${level} level`;
                break;
              }
            }
            if (newErrors.subjects) break;
          }
        } else if (userType === 'administrator') {
          if (!formData.position) newErrors.position = 'Position is required';
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

  const handleSubjectChange = (subjectName, levels) => {
    const updatedSubjects = formData.subjects.filter(s => s.name !== subjectName);
    if (levels.length > 0) {
      updatedSubjects.push({ name: subjectName, levels });
    }
    setFormData({ ...formData, subjects: updatedSubjects });
  };

  const handleSubmit = () => {
    // Handle final form submission
    console.log('Submitting user data:', formData);
    
    // If onUserCreated callback is provided, call it
    if (onUserCreated) {
      onUserCreated(formData);
    }
    
    onClose();
    // Reset form
    setCurrentStep(1);
    setUserType('');
    setFormData({
      firstName: '', middleName: '', lastName: '', dateOfBirth: '',
      phoneNumber: '', email: '', address: '', gender: '', nickname: '',
      bio: '', avatar: '', subjects: [], classSponsorship: '',
      isClassSponsor: false, position: '', username: '', password: ''
    });
    setErrors({});
  };

  const getTotalSteps = () => {
    if (userType === 'student') return 4;
    return 5; // Teachers and administrators have an extra role-specific step
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-background rounded-lg border border-border shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-border bg-muted/50">
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
                    className={`p-4 border-2 rounded-lg text-left transition-all hover:bg-muted/50 ${
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
                    className={`w-full p-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring ${
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
                    className="w-full p-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
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
                    className={`w-full p-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring ${
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
                    className={`w-full p-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring ${
                      errors.dateOfBirth ? 'border-destructive' : 'border-border'
                    }`}
                  />
                  {errors.dateOfBirth && <p className="text-destructive text-sm mt-1">{errors.dateOfBirth}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Gender *
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className={`w-full p-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring ${
                      errors.gender ? 'border-destructive' : 'border-border'
                    }`}
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.gender && <p className="text-destructive text-sm mt-1">{errors.gender}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    className="w-full p-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Enter phone number"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full p-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring ${
                      errors.email ? 'border-destructive' : 'border-border'
                    }`}
                    placeholder="Enter email address"
                  />
                  {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Address</label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full p-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  rows="3"
                  placeholder="Enter full address"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Nickname</label>
                  <input
                    type="text"
                    value={formData.nickname}
                    onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                    className="w-full p-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Enter nickname (optional)"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Avatar</label>
                  <div className="flex flex-wrap gap-2">
                    {avatars.map((avatar, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setFormData({ ...formData, avatar })}
                        className={`w-10 h-10 text-xl border-2 rounded-lg hover:border-primary transition-colors ${
                          formData.avatar === avatar ? 'border-primary bg-primary/10' : 'border-border'
                        }`}
                      >
                        {avatar}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Bio</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full p-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  rows="3"
                  placeholder="Enter a brief bio (optional)"
                />
              </div>
            </div>
          )}

          {/* Step 3: Role-specific Information (Teachers) */}
          {currentStep === 3 && userType === 'teacher' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-foreground">Teaching Information</h3>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  Subjects & Education Levels *
                </label>
                <div className="space-y-4">
                  {subjects.map((subject) => {
                    const selectedSubject = formData.subjects.find(s => s.name === subject);
                    const selectedLevels = selectedSubject ? selectedSubject.levels : [];
                    
                    return (
                      <div key={subject} className="border border-border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-medium text-foreground">{subject}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {educationLevels.map((level) => (
                            <label key={level} className="flex items-center">
                              <input
                                type="checkbox"
                                checked={selectedLevels.includes(level)}
                                onChange={(e) => {
                                  let newLevels = [...selectedLevels];
                                  if (e.target.checked) {
                                    newLevels.push(level);
                                  } else {
                                    newLevels = newLevels.filter(l => l !== level);
                                  }
                                  handleSubjectChange(subject, newLevels);
                                }}
                                className="mr-2 accent-primary"
                              />
                              <span className="text-sm text-muted-foreground">{level}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
                {errors.subjects && <p className="text-destructive text-sm mt-1">{errors.subjects}</p>}
              </div>

              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.isClassSponsor}
                    onChange={(e) => setFormData({ ...formData, isClassSponsor: e.target.checked })}
                    className="mr-2 accent-primary"
                  />
                  <span className="text-sm font-medium text-foreground">Class Sponsor</span>
                </label>
              </div>

              {formData.isClassSponsor && (
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Sponsored Class
                  </label>
                  <input
                    type="text"
                    value={formData.classSponsorship}
                    onChange={(e) => setFormData({ ...formData, classSponsorship: e.target.value })}
                    className="w-full p-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="e.g., Grade 10A"
                  />
                </div>
              )}
            </div>
          )}

          {/* Step 3: Role-specific Information (Administrators) */}
          {currentStep === 3 && userType === 'administrator' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-foreground">Administrative Information</h3>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Position *
                </label>
                <select
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  className={`w-full p-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring ${
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
            </div>
          )}

          {/* Step 4 (Students) / Step 4 (Teachers & Admins): Account Credentials */}
          {((currentStep === 4 && userType === 'student') || (currentStep === 4 && userType !== 'student')) && (
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
                    className={`flex-1 p-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring ${
                      errors.username ? 'border-destructive' : 'border-border'
                    }`}
                    placeholder="Enter username"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, username: generateUsername() })}
                    className="px-4 py-3 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors flex items-center gap-2"
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
                      className={`w-full p-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring pr-10 ${
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
                    className="px-4 py-3 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors flex items-center gap-2"
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
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border bg-muted/50 flex justify-between">
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
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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