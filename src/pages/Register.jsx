import { Link } from "react-router-dom";

const Register = () => {
  return (
    <section className="py-8 md:py-16">
      <div className="flex flex-col gap-8 container mx-auto px-8 md:px-3">
        <h1 className="text-sky-600 text-4xl font-black text-center">
          Registrate y administra tus <span className="text-slate-700">proyectos</span>
        </h1>
        <form action="" className="flex flex-col gap-4 bg-white border rounded-lg w-4/5 max-w-sm mx-auto p-4">
          <input
            type="text"
            id="nombre"
            placeholder="Nombre"
            className="w-full border rounded-md p-2"
            required />
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="w-full border rounded-md p-2"
            required />
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="w-full border rounded-md p-2"
            required />
          <input
            type="password"
            id="repeatedPassword"
            placeholder="Repetir password"
            className="w-full border rounded-md p-2"
            required />
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