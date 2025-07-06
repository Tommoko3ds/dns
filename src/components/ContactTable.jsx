import React, { useState, useEffect } from "react";
import axios from "axios";

const PAGE_SIZE = 10;

export default function ContactsTable() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios
      .get("http://localhost:3000/contacts")
      .then((res) => setContacts(res.data))
      .catch((err) => console.error("Error fetching contacts:", err));
  }, []);

  const filteredContacts = contacts.filter((c) => {
    const term = searchTerm.toLowerCase();
    return (
      (c.name && c.name.toLowerCase().includes(term)) ||
      (c.email && c.email.toLowerCase().includes(term))
    );
  });

  const totalPages = Math.ceil(filteredContacts.length / PAGE_SIZE);
  const currentContacts = filteredContacts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // Toggle función para actualizar el estado confirmado
  const toggleConfirmed = async (id, currentState) => {
    try {
      await axios.put(`http://localhost:3000/contacts/${id}`, { confirmed: !currentState });

      setContacts((prev) =>
        prev.map((c) =>
          c.id === id ? { ...c, confirmed: !currentState } : c
        )
      );
    } catch (error) {
      console.error("Error actualizando estado de confirmación:", error);
    }
  };

  return (
    <div className="w-full mx-auto p-4 bg-white rounded-md shadow-md border border-neutral-200 mb-2">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Contactos</h2>

      <input
        type="text"
        placeholder="Buscar por nombre o correo..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
        className="mb-4 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#488b83]"
      />

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded">
          <thead className="bg-[#488b83] text-white">
            <tr>
              <th className="py-3 px-6 text-left">Nombre</th>
              <th className="py-3 px-6 text-left">Correo</th>
              <th className="py-3 px-6 text-left">Confirmado</th>
            </tr>
          </thead>
          <tbody>
            {currentContacts.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-500">
                  No se encontraron contactos
                </td>
              </tr>
            ) : (
              currentContacts.map((contact) => (
                <tr
                  key={contact.id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6">{contact.name || "-"}</td>
                  <td className="py-3 px-6">{contact.email || "-"}</td>
                  <td className="py-3 px-6">
                    <label className="inline-flex relative items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={contact.confirmed}
                        onChange={() =>
                          toggleConfirmed(contact.id, contact.confirmed)
                        }
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-[#488b83] peer-checked:bg-[#488b83] peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                    </label>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center space-x-2 mt-4">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded border ${
            currentPage === 1
              ? "text-gray-400 border-gray-300 cursor-not-allowed"
              : "text-[#488b83] border-[#488b83] hover:bg-[#488b83] hover:text-white"
          }`}
        >
          &lt; Anterior
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => goToPage(i + 1)}
            className={`px-3 py-1 rounded border ${
              currentPage === i + 1
                ? "bg-[#488b83] text-white border-[#488b83]"
                : "text-[#488b83] border-[#488b83] hover:bg-[#488b83] hover:text-white"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded border ${
            currentPage === totalPages || totalPages === 0
              ? "text-gray-400 border-gray-300 cursor-not-allowed"
              : "text-[#488b83] border-[#488b83] hover:bg-[#488b83] hover:text-white"
          }`}
        >
          Siguiente &gt;
        </button>
      </div>
    </div>
  );
}
