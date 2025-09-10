import React, { useState, useEffect } from 'react';
import { Heart, Calendar, FileText, Download, Plus, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { healthAPI, reminderAPI } from '../services/api';
import { HealthRecord, Reminder } from '../types';
import { format } from 'date-fns';
import { useAuth } from '../context/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [records, setRecords] = useState<HealthRecord[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [recordsRes, remindersRes] = await Promise.all([
          healthAPI.getRecords(),
          reminderAPI.getReminders(),
        ]);
        setRecords(recordsRes.data.records);
        setReminders(remindersRes.data.reminders);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const upcomingReminders = reminders
    .filter(r => !r.done && new Date(r.remindAt) > new Date())
    .sort((a, b) => new Date(a.remindAt).getTime() - new Date(b.remindAt).getTime())
    .slice(0, 3);

  const recentRecords = records
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  const stats = [
    {
      name: 'Total Records',
      value: records.length,
      icon: FileText,
      color: 'bg-blue-500',
      change: '+12%',
    },
    {
      name: 'Active Reminders',
      value: reminders.filter(r => !r.done).length,
      icon: Calendar,
      color: 'bg-green-500',
      change: '+5%',
    },
    {
      name: 'This Month',
      value: records.filter(r => 
        new Date(r.createdAt).getMonth() === new Date().getMonth()
      ).length,
      icon: TrendingUp,
      color: 'bg-purple-500',
      change: '+8%',
    },
  ];

  const recordTypeColors = {
    allergy: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    vital: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    prescription: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    visit: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    vaccination: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    other: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-blue-100">
          Here's an overview of your health records and upcoming reminders.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.name}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-sm font-medium text-green-600">
                {stat.change}
              </span>
              <span className="text-sm text-gray-500 ml-2">from last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Records */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Recent Records
              </h2>
              <Link
                to="/records"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                View all
              </Link>
            </div>
          </div>
          <div className="p-6">
            {recentRecords.length === 0 ? (
              <div className="text-center py-8">
                <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">No records yet</p>
                <Link
                  to="/records"
                  className="inline-flex items-center mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add your first record
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {recentRecords.map((record) => (
                  <div
                    key={record.id}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            recordTypeColors[record.type]
                          }`}
                        >
                          {record.type}
                        </span>
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {record.title}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {format(new Date(record.createdAt), 'MMM dd, yyyy')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Upcoming Reminders */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Upcoming Reminders
              </h2>
              <Link
                to="/reminders"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                View all
              </Link>
            </div>
          </div>
          <div className="p-6">
            {upcomingReminders.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">No upcoming reminders</p>
                <Link
                  to="/reminders"
                  className="inline-flex items-center mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create a reminder
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {upcomingReminders.map((reminder) => (
                  <div
                    key={reminder._id}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {reminder.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {format(new Date(reminder.remindAt), 'MMM dd, yyyy HH:mm')}
                      </p>
                      {reminder.message && (
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                          {reminder.message}
                        </p>
                      )}
                    </div>
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">
                      {reminder.repeat}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/records"
            className="flex items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-200"
          >
            <Heart className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Add Record</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Create new health record</p>
            </div>
          </Link>
          <Link
            to="/reminders"
            className="flex items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors duration-200"
          >
            <Calendar className="w-8 h-8 text-green-600 mr-3" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Set Reminder</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Schedule health reminder</p>
            </div>
          </Link>
          <Link
            to="/export"
            className="flex items-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors duration-200"
          >
            <Download className="w-8 h-8 text-purple-600 mr-3" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Export Data</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Download your records</p>
            </div>
          </Link>
          <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <FileText className="w-8 h-8 text-gray-600 mr-3" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">View Reports</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;