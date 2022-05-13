import { useEffect } from "react";
import { useParams } from "react-router-dom";
import DeveloperForm from "../components/developer/DeveloperForm";
import Loading from "../components/sections/Loading";
import useProjects from "../hooks/useProjects";

const AddDeveloper = () => {
  const { id } = useParams();
  const { loading, project, readProject, developer, addDeveloper } = useProjects();

  useEffect(() => {
    readProject(id);
  }, []);

  if (loading) {
    return (
      <Loading />
    );
  } else {
    return (
      <section className="flex flex-col gap-8" >
        <header className="flex items-center justify-between">
          <h2 className="text-4xl font-black">Agregar desarrollador al proyecto: {project.name}</h2>
        </header>
        <section className="flex flex-col gap-4">
          <DeveloperForm />
          {
            developer?._id && (
              <div className="flex flex-col gap-4 bg-white border rounded-lg w-4/5 max-w-sm mx-auto p-4">
                <h3 className="text-xl font-bold text-center ">Resultado</h3>
                <div className="flex items-center justify-between">
                  <h4>{developer.name}</h4>
                  <button
                    onClick={() => addDeveloper({
                      email: developer.email
                    })}
                    className="bg-slate-600 rounded-md text-white text-sm font-bold uppercase p-2 transition-colors hover:bg-slate-700"
                  >Agregar</button>
                </div>
              </div>
            )
          }
        </section>
      </section >
    );
  }
}

export default AddDeveloper;