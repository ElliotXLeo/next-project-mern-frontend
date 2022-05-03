import ProjectsForm from "../components/projects/ProjectsForm";

const CreateProject = () => {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-4xl font-black">Crear proyecto</h2>
      <ProjectsForm />
    </section>
  );
}

export default CreateProject;