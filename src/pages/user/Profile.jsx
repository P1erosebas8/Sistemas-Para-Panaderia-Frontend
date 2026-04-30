// src/pages/user/Profile.jsx
import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { getAuthSession, setAuthSession } from '../../utils/authSession';

export default function UserProfile() {
    const { onProfileUpdate } = useOutletContext(); // Obtenemos la función del padre
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dni: '',
        phone: '',
        address: '',
        email: ''
    });

    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        const activeUser = getAuthSession();
        if (activeUser) {
            setFormData(activeUser);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'dni' && value.length > 8) return;
        if (name === 'phone' && value.length > 9) return;

        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.dni.length !== 8) {
            return setMessage({ type: 'error', text: 'El DNI debe tener 8 dígitos.' });
        }
        if (formData.phone.length < 9) {
            return setMessage({ type: 'error', text: 'El teléfono debe tener 9 dígitos.' });
        }

        setAuthSession(formData);

        const allUsers = JSON.parse(localStorage.getItem('briselli_users') || '[]');
        const updatedUsers = allUsers.map(u => u.email === formData.email ? formData : u);
        localStorage.setItem('briselli_users', JSON.stringify(updatedUsers));
        if (onProfileUpdate) onProfileUpdate();
        setMessage({ type: 'success', text: '¡Perfil actualizado correctamente!' });

        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    };

    return (
        <div className="animate-fadeIn">
            <div className="mb-8">
                <h2 className="text-2xl font-black text-artisan-primary uppercase tracking-tighter">Mi Información Personal</h2>
                <p className="text-gray-500 text-sm">Gestiona tus datos para facilitar tus entregas y facturación.</p>
            </div>

            {message.text && (
                <div className={`mb-6 p-4 rounded-xl text-sm font-bold ${message.type === 'success' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'
                    }`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Nombres */}
                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Nombres</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:border-artisan-secondary outline-none transition-all bg-gray-50/50"
                            required
                        />
                    </div>

                    {/* Apellidos */}
                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Apellidos</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:border-artisan-secondary outline-none transition-all bg-gray-50/50"
                            required
                        />
                    </div>

                    {/* DNI */}
                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">DNI (Documento de Identidad)</label>
                        <input
                            type="number"
                            name="dni"
                            value={formData.dni}
                            onChange={handleChange}
                            placeholder="8 dígitos"
                            className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:border-artisan-secondary outline-none transition-all bg-gray-50/50"
                            required
                        />
                    </div>

                    {/* Teléfono */}
                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Teléfono Móvil</label>
                        <input
                            type="number"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="9 dígitos"
                            className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:border-artisan-secondary outline-none transition-all bg-gray-50/50"
                            required
                        />
                    </div>
                </div>

                {/* Correo (Deshabilitado) */}
                <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Correo Electrónico (No modificable)</label>
                    <input
                        type="email"
                        value={formData.email}
                        disabled
                        className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-100 text-gray-400 cursor-not-allowed outline-none"
                    />
                </div>

                {/* Dirección */}
                <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Dirección de Entrega</label>
                    <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        rows="3"
                        className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:border-artisan-secondary outline-none transition-all bg-gray-50/50"
                        placeholder="Ej: Av. Las Palmeras 123, Urb. Los Olivos (Referencia: Frente al parque)"
                        required
                    ></textarea>
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full md:w-auto px-12 py-4 bg-artisan-primary text-white font-black uppercase text-xs tracking-[0.2em] rounded-2xl hover:bg-artisan-secondary transition-all shadow-lg shadow-orange-100"
                    >
                        Guardar Cambios
                    </button>
                </div>
            </form>
        </div>
    );
}