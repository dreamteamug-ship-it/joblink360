'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

export default function DiagnosticPage() {
  const [status, setStatus] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function runDiagnostics() {
      const results = {};
      
      // Check 1: Amanda Widget
      results.amanda_widget = {
        status: 'checking',
        message: 'Looking for Amanda...'
      };

      // Check 2: Supabase Connection
      try {
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL || '',
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
        );
        const { data, error } = await supabase.from('courses').select('count').limit(1);
        results.supabase = {
          status: error ? 'error' : 'connected',
          message: error ? error.message : '✅ Supabase connected'
        };
      } catch (e) {
        results.supabase = {
          status: 'error',
          message: e.message
        };
      }

      // Check 3: Environment Variables
      results.env = {
        supabase_url: process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ set' : '❌ missing',
        supabase_key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ set' : '❌ missing',
        gemini_key: process.env.GEMINI_API_KEY ? '✅ set' : '❌ missing'
      };

      setStatus(results);
      setLoading(false);
    }

    runDiagnostics();
  }, []);

  if (loading) return <div className="p-8">Running diagnostics...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">🔍 JobLink360 Deployment Diagnostics</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
          {Object.entries(status).map(([key, value]: [string, any]) => (
            <div key={key} className="border-b pb-4">
              <h2 className="text-xl font-semibold capitalize mb-2">{key.replace('_', ' ')}</h2>
              <pre className="bg-gray-100 p-3 rounded">
                {JSON.stringify(value, null, 2)}
              </pre>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-yellow-50 rounded-lg">
          <h2 className="font-bold text-lg mb-2">📋 Manual Checks:</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Look at bottom-right corner: Is there a purple chat bubble? {status.amanda_widget?.status}</li>
            <li>Try clicking "Sign In" - does anything happen?</li>
            <li>Visit /academy - what do you see?</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
