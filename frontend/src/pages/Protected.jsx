import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

export default function Protected() {
  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const _user = JSON.parse(localStorage.getItem("user"));
    if (!_user) {
      navigate("/login");
    } else {
      setUser(_user);
    }
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/customers/reports');
        const result = await response.json();
        console.log(result);
        setData(result);
      } catch (error) {
        alert('Error fetching data');
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <main>
      <h1>Protected</h1>
      <p>
        Welcome, {user?.firstName} {user?.lastName}
      </p>
      <button
        className="primary"
        onClick={() => {
          localStorage.removeItem("user");
          navigate("/login");
        }}
      >
        Cerrar Sesión
      </button>
      <Bar
        options={options}
        data={{
          labels: Object.keys(data),
          datasets: [
            {
              label: "Longitud de las tarjetas de crédito",
              data: Object.values(data),
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
          ],
        }}
      />
    </main>
  );
}
