import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const DEFAULT_ADMIN = {
        id: 'master-01',
        firstName: 'Piero',
        lastName: 'Bellido',
        email: 'piero@briselli.com', 
        password: 'admin123',         
        role: 'admin',
        status: 'Activo'
    };

    const handleAuth = (e) => {
    e.preventDefault();

    const storedUsers = JSON.parse(localStorage.getItem('briselli_users')) || [];    
    const allUsers = [...storedUsers];
    const adminExists = allUsers.find(u => u.email === DEFAULT_ADMIN.email);
    if (!adminExists) {
        allUsers.push(DEFAULT_ADMIN);
    }

    if (isLogin) {
        const userFound = allUsers.find(u => 
            u.email.toLowerCase() === email.toLowerCase() && 
            u.password === password
        );

        if (userFound) {
            localStorage.setItem('briselli_auth', JSON.stringify(userFound));

            if (!adminExists && userFound.role === 'admin') {
                localStorage.setItem('briselli_users', JSON.stringify([...storedUsers, DEFAULT_ADMIN]));
            }

            if (userFound.role.toLowerCase() === 'admin') {
                navigate('/admin');
            } else {
                navigate('/account');
            }
        } else {
            alert("Correo o contraseña incorrectos.");
        }
    } else {
        // --- LÓGICA DE REGISTRO ---
        if (allUsers.find(u => u.email.toLowerCase() === email.toLowerCase())) {
            return alert("Este correo ya está registrado.");
        }

        const newUser = {
            firstName: name,
            lastName: '',
            email: email,
            password: password,
            role: 'user',
            dni: '',
            phone: '',
            address: '',
            status: 'Activo'
        };

        const updatedUsers = [...storedUsers, newUser];
        localStorage.setItem('briselli_users', JSON.stringify(updatedUsers));
        localStorage.setItem('briselli_active_user', JSON.stringify(newUser));
        
        navigate('/account');
    }
};

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#fcf9f8] font-sans p-6 animate-fadeIn">
            <main className="w-full max-w-[440px]">
                <div className="bg-white p-8 rounded-3xl shadow-xl shadow-orange-900/5 border border-orange-100 flex flex-col items-center">

                    <div className="mb-8 text-center">
                        <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mb-4 mx-auto border-4 border-white shadow-inner">
                            <span className="text-4xl">🍰</span>
                        </div>
                        <h1 className="text-3xl font-black text-[#8d4b00] tracking-tighter uppercase">Briselli</h1>
                        <p className="text-[#554336] text-[10px] font-bold uppercase tracking-widest mt-1">
                            {isLogin ? 'Acceso al Sistema' : 'Registro de Cliente'}
                        </p>
                    </div>

                    <form onSubmit={handleAuth} className="w-full space-y-4">
                        {!isLogin && (
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-black text-[#8d4b00] uppercase tracking-wider ml-1">Nombre Completo</label>
                                <input
                                    required
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full h-12 px-5 bg-gray-50 border-2 border-gray-100 focus:border-[#8d4b00] focus:bg-white rounded-2xl text-sm transition-all outline-none"
                                    placeholder="Tu nombre"
                                />
                            </div>
                        )}

                        <div className="space-y-1.5">
                            <label className="text-[11px] font-black text-[#8d4b00] uppercase tracking-wider ml-1">Correo Electrónico</label>
                            <input
                                required
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full h-12 px-5 bg-gray-50 border-2 border-gray-100 focus:border-[#8d4b00] focus:bg-white rounded-2xl text-sm transition-all outline-none"
                                placeholder="ejemplo@correo.com"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[11px] font-black text-[#8d4b00] uppercase tracking-wider ml-1">Contraseña</label>
                            <input
                                required
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full h-12 px-5 bg-gray-50 border-2 border-gray-100 focus:border-[#8d4b00] focus:bg-white rounded-2xl text-sm transition-all outline-none"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full h-12 bg-[#8d4b00] text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-lg shadow-orange-900/20 hover:bg-[#6e3900] active:scale-[0.98] transition-all mt-4"
                        >
                            {isLogin ? 'Entrar' : 'Crear Cuenta'}
                        </button>
                    </form>

                    <button 
                        onClick={() => setIsLogin(!isLogin)}
                        className="mt-6 text-[11px] font-black text-[#8d4b00] hover:text-[#b15f00] transition-colors uppercase underline tracking-tighter"
                    >
                        {isLogin ? '¿No tienes cuenta? Regístrate aquí' : '¿Ya tienes cuenta? Inicia sesión'}
                    </button>
                </div>
            </main>
        </div>
    );
};

export default Login;