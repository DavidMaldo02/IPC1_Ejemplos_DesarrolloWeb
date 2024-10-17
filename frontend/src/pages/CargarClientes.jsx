
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useNavigate } from "react-router-dom";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [fileData, setFileData] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = event.target.result;
        setFileData(data);
      };
      reader.readAsText(file);
    }
  };

  const handleUpload = async () => {
    if (!fileData) {
      alert("No hay archivo seleccionado");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:4000/api/customers/create-many",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: fileData,
        }
      );
      if (response.ok) {
        alert("Clientes cargados correctamente");
        setCustomers([...customers, ...JSON.parse(fileData)]);
      } else {
        throw new Error("Error al cargar los clientes");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/customers/delete/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        alert("Cliente eliminado correctamente");
        setCustomers(customers.filter((customer) => customer.id !== id));
      } else {
        throw new Error("Error al eliminar el cliente");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileExport = async () => {
    const table = document.getElementById("customers-table");
    const worksheet = XLSX.utils.table_to_sheet(table);

    // Create a new workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Write the workbook
    const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "binary" });

    // Function to convert string to ArrayBuffer
    const s2ab = (s) => {
      const buf = new ArrayBuffer(s.length);
      const view = new Uint8Array(buf);
      for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
      return buf;
    };

    // Save the file
    saveAs(
      new Blob([s2ab(wbout)], { type: "application/octet-stream" }),
      "table.xlsx"
    );
  };

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/customers");
        const parsedData = await response.json();
        setCustomers(parsedData);
        console.log(parsedData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCustomers();
  }, []);

  return (
    <main>
      <h1>Mi primera pagina web</h1>
      <button className="primary" onClick={handleUpload}>
        Cargar clientes
      </button>

      <button className="primary" onClick={handleFileExport}>
        Exportar clientes
      </button>
      <label htmlFor="file" className="file-button">
        Selecciona un archivo JSON
        <input
          type="file"
          name="load-customers"
          id="load-customers"
          onChange={handleFileChange}
          accept=".json"
        />
      </label>
      <table id="customers-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Tarjeta de Crédito</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {customers.length === 0 && (
            <tr>
              <td colSpan="6">No hay clientes</td>
            </tr>
          )}
          {customers.map((customer, index) => (
            <tr key={index}>
              <td>{customer.id}</td>
              <td>{customer.firstName}</td>
              <td>{customer.lastName}</td>
              <td>{customer.email}</td>
              <td>{customer.creditCard}</td>
              <td>
                <button
                  className="accent"
                  onClick={async () => await handleDelete(customer.id)}
                >
                  Eliminar
                </button>
                <button
                  className="accent"
                  onClick={() => navigate(`/clientes/${customer.id}`)}
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default Customers;

