import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {

  const [user, setUser] = useState({
    nombre: '',
    email: '',
    password: '',
    repeatedPassword: ''
  });

  const { nombre, email, password, repeatedPassword } = user;

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.id]: e.target.value
    });
  };

  const handleSubtmit = async (e) => {
    e.preventDefault();
    if ([nombre, email, password, repeatedPassword].includes('')) {
      console.log('Todos los campos son obligatorios');
    }
  };

  return (
    <section className="py-8 md:py-16">
      <div className="flex flex-col gap-8 container mx-auto px-8 md:px-3">
        <h1 className="text-sky-600 text-4xl font-black text-center">
          Registrate y administra tus <span className="text-slate-700">proyectos</span>
        </h1>
        <form
          onSubmit={handleSubtmit}
          className="flex flex-col gap-4 bg-white border rounded-lg w-4/5 max-w-sm mx-auto p-4"
        >
          <input
            type="text"
            id="nombre"
            placeholder="Nombre"
            className="w-full border rounded-md p-2"
            value={nombre}
            onChange={handleChange}
          />
          {/* required /> */}
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="w-full border rounded-md p-2"
            value={email}
            onChange={handleChange}
          />
          {/* required /> */}
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="w-full border rounded-md p-2"
            value={password}
            onChange={handleChange}
          />
          {/* required /> */}
          <input
            type="password"
            id="repeatedPassword"
            placeholder="Repetir password"
            className="w-full border rounded-md p-2"
            value={repeatedPassword}
            onChange={handleChange}
          />
          {/* required /> */}
          <input
            type="submit"
            value="Registrar"
            className="bg-sky-700 text-white font-bold rounded-md p-2 cursor-pointer transition-colors hover:bg-sky-800" />
        </form>

        <nav className="flex items-center justify-between w-4/5 max-w-sm mx-auto">
          <Link
            to="/"
            className="text-slate-500 text-sm font-bold transition-colors hover:text-slate-800"
          >
            Ya tengo cuenta
          </Link>
          <Link
            to="/recover-password"
            className="text-slate-500 text-sm font-bold transition-colors hover:text-slate-800"
          >
            Olvidé mi password
          </Link>
        </nav>
      </div>
    </section>
  );
}

export default Register;