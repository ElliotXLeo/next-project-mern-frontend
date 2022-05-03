import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <nav className="flex flex-col gap-4 py-10 px-5 md:w-80">
      <p className="text-xl font-bold">Hola: Elliot</p>
      <Link
        to="/create-project"
        className="bg-sky-600 rounded-md text-white text-sm text-center font-bold uppercase p-2"
      >
        Nuevo Proyecto
      </Link>
    </nav>
  );
}

export default Sidebar;