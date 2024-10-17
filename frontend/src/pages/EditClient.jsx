import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function EditClient() {
  const { id } = useParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [creditCard, setCreditCard] = useState("");

  const handleUpdate = async (event) => {
    event.preventDefault();
    const data = {
      firstName,
      lastName,
      email,
      creditCard,
    };
    const response = await fetch(
      `http://localhost:4000/api/customers/update/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (response.ok) {
      alert("Cliente actualizado correctamente");
    } else {
      alert("Error al actualizar el cliente");
    }
  };

  useEffect(() => {
    const getCustomer = async (id) => {
      const response = await fetch(`http://localhost:4000/api/customers/${id}`);
      if (response.ok) {
        const data = await response.json();
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setEmail(data.email);
        setCreditCard(data.creditCard);
      } else {
        throw new Error("Error al obtener el cliente");
      }
    };

    try {
      getCustomer(id);
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  return (
    <main>
      <h1>Editar cliente</h1>
      {id && (
        <form action="PUT" onSubmit={handleUpdate}>
          <div className="input-wrapper">
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              id="name"
              onChange={(event) => {
                setFirstName(event.target.value);
              }}
              value={firstName}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="lastName">Apellido</label>
            <input
              type="text"
              id="lastName"
              onChange={(event) => {
                setLastName(event.target.value);
              }}
              value={lastName}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="phone">Tarjeta de Crédito</label>
            <input
              type="tel"
              id="phone"
              value={creditCard}
              onChange={(event) => {
                setCreditCard(event.target.value);
              }}
            />
          </div>
          <button type="submit" className="secondary">
            Guardar
          </button>
        </form>
      )}
    </main>
  );
}
