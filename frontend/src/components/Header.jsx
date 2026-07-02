// react & packages
import { useNavigate } from 'react-router';

// style
import style from '../style/Header.module.css';

// files
import { useAuth } from './AuthContext';

const Header = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogOut = async () => {
    await logout();

    navigate('/log-in');
  };

  return (
    <header>
      <button onClick={handleLogOut}>Log Out</button>
    </header>
  );
};
export default Header;
