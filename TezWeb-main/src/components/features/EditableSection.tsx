import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Check, X, Edit2 } from 'lucide-react';

interface EditableSectionProps {
  label: string;
  value: string;
  onSave: (value: string) => void;
  type?: 'text' | 'textarea';
  icon?: React.ReactNode;
}

export default function EditableSection({ label, value, onSave, type = 'text', icon }: EditableSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  const handleSave = () => {
    onSave(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
        {icon}
        {label}
      </label>
      
      {isEditing ? (
        <div className="space-y-2">
          {type === 'textarea' ? (
            <Textarea
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="min-h-[80px]"
              autoFocus
            />
          ) : (
            <Input
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              autoFocus
            />
          )}
          <div className="flex gap-2">
            <Button onClick={handleSave} size="sm" className="gap-2">
              <Check className="w-4 h-4" />
              Save
            </Button>
            <Button onClick={handleCancel} size="sm" variant="outline" className="gap-2">
              <X className="w-4 h-4" />
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-2">
          <div className="flex-1 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-gray-900">{value}</p>
          </div>
          <Button
            onClick={() => setIsEditing(true)}
            size="sm"
            variant="outline"
            className="gap-2"
          >
            <Edit2 className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
