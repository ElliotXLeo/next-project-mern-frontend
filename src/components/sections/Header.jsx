import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="p-4 md:py-4 bg-white border-b">
      <div className="flex items-center justify-between container mx-auto">
        <Link to="/projects" className="text-2xl text-sky-600 font-black">NextProject</Link>
        <input type="search" placeholder="Buscar proyectos" className="p-2 border rounded-lg hidden md:flex md:w-96" />
        <div className="flex items-center gap-4">
          <Link to="/projects" className="font-bold uppercase">Proyectos</Link>
          <button className="bg-sky-600 rounded-md text-white text-sm font-bold uppercase p-2 transition-colors hover:bg-sky-700">
            Cerrar sesión
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;