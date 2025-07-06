import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) throw new Error('Credenciales incorrectas');

      const data = await response.json();
      console.log('Token recibido:', data.access_token);

      localStorage.setItem('token', data.access_token);

      navigate('/estadisticas');  // redirige después del login exitoso
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#488b83] to-[#3b6f67]">
      <form 
        onSubmit={handleLogin} 
        className="bg-white rounded-lg shadow-lg p-10 w-full max-w-sm"
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Iniciar Sesión</h2>

        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-6 px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#488b83] transition"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-8 px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#488b83] transition"
          required
        />

        <button
          type="submit"
          className="w-full bg-[#488b83] hover:bg-[#7fcdc2] text-white font-semibold py-3 rounded shadow-md transition-colors duration-300 cursor-pointer"
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}
