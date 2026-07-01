// src/components/admin/ProductModal.jsx
import { useState, useEffect } from 'react';

const initialForm = {
  name: '',
  description: '',
  category: 'Pasteles',
  price: '',
  stock: '',
  image: '',
};

export default function ProductModal({ isOpen, onClose, onSave, editingProduct }) {
  const [product, setProduct] = useState(initialForm);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (editingProduct) {
      setProduct(editingProduct);
    } else {
      setProduct(initialForm);
    }
  }, [editingProduct, isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    setProduct(initialForm);
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ 
      ...product, 
      id: product.id || Date.now(), 
      price: parseFloat(product.price), 
      stock: parseInt(product.stock) 
    });
    handleClose();
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    // Cambiar 'briselli_preset' por el preset de cloudinary real
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET || "ml_default");

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dtksj11o3'}/image/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if(data.secure_url) {
        setProduct({ ...product, image: data.secure_url });
      } else {
        alert("No se pudo subir la imagen.");
      }
    } catch (error) {
      console.error("Error subiendo imagen:", error);
      alert("Error al subir imagen");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="bg-artisan-primary p-5 text-white flex justify-between items-center">
          <h3 className="text-xl font-bold italic">
            {editingProduct ? '📝 Editar Artículo' : '🍰 Nuevo Producto'}
          </h3>
          <button onClick={handleClose} className="hover: transition-transform text-2xl">&times;</button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-black uppercase text-artisan-tertiary mb-1">Nombre del Producto</label>
            <input 
              required
              className="w-full border-2 border-gray-100 p-2.5 rounded-xl focus:border-artisan-secondary outline-none transition-colors"
              value={product.name}
              onChange={(e) => setProduct({...product, name: e.target.value})}
              placeholder="Ej: Torta de Chocolate"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase text-artisan-tertiary mb-1">Descripción</label>
            <textarea 
              required
              rows={2}
              className="w-full border-2 border-gray-100 p-2.5 rounded-xl focus:border-artisan-secondary outline-none transition-colors"
              value={product.description}
              onChange={(e) => setProduct({...product, description: e.target.value})}
              placeholder="Ej: Deliciosa torta con doble relleno..."
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase text-artisan-tertiary mb-1">Fotografía del Producto (Cloudinary)</label>
            <input 
              type="file"
              accept="image/*"
              className="w-full border-2 border-gray-100 p-2.5 rounded-xl focus:border-artisan-secondary outline-none transition-colors"
              onChange={handleImageUpload}
            />
            {uploading && <p className="text-xs font-bold text-orange-500 mt-1 animate-pulse">Subiendo imagen a Cloudinary...</p>}
            {product.image && !uploading && (
              <div className="mt-2">
                <img src={product.image} alt="Preview" className="h-16 w-16 object-cover rounded-xl border border-gray-200" />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black uppercase text-artisan-tertiary mb-1">Precio (S/)</label>
              <input type="number" step="0.1" required className="w-full border-2 border-gray-100 p-2.5 rounded-xl outline-none"
                value={product.price}
                onChange={(e) => setProduct({...product, price: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-black uppercase text-artisan-tertiary mb-1">Stock</label>
              <input type="number" required className="w-full border-2 border-gray-100 p-2.5 rounded-xl outline-none"
                value={product.stock}
                onChange={(e) => setProduct({...product, stock: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black uppercase text-artisan-tertiary mb-1">Categoría</label>
            <select 
              className="w-full border-2 border-gray-100 p-2.5 rounded-xl outline-none focus:border-artisan-secondary appearance-none bg-white"
              value={product.category}
              onChange={(e) => setProduct({...product, category: e.target.value})}
            >
              <option value="Pasteles">Pasteles</option>
              <option value="Panes">Panes</option>
              <option value="Postres">Postres</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button type="button" onClick={handleClose} className="flex-1 px-4 py-3 bg-gray-100 rounded-xl font-bold text-gray-500 hover:bg-gray-200 transition-colors">
              Cancelar
            </button>
            <button type="submit" disabled={uploading} className={`flex-1 px-4 py-3 text-white rounded-xl font-bold shadow-lg shadow-artisan-secondary/20 transition-all ${uploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-artisan-secondary hover:bg-artisan-primary'}`}>
              {editingProduct ? 'Actualizar' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}