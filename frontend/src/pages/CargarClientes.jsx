import { useEffect, useState } from "react";

function CargarClientes() {
  const [customers, setCustomers] = useState([]);
  const [fileData, setFileData] = useState(null);

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
      alert("No hay archivo para subir");
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
        alert("Clientes subidos con éxito");
        setCustomers([...customers, ...JSON.parse(fileData)]);
      }
      {
        throw new Error("Error al subir los clientes");
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
        alert("Cliente eliminado con éxito");
        setCustomers(customers.filter((customer) => customer.id !== id));
      } else {
        throw new Error("Error al eliminar el cliente");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/customers");
        const data = await response.json();
        setCustomers(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCustomers();
  }, []);

  return (
    <main>
      <h1>Mi primera pagina web</h1>
      <button onClick={handleUpload}>Cargar Clientes</button>
      <input
        type="file"
        name="file-input"
        id="file-input"
        onChange={handleFileChange}
      />
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
                <button onClick={async () => await handleDelete(customer.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default CargarClientes;
