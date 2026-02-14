import { useState } from 'react';
import { supabase, Tool } from '../lib/supabase';
import { Search, Scan } from 'lucide-react';

interface BarcodeScannerProps {
  onToolFound: (tool: Tool) => void;
}

export default function BarcodeScanner({ onToolFound }: BarcodeScannerProps) {
  const [barcode, setBarcode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!barcode.trim()) return;

    setLoading(true);
    setError('');

    try {
      const { data, error: fetchError } = await supabase
        .from('tools')
        .select('*')
        .eq('barcode', barcode.trim())
        .maybeSingle();

      if (fetchError) throw fetchError;

      if (!data) {
        setError('Tool not found. Please check the barcode and try again.');
        return;
      }

      onToolFound(data);
      setBarcode('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to scan barcode');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleScan} className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-3 mb-6">
        <Scan className="w-6 h-6 text-green-600" />
        <h2 className="text-xl font-semibold text-gray-800">Scan Barcode</h2>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Enter Barcode
          </label>
          <input
            type="text"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="TOOL-XXXXXXXXX-XXXXXXXXX"
            autoFocus
          />
        </div>

        <button
          type="submit"
          disabled={loading || !barcode.trim()}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <Search className="w-5 h-5" />
          {loading ? 'Searching...' : 'Lookup Tool'}
        </button>
      </div>
    </form>
  );
}
