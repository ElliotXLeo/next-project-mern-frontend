import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/sections/Loading";
import useProjects from "../hooks/useProjects";

const Project = () => {
  const params = useParams();
  const { id } = params;

  const { loading, readProject, project } = useProjects();
  const { name, description } = project;

  useEffect(() => {
    readProject(id);
  }, []);

  return (
    <>
      {
        loading ?
          <Loading />
          :
          <section className="flex flex-col gap-4">
            <h2 className="text-4xl font-black">{name}</h2>
            <p className="text-2xl font-black">{description}</p>
          </section>
      }
    </>
  );
}

export default Project;