import React, { useState } from 'react';
import { Download, FileText, Database, Calendar, Heart } from 'lucide-react';
import { exportAPI } from '../services/api';
import toast from 'react-hot-toast';

const Export: React.FC = () => {
  const [isExporting, setIsExporting] = useState<string | null>(null);

  const handleExportPDF = async () => {
    setIsExporting('pdf');
    try {
      const response = await exportAPI.exportPDF();
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'health-records.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success('PDF exported successfully');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to export PDF');
    } finally {
      setIsExporting(null);
    }
  };

  const handleExportJSON = async () => {
    setIsExporting('json');
    try {
      const response = await exportAPI.exportJSON();
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'health-records.json';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success('JSON exported successfully');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to export JSON');
    } finally {
      setIsExporting(null);
    }
  };

  const exportOptions = [
    {
      id: 'pdf',
      title: 'Export as PDF',
      description: 'Download your health records as a formatted PDF document',
      icon: FileText,
      color: 'bg-red-500',
      action: handleExportPDF,
    },
    {
      id: 'json',
      title: 'Export as JSON',
      description: 'Download your health records as structured JSON data',
      icon: Database,
      color: 'bg-blue-500',
      action: handleExportJSON,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Export Data</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Download your health records in different formats
        </p>
      </div>

      {/* Export Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {exportOptions.map((option) => (
          <div
            key={option.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex items-center mb-4">
              <div className={`${option.color} p-3 rounded-lg mr-4`}>
                <option.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {option.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {option.description}
                </p>
              </div>
            </div>
            
            <button
              onClick={option.action}
              disabled={isExporting === option.id}
              className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isExporting === option.id ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Export {option.id.toUpperCase()}
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Information Section */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
        <div className="flex items-start">
          <Heart className="w-6 h-6 text-blue-600 mr-3 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
              About Your Data Export
            </h3>
            <div className="text-blue-800 dark:text-blue-200 space-y-2">
              <p>
                <strong>PDF Export:</strong> Creates a formatted document with all your health records, 
                including notes and metadata. Perfect for sharing with healthcare providers or keeping 
                physical copies.
              </p>
              <p>
                <strong>JSON Export:</strong> Provides your data in a structured format that can be 
                imported into other systems or used for data analysis. Includes all encrypted notes 
                in decrypted form.
              </p>
              <p className="text-sm mt-4">
                <strong>Privacy Note:</strong> Your exported data contains sensitive health information. 
                Please store and share these files securely.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Usage Statistics */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Export History
        </h3>
        <div className="text-center py-8">
          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">
            Export history will be shown here once you start exporting your data.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Export;