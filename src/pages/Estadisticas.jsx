import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ContactTable from "../components/ContactTable";

const COLORS = ["#7fcdc2", "#8884d8", "#ffc658", "#82ca9d", "#ff7f50"];

export default function Estadisticas() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/contacts")
      .then((res) => setContacts(res.data))
      .catch((err) => console.error("Error al obtener contactos:", err));
  }, []);

  const totalContacts = contacts.length;

  const domainCount = contacts.reduce((acc, contact) => {
    const domain = contact.email?.split("@")[1] || "desconocido";
    acc[domain] = (acc[domain] || 0) + 1;
    return acc;
  }, {});

  const domainData = Object.entries(domainCount).map(([domain, count]) => ({
    name: domain,
    value: count,
  }));

  const nameInitials = contacts.reduce((acc, contact) => {
    const initial = contact.name?.charAt(0).toUpperCase() || "#";
    acc[initial] = (acc[initial] || 0) + 1;
    return acc;
  }, {});

  const nameInitialsData = Object.entries(nameInitials).map(
    ([initial, count]) => ({
      initial,
      count,
    })
  );

  const validCount = contacts.filter((c) => c.isValidEmail === true).length;
  const invalidCount = contacts.filter((c) => c.isValidEmail === false).length;

  const validEmailData = [
    { name: "Válido", value: validCount },
    { name: "Inválido", value: invalidCount },
  ];

  const disposableCount = contacts.filter(
    (c) => c.isDisposable === true
  ).length;
  const nonDisposableCount = contacts.filter(
    (c) => c.isDisposable === false
  ).length;

  const disposableData = [
    { name: "Desechable", value: disposableCount },
    { name: "Normal", value: nonDisposableCount },
  ];

  const deliverabilityCount = contacts.reduce((acc, c) => {
    const key = c.deliverability || "Desconocido";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const deliverabilityData = Object.entries(deliverabilityCount).map(
    ([key, value]) => ({
      name: key,
      value,
    })
  );

  const confirmedCount = contacts.filter((c) => c.confirmed === true).length;
  const notConfirmedCount = contacts.filter(
    (c) => c.confirmed === false
  ).length;

  const confirmedData = [
    { name: "Confirmados", value: confirmedCount },
    { name: "No confirmados", value: notConfirmedCount },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white">
      <Navbar />
      <div className="flex w-full">
        <Sidebar />
        <div className="flex flex-col w-[90%] p-4 ml-[17rem]">
          <header className="mb-4 bg-white p-2 border border-neutral-200 rounded w-full mx-auto px-6 gap-10">
            <h1 className="text-[#488b83] text-4xl font-extrabold mb-3 text-center md:text-left">
              Dashboard de Contactos
            </h1>
            <p className="text-lg text-gray-800 text-center md:text-left">
              Total de contactos:{" "}
              <span className="font-semibold">{totalContacts}</span>
            </p>
          </header>
          <div className="w-full">
            {/* Aqui */}
            <div className="mb-6 grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
              <div className="bg-white rounded shadow p-4 border border-neutral-200">
                <h3 className="text-gray-600 font-semibold mb-2">
                  Total Contactos
                </h3>
                <p className="text-3xl font-bold text-[#488b83]">
                  {totalContacts}
                </p>
              </div>

              <div className="bg-white rounded shadow p-4 border border-neutral-200">
                <h3 className="text-gray-600 font-semibold mb-2">
                  Correos Válidos
                </h3>
                <p className="text-3xl font-bold text-green-600">
                  {validCount}
                </p>
              </div>

              <div className="bg-white rounded shadow p-4 border border-neutral-200">
                <h3 className="text-gray-600 font-semibold mb-2">
                  Correos Inválidos
                </h3>
                <p className="text-3xl font-bold text-red-600">
                  {invalidCount}
                </p>
              </div>

              <div className="bg-white rounded shadow p-4 border border-neutral-200">
                <h3 className="text-gray-600 font-semibold mb-2">
                  Confirmados
                </h3>
                <p className="text-3xl font-bold text-green-700">
                  {confirmedCount}
                </p>
              </div>

              <div className="bg-white rounded shadow p-4 border border-neutral-200">
                <h3 className="text-gray-600 font-semibold mb-2">
                  No Confirmados
                </h3>
                <p className="text-3xl font-bold text-red-700">
                  {notConfirmedCount}
                </p>
              </div>
            </div>
            <ContactTable />
          </div>
          <main className="bg-white py-6 border border-neutral-200 rounded w-full mx-auto px-6 pb-16 grid grid-cols-1 md:grid-cols-2 gap-3 text-center">
            {/* Tarjeta componente común */}
            {/** Distribución de dominios */}
            <section className="bg-white rounded-xl shadow-md p-6 border border-neutral-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Distribución de dominios de correo
              </h2>
              <PieChart width={360} height={300}>
                <Pie
                  data={domainData}
                  cx={180}
                  cy={150}
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} (${(percent * 100).toFixed(0)}%)`
                  }
                >
                  {domainData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </section>

            {/** Contactos por letra inicial */}
            <section className="bg-white rounded-xl shadow-md p-6 border border-neutral-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Contactos por letra inicial del nombre
              </h2>
              <BarChart width={500} height={300} data={nameInitialsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="initial" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#7fcdc2" />
              </BarChart>
            </section>

            {/** Validación de correos */}
            <section className="bg-white rounded-xl shadow-md p-6 border border-neutral-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Validación de Correos Electrónicos
              </h2>
              <PieChart width={400} height={300}>
                <Pie
                  data={validEmailData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                  dataKey="value"
                >
                  <Cell fill="#7fcdc2" />
                  <Cell fill="#f87171" />
                </Pie>
                <Tooltip />
              </PieChart>
            </section>

            {/** Correos desechables */}
            <section className="bg-white rounded-xl shadow-md p-6 border border-neutral-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Correos desechables detectados
              </h2>
              <PieChart width={400} height={300}>
                <Pie
                  data={disposableData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                  dataKey="value"
                >
                  <Cell fill="#fbbf24" />
                  <Cell fill="#34d399" />
                </Pie>
                <Tooltip />
              </PieChart>
            </section>

            {/** Deliverability */}
            <section className="bg-white rounded-xl shadow-md p-6 border border-neutral-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Entregabilidad de Correos
              </h2>
              <PieChart width={400} height={300}>
                <Pie
                  data={deliverabilityData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                  dataKey="value"
                >
                  {deliverabilityData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </section>
            <section className="bg-white rounded-xl shadow-md p-6 border border-neutral-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Correos Confirmados
              </h2>
              <PieChart width={400} height={300}>
                <Pie
                  data={confirmedData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                  dataKey="value"
                >
                  <Cell fill="#22c55e" /> {/* Verde para confirmados */}
                  <Cell fill="#ef4444" /> {/* Rojo para no confirmados */}
                </Pie>
                <Tooltip />
              </PieChart>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
