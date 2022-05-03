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
        <section className="py-8">
          <div className="flex flex-col md:flex-row gap-8 container mx-auto">
            <Sidebar />
            <main className="flex-1">
              <Outlet />
            </main>
          </div>
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