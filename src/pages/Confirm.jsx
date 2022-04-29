import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Alert from "../components/sections/Alert";

const Confirm = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const params = useParams();
  const { id } = params;

  const method = 'GET';
  const resource = `/api/users/confirm/${id}`;
  const url = BACKEND_URL + resource;

  const [alert, setAlert] = useState({
    message: '',
    error: false
  });

  const [confirmedAccount, setConfirmedAccount] = useState(false);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const options = {
          method,
          url
        };
        const { data } = await axios(options);
        setAlert({
          message: data.message,
          error: false
        });
        setConfirmedAccount(true);
      } catch (error) {
        setAlert({
          message: error.response.data.message,
          error: true
        });
      }
    };
    fetchApi();
  }, []);

  return (
    <section className="py-8 md:py-16">
      <div className="flex flex-col gap-8 container mx-auto px-8 md:px-3">
        <h1 className="text-sky-600 text-4xl font-black text-center">
          Confirma tu cuenta y administra tus <span className="text-slate-700">proyectos</span>
        </h1>
        <div className="flex flex-col gap-4 bg-white border rounded-lg w-4/5 max-w-sm mx-auto p-4">
          {
            alert.message && <Alert alert={alert} />
          }
          {
            confirmedAccount
            &&
            <Link
              to="/"
              className="text-slate-500 text-sm font-bold text-center transition-colors hover:text-slate-800"
            >
              Iniciar Sesión
            </Link>
          }
        </div>
      </div>
    </section>
  );
}

export default Confirm;