import { useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../components/sections/Alert";
import axiosInstance from "../config/axiosInstance";

const RecoverPassword = () => {
  const [email, setEmail] = useState('');
  const [alert, setAlert] = useState({
    message: '',
    error: false
  });

  const handleSubtmit = async (e) => {
    e.preventDefault();
    if (email === '') {
      setAlert({
        message: 'Email obligatorio',
        error: true
      });
    } else {
      try {
        const method = 'POST';
        const resource = '/users/recover-password';
        const options = {
          method,
          url: resource,
          data: { email }
        };
        const { data } = await axiosInstance(options);
        setEmail('');
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
    }
  };

  return (
    <section className="py-8 md:py-16">
      <div className="flex flex-col gap-8 container mx-auto px-8 md:px-3">
        <h1 className="text-sky-600 text-4xl font-black text-center">
          Recupera tu acceso y no pierdas tus <span className="text-slate-700">proyectos</span>
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
            onChange={e => setEmail(e.target.value)}
          // required 
          />
          <input
            type="submit"
            value="Recuperar"
            className="bg-sky-700 rounded-md text-white font-bold p-2 cursor-pointer transition-colors hover:bg-sky-800" />
        </form>

        <nav className="flex items-center justify-between w-4/5 max-w-sm mx-auto">
          <Link
            to="/"
            className="text-slate-500 text-sm font-bold transition-colors hover:text-slate-800"
          >
            Ya tengo cuenta
          </Link>
          <Link
            to="/register"
            className="text-slate-500 text-sm font-bold transition-colors hover:text-slate-800"
          >
            No tengo cuenta
          </Link>
        </nav>
        {
          alert.message && <Alert alert={alert} />
        }
      </div>
    </section>);
}

export default RecoverPassword;