// react & packages
import { Link } from 'react-router';

// style
import style from '../style/LogIn.module.css';

// files

const LogIn = () => {
  const handleLogIn = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const data = Object.fromEntries(formData);

    const response = await fetch('http://localhost:8080/api/log-in', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    console.log(response.status)
    const text = await response.text();
    console.log(text)
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
