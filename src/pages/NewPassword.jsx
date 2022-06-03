import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Alert from "../components/sections/Alert";
import axiosInstance from "../config/axiosInstance";

const NewPassword = () => {
  const params = useParams();
  const { token } = params;

  const [validToken, setValidToken] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);

  const [passwords, setPasswords] = useState({
    password: '',
    repeatedPassword: ''
  });

  const { password, repeatedPassword } = passwords;

  const [alert, setAlert] = useState({
    message: '',
    error: false
  });

  const handleChange = (e) => {
    setPasswords({
      ...passwords,
      [e.target.id]: e.target.value
    });
  };

  const handleSubtmit = async (e) => {
    e.preventDefault();
    if ([password, repeatedPassword].includes('')) {
      setAlert({
        message: 'Todos los campos son obligatorios',
        error: true
      });
    } else if (password !== repeatedPassword) {
      setAlert({
        message: 'Los password no coinciden',
        error: true
      });
    } else if (password.length < 6) {
      setAlert({
        message: 'El password debe contener al menos 6 caracteres',
        error: true
      });
    } else {
      try {
        const method = 'POST';
        const resource = `/users/recover-password/${token}`;
        const options = {
          method,
          url: resource,
          data: {password}
        };
        const { data } = await axiosInstance(options);
        setPasswords({
          password: '',
          repeatedPassword: ''
        });
        setAlert({
          message: data.message,
          error: false
        });
        setPasswordChanged(true);
      } catch (error) {
        setAlert({
          message: error.response.data.message,
          error: true
        });
      }
    }
  };

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const method = 'GET';
        const resource = `/users/recover-password/${token}`;
        const options = {
          method,
          url: resource,
        };
        const { data } = await axiosInstance(options);
        setValidToken(true);
        setAlert({
          message: data.message,
          error: false
        });
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
          Reestablece tu password y no pierdas tus <span className="text-slate-700">proyectos</span>
        </h1>
        {
          validToken
          &&
          <form
            onSubmit={handleSubtmit}
            className="flex flex-col gap-4 bg-white border rounded-lg w-4/5 max-w-sm mx-auto p-4"
          >
            <input
              type="password"
              id="password"
              placeholder="Nuevo password"
              className="w-full border rounded-md p-2"
              value={password}
              minLength="6"
              onChange={handleChange}
              required />
            <input
              type="password"
              id="repeatedPassword"
              placeholder="Repetir password"
              className="w-full border rounded-md p-2"
              value={repeatedPassword}
              minLength="6"
              onChange={handleChange}
              required />
            <input
              type="submit"
              value="Reestablecer"
              className="bg-sky-700 rounded-md text-white font-bold p-2 cursor-pointer transition-colors hover:bg-sky-800" />
          </form>
        }
        {
          alert.message && <Alert alert={alert} />
        }
        {
            passwordChanged
            &&
            <Link
              to="/"
              className="text-slate-500 text-sm font-bold text-center transition-colors hover:text-slate-800"
            >
              Iniciar Sesión
            </Link>
          }
      </div>
    </section>
  );
}

export default NewPassword;