import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Alert from "../components/sections/Alert";
import FormModal from "../components/sections/FormModal";
import Loading from "../components/sections/Loading";
import TasksDeleteModal from "../components/tasks/TasksDeleteModal";
import TasksTask from "../components/tasks/TasksTask";
import useProjects from "../hooks/useProjects";

const Project = () => {
  const params = useParams();
  const { id } = params;

  const { loading, project, alert, readProject, deleteProject, handleFormModalTask } = useProjects();
  const { name } = project;

  const handleClick = async () => {
    if (confirm('¿Desea eliminar este proyecto?')) {
      await deleteProject(id);
    }
  }

  useEffect(() => {
    readProject(id);
  }, []);

  return (
    <>
      {
        loading ?
          <Loading />
          :
          <section className="flex flex-col gap-8">
            <header className="flex items-center justify-between">
              <h2 className="text-4xl font-black">{name}</h2>
              <div className="flex items-center gap-4">
                <Link to={`/projects/update/${id}`} className="transition-all hover:sepia">
                  ✏
                </Link>
                <button
                  className="transition-all hover:sepia"
                  onClick={handleClick}
                >
                  🗑
                </button>
              </div>
            </header>
            <section className="flex flex-col gap-4">
              <button
                onClick={handleFormModalTask}
                className="bg-sky-400 rounded-md text-white font-bold p-2 cursor-pointer transition-colors hover:bg-sky-500 w-full"
              >
                ➕ Nueva tarea
              </button>
              <h3 className="text-xl font-bold text-center">Tareas</h3>
              <div className="bg-white shadow rounded-lg p-4">
                {
                  project.tasks?.length ?
                    project.tasks?.map((element) => {
                      return (
                        <TasksTask
                          key={element._id}
                          task={element}
                        />
                      );
                    })
                    :
                    <p className="text-center">No hay tareas</p>
                }
              </div>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-center">Desarrolladores</h3>
                <Link
                  to={`/projects/add-developer/${project._id}`}
                  className="text-gray-400 uppercase font-bold transition-colors hover:text-black"
                >
                  Agregar
                </Link>
              </div>
              {
                alert.message && <Alert alert={alert} />
              }
              <FormModal />
              <TasksDeleteModal />
            </section>
          </section>
      }
    </>
  );
}

export default Project;