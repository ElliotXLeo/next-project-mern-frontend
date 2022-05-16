import { formatDate } from "../../utils/formatDate";
import useAdmin from "../../hooks/useAdmin";
import useProjects from "../../hooks/useProjects";

const TasksTask = ({ task }) => {

  const { _id, name, description, state, deadline, priority, developer } = task;

  const { handleSetTask, updateTaskState, handleTaskDeleteModal } = useProjects();
  const admin = useAdmin();

  return (
    <div className="flex items-center justify-between border-b p-4">
      <div className="flex flex-col items-start gap-1">
        <h3 className="text-xl">{name}</h3>
        <h4 className="text-gray-500">{description}</h4>
        <h5 className="text-gray-700">{formatDate(deadline)}</h5>
        <h6 className="text-gray-600">{priority}</h6>
        {
          state
          &&
          (
            <h6 className="bg-green-600 rounded text-white text-xs font-bold uppercase p-1">Completada por: {developer.name}</h6>
          )
        }
      </div>
      <div className="flex flex-col gap-2 md:flex-row">
        {
          admin
          &&
          (
            <button
              onClick={() => { handleSetTask(task) }}
              className="bg-indigo-600 rounded-md text-white text-sm font-bold uppercase p-2 transition-colors hover:bg-indigo-700"
            >
              Editar
            </button>
          )
        }
        <button
          className={`rounded-md text-white text-sm font-bold uppercase p-2 transition-colors ${state ? 'bg-sky-600 hover:bg-sky-700' : 'bg-gray-600 hover:bg-gray-700'}`}
          onClick={() => updateTaskState(_id)}
        >
          {state ? 'Completa' : 'Incompleta'}
        </button>
        {
          admin
          &&
          (
            <button
              onClick={() => handleTaskDeleteModal(task)}
              className="bg-red-600 rounded-md text-white text-sm font-bold uppercase p-2 transition-colors hover:bg-red-700"
            >
              Eliminar
            </button>
          )
        }
      </div>
    </div>
  );
}

export default TasksTask;