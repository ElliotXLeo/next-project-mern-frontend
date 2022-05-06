import { useState } from "react";
import useProjects from "../../hooks/useProjects";
import Alert from "../sections/Alert";

const DeveloperForm = () => {

  const { alert, showAlert, submitDeveloperForm } = useProjects();
  const [email, setEmail] = useState('');

  const handleSubtmit = (e) => {
    e.preventDefault();
    if (email === '') {
      showAlert({
        message: 'Todos los campos son obligatorios',
        error: true
      });
    } else {
      submitDeveloperForm(email);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubtmit}
        className="flex flex-col gap-4 bg-white border rounded-lg w-4/5 max-w-sm mx-auto p-4"
      >
        <input
          type="email"
          id="email"
          placeholder="Email"
          className="w-full border rounded-md p-2"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="submit"
          value="Buscar"
          className="bg-sky-700 rounded-md text-white font-bold p-2 cursor-pointer transition-colors hover:bg-sky-800" />
      </form>
      {
        alert.message && <Alert alert={alert} />
      }
    </>
  );
}

export default DeveloperForm;