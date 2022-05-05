import { formatDate } from "../../helpers/formatDate";

const TasksTask = ({ task }) => {

  const { _id, name, description, state, deadline, priority } = task;

  return (
    <div className="flex items-center justify-between border-b p-4">
      <div className="flex flex-col">
        <h3 className="text-xl">{name}</h3>
        <h4 className="text text-gray-500">{description}</h4>
        <h5 className="text-lg">{formatDate(deadline)}</h5>
        <h6 className="text-gray-600">{priority}</h6>
      </div>
      <div className="flex flex-col gap-2 md:flex-row">
        <button className="bg-indigo-600 rounded-md text-white text-sm font-bold uppercase p-2 transition-colors hover:bg-indigo-700">
          Editar
        </button>
        {
          state ? (
            <button className="bg-sky-600 rounded-md text-white text-sm font-bold uppercase p-2 transition-colors hover:bg-sky-700">
              Completa
            </button>
          ) : (
            <button className="bg-gray-600 rounded-md text-white text-sm font-bold uppercase p-2 transition-colors hover:bg-gray-700">
              Incompleta
            </button>
          )
        }
        <button className="bg-red-600 rounded-md text-white text-sm font-bold uppercase p-2 transition-colors hover:bg-red-700">
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default TasksTask;