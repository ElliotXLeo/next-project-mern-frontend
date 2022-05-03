import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/sections/Header";
import Sidebar from "../components/sections/Sidebar";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = () => {
  const { loading, auth } = useAuth();

  if (loading) {
    return (
      <div className="loading">
        <div className="loading__wave"></div>
        <div className="loading__wave"></div>
        <div className="loading__wave"></div>
        <div className="loading__wave"></div>
        <div className="loading__wave"></div>
        <div className="loading__wave"></div>
        <div className="loading__wave"></div>
        <div className="loading__wave"></div>
        <div className="loading__wave"></div>
        <div className="loading__wave"></div>
      </div>
    );
  } else if (auth._id) {
    return (
      <>
        <Header />
        <section className="md:flex md:min-h-screen">
          <Sidebar />
          <main className="flex-1 p-10">
            <Outlet />
          </main>
        </section>
      </>
    );
  } else {
    return (
      <Navigate to="/" />
    );
  }
}

export default ProtectedRoute;