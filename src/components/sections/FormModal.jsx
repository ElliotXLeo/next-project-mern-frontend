import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import useProjects from '../../hooks/useProjects'
import Alert from './Alert';
import { useParams } from 'react-router-dom';


const FormModal = () => {

  const PRIORITY = ['Baja', 'Media', 'Alta'];

  const params = useParams();

  const { alert, showAlert, FormModalTask, submitTasksForm, handleFormModalTask } = useProjects();

  const [taskForm, setTaskForm] = useState({
    name: '',
    description: '',
    deadline: '',
    priority: ''
  });
  const { name, description, deadline, priority } = taskForm;

  const handleChange = (e) => {
    setTaskForm({
      ...taskForm,
      [e.target.id]: e.target.value
    });
  };

  const handleSubtmit = async (e) => {
    e.preventDefault();
    if ([name.trim(), description.trim(), deadline.trim(), priority.trim()].includes('')) {
      showAlert({
        message: 'Todos los campos son obligatorios',
        error: true
      });
    } else {
      await submitTasksForm({ ...taskForm, project: params.id });
      setTaskForm({
        name: '',
        description: '',
        deadline: '',
        priority: ''
      });
    }
  };

  return (
    <Transition.Root show={FormModalTask} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={handleFormModalTask}>
        <div className="flex items-center justify-center min-h-screen p-4 px-4 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">


              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={handleFormModalTask}
                >
                  <span className="sr-only">Cerrar</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>


              <div className="sm:flex sm:items-start">
                <div className="flex flex-col gap-4 mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <Dialog.Title as="h2" className="text-lg leading-6 font-bold text-gray-900">
                    Crear tarea
                  </Dialog.Title>
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
                    <select
                      type="text"
                      placeholder="Prioridad"
                      id="priority"
                      className="w-full border p-2"
                      value={priority}
                      onChange={handleChange}
                      required
                    >
                      <option
                        value=""
                      >
                        -- Seleccionar --
                      </option>
                      {PRIORITY.map((element) => {
                        return (
                          <option
                            key={element}
                            value={element}
                          >
                            {element}
                          </option>
                        );
                      })}
                    </select>
                    <input
                      type="submit"
                      value="Crear"
                      className="bg-sky-700 rounded-md text-white font-bold p-2 cursor-pointer transition-colors hover:bg-sky-800" />
                  </form>
                  {
                    alert.message && <Alert alert={alert} />
                  }
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default FormModal