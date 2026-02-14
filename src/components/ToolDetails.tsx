import { useEffect, useState } from 'react';
import { supabase, Tool, Inspection } from '../lib/supabase';
import { X, Calendar, User, CheckCircle, XCircle, AlertCircle, Camera, ClipboardList } from 'lucide-react';
import AddInspectionForm from './AddInspectionForm';

interface ToolDetailsProps {
  tool: Tool;
  onClose: () => void;
}

export default function ToolDetails({ tool, onClose }: ToolDetailsProps) {
  const [inspections, setInspections] = useState<Inspection[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddInspection, setShowAddInspection] = useState(false);

  const loadInspections = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('inspections')
      .select('*')
      .eq('tool_id', tool.id)
      .order('inspection_date', { ascending: false });

    if (!error && data) {
      setInspections(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadInspections();
  }, [tool.id]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'needs_repair':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'needs_repair':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleInspectionAdded = () => {
    setShowAddInspection(false);
    loadInspections();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{tool.name}</h2>
            <p className="text-sm text-gray-500 mt-1">Barcode: {tool.barcode}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Tool Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium text-gray-800">{tool.category}</span>
                </div>
                {tool.serial_number && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Serial Number:</span>
                    <span className="font-medium text-gray-800">{tool.serial_number}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Registered:</span>
                  <span className="font-medium text-gray-800">
                    {new Date(tool.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {tool.photo_url && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Tool Photo</h3>
                <img
                  src={tool.photo_url}
                  alt={tool.name}
                  className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
                />
              </div>
            )}
          </div>

          {showAddInspection ? (
            <div className="mb-6">
              <AddInspectionForm
                toolId={tool.id}
                onSuccess={handleInspectionAdded}
                onCancel={() => setShowAddInspection(false)}
              />
            </div>
          ) : (
            <div className="mb-6">
              <button
                onClick={() => setShowAddInspection(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <ClipboardList className="w-5 h-5" />
                Add New Inspection
              </button>
            </div>
          )}

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Inspection History</h3>
            {loading ? (
              <p className="text-gray-500 text-center py-8">Loading inspections...</p>
            ) : inspections.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No inspections recorded yet.</p>
            ) : (
              <div className="space-y-4">
                {inspections.map((inspection) => (
                  <div
                    key={inspection.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(inspection.status)}
                        <div>
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                              inspection.status
                            )}`}
                          >
                            {inspection.status.replace('_', ' ').toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        {new Date(inspection.inspection_date).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <User className="w-4 h-4" />
                        <span>Inspector: {inspection.inspector_name}</span>
                      </div>

                      {inspection.notes && (
                        <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                          {inspection.notes}
                        </p>
                      )}

                      {inspection.photo_url && (
                        <div className="mt-3">
                          <div className="flex items-center gap-2 mb-2">
                            <Camera className="w-4 h-4 text-gray-600" />
                            <span className="text-sm font-medium text-gray-700">
                              Inspection Photo:
                            </span>
                          </div>
                          <img
                            src={inspection.photo_url}
                            alt="Inspection"
                            className="w-full h-48 object-cover rounded border-2 border-gray-200"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
