// react & packages


// style
import style from '../style/Header.module.css';

// files

const Header = () => {
  const handleLogOut = async () => {
    const response = fetch('http://localhost:8080/api/log-out', {
      method: 'POST',
      credentials: 'include',
    });

    const data = await response.json();

    console.log(data);
  };

  return (
    <header>
      <button onClick={handleLogOut}>Log Out</button>
    </header>
  );
};
export default Header;
