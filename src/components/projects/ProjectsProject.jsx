import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const ProjectsProject = ({ project }) => {
  const { auth } = useAuth();

  const { _id, name, customer, owner } = project;

  return (
    <div className="flex items-center border-b p-4">
      <p className="flex-1 flex items-center gap-2">
        {name}
        <span className="text-gray-500 text-sm uppercase"> {customer}</span>
        {
          auth._id !== owner
          &&
          (
            <span className="bg-green-500 rounded text-white text-xs font-bold uppercase p-1">Colaborador</span>
          )
        }
      </p>
      <Link
        to={_id}
        className="text-gray-600 hover:text-gray-800 text-sm font-bold uppercase"
      >
        Ver
      </Link>
    </div>
  );
}

export default ProjectsProject;