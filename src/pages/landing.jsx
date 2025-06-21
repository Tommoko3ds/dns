

function Landing() {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Navbar */}
            <nav className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-[#7fcdc2]">DNS</h1>
                    <ul className="flex space-x-6 text-gray-700">
                        <li><a href="#features" className="hover:text-[#7fcdc2]">Landing Page</a></li>
                        <li><a href="#contact" className="hover:text-[#7fcdc2]">Contacto</a></li>
                    </ul>
                </div>
            </nav>

            <header className="bg-gradient-to-r from-blue-50 to-blue-100 shadow">
                <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
                        Bienvenido a Nuestro Servicio
                    </h1>
                    <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
                        Loremm ipsumm dolor sit amet, consectetur adipiscing elit.
                    </p>
                </div>
            </header>

            <main className="flex-grow">
                <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                    {/* Features */}
                    <section id="features" className="text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
                            Descubre Nuestras Funciones
                        </h2>
                        <p className="mt-2 text-lg text-gray-600 max-w-xl mx-auto">
                            Gestiona tus procesos de forma eficiente y segura.
                        </p>
                        <div className="mt-8">
                            <a
                                href="#contact"
                                className="inline-block px-6 py-3 bg-[#7fcdc2] text-white rounded-lg hover:bg-blue-700 transition"
                            >
                                Comenzar Ahora
                            </a>
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
                            <form className="w-full max-w-lg space-y-4">
                                <input
                                    type="text"
                                    placeholder="Tu Nombre"
                                    className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#7fcdc2]"
                                />

                                <input
                                    type="email"
                                    placeholder="Tu Email"
                                    className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#7fcdc2]"
                                />
                                <input
                                    type="tel"
                                    placeholder="Telefono"
                                    className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#7fcdc2]"
                                />
                                <textarea
                                    placeholder="Tu Mensaje"
                                    className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#7fcdc2]"
                                    rows="4"
                                ></textarea>
                                <button
                                    type="submit"
                                    className="w-full px-6 py-3 bg-[#7fcdc2] text-white rounded-md hover:bg-blue-700 transition"
                                >
                                    Enviar Mensaje
                                </button>
                            </form>
                        </div>
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
