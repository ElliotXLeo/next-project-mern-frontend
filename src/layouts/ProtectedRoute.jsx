import { Navigate, Outlet } from "react-router-dom";
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
      <main className="flex flex-col justify-center min-h-screen">
        <Outlet />
      </main>
    );
  } else {
    return (
      <Navigate to="/" />
    );
  }
}

export default ProtectedRoute;