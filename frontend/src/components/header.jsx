import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link className="link" to="/">
              Inicio
            </Link>
          </li>
          <li>
            <Link className="link" to="/clientes">
              Clientes
            </Link>
          </li>
        </ul>

        <ul>
          <li>
            <Link className="link" to="/login">
              Iniciar Sesión
            </Link>
          </li>
          <li>
            <Link className="link" to="/register">
              Registrarse
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
