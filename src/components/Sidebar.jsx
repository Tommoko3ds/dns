import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <aside className="w-64 bg-[#488b83] shadow-lg h-[100vh] fixed top-0">
      <div className="p-6 flex flex-col w-full">
        {/* Logo */}
        <h1
          className="text-3xl font-extrabold text-white cursor-pointer mb-8 select-none"
          onClick={() => navigate('/')}
        >
          DNS
        </h1>

        {/* Nav Links */}
        <nav className="flex flex-col space-y-4 flex-grow">
          {!token && (
            <>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  isActive
                    ? 'text-white font-semibold border-l-4 border-[#7fcdc2] pl-3'
                    : 'text-white hover:text-[#222222] pl-3 transition-colors duration-300'
                }
              >
                Inicio
              </NavLink>

              <a
                href="#contact"
                className="text-gray-700 hover:text-[#7fcdc2] pl-3 transition-colors duration-300"
              >
                Contacto
              </a>
            </>
          )}

          {token && (
            <>
                <label className='text-white text-xl font-semibold border-[#7fcdc2] uppercase'>Gestion de cosas</label>
              <NavLink
                to="/estadisticas"
                className={({ isActive }) =>
                  isActive
                    ? 'text-white font-semibold border-l-4 border-[#7fcdc2] pl-3'
                    : 'text-gray-700 hover:text-[#7fcdc2] pl-3 transition-colors duration-300'
                }
              >
                CRM
              </NavLink>

              {/* <button
                onClick={handleLogout}
                className="bottom-5 fixed bg-[#488b83] hover:bg-[#3b6f67] text-white font-semibold uppercase rounded-md px-5 py-2 transition-colors duration-300 cursor-pointer"
                aria-label="Cerrar sesión"
                type="button"
              >
                Cerrar sesión
              </button> */}
            </>
          )}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
