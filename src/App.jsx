import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Encuesta from './pages/Encuesta';
import Estadisticas from './pages/Estadisticas';
import Landing from './pages/landing';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute'; // crea este archivo

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        
        {/* Ruta protegida */}
        <Route 
          path="/estadisticas" 
          element={
            <PrivateRoute>
              <Estadisticas />
            </PrivateRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
