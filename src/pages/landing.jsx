import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Navbar from "../components/Navbar";

function Landing() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [captchaValue, setCaptchaValue] = useState(null); // ✅ NUEVO
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCaptchaChange = (value) => {
    // ✅ NUEVO
    setCaptchaValue(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaValue) {
      setStatus("Por favor completa el CAPTCHA.");
      return;
    }

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      captcha: captchaValue,
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus("Mensaje enviado con éxito!");
        setFormData({ name: "", email: "", phone: "", message: "" });
        setCaptchaValue(null); // ✅ reset local state
      } else {
        setStatus("Error al enviar el mensaje.");
      }
    } catch {
      setStatus("Error al conectar con el servidor.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* <header className="bg-gradient-to-r from-blue-50 to-blue-100 shadow">
        <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-900">
            Bienvenido a Nuestro Servicio
          </h1>
          <p className="mt-2 text-lg text-gray-700 max-w-2xl mx-auto">
            Todo en un solo lugar para gestionar tus procesos de forma eficiente y segura.
          </p>
        </div>
      </header> */}

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          {/* Features */}
          {/* <section id="features" className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
              Descubre Nuestras Funciones
            </h2>
            <p className="mt-2 text-lg text-gray-600 max-w-xl mx-auto">
              Gestiona tus procesos de forma eficiente y segura.
            </p>
            <div className="mt-8">
              <a
                href="/estadisticas"
                className="inline-block px-6 py-3 bg-[#7fcdc2] text-white rounded-lg hover:bg-blue-700 transition"
              >
                Comenzar Ahora
              </a>
            </div>
          </section> */}
          {/* Hero */}
          <section className="bg-[#7fcdc2] text-white py-20 px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              Visualiza y Optimiza tu CRM con Datos Reales
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">
              Una solución poderosa para analizar métricas clave, mejorar
              relaciones con clientes y tomar decisiones basadas en
              estadísticas.
            </p>
            <a
              href="/estadisticas"
              className="mt-8 inline-block px-6 py-3 bg-white text-[#7fcdc2] font-bold rounded-lg hover:bg-gray-100 transition"
            >
              Comenzar Ahora
            </a>
          </section>

          {/* Funciones */}
          <section id="features" className="py-20 text-center bg-gray-50">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
              Funciones Principales
            </h2>
            <p className="text-lg text-gray-600 max-w-xl mx-auto mb-12">
              Herramientas diseñadas para mejorar la eficiencia, el seguimiento
              y la toma de decisiones.
            </p>
            <div className="grid gap-8 grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto px-6">
              <div className="bg-white shadow-lg p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-2">
                  Panel de Indicadores
                </h3>
                <p className="text-gray-600">
                  Consulta métricas en tiempo real como ventas, retención y
                  satisfacción del cliente.
                </p>
              </div>
              <div className="bg-white shadow-lg p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-2">
                  Análisis de Clientes
                </h3>
                <p className="text-gray-600">
                  Identifica patrones de comportamiento, segmenta audiencias y
                  mejora el enfoque comercial.
                </p>
              </div>
              <div className="bg-white shadow-lg p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-2">
                  Exportación de Reportes
                </h3>
                <p className="text-gray-600">
                  Genera y descarga reportes personalizables en Excel o PDF con
                  un solo clic.
                </p>
              </div>
            </div>
          </section>

          {/* Testimonios */}
          <section className="py-20 bg-white text-center">
            <h2 className="text-3xl font-extrabold mb-12">
              Lo que dicen nuestros usuarios
            </h2>
            <div className="grid gap-8 grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto px-6">
              <div className="bg-gray-100 p-6 rounded-xl">
                <p className="italic">
                  "Nos ha ayudado a visualizar nuestros datos y tomar mejores
                  decisiones de negocio."
                </p>
                <p className="mt-4 font-semibold">
                  — Laura G., Directora de Ventas
                </p>
              </div>
              <div className="bg-gray-100 p-6 rounded-xl">
                <p className="italic">
                  "Ahora puedo ver en segundos lo que antes me tomaba días
                  compilar."
                </p>
                <p className="mt-4 font-semibold">— Carlos M., Analista CRM</p>
              </div>
              <div className="bg-gray-100 p-6 rounded-xl">
                <p className="italic">
                  "El diseño es simple pero potente. Nos ha ahorrado mucho
                  tiempo."
                </p>
                <p className="mt-4 font-semibold">— Fernanda T., CEO Startup</p>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section id="contact" className="mt-20">
            <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-4">
              Contáctanos
            </h2>
            <p className="text-center text-lg text-gray-600 mb-8">
              ¿Tienes preguntas? ¡Estamos para ayudarte!
            </p>
            <div className="flex justify-center">
              <form
                onSubmit={handleSubmit}
                className="w-full max-w-lg space-y-4"
                noValidate
              >
                {/* inputs... */}
                <input
                  type="text"
                  name="name"
                  placeholder="Tu Nombre"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#7fcdc2]"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Tu Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#7fcdc2]"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Teléfono"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#7fcdc2]"
                />
                <textarea
                  name="message"
                  placeholder="Tu Mensaje"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#7fcdc2]"
                ></textarea>

                <ReCAPTCHA
                  sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                  onChange={handleCaptchaChange}
                />

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-[#7fcdc2] text-white rounded-md hover:bg-blue-700 transition"
                >
                  Enviar Mensaje
                </button>
              </form>
            </div>
            {status && (
              <p className="text-center mt-4 text-green-600 font-semibold">
                {status}
              </p>
            )}
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 mt-16 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} UT cancun
        </div>
      </footer>
    </div>
  );
}

export default Landing;
