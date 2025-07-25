"use client"
import React, { useState } from 'react';
import { 
  User, 
  Users, 
  GraduationCap, 
  CreditCard, 
  Phone, 
  CheckCircle, 
  XCircle, 
  Loader2,
  ArrowLeft,
  ArrowRight,
  X
} from 'lucide-react';

const AdmissionsForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null); // 'loading', 'success', 'failed'
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [paymentPhone, setPaymentPhone] = useState('');

  // Form data state
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    middleName: '',
    lastName: '',
    dateOfBirth: '',
    address: '',
    phone: '',
    email: '',
    
    // Parent/Guardian Information
    parentFirstName: '',
    parentLastName: '',
    parentRelationship: '',
    parentPhone: '',
    parentEmail: '',
    parentAddress: '',
    
    // Academic History
    previousSchool: '',
    gradeLevel: '',
    graduationYear: '',
    gpa: '',
    achievements: '',
    
    // Application fee
    applicationFee: 50 // Default fee amount
  });

  const steps = [
    { id: 1, title: 'Personal Information', icon: User },
    { id: 2, title: 'Parent/Guardian Info', icon: Users },
    { id: 3, title: 'Academic History', icon: GraduationCap },
    { id: 4, title: 'Review & Submit', icon: CreditCard }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmitWithoutPayment = () => {
    // Submit application without payment
    alert('Application submitted successfully! You will be contacted regarding payment.');
  };

  const handlePayAndSubmit = () => {
    setShowPaymentModal(true);
  };

  const processPayment = () => {
    setPaymentStatus('loading');
    
    // Simulate payment processing
    setTimeout(() => {
      if (formData.applicationFee < 100) {
        setPaymentStatus('failed');
      } else {
        setPaymentStatus('success');
      }
    }, 5000);
  };

  const closePaymentModal = () => {
    setShowPaymentModal(false);
    setPaymentStatus(null);
    setSelectedPaymentMethod('');
    setPaymentPhone('');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-title-sm font-outfit font-semibold text-gray-900 dark:text-white mb-6">
              Personal Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-theme-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-colors"
                  placeholder="Enter first name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-theme-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Middle Name
                </label>
                <input
                  type="text"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-colors"
                  placeholder="Enter middle name"
                />
              </div>
            </div>

            <div>
              <label className="block text-theme-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-colors"
                placeholder="Enter last name"
                required
              />
            </div>

            <div>
              <label className="block text-theme-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Date of Birth *
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-theme-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Address *
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-colors"
                placeholder="Enter full address"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-theme-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-colors"
                  placeholder="+231 XXX XXXX"
                  required
                />
              </div>
              
              <div>
                <label className="block text-theme-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-colors"
                  placeholder="Enter email address"
                  required
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-title-sm font-outfit font-semibold text-gray-900 dark:text-white mb-6">
              Parent/Guardian Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-theme-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Parent/Guardian First Name *
                </label>
                <input
                  type="text"
                  name="parentFirstName"
                  value={formData.parentFirstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-colors"
                  placeholder="Enter first name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-theme-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="parentLastName"
                  value={formData.parentLastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-colors"
                  placeholder="Enter last name"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-theme-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Relationship to Student *
              </label>
              <select
                name="parentRelationship"
                value={formData.parentRelationship}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-colors"
                required
              >
                <option value="">Select relationship</option>
                <option value="father">Father</option>
                <option value="mother">Mother</option>
                <option value="guardian">Guardian</option>
                <option value="grandfather">Grandfather</option>
                <option value="grandmother">Grandmother</option>
                <option value="uncle">Uncle</option>
                <option value="aunt">Aunt</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-theme-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="parentPhone"
                  value={formData.parentPhone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-colors"
                  placeholder="+231 XXX XXXX"
                  required
                />
              </div>
              
              <div>
                <label className="block text-theme-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="parentEmail"
                  value={formData.parentEmail}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-colors"
                  placeholder="Enter email address"
                />
              </div>
            </div>

            <div>
              <label className="block text-theme-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Address *
              </label>
              <textarea
                name="parentAddress"
                value={formData.parentAddress}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-colors"
                placeholder="Enter full address"
                required
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-title-sm font-outfit font-semibold text-gray-900 dark:text-white mb-6">
              Academic History
            </h3>
            
            <div>
              <label className="block text-theme-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Previous School *
              </label>
              <input
                type="text"
                name="previousSchool"
                value={formData.previousSchool}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-colors"
                placeholder="Enter previous school name"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-theme-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Grade Level Applying For *
                </label>
                <select
                  name="gradeLevel"
                  value={formData.gradeLevel}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-colors"
                  required
                >
                  <option value="">Select grade level</option>
                  <option value="kindergarten">Kindergarten</option>
                  <option value="1st">1st Grade</option>
                  <option value="2nd">2nd Grade</option>
                  <option value="3rd">3rd Grade</option>
                  <option value="4th">4th Grade</option>
                  <option value="5th">5th Grade</option>
                  <option value="6th">6th Grade</option>
                  <option value="7th">7th Grade</option>
                  <option value="8th">8th Grade</option>
                  <option value="9th">9th Grade</option>
                  <option value="10th">10th Grade</option>
                  <option value="11th">11th Grade</option>
                  <option value="12th">12th Grade</option>
                </select>
              </div>
              
              <div>
                <label className="block text-theme-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Expected Graduation Year
                </label>
                <input
                  type="number"
                  name="graduationYear"
                  value={formData.graduationYear}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-colors"
                  placeholder="e.g., 2025"
                  min="2024"
                  max="2035"
                />
              </div>
            </div>

            <div>
              <label className="block text-theme-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Current GPA (if applicable)
              </label>
              <input
                type="number"
                name="gpa"
                value={formData.gpa}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-colors"
                placeholder="e.g., 3.5"
                min="0"
                max="4"
                step="0.1"
              />
            </div>

            <div>
              <label className="block text-theme-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Academic Achievements & Awards
              </label>
              <textarea
                name="achievements"
                value={formData.achievements}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-colors"
                placeholder="List any academic achievements, awards, or extracurricular activities..."
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-title-sm font-outfit font-semibold text-gray-900 dark:text-white mb-6">
              Review & Submit Application
            </h3>
            
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-4">
              <h4 className="font-medium text-gray-900 dark:text-white">Application Summary</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-theme-sm">
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Student:</span>
                  <span className="ml-2 text-gray-900 dark:text-white">
                    {formData.firstName} {formData.middleName} {formData.lastName}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Grade Level:</span>
                  <span className="ml-2 text-gray-900 dark:text-white">{formData.gradeLevel}</span>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Parent:</span>
                  <span className="ml-2 text-gray-900 dark:text-white">
                    {formData.parentFirstName} {formData.parentLastName}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Previous School:</span>
                  <span className="ml-2 text-gray-900 dark:text-white">{formData.previousSchool}</span>
                </div>
              </div>
            </div>

            <div className="bg-brand-50 dark:bg-brand-500/10 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Application Fee</h4>
                <span className="text-title-sm font-semibold text-brand-600 dark:text-brand-400">
                  ${formData.applicationFee}
                </span>
              </div>
              <p className="text-theme-sm text-gray-600 dark:text-gray-400">
                You can submit your application now and pay later, or pay and submit immediately.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleSubmitWithoutPayment}
                className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Submit Application
              </button>
              <button
                onClick={handlePayAndSubmit}
                className="flex-1 px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-lg font-medium transition-colors focus:ring-2 focus:ring-brand-500/20"
              >
                Pay & Submit (${formData.applicationFee})
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-title-lg font-outfit font-semibold text-gray-900 dark:text-white mb-2">
            School Admissions Application
          </h1>
          <p className="text-theme-xl text-gray-600 dark:text-gray-300">
            Complete all steps to submit your application
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <React.Fragment key={step.id}>
                  <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                      isActive 
                        ? 'bg-brand-500 text-white' 
                        : isCompleted 
                          ? 'bg-success-500 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <IconComponent className="w-6 h-6" />
                      )}
                    </div>
                    <span className={`mt-2 text-theme-xs font-medium ${
                      isActive 
                        ? 'text-brand-500 dark:text-brand-400' 
                        : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 ${
                      isCompleted ? 'bg-success-500' : 'bg-gray-200 dark:bg-gray-700'
                    }`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-theme-lg p-8 border border-gray-200 dark:border-gray-800">
          {renderStepContent()}

          {/* Navigation Buttons */}
          {currentStep < 4 && (
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                  currentStep === 1
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                    : 'border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </button>

              <button
                onClick={nextStep}
                className="flex items-center px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-lg font-medium transition-colors focus:ring-2 focus:ring-brand-500/20"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          )}
        </div>

        {/* Payment Modal */}
        {showPaymentModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-theme-xl max-w-md w-full p-6 border border-gray-200 dark:border-gray-800">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-title-sm font-outfit font-semibold text-gray-900 dark:text-white">
                  Payment
                </h3>
                <button
                  onClick={closePaymentModal}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {paymentStatus === 'loading' && (
                <div className="text-center py-8">
                  <Loader2 className="w-12 h-12 text-brand-500 animate-spin mx-auto mb-4" />
                  <p className="text-theme-sm text-gray-600 dark:text-gray-400">
                    Processing payment...
                  </p>
                </div>
              )}

              {paymentStatus === 'success' && (
                <div className="text-center py-8">
                  <CheckCircle className="w-12 h-12 text-success-500 mx-auto mb-4" />
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Payment Successful!
                  </h4>
                  <p className="text-theme-sm text-gray-600 dark:text-gray-400 mb-6">
                    Your application has been submitted successfully.
                  </p>
                  <button
                    onClick={closePaymentModal}
                    className="w-full px-4 py-3 bg-success-500 hover:bg-success-600 text-white rounded-lg font-medium transition-colors"
                  >
                    Continue
                  </button>
                </div>
              )}

              {paymentStatus === 'failed' && (
                <div className="text-center py-8">
                  <XCircle className="w-12 h-12 text-error-500 mx-auto mb-4" />
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Payment Failed
                  </h4>
                  <p className="text-theme-sm text-gray-600 dark:text-gray-400 mb-6">
                    Your payment could not be processed. Please try again.
                  </p>
                  <button
                    onClick={() => setPaymentStatus(null)}
                    className="w-full px-4 py-3 bg-error-500 hover:bg-error-600 text-white rounded-lg font-medium transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              )}

              {!paymentStatus && (
                <div className="space-y-6">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-theme-sm text-gray-600 dark:text-gray-400">Amount:</span>
                      <span className="font-semibold text-gray-900 dark:text-white">${formData.applicationFee}</span>
                    </div>
                  </div>

                  <div>
                  <label className="block text-theme-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Select Payment Method *
                    </label>
                    <select
                      name="selectedPaymentMethod"
                      value={selectedPaymentMethod}
                      onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-colors"
                      required
                    >
                      <option value="">Choose Method</option>
                      <option value="orange">Orange Money</option>
                      <option value="lonestar">Lonestar Mobile Money</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-theme-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Payment Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="paymentPhone"
                      value={paymentPhone}
                      onChange={(e) => setPaymentPhone(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-colors"
                      placeholder="Enter mobile money number"
                      required
                    />
                  </div>

                  <button
                    onClick={processPayment}
                    disabled={!selectedPaymentMethod || !paymentPhone}
                    className="w-full px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-lg font-medium transition-colors focus:ring-2 focus:ring-brand-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Pay Now
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdmissionsForm;
