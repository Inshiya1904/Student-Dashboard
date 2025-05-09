import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="Header">
      <Link to="/"><h1>Student Dashboard</h1></Link>
      <nav className="header-container">
        {user && (
          <>
            <Link to="/add-student" className="add-stud"><h3>Add Student</h3></Link>
            <button onClick={logout} className="logout-btn">Logout</button>
          </>
        )}
        {!user && (
          <Link to="/login"><button  className="login-btn">Login</button></Link>
        )}
      </nav>
    </header>
  );
};

export default Header;