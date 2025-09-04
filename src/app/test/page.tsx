'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function TestPage() {
  const [testResults, setTestResults] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/appwrite');
      const data = await response.json();
      setTestResults(data);
    } catch {
      setTestResults({ error: 'Failed to test connection' });
    }
    setLoading(false);
  };

  const seedData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/appwrite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'seed' })
      });
      const data = await response.json();
      setTestResults(data);
    } catch {
      setTestResults({ error: 'Failed to seed data' });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gray-800 rounded-xl p-8"
        >
          <h1 className="text-3xl font-bold text-white mb-6">Appwrite Connection Test</h1>
          
          <div className="space-y-4 mb-8">
            <button
              onClick={testConnection}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              {loading ? 'Testing...' : 'Test Connection'}
            </button>
            
            <button
              onClick={seedData}
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 disabled:bg-green-800 text-white px-6 py-3 rounded-lg font-medium transition-colors ml-4"
            >
              {loading ? 'Seeding...' : 'Seed Sample Data'}
            </button>
          </div>

          {testResults && (
            <div className="bg-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">Results</h3>
              <pre className="text-green-400 text-sm overflow-auto">
                {JSON.stringify(testResults, null, 2)}
              </pre>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
