import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Style/NavBar.css";
import axios from 'axios';

const Navbar: React.FC = () => {
    const [user, setUser] = useState<any | null>(null);
    const navigate = useNavigate(); 

    useEffect(() => {
        const checkAuth = async () => {
          try {
            const response = await axios.get("http://localhost:8080/api/users/check-auth", { withCredentials: true });
            if (response.data) {
              setUser(response.data.role);
            }
          } catch (error) {
            setUser(null); 
          }
        };
        checkAuth();
      }, []);
  
    // Handle logout
    const handleLogout = async () => {
      try {
        await axios.post('http://localhost:8080/api/users/logout', {}, { withCredentials: true });
        
        navigate('/');

        window.location.reload();
      } catch (error) {
        console.error('Logout failed:', error);
      }
    };

  return (
    <nav className="navbar">
      <div className="links">
          <li><Link to="/">Home</Link></li>
          {user == "ROLE_USER" ? ( <li><Link to="/dashboard">Dashboard</Link></li>
          ): (
            <br/>
          )}

          {user == "ROLE_ADMIN" ? ( <li><Link to="/admin">Manage Library</Link></li>
          ): (
            <br/>
          )}

          {user != null ? (
            <li><button className="logout-btn" onClick={handleLogout}>Logout</button></li>
          ) : (
            <li><Link to="/login">Sign in</Link></li>
          )}
        </div>
    </nav>
  );
};

export default Navbar;
