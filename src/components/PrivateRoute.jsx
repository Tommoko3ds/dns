import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');

  if (!token) {
    // No hay token, redirige al login
    return <Navigate to="/login" replace />;
  }

  // Token existe, renderiza el componente hijo (ruta protegida)
  return children;
}
