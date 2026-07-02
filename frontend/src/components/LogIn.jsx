// react & packages
import { Link, useNavigate } from 'react-router';

// style
import style from '../style/LogIn.module.css';

// files
import { useAuth } from "./AuthContext"

const LogIn = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogIn = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const data = Object.fromEntries(formData);

    try {
      await login(data);
      navigate("/")
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
          <label>
            <input
              type="password"
              name="password"
              placeholder="password"
              required
            />
          </label>
          <button type="submit">LOG IN</button>
        </form>
        <p>
          Do not have an account yet? <Link to={'/register'}>Register</Link>{' '}
          now!
        </p>
      </div>
      <img src="" alt="Log in page image" />
    </div>
  );
};
export default LogIn;
