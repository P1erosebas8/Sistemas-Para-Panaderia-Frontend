// src/pages/admin/Users.jsx
import { useState, useEffect } from 'react';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'user',
    status: 'Activo'
  });

  useEffect(() => {
    const saved = localStorage.getItem('briselli_users');
    if (saved) {
      setUsers(JSON.parse(saved));
    } else {
      const initialUsers = [{
        id: 1,
        firstName: 'Piero',
        lastName: 'Bellido',
        email: 'piero@briselli.com',
        password: 'admin123',
        role: 'admin', // MINÚSCULAS
        status: 'Activo'
      }];
      setUsers(initialUsers);
      localStorage.setItem('briselli_users', JSON.stringify(initialUsers));
    }
  }, []);

  const saveUsers = (list) => {
    setUsers(list);
    localStorage.setItem('briselli_users', JSON.stringify(list));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userToSave = {
      ...formData,
      role: formData.role.toLowerCase(), // Esto es vital: "Admin" -> "admin"
      id: editingUser ? editingUser.id : Date.now()
    };

    if (editingUser) {
      const updated = users.map(u => u.id === editingUser.id ? userToSave : u);
      saveUsers(updated);
    } else {
      saveUsers([...users, userToSave]);
    }
    closeModal();
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingUser(null);
    setFormData({ name: '', email: '', password: '', role: 'Vendedor', status: 'Activo' });
  };

  const startEdit = (user) => {
    setEditingUser(user);
    setFormData(user);
    setShowModal(true);
  };

  const deleteUser = (id) => {
    if (window.confirm("¿Eliminar acceso de este empleado?")) {
      saveUsers(users.filter(u => u.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-black text-artisan-primary tracking-tighter uppercase">Personal Briselli</h2>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-artisan-neutral/30 text-artisan-primary text-[10px] font-black uppercase tracking-widest">
            <tr>
              <th className="p-5 border-b">Empleado</th>
              <th className="p-5 border-b">Rol</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {users.filter(u => String(u.role).toLowerCase() === 'admin').map((u) => (
              <tr key={u.id} className="hover:bg-artisan-neutral/5 transition-colors">
                <td className="p-5">
                  <p className="font-bold text-artisan-dark leading-tight">{u.firstName || u.name} {u.lastName || ''}</p>
                  <p className="text-[10px] text-gray-400 font-mono">{u.email}</p>
                </td>
                <td className="p-5">
                  <span className="px-2 py-1 rounded-md text-[9px] font-black uppercase border border-purple-200 text-purple-600 bg-purple-50">
                    {u.role}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL DE USUARIO */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden animate-slideUp">
            <div className="bg-artisan-primary p-5 text-white">
              <h3 className="font-black uppercase tracking-widest text-sm">
                {editingUser ? 'Editar Empleado' : 'Nuevo Registro'}
              </h3>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Nombre Completo</label>
                <input
                  required
                  className="w-full border-2 border-gray-100 p-3 rounded-2xl outline-none focus:border-artisan-secondary transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Correo Institucional</label>
                <input
                  type="email" required
                  className="w-full border-2 border-gray-100 p-3 rounded-2xl outline-none focus:border-artisan-secondary transition-all"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              {/* NUEVO CAMPO DE CONTRASEÑA */}
              <div>
                <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Contraseña de Acceso</label>
                <input
                  type="password" required
                  placeholder="Mínimo 6 caracteres"
                  className="w-full border-2 border-gray-100 p-3 rounded-2xl outline-none focus:border-artisan-secondary transition-all font-mono"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Rol en la Pastelería</label>
                <select
                  className="w-full border-2 border-gray-100 p-3 rounded-2xl outline-none appearance-none bg-white"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                >
                  <option value="Vendedor">Vendedor / Cajero</option>
                  <option value="Admin">Administrador General</option>
                  <option value="Repostero">Repostero / Producción</option>
                </select>
              </div>

              <div className="flex gap-4 pt-4">
                <button type="button" onClick={closeModal} className="flex-1 py-3 text-gray-400 font-black uppercase text-xs tracking-widest">
                  Cancelar
                </button>
                <button type="submit" className="flex-1 py-3 bg-artisan-secondary text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-artisan-primary shadow-lg transition-all">
                  {editingUser ? 'Guardar' : 'Crear Acceso'}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}