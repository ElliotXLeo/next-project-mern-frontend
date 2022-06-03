import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/sections/Header";
import Loading from "../components/sections/Loading";
import Sidebar from "../components/sections/Sidebar";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = () => {
  const { loading, auth } = useAuth();

  if (loading) {
    return (
      <Loading />
    );
  } else if (auth._id) {
    return (
      <>
        <Header />
        <section className="p-4 md:py-8">
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