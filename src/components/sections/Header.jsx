import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="py-4 bg-white border-b">
      <div className="flex items-center justify-between container mx-auto">
        <h2 className="text-2xl text-sky-600 font-black">NextProject</h2>
        <input type="search" placeholder="Buscar proyectos" className="p-2 border rounded-lg hidden md:flex md:w-96" />
        <div className="flex items-center gap-4">
          <Link to="/projects" className="font-bold uppercase">Proyectos</Link>
          <button className="bg-sky-600 rounded-md text-white text-sm font-bold uppercase p-2">
            Cerrar Sesión
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;