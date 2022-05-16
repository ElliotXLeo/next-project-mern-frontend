import { Link } from "react-router-dom";
import Searcher from "./Searcher";
import useProjects from "../../hooks/useProjects";
import useAuth from "../../hooks/useAuth";

const Header = () => {
  const { logOutAuth } = useAuth();
  const { handleSearcher, logOutProjects } = useProjects();

  const handleLogOut = () => {
    logOutAuth();
    logOutProjects();
    localStorage.removeItem('token');
  };

  return (
    <header className="p-4 md:py-4 bg-white border-b">
      <div className="flex items-center justify-between container mx-auto">
        <Link to="/projects" className="text-2xl text-sky-600 font-black">NextProject</Link>
        <div className="flex items-center gap-2">
          <button
            className="font-bold uppercase"
            onClick={handleSearcher}
          >
            Buscar
          </button>
          <button
            className="bg-sky-600 rounded-md text-white text-xs font-bold uppercase p-1 transition-colors hover:bg-sky-700"
            onClick={handleLogOut}
          >
            Cerrar sesión
          </button>
          <Searcher />
        </div>
      </div>
    </header>
  );
}

export default Header;