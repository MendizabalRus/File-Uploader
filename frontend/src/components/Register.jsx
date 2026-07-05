// react & packages
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { Link } from 'react-router';

// style
import style from '../style/Register.module.css';

// files
import TextInput from './inputs/TextInput.jsx';
import EmailInput from './inputs/EmailInput.jsx';
import PasswordInput from './inputs/PasswordInput.jsx';
import warningSvg from '../assets/warning.svg';

const Register = () => {
  const navigate = useNavigate();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
      console.log(result)
      setErrors(result.errors);
      return;
    }

    navigate("/");
  };

  // server-side existing email error
  const exisitingEmailErr = errors.find(
    (error) =>
      error.msg === 'An account with this e-mail address already exists!',
  );

  // instant feedback to know if passwords match
  const passwordsMatch = password === confirmPassword || confirmPassword === '';

  return (
    <div className={style.register}>
      <div className={style.registerLeft}>
        <h1>Register</h1>
        <form onSubmit={handleRegistration} className={style.registerForm}>
          <TextInput 
            label="First name"
            name="firstname"
            placeholder="Mikel"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
          <TextInput
            label="Last name"
            name="lastname"
            placeholder="Oyarzabal"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
          <EmailInput 
            label="E-mail address"
            name="email"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* SERVER SIDE FEEDBACK */}
          {exisitingEmailErr && (
            <p className={style.inputErr}>
              <img
                src={warningSvg}
                alt="Warning icon"
                className={style.warningSvg}
              />
              {exisitingEmailErr.msg}
            </p>
          )}
          <PasswordInput
            name="password"
            placeholder="Password"
            value={password}
            onChange={setPassword}
            showStrength
          />
          <PasswordInput
            name="confirmPassword"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            mismatchErr={!passwordsMatch ? "Passwords do not match!" : null}
          />
          {!passwordsMatch && (
            <p className={style.inputErr}>
              <img
                src={warningSvg}
                alt="Warning icon"
                className={style.warningSvg}
              />
              Passwords do not match!
            </p>
          )}
          <button type="submit" className={style.submit} >Register</button>
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
