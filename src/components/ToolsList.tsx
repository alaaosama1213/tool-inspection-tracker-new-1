import { useEffect, useState } from 'react';
import { supabase, Tool } from '../lib/supabase';
import { Package, Search } from 'lucide-react';
import BarcodeDisplay from './BarcodeDisplay';

interface ToolsListProps {
  refreshTrigger: number;
  onToolSelect: (tool: Tool) => void;
}

export default function ToolsList({ refreshTrigger, onToolSelect }: ToolsListProps) {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedToolForBarcode, setSelectedToolForBarcode] = useState<Tool | null>(null);

  const loadTools = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('tools')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setTools(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadTools();
  }, [refreshTrigger]);

  const filteredTools = tools.filter(
    (tool) =>
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.barcode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-3 mb-6">
        <Package className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-800">All Tools</h2>
      </div>

      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tools..."
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {loading ? (
        <p className="text-gray-500 text-center py-8">Loading tools...</p>
      ) : filteredTools.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          {searchQuery ? 'No tools found matching your search.' : 'No tools registered yet.'}
        </p>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredTools.map((tool) => (
            <div
              key={tool.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                {tool.photo_url && (
                  <img
                    src={tool.photo_url}
                    alt={tool.name}
                    className="w-16 h-16 object-cover rounded border-2 border-gray-200"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-800 truncate">{tool.name}</h3>
                  <p className="text-sm text-gray-600">{tool.category}</p>
                  <p className="text-xs text-gray-500 mt-1 font-mono">{tool.barcode}</p>
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => setSelectedToolForBarcode(tool)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium py-2 px-3 rounded transition-colors"
                >
                  View Barcode
                </button>
                <button
                  onClick={() => onToolSelect(tool)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-3 rounded transition-colors"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedToolForBarcode && (
        <BarcodeDisplay
          tool={selectedToolForBarcode}
          onClose={() => setSelectedToolForBarcode(null)}
        />
      )}
    </div>
  );
}
