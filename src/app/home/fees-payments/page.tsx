import Link from 'next/link';
import { CreditCard, Receipt, Calendar, Wallet, Download, AlertCircle, ArrowRight } from 'lucide-react';

export default function FeesPaymentsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-brand-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Fees & Payments</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Easy and convenient payment options for tuition and other school fees
          </p>
          <Link
            href="#payment-portal"
            className="bg-white text-brand-600 hover:bg-gray-100 px-6 py-3 rounded-md font-medium inline-block"
          >
            Make a Payment
          </Link>
        </div>
      </section>

      {/* Fee Structure Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Tuition and Fee Structure</h2>
          
          <div className="space-y-8">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden">
              <div className="bg-brand-500 text-white py-3 px-6">
                <h3 className="text-xl font-semibold">Elementary School (K-5)</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-white dark:bg-gray-900 rounded-md shadow-sm">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Tuition</h4>
                    <p className="text-2xl font-bold text-brand-600 dark:text-brand-400 mb-1">$8,500</p>
                    <p className="text-gray-600 dark:text-gray-400">per academic year</p>
                  </div>
                  <div className="p-4 bg-white dark:bg-gray-900 rounded-md shadow-sm">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Registration Fee</h4>
                    <p className="text-2xl font-bold text-brand-600 dark:text-brand-400 mb-1">$300</p>
                    <p className="text-gray-600 dark:text-gray-400">one-time payment</p>
                  </div>
                  <div className="p-4 bg-white dark:bg-gray-900 rounded-md shadow-sm">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Materials Fee</h4>
                    <p className="text-2xl font-bold text-brand-600 dark:text-brand-400 mb-1">$450</p>
                    <p className="text-gray-600 dark:text-gray-400">per academic year</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden">
              <div className="bg-brand-500 text-white py-3 px-6">
                <h3 className="text-xl font-semibold">Middle School (6-8)</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-white dark:bg-gray-900 rounded-md shadow-sm">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Tuition</h4>
                    <p className="text-2xl font-bold text-brand-600 dark:text-brand-400 mb-1">$9,800</p>
                    <p className="text-gray-600 dark:text-gray-400">per academic year</p>
                  </div>
                  <div className="p-4 bg-white dark:bg-gray-900 rounded-md shadow-sm">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Registration Fee</h4>
                    <p className="text-2xl font-bold text-brand-600 dark:text-brand-400 mb-1">$300</p>
                    <p className="text-gray-600 dark:text-gray-400">one-time payment</p>
                  </div>
                  <div className="p-4 bg-white dark:bg-gray-900 rounded-md shadow-sm">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Materials Fee</h4>
                    <p className="text-2xl font-bold text-brand-600 dark:text-brand-400 mb-1">$550</p>
                    <p className="text-gray-600 dark:text-gray-400">per academic year</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden">
              <div className="bg-brand-500 text-white py-3 px-6">
                <h3 className="text-xl font-semibold">High School (9-12)</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-white dark:bg-gray-900 rounded-md shadow-sm">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Tuition</h4>
                    <p className="text-2xl font-bold text-brand-600 dark:text-brand-400 mb-1">$12,200</p>
                    <p className="text-gray-600 dark:text-gray-400">per academic year</p>
                  </div>
                  <div className="p-4 bg-white dark:bg-gray-900 rounded-md shadow-sm">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Registration Fee</h4>
                    <p className="text-2xl font-bold text-brand-600 dark:text-brand-400 mb-1">$300</p>
                    <p className="text-gray-600 dark:text-gray-400">one-time payment</p>
                  </div>
                  <div className="p-4 bg-white dark:bg-gray-900 rounded-md shadow-sm">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Materials Fee</h4>
                    <p className="text-2xl font-bold text-brand-600 dark:text-brand-400 mb-1">$650</p>
                    <p className="text-gray-600 dark:text-gray-400">per academic year</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Additional Fees</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <thead>
                    <tr>
                      <th className="py-3 px-6 text-left bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700">Fee Type</th>
                      <th className="py-3 px-6 text-left bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700">Amount</th>
                      <th className="py-3 px-6 text-left bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-4 px-6 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Technology Fee</td>
                      <td className="py-4 px-6 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">$350</td>
                      <td className="py-4 px-6 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Covers school technology and digital resources</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Activity Fee</td>
                      <td className="py-4 px-6 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">$250</td>
                      <td className="py-4 px-6 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Covers field trips and extracurricular activities</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Transportation Fee</td>
                      <td className="py-4 px-6 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">$800</td>
                      <td className="py-4 px-6 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">Optional - for bus service (per year)</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 text-gray-700 dark:text-gray-300">Graduation Fee</td>
                      <td className="py-4 px-6 text-gray-700 dark:text-gray-300">$200</td>
                      <td className="py-4 px-6 text-gray-700 dark:text-gray-300">Seniors only - covers diploma, cap and gown, ceremony</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          <div className="mt-8 bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-400 p-4 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700 dark:text-yellow-200">
                  All fees are subject to change. Please contact the finance office for the most up-to-date information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Options */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Payment Options</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md">
              <div className="h-12 w-12 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center mb-4">
                <CreditCard className="h-6 w-6 text-brand-600 dark:text-brand-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Online Payment</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Pay securely online using our student portal. Credit cards, debit cards, and bank transfers accepted.
              </p>
              <Link 
                href="#payment-portal" 
                className="text-brand-600 dark:text-brand-400 font-medium hover:text-brand-700 dark:hover:text-brand-300 inline-flex items-center"
              >
                Pay Online <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md">
              <div className="h-12 w-12 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-brand-600 dark:text-brand-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Payment Plans</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Spread your payments throughout the year with our flexible payment plans. Monthly, quarterly, or semester options available.
              </p>
              <Link 
                href="#" 
                className="text-brand-600 dark:text-brand-400 font-medium hover:text-brand-700 dark:hover:text-brand-300 inline-flex items-center"
              >
                View Plans <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md">
              <div className="h-12 w-12 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center mb-4">
                <Download className="h-6 w-6 text-brand-600 dark:text-brand-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Fee Documents</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Download fee schedules, payment forms, and financial aid applications. Contact our finance office for assistance.
              </p>
              <Link 
                href="#" 
                className="text-brand-600 dark:text-brand-400 font-medium hover:text-brand-700 dark:hover:text-brand-300 inline-flex items-center"
              >
                Download Forms <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Portal Section */}
      <section id="payment-portal" className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Payment Portal</h2>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg">
            <form className="space-y-6">
              <div>
                <label htmlFor="student-id" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Student ID
                </label>
                <input
                  type="text"
                  id="student-id"
                  name="student-id"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-brand-500 focus:border-brand-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="payment-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Payment Type
                </label>
                <select
                  id="payment-type"
                  name="payment-type"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-brand-500 focus:border-brand-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                >
                  <option value="">Select payment type</option>
                  <option value="tuition">Tuition</option>
                  <option value="registration">Registration Fee</option>
                  <option value="materials">Materials Fee</option>
                  <option value="technology">Technology Fee</option>
                  <option value="activity">Activity Fee</option>
                  <option value="transportation">Transportation Fee</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Amount (USD)
                </label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  min="1"
                  step="0.01"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-brand-500 focus:border-brand-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>
              
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-brand-500 hover:bg-brand-600 text-white font-medium py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
                >
                  Proceed to Payment
                </button>
              </div>
            </form>
            
            <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
              <h4 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">Other Payment Methods</h4>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Wallet className="h-5 w-5 text-brand-500 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Cash or Check</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Visit our finance office during business hours to make a payment in person.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Receipt className="h-5 w-5 text-brand-500 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Bank Transfer</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Contact our finance office for bank account details to make a direct transfer.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}