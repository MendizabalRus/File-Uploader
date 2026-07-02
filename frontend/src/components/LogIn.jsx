// react & packages
import { Link } from 'react-router';

// style
import style from '../style/LogIn.module.css';

// files


const LogIn = () => {
  return (
    <div className={style.logIn}>
      <div className={style.logInLeft}>
        <h1>Log In</h1>
        <form action="" method="POST" className={style.logInForm}>
          <label>
            <input
              type="text"
              name="username"
              placeholder="username"
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
