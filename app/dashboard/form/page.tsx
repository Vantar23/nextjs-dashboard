"use client";

import { useState } from "react";

export default function FormularioRequisicion() {
  const [formData, setFormData] = useState({
    codigo: "",
    cantidad: "",
    producto: "",
    unidadMedida: "",
    catalogo: "",
    proveedor: "",
    noFactura: "",
    noCotizacion: "",
    observaciones: "",
  });

  const [mensaje, setMensaje] = useState("");

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const manejarEnvio = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.noFactura) {
      alert("Por favor, completa el campo 'No. Factura' antes de enviar.");
      return;
    }

    try {
      const response = await fetch("http://localhost/backend/api/compras", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setMensaje("Datos enviados exitosamente: " + data.message);
        console.log("Respuesta del servidor:", data);
        setFormData({
          codigo: "",
          cantidad: "",
          producto: "",
          unidadMedida: "",
          catalogo: "",
          proveedor: "",
          noFactura: "",
          noCotizacion: "",
          observaciones: "",
        });
      } else {
        const errorData = await response.json();
        setMensaje("Error: " + errorData.error);
        console.error("Error:", errorData);
      }
    } catch (error) {
      console.error("Error al enviar datos:", error);
      setMensaje("Hubo un problema al enviar los datos.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Requisición</h1>
      <form className="bg-white rounded p-6 space-y-4 border shadow-md" onSubmit={manejarEnvio}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Código</label>
            <input
              type="text"
              name="codigo"
              className="border rounded w-full p-2"
              value={formData.codigo}
              onChange={manejarCambio}
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Proveedor</label>
            <select
              name="proveedor"
              className="border rounded w-full p-2"
              value={formData.proveedor}
              onChange={manejarCambio}
            >
              <option value="">Selecciona un proveedor</option>
              <option value="AELENEVA MEXICO">AELENEVA MEXICO</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1">Cantidad</label>
            <input
              type="number"
              name="cantidad"
              className="border rounded w-full p-2"
              value={formData.cantidad}
              onChange={manejarCambio}
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">No. Factura</label>
            <input
              type="text"
              name="noFactura"
              className="border rounded w-full p-2"
              value={formData.noFactura}
              onChange={manejarCambio}
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Producto</label>
            <select
              name="producto"
              className="border rounded w-full p-2"
              value={formData.producto}
              onChange={manejarCambio}
            >
              <option value="">Selecciona un producto</option>
              <option value="Despachador de Toallas">Despachador de Toallas</option>
              <option value="Jabón Antibacterial">Jabón Antibacterial</option>
              <option value="Abrazaderas sin fin">Abrazaderas sin fin</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1">No. Cotización</label>
            <input
              type="text"
              name="noCotizacion"
              className="border rounded w-full p-2"
              value={formData.noCotizacion}
              onChange={manejarCambio}
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Unidad de Medida</label>
            <select
              name="unidadMedida"
              className="border rounded w-full p-2"
              value={formData.unidadMedida}
              onChange={manejarCambio}
            >
              <option value="">Selecciona una unidad</option>
              <option value="Piezas">Piezas</option>
              <option value="Metros">Metros</option>
              <option value="Kilogramos">Kilogramos</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1">No. Catálogo y Marca</label>
            <select
              name="catalogo"
              className="border rounded w-full p-2"
              value={formData.catalogo}
              onChange={manejarCambio}
            >
              <option value="">Selecciona una marca</option>
              <option value="Talos Electronics">Talos Electronics</option>
            </select>
          </div>
        </div>
        <div className="mt-4">
          <label className="block font-semibold mb-1">Observaciones</label>
          <textarea
            name="observaciones"
            className="border rounded w-full p-2 h-28"
            value={formData.observaciones}
            onChange={manejarCambio}
          />
        </div>
        <div className="mt-4">
          <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2">
            Agregar
          </button>
        </div>
      </form>
      {mensaje && <p className="mt-4 text-green-600">{mensaje}</p>}
    </div>
  );
}
