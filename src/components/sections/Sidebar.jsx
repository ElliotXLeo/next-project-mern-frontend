import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Sidebar = () => {
  const { auth } = useAuth();

  return (
    <nav className="flex flex-col gap-4 md:w-80">
      <p className="text-xl font-bold">Hola: {auth.name}</p>
      <Link
        to="create-project"
        className="bg-sky-600 rounded-md text-white text-sm text-center font-bold uppercase p-2"
      >
        Nuevo proyecto
      </Link>
    </nav>
  );
}

export default Sidebar;