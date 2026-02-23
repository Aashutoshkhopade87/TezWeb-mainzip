import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Trash2, Edit2, Check, X, Image as ImageIcon, Plus, ChevronUp, ChevronDown } from 'lucide-react';
import { Product } from '@/types/website';
import { toast } from 'sonner';

interface ProductEditorProps {
  product: Product;
  onUpdate: (updates: Partial<Product>) => void;
  onDelete: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
}

export default function ProductEditor({ product, onUpdate, onDelete, onMoveUp, onMoveDown }: ProductEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(product);

  // Initialize images array if not present
  const productImages = editData.images || [editData.image];

  const handleSave = () => {
    onUpdate(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(product);
    setIsEditing(false);
  };

  const handleImageChange = (file: File, index?: number) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const newImageUrl = reader.result as string;
      
      if (index !== undefined && editData.images) {
        // Replace existing image
        const updatedImages = [...editData.images];
        updatedImages[index] = newImageUrl;
        setEditData({ 
          ...editData, 
          images: updatedImages,
          image: updatedImages[0] // Update primary image
        });
      } else {
        // Add new image
        const currentImages = editData.images || [editData.image];
        const updatedImages = [...currentImages, newImageUrl];
        setEditData({ 
          ...editData, 
          images: updatedImages,
          image: updatedImages[0]
        });
      }
      toast.success('Image added successfully');
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteImage = (index: number) => {
    if (!editData.images || editData.images.length <= 1) {
      toast.error('Product must have at least one image');
      return;
    }

    const updatedImages = editData.images.filter((_, i) => i !== index);
    setEditData({ 
      ...editData, 
      images: updatedImages,
      image: updatedImages[0]
    });
    toast.success('Image removed');
  };

  const handleSetPrimaryImage = (index: number) => {
    if (!editData.images) return;
    
    const updatedImages = [...editData.images];
    const [selectedImage] = updatedImages.splice(index, 1);
    updatedImages.unshift(selectedImage);
    
    setEditData({ 
      ...editData, 
      images: updatedImages,
      image: selectedImage
    });
    toast.success('Primary image updated');
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
      {isEditing ? (
        <div className="space-y-4">
          {/* Product Images Gallery */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Images
            </label>
            <div className="grid grid-cols-3 gap-3">
              {productImages.map((img, index) => (
                <div key={index} className="relative group">
                  <img
                    src={img}
                    alt={`${editData.name} - ${index + 1}`}
                    className="w-full aspect-square object-cover rounded-lg border-2 border-gray-200"
                  />
                  
                  {/* Primary Badge */}
                  {index === 0 && (
                    <div className="absolute top-1 left-1 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full font-medium">
                      Primary
                    </div>
                  )}

                  {/* Image Controls Overlay */}
                  <div className="absolute inset-0 bg-black/60 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                    <label className="cursor-pointer">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100">
                        <Edit2 className="w-4 h-4 text-gray-700" />
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageChange(file, index);
                        }}
                      />
                    </label>
                    
                    {index !== 0 && (
                      <button
                        onClick={() => handleSetPrimaryImage(index)}
                        className="text-xs text-white bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded"
                      >
                        Set Primary
                      </button>
                    )}
                    
                    {productImages.length > 1 && (
                      <button
                        onClick={() => handleDeleteImage(index)}
                        className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700"
                      >
                        <Trash2 className="w-4 h-4 text-white" />
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {/* Add New Image Button */}
              {productImages.length < 6 && (
                <label className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors">
                  <Plus className="w-6 h-6 text-gray-400 mb-1" />
                  <span className="text-xs text-gray-500">Add Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageChange(file);
                    }}
                  />
                </label>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              ℹ️ Upload up to 6 images. First image is the primary display.
            </p>
          </div>

          {/* Product Details */}
          <div className="space-y-3">
            <Input
              value={editData.name}
              onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              placeholder="Product name"
            />
            <Textarea
              value={editData.description}
              onChange={(e) => setEditData({ ...editData, description: e.target.value })}
              placeholder="Product description"
              className="min-h-[60px]"
            />
            <Input
              value={editData.price}
              onChange={(e) => setEditData({ ...editData, price: e.target.value })}
              placeholder="Price"
            />
          </div>

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
        <div className="flex gap-4">
          {/* Product Image Preview */}
          <div className="relative flex-shrink-0">
            <img
              src={product.image}
              alt={product.name}
              className="w-24 h-24 object-cover rounded-lg"
            />
            {product.images && product.images.length > 1 && (
              <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full font-medium">
                +{product.images.length - 1}
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-gray-900 mb-1">{product.name}</h4>
            <p className="text-sm text-gray-600 mb-1 line-clamp-2">{product.description}</p>
            <p className="text-lg font-bold text-gray-900">{product.price}</p>
          </div>

          <div className="flex flex-col gap-2">
            {/* Move Up/Down Buttons */}
            {(onMoveUp || onMoveDown) && (
              <div className="flex flex-col gap-1">
                {onMoveUp && (
                  <Button
                    onClick={onMoveUp}
                    size="sm"
                    variant="outline"
                    className="gap-1 h-8 px-2"
                    title="Move up"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </Button>
                )}
                {onMoveDown && (
                  <Button
                    onClick={onMoveDown}
                    size="sm"
                    variant="outline"
                    className="gap-1 h-8 px-2"
                    title="Move down"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                )}
              </div>
            )}
            
            {/* Edit/Delete Buttons */}
            <Button
              onClick={() => setIsEditing(true)}
              size="sm"
              variant="outline"
              className="gap-2"
            >
              <Edit2 className="w-4 h-4" />
            </Button>
            <Button
              onClick={onDelete}
              size="sm"
              variant="outline"
              className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
