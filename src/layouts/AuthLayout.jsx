import { Outlet } from "react-router-dom";
import Loader from "../components/sections/Loader";
import useAuth from "../hooks/useAuth";

const AuthLayout  = () => {
  const { loading } = useAuth();
  return (
    <>
      {loading && <Loader />}
      <main className="flex flex-col justify-center min-h-screen">
        <Outlet />
      </main>
    </>
  );
}

export default AuthLayout;