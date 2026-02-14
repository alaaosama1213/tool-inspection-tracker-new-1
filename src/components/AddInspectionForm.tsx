import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Camera, CheckCircle } from 'lucide-react';

interface AddInspectionFormProps {
  toolId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function AddInspectionForm({
  toolId,
  onSuccess,
  onCancel,
}: AddInspectionFormProps) {
  const [formData, setFormData] = useState({
    inspector_name: '',
    inspection_date: new Date().toISOString().split('T')[0],
    status: 'passed' as 'passed' | 'failed' | 'needs_repair',
    notes: '',
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

  const uploadPhoto = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `inspection-${Date.now()}.${fileExt}`;
    const filePath = `inspections/${fileName}`;

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
      let photoUrl = '';

      if (photoFile) {
        photoUrl = await uploadPhoto(photoFile);
      }

      const { error: insertError } = await supabase.from('inspections').insert({
        tool_id: toolId,
        inspector_name: formData.inspector_name,
        inspection_date: formData.inspection_date,
        status: formData.status,
        notes: formData.notes,
        photo_url: photoUrl,
      });

      if (insertError) throw insertError;

      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add inspection');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
      <div className="flex items-center gap-3 mb-6">
        <CheckCircle className="w-6 h-6 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-800">New Inspection</h3>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      <div className="space-y-4">
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Inspection Date
          </label>
          <input
            type="date"
            required
            value={formData.inspection_date}
            onChange={(e) =>
              setFormData({ ...formData, inspection_date: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            value={formData.status}
            onChange={(e) =>
              setFormData({
                ...formData,
                status: e.target.value as 'passed' | 'failed' | 'needs_repair',
              })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="passed">Passed</option>
            <option value="failed">Failed</option>
            <option value="needs_repair">Needs Repair</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
            placeholder="Inspection observations..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Inspection Photo
          </label>
          <div className="mt-1 flex items-center gap-4">
            <label className="cursor-pointer">
              <div className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg transition-colors">
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

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2.5 px-4 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
          >
            {loading ? 'Saving...' : 'Save Inspection'}
          </button>
        </div>
      </div>
    </form>
  );
}
