// react & packages
import { useState } from 'react';
import { Link } from 'react-router';

// style
import style from '../style/Register.module.css';

// files
import PasswordInput from './PasswordInput.jsx';
import warningSvg from "../assets/warning.svg"

const Register = () => {
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);

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

    // if there are errors save them in the errors state
    if (!response.ok) {
      setErrors(result.errors);
      return;
    }
  };

  // potential backend errors
  const firstnameErrs = errors.find((err) => err.path === 'firstname');
  const lastnameErrs = errors.find((err) => err.path === 'lastname');
  const emailErrs = errors.find((err) => err.path === 'email');
  const passwordErrs = errors.find((err) => err.path === 'password');
  const confirmPasswordErrs = errors.find((err) => err.path === "confirmPassword")

  // instant feedback
  const isAlpha = (text) => /^[A-Za-zÀ-ÿ\s'-]+$/.test(text);

  const firstnameValid = firstname === "" || isAlpha(firstname);
  const lastnameValid = lastname === "" || isAlpha(lastname);

  return (
    <div className={style.register}>
      <div className={style.registerLeft}>
        <h1>Register</h1>
        <form onSubmit={handleRegistration} className={style.registerForm}>
          <label>
            <input
              type="text"
              name="firstname"
              /*pattern="[A-Za-z]"*/
              placeholder="First Name"
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
          </label>
          {/* INSTANT TARGET VALUE FEEDBACK */}
          {!firstnameValid && <p>Firstname must only contain letters!</p>}
          {/* POST-SUBMIT SERVER-SIDE VALIDATION ERRORS */}
          {firstnameErrs && <p className={style.serverErr}><img src={warningSvg} alt="Warning icon" className={style.warningSvg}/>{firstnameErrs.msg}</p>}
          <label>
            <input
              type="text"
              name="lastname"
              /*pattern="[A-Za-z]"*/
              placeholder="Last Name"
              onChange={(e) => setLastname(e.target.value)}
              required
            />
          </label>
          {/* INSTANT TARGET VALUE FEEDBACK */}
          {!lastnameValid && <p>Lastname must only contain letters!</p>}
          {/* POST-SUBMIT SERVER-SIDE VALIDATION ERRORS */}
          {lastnameErrs && <p className={style.serverErr}><img src={warningSvg} alt="Warning icon" className={style.warningSvg}/>{lastnameErrs.msg}</p>}
          <label>
            <input
              type="email"
              name="email"
              placeholder="example@email.com"
              required
            />
          </label>
          {/* POST-SUBMIT SERVER-SIDE VALIDATION ERRORS */}
          {emailErrs && <p className={style.serverErr}><img src={warningSvg} alt="Warning icon" className={style.warningSvg}/>{emailErrs.msg}</p>}
          <PasswordInput
            name="password"
            placeholder="Password"
            value={password}
            onChange={setPassword}
            showStrength
          />
          {/* POST-SUBMIT SERVER-SIDE VALIDATION ERRORS */}
          {passwordErrs && <p className={style.serverErr}><img src={warningSvg} alt="Warning icon" className={style.warningSvg}/>{passwordErrs.msg}</p>}
          <PasswordInput
            name="confirmPassword"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={setConfirmPassword}
          />
          {confirmPasswordErrs && <p className={style.serverErr}><img src={warningSvg} alt="Warning icon" className={style.warningSvg}/>{confirmPasswordErrs.msg}</p>}
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
