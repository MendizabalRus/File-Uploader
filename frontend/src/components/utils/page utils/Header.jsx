// react & packages
import { useState } from 'react';
import { useNavigate } from 'react-router';

// style
import style from '../../../style/Header.module.css';

// files
import { useAuth } from '../../AuthContext';

import profilePic from "../../../assets/profilePic.svg"

const Header = () => {
  const [dropdown, setDropdown] = useState(false)
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogOut = async () => {
    await logout();

    navigate('/log-in');
  };

  return (
    <header className={style.header}>
      <h1>The Archive</h1>
      <div className={style.profile} onClick={() => setDropdown((prev) => !prev)}>
        <h3 className={style.profileName}>Full name</h3>
        <img src={profilePic} alt="User's profile picture" className={style.profilePic}/>
        {dropdown && (
          <div className={style.dropdown}>

          </div>
        )}
      </div>
    </header>
  );
};
export default Header;

{/*<button onClick={handleLogOut}>Log Out</button>*/}