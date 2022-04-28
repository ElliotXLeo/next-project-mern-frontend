const NewPassword = () => {
  return (
    <section className="py-8 md:py-16">
      <div className="flex flex-col gap-8 container mx-auto px-8 md:px-3">
        <h1 className="text-sky-600 text-4xl font-black text-center">
          Reestablece tu password y no pierdas tus <span className="text-slate-700">proyectos</span>
        </h1>
        <form action="" className="flex flex-col gap-4 bg-white border rounded-lg w-4/5 max-w-sm mx-auto p-4">
          <input
            type="password"
            id="newPassword"
            placeholder="Nuevo password"
            className="w-full border rounded-md p-2"
            required />
          <input
            type="password"
            id="repeatedPassword"
            placeholder="Repetir password"
            className="w-full border rounded-md p-2"
            required />
          <input
            type="submit"
            value="Reestablecer"
            className="bg-sky-700 text-white font-bold rounded-md p-2 cursor-pointer transition-colors hover:bg-sky-800" />
        </form>
      </div>
    </section>
  );
}

export default NewPassword;