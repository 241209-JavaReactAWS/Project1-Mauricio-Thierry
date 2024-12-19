import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Style/HomePage.css"

const HomePage: React.FC = () => {
  const [user, setUser] = useState<any | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/users/check-auth", { withCredentials: true });
        if (response.data) {
          setUser(response.data); // Store the user in state if authenticated
        }
      }catch(error) {
        setUser(null); // User is not authenticated
      }
    };

    checkAuth();
  }, []);


  const handleSignIn = () => {
    navigate("/login"); 
  };

  const handleSignUp = () => {
    navigate("/signup"); 
  };


  return (
    <div>
      <h1>Welcome to the Library</h1>
      {user ? (
        <div>
          <h2>Welcome back, {user.username}!</h2>
          {user.role === "ROLE_USER" ? (
            <button onClick={() => navigate("/dashboard")}>Go to your Dashboard</button>
          ) : user.role === "ROLE_ADMIN" ? (
            <button onClick={() => navigate("/admin")}>Go to Admin Dashboard</button>
          ) : null}
        </div>
      ) : (
        <div>
          <h2>Sign in or create an account to continue</h2>
          <button onClick={handleSignIn}>Sign In</button>
          <button onClick={handleSignUp}>Create Account</button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
