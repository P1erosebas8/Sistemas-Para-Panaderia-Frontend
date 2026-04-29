import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const DEFAULT_ADMIN = {
        id: 'master-01',
        name: 'Piero Bellido',
        email: 'piero@briselli.com', 
        password: 'admin123',        
        role: 'Admin',
        status: 'Activo'
    };

const handleLogin = (e) => {
        e.preventDefault();

        // 1. Traer todos los usuarios (los creados en gestión + el admin por defecto)
        const storedUsers = JSON.parse(localStorage.getItem('briselli_users')) || [];
        
        // Si no hay nada en el storage, usamos al DEFAULT_ADMIN que definiste arriba
        const allUsers = storedUsers.length > 0 ? storedUsers : [DEFAULT_ADMIN];

        // 2. BUSCAR coincidencia de correo Y contraseña guardada del usuario
        // Cambiamos "password === 'admin123'" por "u.password === password"
        const userFound = allUsers.find(u => 
            u.email === email && u.password === password
        );

        if (userFound) {
            // Guardar sesión activa
            localStorage.setItem('briselli_auth', JSON.stringify(userFound));

            // Si es la primera vez que entras y el storage estaba vacío,
            // guardamos al admin maestro para que ya exista en la lista de gestión.
            if (storedUsers.length === 0) {
                localStorage.setItem('briselli_users', JSON.stringify([DEFAULT_ADMIN]));
            }

            navigate('/admin');
        } else {
            alert("Correo o contraseña incorrectos. Verifica tus credenciales de Briselli.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#fcf9f8] font-sans p-6 animate-fadeIn">
            <main className="w-full max-w-[440px]">
                <div className="bg-white p-8 rounded-3xl shadow-xl shadow-orange-900/5 border border-orange-100 flex flex-col items-center">

                    {/* Identidad de Marca Briselli */}
                    <div className="mb-8 text-center">
                        <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mb-4 mx-auto border-4 border-white shadow-inner">
                            <span className="text-4xl">🍰</span>
                        </div>
                        <h1 className="text-4xl font-black text-[#8d4b00] tracking-tighter uppercase">Briselli</h1>
                        <p className="text-[#554336] text-xs font-bold uppercase tracking-widest mt-1">Gestión Administrativa</p>
                    </div>

                    <form onSubmit={handleLogin} className="w-full space-y-5">
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-black text-[#8d4b00] uppercase tracking-wider ml-1">
                                Correo Institucional
                            </label>
                            <div className="relative">
                                <input
                                    required
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full h-12 pl-5 pr-4 bg-gray-50 border-2 border-gray-100 focus:border-[#8d4b00] focus:bg-white rounded-2xl text-sm transition-all outline-none"
                                    placeholder="ejemplo@briselli.pe"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-[11px] font-black text-[#8d4b00] uppercase tracking-wider">
                                    Contraseña
                                </label>
                            </div>
                            <input
                                required
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full h-12 pl-5 pr-4 bg-gray-50 border-2 border-gray-100 focus:border-[#8d4b00] focus:bg-white rounded-2xl text-sm transition-all outline-none"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full h-12 bg-[#8d4b00] text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-lg shadow-orange-900/20 hover:bg-[#6e3900] active:scale-[0.98] transition-all mt-4"
                        >
                            Entrar al Sistema
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-gray-100 w-full flex flex-col items-center gap-2">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">¿Problemas con el acceso?</p>
                        <button type="button" className="text-[11px] font-black text-[#8d4b00] hover:text-[#b15f00] transition-colors uppercase underline">
                            Contactar Soporte Técnico
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Login;