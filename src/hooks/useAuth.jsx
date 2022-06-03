import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const useAuth = () => {
  const context = useContext(AuthContext);
  return (context);
}

export default useAuth;