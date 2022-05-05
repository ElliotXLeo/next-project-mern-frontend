import { Link } from "react-router-dom";

const ProjectsProject = ({ project }) => {
  const { _id, name, customer } = project;
  return (
    <div className="flex items-center border-b p-4">
      <p className="flex-1">
        {name}
        <span className="text-gray-500 text-sm uppercase"> {customer}</span>
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