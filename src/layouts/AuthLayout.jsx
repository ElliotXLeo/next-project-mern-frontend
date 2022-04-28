import { Outlet } from "react-router-dom";

const AuthLayout  = () => {
  return (
    <main className="flex flex-col justify-center min-h-screen">
      <Outlet />
    </main>
  );
}

export default AuthLayout;