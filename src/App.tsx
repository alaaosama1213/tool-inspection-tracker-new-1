import { useState } from 'react';
import { Tool, isSupabaseConfigured } from './lib/supabase';
import { ClipboardCheck, Plus, Scan, List, AlertCircle } from 'lucide-react';
import AddToolForm from './components/AddToolForm';
import BarcodeScanner from './components/BarcodeScanner';
import ToolDetails from './components/ToolDetails';
import ToolsList from './components/ToolsList';

type Tab = 'register' | 'scan' | 'list';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('scan');
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="w-10 h-10 text-red-600" />
            <h1 className="text-2xl font-bold text-gray-900">Configuration Required</h1>
          </div>
          <p className="text-gray-600 mb-4">
            The Supabase environment variables are missing. Please add the following environment variables:
          </p>
          <ul className="bg-gray-50 rounded p-4 mb-4 space-y-2 text-sm font-mono">
            <li className="text-gray-800">VITE_SUPABASE_URL</li>
            <li className="text-gray-800">VITE_SUPABASE_ANON_KEY</li>
          </ul>
          <p className="text-sm text-gray-600">
            Add these variables to your deployment platform (Vercel, Netlify, etc.) and redeploy your application.
          </p>
        </div>
      </div>
    );
  }

  const handleToolAdded = () => {
    setRefreshTrigger((prev) => prev + 1);
    setActiveTab('list');
  };

  const handleToolFound = (tool: Tool) => {
    setSelectedTool(tool);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <ClipboardCheck className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Tools Inspection Platform
              </h1>
              <p className="text-sm text-gray-600">
                Register, inspect, and verify tools with barcode tracking
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex gap-2 bg-white rounded-lg shadow-sm p-1 inline-flex">
            <button
              onClick={() => setActiveTab('scan')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-md font-medium transition-colors ${
                activeTab === 'scan'
                  ? 'bg-green-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Scan className="w-5 h-5" />
              Scan Barcode
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-md font-medium transition-colors ${
                activeTab === 'register'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Plus className="w-5 h-5" />
              Register Tool
            </button>
            <button
              onClick={() => setActiveTab('list')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-md font-medium transition-colors ${
                activeTab === 'list'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <List className="w-5 h-5" />
              All Tools
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div>
            {activeTab === 'register' && <AddToolForm onSuccess={handleToolAdded} />}
            {activeTab === 'scan' && <BarcodeScanner onToolFound={handleToolFound} />}
            {activeTab === 'list' && (
              <ToolsList
                refreshTrigger={refreshTrigger}
                onToolSelect={handleToolFound}
              />
            )}
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Guide</h2>
            <div className="space-y-4 text-sm text-gray-600">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Register Tools</h3>
                  <p>
                    Add new tools with photos and details. A unique barcode will be
                    generated automatically for each tool.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Print Barcodes</h3>
                  <p>
                    View and print barcode labels from the tool list. Attach these labels
                    to your physical tools.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Scan & Verify</h3>
                  <p>
                    Enter or scan the barcode to instantly view tool details and complete
                    inspection history.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Record Inspections</h3>
                  <p>
                    Add inspection records with photos, status, and notes. Track all
                    inspections over time.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Inspection Statuses</h4>
              <ul className="space-y-1 text-sm text-blue-800">
                <li>
                  <span className="font-medium">Passed:</span> Tool is in good working
                  condition
                </li>
                <li>
                  <span className="font-medium">Failed:</span> Tool has failed inspection
                </li>
                <li>
                  <span className="font-medium">Needs Repair:</span> Tool requires
                  maintenance
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {selectedTool && (
        <ToolDetails tool={selectedTool} onClose={() => setSelectedTool(null)} />
      )}
    </div>
  );
}

export default App;
