"use client"

import React, { useState, useEffect } from 'react';
import { 
  Download, 
  DollarSign, 
  Calendar, 
  CreditCard, 
  User, 
  Receipt,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  BookOpen,
  MoreHorizontal,
  Filter,
  Search,
  Eye
} from 'lucide-react';
import useAuth from '@/store/useAuth';

const FinancialOverview = () => {
  const { user, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('obligations');
  const [obligations, setObligations] = useState([]);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data - replace with actual API calls
  useEffect(() => {
    const loadFinancialData = async () => {
      setIsLoadingData(true);
      
      // Simulate API call
      setTimeout(() => {
        // Sample obligations data
        setObligations([
          {
            id: 1,
            type: 'tuition',
            description: 'Tuition Fee - Fall Semester 2024',
            amount: 1200.00,
            dueDate: '2024-11-15',
            status: 'pending',
            priority: 'high'
          },
          {
            id: 2,
            type: 'registration',
            description: 'Registration Fee - Spring 2025',
            amount: 150.00,
            dueDate: '2024-12-01',
            status: 'pending',
            priority: 'medium'
          },
          {
            id: 3,
            type: 'other',
            description: 'Library Late Fee',
            amount: 25.00,
            dueDate: '2024-10-30',
            status: 'overdue',
            priority: 'low'
          },
          {
            id: 4,
            type: 'tuition',
            description: 'Tuition Fee - Summer 2024',
            amount: 800.00,
            dueDate: '2024-08-15',
            status: 'paid',
            priority: 'high'
          }
        ]);

        // Sample payment history data
        setPaymentHistory([
          {
            id: 1,
            type: 'tuition',
            description: 'Tuition Fee - Summer 2024',
            amount: 800.00,
            method: 'orange',
            date: '2024-08-10',
            payer: 'John Doe (Parent)',
            status: 'completed',
            receiptId: 'RCP-2024-001'
          },
          {
            id: 2,
            type: 'registration',
            description: 'Registration Fee - Fall 2024',
            amount: 150.00,
            method: 'lonester',
            date: '2024-07-25',
            payer: 'Self Payment',
            status: 'completed',
            receiptId: 'RCP-2024-002'
          },
          {
            id: 3,
            type: 'other',
            description: 'Activity Fee',
            amount: 50.00,
            method: 'orange',
            date: '2024-07-15',
            payer: 'Jane Doe (Guardian)',
            status: 'completed',
            receiptId: 'RCP-2024-003'
          },
          {
            id: 4,
            type: 'tuition',
            description: 'Tuition Fee - Spring 2024',
            amount: 1200.00,
            method: 'lonester',
            date: '2024-03-20',
            payer: 'John Doe (Parent)',
            status: 'completed',
            receiptId: 'RCP-2024-004'
          }
        ]);
        
        setIsLoadingData(false);
      }, 1000);
    };

    if (user) {
      loadFinancialData();
    }
  }, [user]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-300';
      case 'overdue':
        return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'paid':
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'overdue':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'tuition':
        return <BookOpen className="w-5 h-5" />;
      case 'registration':
        return <FileText className="w-5 h-5" />;
      default:
        return <MoreHorizontal className="w-5 h-5" />;
    }
  };

  const getPaymentMethodLabel = (method) => {
    switch (method) {
      case 'orange':
        return 'Orange Money';
      case 'lonester':
        return 'Lonester Mobile Money';
      default:
        return method;
    }
  };

  const downloadReceipt = (receiptId) => {
    // Simulate receipt download
    console.log(`Downloading receipt: ${receiptId}`);
    // In real implementation, this would make an API call to generate/download the receipt
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getTotalObligations = () => {
    return obligations
      .filter(o => o.status !== 'paid')
      .reduce((sum, o) => sum + o.amount, 0);
  };

  const getTotalPaid = () => {
    return paymentHistory
      .filter(p => p.status === 'completed')
      .reduce((sum, p) => sum + p.amount, 0);
  };

  const filteredObligations = obligations.filter(obligation => {
    const matchesFilter = filterStatus === 'all' || obligation.status === filterStatus;
    const matchesSearch = obligation.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const filteredPayments = paymentHistory.filter(payment => {
    const matchesSearch = payment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.payer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading financial information...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Access Denied</h3>
          <p className="text-gray-600 dark:text-gray-400">Please log in to view your financial information.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Financial Overview
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            View your financial obligations and payment history
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Outstanding Balance</p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                  ${getTotalObligations().toFixed(2)}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {obligations.filter(o => o.status !== 'paid').length} pending items
                </p>
              </div>
              <div className="p-3 bg-red-100 dark:bg-red-900 rounded-full">
                <DollarSign className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Paid</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  ${getTotalPaid().toFixed(2)}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {paymentHistory.length} transactions
                </p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Next Due Date</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {obligations.filter(o => o.status !== 'paid').length > 0 
                    ? formatDate(Math.min(...obligations.filter(o => o.status !== 'paid').map(o => new Date(o.dueDate))))
                    : 'None'
                  }
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Upcoming payment</p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('obligations')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'obligations'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Financial Obligations
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'history'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Payment History
              </button>
            </nav>
          </div>

          {/* Filters and Search */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
              {activeTab === 'obligations' && (
                <div className="sm:w-48">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="overdue">Overdue</option>
                    <option value="paid">Paid</option>
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {isLoadingData ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600 dark:text-gray-400">Loading data...</p>
              </div>
            ) : (
              <>
                {/* Financial Obligations Tab */}
                {activeTab === 'obligations' && (
                  <div className="space-y-4">
                    {filteredObligations.length === 0 ? (
                      <div className="text-center py-12">
                        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 dark:text-gray-400">No obligations found</p>
                      </div>
                    ) : (
                      filteredObligations.map((obligation) => (
                        <div
                          key={obligation.id}
                          className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4">
                              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                                {getTypeIcon(obligation.type)}
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white">
                                  {obligation.description}
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                  Due: {formatDate(obligation.dueDate)}
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(obligation.status)}`}>
                                    {getStatusIcon(obligation.status)}
                                    {obligation.status.charAt(0).toUpperCase() + obligation.status.slice(1)}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-gray-900 dark:text-white">
                                ${obligation.amount.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* Payment History Tab */}
                {activeTab === 'history' && (
                  <div className="space-y-4">
                    {filteredPayments.length === 0 ? (
                      <div className="text-center py-12">
                        <Receipt className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 dark:text-gray-400">No payment history found</p>
                      </div>
                    ) : (
                      filteredPayments.map((payment) => (
                        <div
                          key={payment.id}
                          className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4">
                              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                                {getTypeIcon(payment.type)}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-900 dark:text-white">
                                  {payment.description}
                                </h4>
                                <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1 mt-1">
                                  <p className="flex items-center gap-2">
                                    <Calendar className="w-3 h-3" />
                                    {formatDate(payment.date)}
                                  </p>
                                  <p className="flex items-center gap-2">
                                    <CreditCard className="w-3 h-3" />
                                    {getPaymentMethodLabel(payment.method)}
                                  </p>
                                  <p className="flex items-center gap-2">
                                    <User className="w-3 h-3" />
                                    {payment.payer}
                                  </p>
                                </div>
                                <div className="flex items-center gap-2 mt-2">
                                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(payment.status)}`}>
                                    {getStatusIcon(payment.status)}
                                    {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right flex flex-col items-end gap-2">
                              <p className="text-lg font-bold text-green-600 dark:text-green-400">
                                ${payment.amount.toFixed(2)}
                              </p>
                              <button
                                onClick={() => downloadReceipt(payment.receiptId)}
                                className="inline-flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-md transition-colors"
                              >
                                <Download className="w-3 h-3" />
                                Receipt
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialOverview;