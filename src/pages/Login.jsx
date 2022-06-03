import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../components/sections/Alert";
import axiosInstance from "../config/axiosInstance";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { setLoading, setAuth } = useAuth();
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const [alert, setAlert] = useState({
    message: '',
    error: false
  });

  const { email, password } = user;

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.id]: e.target.value
    });
  };

  const handleSubtmit = async (e) => {
    e.preventDefault();
    if ([email, password].includes('')) {
      setAlert({
        message: 'Todos los campos son obligatorios',
        error: true
      });
    } else if (password.length < 6) {
      setAlert({
        message: 'El password debe contener al menos 6 caracteres',
        error: true
      });
    } else {
      try {
        setLoading(true);
        const method = 'POST';
        const resource = '/users/login';
        const options = {
          method,
          url: resource,
          data: user
        };
        const { data } = await axiosInstance(options);
        localStorage.setItem('token', data.token);
        setAuth(data);
        setUser({
          email: '',
          password: ''
        });
        setAlert({
          message: `Bienvenido ${data.name}`,
          error: false
        });
        navigate('/projects');
      } catch (error) {
        setAlert({
          message: error.response.data.message,
          error: true
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <section className="py-8 md:py-16">
      <div className="flex flex-col gap-8 container mx-auto px-8 md:px-3">
        <h1 className="text-sky-600 text-4xl font-black text-center">
          Inicia sesión y administra tus <span className="text-slate-700">proyectos</span>
        </h1>
        <form
          onSubmit={handleSubtmit}
          className="flex flex-col gap-4 bg-white border rounded-lg w-4/5 max-w-sm mx-auto p-4"
        >
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="w-full border rounded-md p-2"
            value={email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="w-full border rounded-md p-2"
            value={password}
            onChange={handleChange}
            required
            minLength="6"
          />
          <input
            type="submit"
            value="Iniciar Sesión"
            className="bg-sky-700 rounded-md text-white font-bold p-2 cursor-pointer transition-colors hover:bg-sky-800" />
        </form>

        <nav className="flex items-center justify-between w-4/5 max-w-sm mx-auto">
          <Link
            to="/register"
            className="text-slate-500 text-sm font-bold transition-colors hover:text-slate-800"
          >
            No tengo cuenta
          </Link>
          <Link
            to="/recover-password"
            className="text-slate-500 text-sm font-bold transition-colors hover:text-slate-800"
          >
            Olvidé mi password
          </Link>
        </nav>
        {
          alert.message && <Alert alert={alert} />
        }
      </div>
    </section>
  );
}

export default Login;