import { useEffect } from "react";
import { useParams } from "react-router-dom";
import DeveloperForm from "../components/developer/DeveloperForm";
import Loading from "../components/sections/Loading";
import useProjects from "../hooks/useProjects";

const AddDeveloper = () => {
  const { id } = useParams();
  const { loading, project, readProject } = useProjects();

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
        </section>
      </section >
    );
  }
}

export default AddDeveloper;