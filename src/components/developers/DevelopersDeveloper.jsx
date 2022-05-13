const DevelopersDeveloper = ({ developer }) => {
  const { name, email } = developer;
  return (
    <div className="flex items-center justify-between border-b p-4">
      <div className="flex flex-col gap-1">
        <h3 className="text-xl">{name}</h3>
        <h5 className="text-gray-500">{email}</h5>
      </div>
      <div className="flex flex-col gap-2 md:flex-row">
        <button
          // onClick={() => handleTaskDeleteModal(task)}
          className="bg-red-600 rounded-md text-white text-sm font-bold uppercase p-2 transition-colors hover:bg-red-700"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default DevelopersDeveloper;