// react & packages
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';

// style
import style from '../style/LogIn.module.css';

// files
import { useAuth } from './AuthContext';
import PasswordInput from './PasswordInput.jsx';

const LogIn = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { login } = useAuth();

  const handleLogIn = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const data = Object.fromEntries(formData);

    try {
      await login(data);
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={style.logIn}>
      <div className={style.logInLeft}>
        <h1>Log In</h1>
        <form onSubmit={handleLogIn} className={style.logInForm}>
          <label>
            <input
              type="email"
              name="email"
              placeholder="example@email.com"
              required
            />
          </label>
          <PasswordInput name="password" placeholder="Password" value={password} onChange={setPassword} />
          <button type="submit">LOG IN</button>
        </form>
        <p>
          Do not have an account yet? <Link to={'/register'}>Register</Link>{' '}
          now!
        </p>
      </div>
      <img src="null" alt="Log in page image" />
    </div>
  );
};
export default LogIn;
