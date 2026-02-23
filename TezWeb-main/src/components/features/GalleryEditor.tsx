import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash2, Edit2, Check, X, Image as ImageIcon } from 'lucide-react';
import { GalleryImage } from '@/types/website';
import { toast } from 'sonner';

interface GalleryEditorProps {
  gallery: GalleryImage[];
  onUpdate: (gallery: GalleryImage[]) => void;
}

export default function GalleryEditor({ gallery, onUpdate }: GalleryEditorProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editCaption, setEditCaption] = useState('');

  const handleAddImage = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const newImage: GalleryImage = {
        id: `gallery-${Date.now()}`,
        url: reader.result as string,
        caption: '',
      };
      onUpdate([...gallery, newImage]);
      toast.success('Image added to gallery');
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteImage = (id: string) => {
    onUpdate(gallery.filter((img) => img.id !== id));
    toast.success('Image removed from gallery');
  };

  const handleStartEdit = (image: GalleryImage) => {
    setEditingId(image.id);
    setEditCaption(image.caption || '');
  };

  const handleSaveCaption = (id: string) => {
    onUpdate(
      gallery.map((img) =>
        img.id === id ? { ...img, caption: editCaption } : img
      )
    );
    setEditingId(null);
    setEditCaption('');
    toast.success('Caption updated');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditCaption('');
  };

  return (
    <div className="space-y-4">
      {/* Add Image Button */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 transition-colors">
        <label className="flex flex-col items-center gap-2 cursor-pointer">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Plus className="w-6 h-6 text-blue-600" />
          </div>
          <span className="text-sm font-medium text-gray-700">Add Photos</span>
          <span className="text-xs text-gray-500">Click to upload images</span>
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => {
              const files = Array.from(e.target.files || []);
              files.forEach((file) => handleAddImage(file));
              e.target.value = '';
            }}
          />
        </label>
      </div>

      {/* Gallery Grid */}
      {gallery.length > 0 ? (
        <div className="grid grid-cols-2 gap-4">
          {gallery.map((image) => (
            <div
              key={image.id}
              className="relative group rounded-lg overflow-hidden border border-gray-200 bg-white"
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                <img
                  src={image.url}
                  alt={image.caption || 'Gallery image'}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Overlay Controls */}
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
                  onClick={() => handleStartEdit(image)}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  className="h-8 w-8 p-0"
                  onClick={() => handleDeleteImage(image.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              {/* Caption */}
              <div className="p-3">
                {editingId === image.id ? (
                  <div className="space-y-2">
                    <Input
                      value={editCaption}
                      onChange={(e) => setEditCaption(e.target.value)}
                      placeholder="Add a caption..."
                      className="h-8 text-sm"
                      autoFocus
                    />
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleSaveCaption(image.id)}
                        className="h-7 px-2 gap-1"
                      >
                        <Check className="w-3 h-3" />
                        Save
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleCancelEdit}
                        className="h-7 px-2 gap-1"
                      >
                        <X className="w-3 h-3" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-gray-600 truncate">
                    {image.caption || 'No caption'}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <ImageIcon className="w-12 h-12 mx-auto mb-2 text-gray-400" />
          <p className="text-sm">No photos yet. Add some to showcase your business!</p>
        </div>
      )}

      {/* Info */}
      <div className="text-xs text-gray-500 bg-blue-50 p-3 rounded-lg border border-blue-200">
        <strong>💡 Tip:</strong> Add photos of your shop, products, or team to build trust with customers.
      </div>
    </div>
  );
}
