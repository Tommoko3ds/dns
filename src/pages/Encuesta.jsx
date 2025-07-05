import React, { useState } from 'react';
import axios from 'axios';

const Encuesta = () => {
  const [form, setForm] = useState({
    Age: '',
    Gender: '',
    Academic_Level: '',
    Country: '',
    Avg_Daily_Usage_Hours: '',
    Most_Used_Platform: '',
    Affects_Academic_Performance: '',
    Sleep_Hours_Per_Night: '',
    Mental_Health_Score: '',
    Relationship_Status: '',
    Conflicts_Over_Social_Media: '',
    Addicted_Score: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Reemplaza con tu URL del backend
      await axios.post('http://localhost:3000/MediaAdictions', form);
      alert('Estudiante registrado exitosamente');
      setForm({
        Age: '',
        Gender: '',
        Academic_Level: '',
        Country: '',
        Avg_Daily_Usage_Hours: '',
        Most_Used_Platform: '',
        Affects_Academic_Performance: '',
        Sleep_Hours_Per_Night: '',
        Mental_Health_Score: '',
        Relationship_Status: '',
        Conflicts_Over_Social_Media: '',
        Addicted_Score: ''
      });
    } catch (error) {
      alert('Error al enviar datos');
      console.error(error);
    }
  };

  const scoreOptions = [
  { value: 1, label: 'Muy bajo' },
  { value: 2, label: 'Bajo' },
  { value: 3, label: 'Regular bajo' },
  { value: 4, label: 'Regular' },
  { value: 5, label: 'Aceptable' },
  { value: 6, label: 'Moderado' },
  { value: 7, label: 'Bien' },
  { value: 8, label: 'Muy bien' },
  { value: 9, label: 'Excelente' },
  { value: 10, label: 'Óptimo' }
];

const addictionOptions = [
  { value: 1, label: 'Sin señales de adicción' },
  { value: 2, label: 'Uso muy controlado' },
  { value: 3, label: 'Uso ocasional' },
  { value: 4, label: 'Uso frecuente sin impacto' },
  { value: 5, label: 'Tendencias a la dependencia leve' },
  { value: 6, label: 'Dependencia moderada' },
  { value: 7, label: 'Uso excesivo con impactos leves' },
  { value: 8, label: 'Adicción clara con impacto' },
  { value: 9, label: 'Adicción severa' },
  { value: 10, label: 'Adicción extrema y problemática' }
];

const conflictOptions = [
  { value: 0, label: 'Ningún conflicto' },
  { value: 1, label: 'Un solo conflicto' },
  { value: 2, label: 'Pocos conflictos' },
  { value: 3, label: 'Algunos conflictos' },
  { value: 4, label: 'Conflictos ocasionales' },
  { value: 5, label: 'Varios conflictos' },
  { value: 6, label: 'Conflictos frecuentes' },
  { value: 7, label: 'Muchos conflictos' },
  { value: 8, label: 'Conflictos constantes' },
  { value: 9, label: 'Alta fricción social' },
  { value: 10, label: 'Conflictos muy graves' }
];



  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg border-1 border-neutral-300">
      <h2 className="text-2xl font-bold mb-4 text-center block text-gray-700 uppercase">Formulario de Adicción a Redes Sociales</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ingresa tu edad</label>
            <input type="number" name="Age" placeholder="Edad" value={form.Age} onChange={handleChange} className="w-full px-2 py-2 border rounded-md border-neutral-300 focus:outline-none focus:ring-1 focus:ring-[#a8a8a8]" required />
        </div>
        
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Genero con el que te identificas</label>
            <select name="Gender" value={form.Gender} onChange={handleChange} className="w-full px-2 py-2 border rounded-md border-neutral-300 focus:outline-none focus:ring-1 focus:ring-[#a8a8a8]">
                <option value="">Seleccionar género</option>          
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otro">Otro</option>
                <option value="Prefiero no decirlo">Prefiero no decirlo</option>
            </select>
        </div>
        
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nivel académico</label>
            <select name="Academic_Level" value={form.Academic_Level} onChange={handleChange} className="w-full px-2 py-2 border rounded-md border-neutral-300 focus:outline-none focus:ring-1 focus:ring-[#a8a8a8]">
                <option value="">Seleccionar nivel de estudios</option>
                <option value="Preparatoria">Preparatoria</option>
                <option value="Universitario">Universitario</option>
                <option value="Posgrado">Posgrado</option>
                <option value="Otro">Otro</option>
            </select>
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">País</label>
            <select name="Country" value={form.Country} onChange={handleChange} className="w-full px-2 py-2 border rounded-md border-neutral-300 focus:outline-none focus:ring-1 focus:ring-[#a8a8a8]">
                <option value="">Seleccionar pais</option>
                <option value="México">México</option>
                <option value="Extranjero">Extranjero</option>
            </select>
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Horas promedio de uso diario</label>
            <input type="number" step="0.1" name="Avg_Daily_Usage_Hours" placeholder="Horas uso diario" value={form.Avg_Daily_Usage_Hours} onChange={handleChange} className="w-full px-2 py-2 border rounded-md border-neutral-300 focus:outline-none focus:ring-1 focus:ring-[#a8a8a8]" required />
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Plataforma más utilizada</label>
            <select name="Most_Used_Platform" value={form.Most_Used_Platform} onChange={handleChange} className="w-full px-2 py-2 border rounded-md border-neutral-300 focus:outline-none focus:ring-1 focus:ring-[#a8a8a8]">
                <option value="">Seleccionar red social</option>
                <option value="Instagram">Instagram</option>
                <option value="Facebook">Facebook</option>
                <option value="TikTok">TikTok</option>
                <option value="YouTube">YouTube</option>
                <option value="Twitter">Twitter</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Reddit">Reddit</option>
                <option value="Otra">Otra</option>
            </select>
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">¿Afecta tu rendimiento académico?</label>
            <select name="Affects_Academic_Performance" value={form.Affects_Academic_Performance} onChange={handleChange} className="w-full px-2 py-2 border rounded-md border-neutral-300 focus:outline-none focus:ring-1 focus:ring-[#a8a8a8]">
                <option value="">Seleccionar opción</option>
                <option value="Sí">Sí</option>
                <option value="No">No</option>
            </select>
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Horas de sueño promedio por noche</label>
            <input type="number" step="0.1" name="Sleep_Hours_Per_Night" placeholder="Horas de sueño" value={form.Sleep_Hours_Per_Night} onChange={handleChange} className="w-full px-2 py-2 border rounded-md border-neutral-300 focus:outline-none focus:ring-1 focus:ring-[#a8a8a8]" required />
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Puntuación de salud mental</label>
            <select name="Mental_Health_Score" value={form.Mental_Health_Score} onChange={handleChange} className="w-full px-2 py-2 border rounded-md border-neutral-300 focus:outline-none focus:ring-1 focus:ring-[#a8a8a8]" required>
                <option value="">Selecciona salud mental</option>
                {scoreOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
            </select>
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estado civil</label>
            <select name="Relationship_Status" value={form.Relationship_Status} onChange={handleChange} className="w-full px-2 py-2 border rounded-md border-neutral-300 focus:outline-none focus:ring-1 focus:ring-[#a8a8a8]">
                <option value="">Selecciona estado civil</option>
                <option value="Soltero">Soltero</option>
                <option value="En una relación">En una relación</option>
                <option value="Complicado">Complicado</option>
            </select>
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Conflictos por redes sociales</label>
            <select name="Conflicts_Over_Social_Media" value={form.Conflicts_Over_Social_Media} onChange={handleChange} className="w-full px-2 py-2 border rounded-md border-neutral-300 focus:outline-none focus:ring-1 focus:ring-[#a8a8a8]" required >
                <option value="">Selecciona nivel de conflicto</option>
                {conflictOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>
                    {opt.label}
                    </option>
                ))}
            </select>
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nivel de adicción</label>
            <select name="Addicted_Score" value={form.Addicted_Score} onChange={handleChange} className="w-full px-2 py-2 border rounded-md border-neutral-300 focus:outline-none focus:ring-1 focus:ring-[#a8a8a8]" required >
                <option value="">Selecciona nivel de adicción</option>
                {addictionOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>
                    {opt.label}
                    </option>
                ))}
            </select>
        </div>
        <button type="submit" className="col-span-2 bg-[#1b5877] rounded w-full text-center flex flex-col justify-center text-white font-semibold py-2 transition-opacity duration-300 cursor-pointer">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Encuesta;
