import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem('token'); // revisa si hay token

  const handleLogout = () => {
    localStorage.removeItem('token'); // elimina token
    navigate('/login'); // redirige a login
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="w-full mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1
          className="text-3xl font-extrabold text-[#488b83] cursor-pointer select-none"
          onClick={() => navigate('/')}
        >
          DNS
        </h1>

        {/* Navegación */}
        <ul className="flex space-x-8 items-center text-gray-700 font-medium">
          {/* Solo mostrar si NO está logueado */}
          {!token && (
            <>
              <li>
                <NavLink 
                  to="/" 
                  className={({ isActive }) =>
                    isActive 
                    ? 'text-[#488b83] border-b-4 border-[#7fcdc2] pb-1' 
                    : 'hover:text-[#7fcdc2] transition-colors duration-300'
                  }
                  end
                >
                  Inicio
                </NavLink>
              </li>

              <li>
                <a
                  href="#contact"
                  className="hover:text-[#7fcdc2] transition-colors duration-300"
                >
                  Contacto
                </a>
              </li>
              <li>
                <NavLink className="bg-[#488b83] hover:bg-[#3b6f67] text-white font-semibold uppercase rounded-md px-5 py-2 transition-colors duration-300 cursor-pointer"
                  to="/login"
                >
                  Iniciar sesión
                </NavLink>
              </li>
            </>
          )}

          {/* Mostrar CRM y logout solo si está logueado */}
          {token && (
            <>
              <li>
                <NavLink
                  to="/estadisticas"
                  className={({ isActive }) =>
                    isActive
                      ? 'text-[#488b83] border-b-4 border-[#7fcdc2] pb-1'
                      : 'hover:text-[#7fcdc2] transition-colors duration-300'
                  }
                >
                  CRM
                </NavLink>
              </li>

              <li>
                <button
                  onClick={handleLogout}
                  className="bg-[#488b83] hover:bg-[#3b6f67] text-white font-semibold uppercase rounded-md px-5 py-2 transition-colors duration-300 cursor-pointer"
                  aria-label="Cerrar sesión"
                  type="button"
                >
                  Cerrar sesión
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
