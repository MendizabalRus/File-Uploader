// packages
import { useState } from 'react';

// style
import style from '../../style/inputs/PasswordInput.module.css';

// files
import passwordVisibleSvg from '../../assets/passwordVisible.svg';
import passwordHiddenSvg from '../../assets/passwordHidden.svg';
import tickSvg from '../../assets/tick.svg';
import crossSvg from '../../assets/cross.svg';


const PasswordInput = ({
  placeholder,
  name,
  value,
  onChange,
  required = true,
  showStrength = false,
  format = '[^A-Za-z0-9]{8,30}',
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  // const [password, setPassword] = useState(''); -> Needs to be declared at the parent component so the password can later be read by the actual form that will be sent to the backend!

  const handleVisibility = () => {
    setVisible((prev) => !prev);
  };

  // Render img src and alt depending on the current icon and change password field visibility.
  const passwordConfig = {
    src: visible ? passwordVisibleSvg : passwordHiddenSvg,
    alt: visible ? 'Password visible icon' : 'Password hidden icon',
    type: visible ? 'text' : 'password',
  };

  // Get a value from 0 to 5 that will later be used as the index of strengthConfig so the strength bar renders style according to the password.
  const calculateStrength = (password) => {
    let score = 0;

    if (password.length < 8 && password.length >= 1) return 1;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    return score;
  };

  // Password strength style and text depending on the given score.
  const strengthConfig = [
    { text: '', width: '0%', color: 'white' },
    { text: 'Very weak', width: '20%', color: 'red' },
    { text: 'Weak', width: '40%', color: 'orange' },
    { text: 'Fairly strong', width: '60%', color: 'yellow' },
    { text: 'Strong', width: '80%', color: 'lime' },
    { text: 'Very strong', width: '100%', color: 'green' },
  ];

  // Use the current password to measure it's score.
  const strength = calculateStrength(value);
  // Use that score as an index to get its text and style values from strengthConfig.
  const currStrength = strengthConfig[strength];

  // Each requirement and it's validation
  const passwordRequirements = [
    {
      text: 'Contains atleast 8 characters',
      valid: value.length > 8,
    },
    {
      text: 'Contains atleast a lowercase letter',
      valid: /[a-z]/.test(value),
    },
    {
      text: 'Contains atleast an uppercase letter',
      valid: /[A-Z]/.test(value),
    },
    {
      text: 'Contains atleast a number',
      valid: /[\d]/.test(value),
    },
    {
      text: 'Contains atleast a special character',
      valid: /[^A-Za-z0-9]/.test(value),
    },
  ];

  return (
    <>
      <div className={style.passwordCont}>
        <input
          type={passwordConfig.type}
          placeholder={placeholder}
          name={name}
          format={format}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          required={required}
        />
        <img
          src={passwordConfig.src}
          alt={passwordConfig.alt}
          onClick={handleVisibility}
          className={style.passwordVisibilitySvg}
        />
      </div>
      <div
        className={`${style.strengthAndRequirements} ${isFocused && showStrength ? style.visible : style.hidden}`}
      >
        <div className={style.passwordStrengthCont}>
          <div
            style={{
              width: currStrength.width,
              backgroundColor: currStrength.color,
            }}
            className={style.passwordStrengthBar}
          ></div>
        </div>
        <p style={{ color: currStrength.color }}>
          Password strenght: {currStrength.text}
        </p>
        <ul className={style.passwordRequirements}>
          {passwordRequirements.map((requirement) => {
            return (
              <li
                key={requirement.text}
                className={requirement.valid ? style.valid : style.invalid}
              >
                <img src={requirement.valid? tickSvg : crossSvg} alt={requirement.valid? "Tick icon" : "Cross icon"} className={`${style.requirementIcon} ${requirement.valid ? style.tickSvg : style.crossSvg}`} />{requirement.text}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
export default PasswordInput;
