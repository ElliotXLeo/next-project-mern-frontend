import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProjectsForm from "../components/projects/ProjectsForm";
import Loading from "../components/sections/Loading";
import useProjects from "../hooks/useProjects";

const UpdateProject = () => {
  const params = useParams();
  const { id } = params;

  const { loading, readProject } = useProjects();

  useEffect(() => {
    readProject(id);
  }, []);

  if (loading) {
    return (
      <Loading />
    );
  } else {
    return (
      <section className="flex flex-col gap-4">
        <h2 className="text-4xl font-black text-center">Actualizar proyecto</h2>
        <ProjectsForm />
      </section>
    );
  }
}

export default UpdateProject;