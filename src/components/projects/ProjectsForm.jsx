import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useProjects from "../../hooks/useProjects";
import Alert from "../sections/Alert";

const ProjectsForm = () => {
  const params = useParams();
  const { id } = params;
  console.log(id);

  const { alert, project, showAlert, submitProjectsForm } = useProjects();

  const [projectForm, setProjectForm] = useState({
    name: '',
    description: '',
    deadline: '',
    customer: ''
  });

  const { name, description, deadline, customer } = projectForm;

  const handleChange = (e) => {
    setProjectForm({
      ...projectForm,
      [e.target.id]: e.target.value
    });
  };

  const handleSubtmit = async (e) => {
    e.preventDefault();
    if ([name.trim(), description.trim(), deadline.trim(), customer.trim()].includes('')) {
      showAlert({
        message: 'Todos los campos son obligatorios',
        error: true
      });
    } else {
      await submitProjectsForm(projectForm);
      // setProjectForm({
      //   name: '',
      //   description: '',
      //   deadline: '',
      //   customer: ''
      // });
    }
  };

  useEffect(() => {
    if (id) {
      setProjectForm({
        ...project,
        deadline: project.deadline?.split('T')[0]
      });
    }
  }, [id])

  return (
    <>
      <form
        onSubmit={handleSubtmit}
        className="flex flex-col gap-4 bg-white border rounded-lg w-4/5 max-w-sm mx-auto p-4"
      >
        <input
          type="text"
          placeholder="Nombre"
          id="name"
          className="w-full border rounded-md p-2"
          value={name}
          onChange={handleChange}
          required />
        <textarea
          placeholder="Descripción"
          id="description"
          className="w-full border rounded-md p-2"
          value={description}
          onChange={handleChange}
          required />
        <input
          type="date"
          id="deadline"
          className="w-full border rounded-md p-2"
          value={deadline}
          onChange={handleChange}
          required />
        <input
          type="text"
          placeholder="Cliente"
          id="customer"
          className="w-full border rounded-md p-2"
          value={customer}
          onChange={handleChange}
          required />
        <input
          type="submit"
          value={`${id === undefined ? 'Crear' : 'Actualizar'}`}
          className="bg-sky-700 text-white font-bold rounded-md p-2 cursor-pointer transition-colors hover:bg-sky-800" />
      </form>
      {
        alert.message && <Alert alert={alert} />
      }
    </>
  );
}

export default ProjectsForm;