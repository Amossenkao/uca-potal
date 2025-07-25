"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from 'axios'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Search,
  User,
  CreditCard,
  DollarSign,
  Receipt,
  Download,
  MoreHorizontal,
  ArrowLeft,
  CheckCircle,
  XCircle,
  Loader2,
  FileText,
  AlertCircle,
  BookOpen
} from "lucide-react";

export default function PaymentPage({id=""}) {
  
  // Payment form states
  const [studentId, setStudentId] = useState(id);
  const [paymentType, setPaymentType] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');
  
  // Search states
  const [showSearch, setShowSearch] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState('');
  
  // Payment processing states
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(''); 
  const [paymentMessage, setPaymentMessage] = useState('');

  // API Configuration
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

  const handleStudentIdSearch = async () => {
    if (!studentId.trim()) return;
    
    setIsSearching(true);
    setSearchError('');
      
      try {
        const response = await axios.get('/api/users', { params: { role: "student" , id: studentId.trim() } });
        setSelectedStudent(response.data)
        setShowSearch(false);
      } catch {
         setSearchError('Student not found. Please check the Student ID or use the name search function.');
      }
     finally {
      setIsSearching(false);
    }
  };

  // Student search by name
  const handleNameSearch = async () => {
    if (!firstName.trim() && !lastName.trim()) {
      setSearchError('Please enter at least a first name or last name');
      return;
    }

    setIsSearching(true);
    setSearchError('');
    setSearchResults([]);
    
    try {
      const params = new URLSearchParams();
      if (firstName.trim()) params.append('firstName', firstName.trim());
      if (lastName.trim()) params.append('lastName', lastName.trim());

      const response = await axios.get('/api/users', { params });
      const results = response.data
      console.log(results)

        if (results.length === 0) {
          setSearchError('No students found matching the search criteria. Please try different names.');
        } else {
          setSearchResults(results);
          setSearchError('');
        }
      
    } catch (error) {
      setSearchError('Error searching for students. Please check your connection and try again.');
    } finally {
      setIsSearching(false);
    }
  };

  const selectStudent = (student) => {
    setSelectedStudent(student);
    setSearchResults([]);
    setShowSearch(false);
    setFirstName('');
    setLastName('');
    setSearchError('');
  };

  const clearStudentSelection = () => {
    setSelectedStudent(null);
    setStudentId('');
    setPaymentType('');
    setAmount('');
    setSearchError('');
  };

  // Payment processing
  const handlePayment = async () => {
    if (!selectedStudent || !paymentType || !amount || !paymentMethod) {
      alert('Please fill in all required fields');
      return;
    }

    if (paymentMethod === 'card' && (!cardNumber || !expiryDate || !cvv || !cardName)) {
      alert('Please fill in all card details');
      return;
    }

    setIsProcessing(true);
    setPaymentStatus('');
    
    try {
      const paymentData = {
        studentId: selectedStudent.id,
        paymentType,
        amount: parseFloat(amount),
        paymentMethod,
        ...(paymentMethod === 'card' && {
          cardDetails: {
            cardNumber,
            expiryDate,
            cvv,
            cardName
          }
        })
      };

      const response = await fetch(`${API_BASE_URL}/payments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      if (response.ok) {
        const result = await response.json();
        setPaymentStatus('success');
        setPaymentMessage(`Payment of $${amount} for ${paymentType} has been processed successfully for ${selectedStudent.name}.`);
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Payment failed');
      }
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentStatus('error');
      setPaymentMessage(error.message || 'Payment failed. Please check your payment details and try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const resetForm = () => {
    setPaymentStatus('');
    setPaymentMessage('');
    setSelectedStudent(null);
    setStudentId('');
    setPaymentType('');
    setAmount('');
    setPaymentMethod('');
    setCardNumber('');
    setExpiryDate('');
    setCvv('');
    setCardName('');
    setShowSearch(false);
    setSearchResults([]);
    setFirstName('');
    setLastName('');
    setSearchError('');
  };

  const paymentTypes = [
    { value: 'tuition', label: 'Tuition Fees', icon: BookOpen },
    { value: 'registration', label: 'Registration Fees', icon: FileText },
    { value: 'other', label: 'Other Fees', icon: MoreHorizontal }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Student Payment</h1>
          <p className="text-lg text-muted-foreground">Pay tuition, registration, or other fees for enrolled students</p>
        </div>

        {/* Payment Status Messages */}
        {paymentStatus === 'success' && (
          <Card className="mb-8 border-green-200 bg-green-50 dark:bg-green-950/30 dark:border-green-800">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                <div>
                  <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">Payment Successful!</h3>
                  <p className="text-green-700 dark:text-green-300">{paymentMessage}</p>
                  <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    <Button onClick={resetForm} variant="outline" size="sm">
                      Make Another Payment
                    </Button>
                    <Button>
                      <Download className="h-4 w-4 mr-2" />
                      Download Receipt
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {paymentStatus === 'error' && (
          <Card className="mb-8 border-red-200 bg-red-50 dark:bg-red-950/30 dark:border-red-800">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <XCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
                <div>
                  <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">Payment Failed</h3>
                  <p className="text-red-700 dark:text-red-300">{paymentMessage}</p>
                  <Button onClick={() => setPaymentStatus('')} variant="outline" size="sm" className="mt-4">
                    Try Again
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Payment Form */}
        {paymentStatus === '' && (
          <div className="space-y-8">
            {/* Student Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Student Information
                </CardTitle>
                <CardDescription>
                  Find the student you want to make a payment for
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {!selectedStudent ? (
                  <>
                    {/* Student ID Input */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Student ID (if known)</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={studentId}
                            onChange={(e) => setStudentId(e.target.value)}
                            placeholder="e.g. UCA2024001"
                            className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                          />
                          <Button 
                            onClick={handleStudentIdSearch} 
                            disabled={!studentId.trim() || isSearching}
                          >
                            {isSearching ? (
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            ) : (
                              <Search className="h-4 w-4 mr-2" />
                            )}
                            Find
                          </Button>
                        </div>
                      </div>

                      <div className="text-center">
                        <span className="text-muted-foreground">or</span>
                      </div>

                      <Button 
                        variant="outline" 
                        onClick={() => setShowSearch(!showSearch)}
                        className="w-full"
                      >
                        <Search className="h-4 w-4 mr-2" />
                        Search by Student Name
                      </Button>
                    </div>

                    {/* Name Search */}
                    {showSearch && (
                      <Card className="border-dashed">
                        <CardHeader>
                          <CardTitle className="text-lg">Search by Name</CardTitle>
                          <CardDescription>
                            Enter the student's first name, last name, or both
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-2">First Name</label>
                              <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="Enter first name"
                                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">Last Name</label>
                              <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Enter last name"
                                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                              />
                            </div>
                          </div>
                          <Button 
                            onClick={handleNameSearch} 
                            disabled={isSearching || (!firstName.trim() && !lastName.trim())}
                            className="w-full"
                          >
                            {isSearching ? (
                              <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Searching...
                              </>
                            ) : (
                              <>
                                <Search className="h-4 w-4 mr-2" />
                                Search Students
                              </>
                            )}
                          </Button>
                        </CardContent>
                      </Card>
                    )}

                    {/* Error Message */}
                    {searchError && (
                      <Card className="border-red-200 bg-red-50 dark:bg-red-950/30 dark:border-red-800">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2">
                            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                            <p className="text-red-700 dark:text-red-300">{searchError}</p>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Search Results */}
                    {searchResults.length > 0 && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Search Results</CardTitle>
                          <CardDescription>
                            {searchResults.length} student{searchResults.length !== 1 ? 's' : ''} found
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {searchResults.map((student) => (
                              <div
                                key={student.id}
                                onClick={() => selectStudent(student)}
                                className="flex items-center gap-4 p-4 border border-border rounded-lg hover:bg-muted cursor-pointer transition-colors"
                              >
                                <Avatar className="w-12 h-12">
                                  <AvatarImage src={student.profilePhoto} />
                                  <AvatarFallback>
                                    {student.firstName[0]} {student.lastName[0]} 
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <h4 className="font-semibold">{student.firstName} {student.lastName}</h4>
                                  <div className="text-sm text-muted-foreground space-y-1">
                                    {<p>Class: {student.class || "Grade 9"}</p>}
                                  </div>
                                </div>
                                <Button size="sm">Select</Button>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </>
                ) : (
                  // Display selected student info
                  <div className="flex gap-4 items-start border p-4 rounded-lg bg-muted/50 relative">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={selectedStudent.avatar} />
                      <AvatarFallback>
                        {selectedStudent.firstName[0]} {selectedStudent.lastName[0]} 
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{selectedStudent.firstName} {selectedStudent.lastName}</h3>
                      <p className="text-sm text-muted-foreground">Class: {selectedStudent.class ||"Grade 9" }</p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={clearStudentSelection}>
                      Change
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Payment Form */}
            {selectedStudent && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Details
                  </CardTitle>
                  <CardDescription>Select the payment type and complete the form</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Payment Type */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Payment Type</label>
                    <select
                      value={paymentType}
                      onChange={(e) => {
                        const selected = e.target.value;
                        setPaymentType(selected);
                        if (selectedStudent?.outstandingFees && selectedStudent.outstandingFees[selected]) {
                          setAmount(selectedStudent.outstandingFees[selected].toFixed(2));
                        } else {
                          setAmount('');
                        }
                      }}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                    >
                      <option value="">Select a payment type</option>
                      {paymentTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Amount */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Amount</label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="e.g. 250.00"
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                    />
                  </div>

                  {/* Payment Method */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Payment Method</label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                    >
                      <option value="">Choose a method</option>
                      <option value="card">Visa / Mastercard</option>
                      <option value="orange">Orange Money</option>
                      <option value="mtn">MTN Mobile Money</option>
                    </select>
                  </div>

                  {/* Card Payment Fields */}
                  {paymentMethod === 'card' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium mb-2">Card Number</label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="e.g. 4111 1111 1111 1111"
                          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                        />
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Expiry Date</label>
                          <input
                            type="text"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                            placeholder="MM/YY"
                            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">CVV</label>
                          <input
                            type="text"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                            placeholder="e.g. 123"
                            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Name on Card</label>
                        <input
                          type="text"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          placeholder="Full name"
                          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                        />
                      </div>
                    </>
                  )}

                  <Button 
                    onClick={handlePayment} 
                    disabled={isProcessing}
                    className="w-full"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="h-4 w-4 mr-2" />
                        Submit Payment
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}