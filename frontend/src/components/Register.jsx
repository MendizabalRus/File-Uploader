// react & packages
import { Link } from 'react-router';

// style
import style from '../style/Register.module.css';

// files

const Register = () => {
  return (
    <div className={style.register}>
      <div className={style.registerLeft}>
        <h1>Register</h1>
        <form action="" method="POST" className={style.registerForm}>
          <label>
            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              required
            />
          </label>
          <label>
            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              required
            />
          </label>
          <label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
            />
          </label>
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
              placeholder="Password"
              minLength={8}
              maxLength={30}
              required
            />
          </label>
          <label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              minLength={8}
              maxLength={30}
              required
            />
          </label>
          <button type="submit">Register</button>
        </form>
        <p>
          Already have an account? <Link to={'/log-in'}>Log in</Link> now!
        </p>
      </div>
      <img src="" alt="Register image" />
    </div>
  );
};
export default Register;
