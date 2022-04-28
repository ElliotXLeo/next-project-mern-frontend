import { Outlet } from "react-router-dom";

const AuthLayoutt = () => {
  return (
    <section className="py-8 md:py-16">
      <div className="container w-4/5 max-w-lg mx-auto bg-red-100">
        <h1>AuthLayoutt</h1>
        <Outlet />
      </div>
    </section>
  );
}

export default AuthLayoutt;