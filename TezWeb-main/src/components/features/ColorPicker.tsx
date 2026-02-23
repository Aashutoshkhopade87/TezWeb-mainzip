import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface ColorPickerProps {
  currentColor: string;
  onColorChange: (color: string) => void;
  onClose: () => void;
}

const PRESET_COLORS = [
  { name: 'Green', value: '#059669' },
  { name: 'Blue', value: '#2563eb' },
  { name: 'Purple', value: '#9333ea' },
  { name: 'Red', value: '#dc2626' },
  { name: 'Orange', value: '#ea580c' },
  { name: 'Pink', value: '#db2777' },
  { name: 'Teal', value: '#0891b2' },
  { name: 'Violet', value: '#7c3aed' },
];

export default function ColorPicker({ currentColor, onColorChange, onClose }: ColorPickerProps) {
  const [selectedColor, setSelectedColor] = useState(currentColor);

  const handleApply = () => {
    onColorChange(selectedColor);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">Choose Theme Color</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-4 gap-3 mb-6">
            {PRESET_COLORS.map((color) => (
              <button
                key={color.value}
                onClick={() => setSelectedColor(color.value)}
                className={`relative w-full aspect-square rounded-lg transition-all ${
                  selectedColor === color.value
                    ? 'ring-4 ring-offset-2 ring-blue-500 scale-105'
                    : 'hover:scale-105'
                }`}
                style={{ backgroundColor: color.value }}
              >
                <span className="sr-only">{color.name}</span>
              </button>
            ))}
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Custom Color
            </label>
            <input
              type="color"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="w-full h-12 rounded-lg cursor-pointer"
            />
          </div>

          <div className="mt-6 flex gap-3">
            <Button onClick={handleApply} className="flex-1">
              Apply Color
            </Button>
            <Button onClick={onClose} variant="outline" className="flex-1">
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
