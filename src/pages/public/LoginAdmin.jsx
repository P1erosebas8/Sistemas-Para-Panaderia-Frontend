import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setAuthSession } from '../../utils/authSession';
import { authService } from '../../services/authService';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [showOtp, setShowOtp] = useState(false);
    const [otp, setOtp] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleAuth = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isForgotPassword) {
                if (showOtp) {
                    // Reset Password
                    const res = await authService.resetPassword({ email, otp, newPassword: password });
                    alert(res || "Contraseña actualizada correctamente.");
                    setIsForgotPassword(false);
                    setIsLogin(true);
                    setShowOtp(false);
                    setPassword('');
                    setOtp('');
                } else {
                    // Send OTP
                    const res = await authService.forgotPassword(email);
                    alert(res || "Código enviado a tu correo.");
                    setShowOtp(true);
                }
                return;
            }

            if (showOtp) {
                // Verificar OTP
                const res = await authService.verifyOtp({ email, otp });
                setAuthSession(res);
                localStorage.setItem('briselli_token', res.token);
                localStorage.setItem('briselli_active_user', JSON.stringify(res));
                
                alert(`¡Bienvenido ${res.firstName}!`);
                if (res.role === 'ADMIN' || res.role === 'admin' || res.role === 'ROLE_ADMIN') {
                    navigate('/admin');
                } else {
                    navigate('/postres');
                }
                return;
            }

            if (isLogin) {
                const res = await authService.login({ email, password });
                
                setAuthSession(res);
                localStorage.setItem('briselli_token', res.token);
                localStorage.setItem('briselli_active_user', JSON.stringify(res));

                alert(`Bienvenido ${res.firstName || email}`);
                if (res.role === 'ADMIN' || res.role === 'admin' || res.role === 'ROLE_ADMIN') {
                    navigate('/admin');
                } else {
                    navigate('/postres');
                }
            } else {
                // Registro
                const res = await authService.register({
                    firstName: name,
                    email,
                    password
                });
                
                alert(res || "Registro exitoso. Revisa tu correo electrónico para obtener tu código OTP.");
                setShowOtp(true);
            }
        } catch (error) {
            console.error(error);
            const msg = error.response?.data?.message || error.response?.data || "Ocurrió un error. Verifica tus credenciales.";
            alert(typeof msg === 'string' ? msg : "Error en la autenticación");
        } finally {
            setLoading(false);
        }
    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-[#fcf9f8] font-sans p-6 animate-fadeIn">
            <button
                onClick={() => navigate('/')}
                className="absolute top-8 left-8 flex items-center gap-2 text-artisan-dark/50 hover:text-artisan-primary transition-colors font-bold text-xs uppercase tracking-widest"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Volver a la tienda
            </button>
            <main className="w-full max-w-[440px]">
                <div className="bg-white p-8 rounded-3xl shadow-xl shadow-orange-900/5 border border-orange-100 flex flex-col items-center">

                    <div className="mb-8 text-center">
                        <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mb-4 mx-auto border-4 border-white shadow-inner">
                            <span className="text-4xl">🍰</span>
                        </div>
                        <h1 className="text-3xl font-black text-[#8d4b00] tracking-tighter uppercase">Briselli</h1>
                        <p className="text-[#554336] text-[10px] font-bold uppercase tracking-widest mt-1">
                            {isForgotPassword ? 'Recuperar Contraseña' : isLogin ? 'Acceso al Sistema' : 'Registro de Cliente'}
                        </p>
                    </div>

                    <form onSubmit={handleAuth} className="w-full space-y-4">
                        {showOtp ? (
                            <div className="space-y-1.5">
                                <p className="text-xs text-center text-gray-600 mb-4">
                                    Hemos enviado un código a <b>{email}</b>. Por favor, ingrésalo para verificar tu cuenta.
                                </p>
                                <label className="text-[11px] font-black text-[#8d4b00] uppercase tracking-wider ml-1">Código OTP</label>
                                <input
                                    required
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="w-full h-12 px-5 bg-gray-50 border-2 border-gray-100 focus:border-[#8d4b00] focus:bg-white rounded-2xl text-sm transition-all outline-none"
                                    placeholder="123456"
                                    maxLength={6}
                                />
                                {isForgotPassword && (
                                    <div className="space-y-1.5 pt-3">
                                        <label className="text-[11px] font-black text-[#8d4b00] uppercase tracking-wider ml-1">Nueva Contraseña</label>
                                        <input
                                            required
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full h-12 px-5 bg-gray-50 border-2 border-gray-100 focus:border-[#8d4b00] focus:bg-white rounded-2xl text-sm transition-all outline-none"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                {!isLogin && !isForgotPassword && (
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

                        {!isForgotPassword && (
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
                        )}

                            </>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-12 bg-[#8d4b00] text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-lg shadow-orange-900/20 hover:bg-[#6e3900] active:scale-[0.98] transition-all mt-4 disabled:opacity-50"
                        >
                            {loading ? 'Cargando...' : showOtp ? (isForgotPassword ? 'Restablecer' : 'Verificar') : isForgotPassword ? 'Enviar Código' : isLogin ? 'Entrar' : 'Crear Cuenta'}
                        </button>
                    </form>

                    {!showOtp && (
                        <div className="w-full mt-6 space-y-3">
                            {isForgotPassword ? (
                                <button
                                    onClick={() => { setIsForgotPassword(false); setIsLogin(true); }}
                                    className="w-full text-[11px] font-black text-[#8d4b00] hover:text-[#b15f00] transition-colors uppercase underline tracking-tighter"
                                >
                                    Volver al inicio de sesión
                                </button>
                            ) : (
                                <>
                                    {isLogin && (
                                        <button
                                            type="button"
                                            onClick={() => { setIsForgotPassword(true); setIsLogin(false); }}
                                            className="w-full text-[11px] font-bold text-gray-500 hover:text-gray-800 transition-colors tracking-tight block text-center"
                                        >
                                            ¿Olvidaste tu contraseña?
                                        </button>
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => setIsLogin(!isLogin)}
                                        className="w-full text-[11px] font-black text-[#8d4b00] hover:text-[#b15f00] transition-colors uppercase underline tracking-tighter block text-center"
                                    >
                                        {isLogin ? '¿No tienes cuenta? Regístrate aquí' : '¿Ya tienes cuenta? Inicia sesión'}
                                    </button>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Login;