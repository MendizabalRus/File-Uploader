// react & packages
import { useState } from 'react';
import { Link } from 'react-router';

// style
import style from '../style/Register.module.css';

// files
import PasswordInput from "./PasswordInput.jsx";

const Register = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegistration = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const data = Object.fromEntries(formData);

    const response = await fetch('http://localhost:8080/api/register', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    console.log(result);
  };

  return (
    <div className={style.register}>
      <div className={style.registerLeft}>
        <h1>Register</h1>
        <form onSubmit={handleRegistration} className={style.registerForm}>
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
              type="email"
              name="email"
              placeholder="example@email.com"
              required
            />
          </label>
          <PasswordInput name="password" placholder="Password" value={password} onChange={setPassword} showStrength />
          <PasswordInput name="confirmPassword" placeholder="Confirm password" value={confirmPassword} onChange={setConfirmPassword} />
          <button type="submit">Register</button>
        </form>
        <p>
          Already have an account? <Link to={'/log-in'}>Log in</Link> now!
        </p>
      </div>
      <img src="null" alt="Register image" />
    </div>
  );
};
export default Register;
