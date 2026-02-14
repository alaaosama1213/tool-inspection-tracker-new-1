import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Camera, Package } from 'lucide-react';

interface AddToolFormProps {
  onSuccess: () => void;
}

export default function AddToolForm({ onSuccess }: AddToolFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    serial_number: '',
    inspector_name: '',
    inspection_status: 'passed' as 'passed' | 'failed' | 'needs_repair',
    inspection_notes: '',
  });
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateBarcode = () => {
    return `TOOL-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  };

  const uploadPhoto = async (file: File, barcode: string) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${barcode}.${fileExt}`;
    const filePath = `tools/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('tool-photos')
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      const { data } = await supabase.storage
        .from('tool-photos')
        .getPublicUrl(filePath);
      return data.publicUrl;
    }

    const { data } = supabase.storage.from('tool-photos').getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const barcode = generateBarcode();
      let photoUrl = '';

      if (photoFile) {
        photoUrl = await uploadPhoto(photoFile, barcode);
      }

      const { data: toolData, error: insertToolError } = await supabase
        .from('tools')
        .insert({
          barcode,
          name: formData.name,
          category: formData.category,
          serial_number: formData.serial_number,
          photo_url: photoUrl,
        })
        .select();

      if (insertToolError) throw insertToolError;
      if (!toolData || toolData.length === 0) throw new Error('Failed to create tool');

      const toolId = toolData[0].id;

      const { error: inspectionError } = await supabase.from('inspections').insert({
        tool_id: toolId,
        inspector_name: formData.inspector_name,
        inspection_date: new Date().toISOString().split('T')[0],
        status: formData.inspection_status,
        notes: formData.inspection_notes,
      });

      if (inspectionError) throw inspectionError;

      setFormData({
        name: '',
        category: '',
        serial_number: '',
        inspector_name: '',
        inspection_status: 'passed',
        inspection_notes: '',
      });
      setPhotoFile(null);
      setPhotoPreview('');
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add tool');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-3 mb-6">
          <Package className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-800">Register New Tool</h2>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tool Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Power Drill"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <input
              type="text"
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Power Tools"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Serial Number
            </label>
            <input
              type="text"
              value={formData.serial_number}
              onChange={(e) => setFormData({ ...formData, serial_number: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., SN123456"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tool Photo
            </label>
            <div className="mt-1 flex items-center gap-4">
              <label className="cursor-pointer">
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                  <Camera className="w-5 h-5 text-gray-600" />
                  <span className="text-sm text-gray-700">
                    {photoFile ? 'Change Photo' : 'Upload Photo'}
                  </span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </label>
              {photoPreview && (
                <img
                  src={photoPreview}
                  alt="Preview"
                  className="h-20 w-20 object-cover rounded-lg border-2 border-gray-200"
                />
              )}
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4 mt-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-4">Initial Inspection</h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Inspector Name
              </label>
              <input
                type="text"
                required
                value={formData.inspector_name}
                onChange={(e) =>
                  setFormData({ ...formData, inspector_name: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Your name"
              />
            </div>

            <div className="mt-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Inspection Result
              </label>
              <select
                value={formData.inspection_status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    inspection_status: e.target.value as
                      | 'passed'
                      | 'failed'
                      | 'needs_repair',
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="passed">Approved</option>
                <option value="failed">Failed</option>
                <option value="needs_repair">Needs Repair</option>
              </select>
            </div>

            <div className="mt-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Inspection Comments
              </label>
              <textarea
                value={formData.inspection_notes}
                onChange={(e) =>
                  setFormData({ ...formData, inspection_notes: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder="Add inspection notes or comments..."
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
          >
            {loading ? 'Adding Tool...' : 'Add Tool & Generate Barcode'}
          </button>
        </div>
      </div>
    </form>
  );
}
