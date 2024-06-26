import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const useAuthNavigation = () => {
  const navigate = useNavigate();
  const { authenticated, setAuthenticated } = useAuth();

  useEffect(() => {
    if (authenticated) {
      navigate("/dashboard");
    }
  }, [authenticated, navigate]);

  return { authenticated, setAuthenticated };
};

export default useAuthNavigation;
