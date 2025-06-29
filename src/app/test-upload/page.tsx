'use client';

import { useState } from 'react';
import { trpc } from '@/utils/trpc';

const sampleCsv = `Date,Description,Amount
2024-01-15,Grocery Store,-45.67
2024-01-16,Gas Station,-32.50
2024-01-17,Salary Deposit,2500.00
2024-01-18,Coffee Shop,-4.25
2024-01-19,Electric Bill,-150.00`;

export default function TestUploadPage() {
  const [csvContent, setCsvContent] = useState(sampleCsv);
  const [result, setResult] = useState<string>('');

  const uploadMutation = trpc.upload.csvTransactions.useMutation({
    onSuccess: (data) => {
      setResult(`Success! ${data.message}`);
    },
    onError: (error) => {
      setResult(`Error: ${error.message}`);
    },
  });

  const handleSubmit = () => {
    uploadMutation.mutate({
      csvContent,
      userId: 'test-user',
    });
  };

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">CSV Upload Test</h1>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          CSV Content:
        </label>
        <textarea
          value={csvContent}
          onChange={(e) => setCsvContent(e.target.value)}
          className="w-full h-64 p-2 border rounded-md font-mono text-sm"
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={uploadMutation.isPending}
        className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
      >
        {uploadMutation.isPending ? 'Uploading...' : 'Upload CSV'}
      </button>

      {result && (
        <div className="mt-4 p-4 rounded-md bg-gray-100">
          <pre>{result}</pre>
        </div>
      )}
    </div>
  );
}