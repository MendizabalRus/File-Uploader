// packages
import { useState } from 'react';

// style
import style from '../../../style/inputs/Input.module.css';

// files
import warningSvg from '../../../assets/warning.svg';

const isEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const EmailInput = ({
  label,
  name,
  placeholder,
  value,
  onChange,
  required = true,
  id,
  validate = isEmail,
}) => {
  const [touched, setTouched] = useState(false);

  const isValid = value === '' ? !required : validate(value);

  const statusClass = !touched
    ? style.neutral
    : isValid
      ? style.valid
      : style.invalid;

  return (
    <div className={style.field}>
      <input
        type="email"
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={() => setTouched(true)}
        required={required}
        className={`${style.input} ${statusClass}`}
        id={id}
      />
      {touched && !isValid && (
        <p className={style.inputErr}>
          <img
            src={warningSvg}
            alt="Warning icon"
            className={style.warningSvg}
          />
          {value === ''
            ? `${label} is required!`
            : `${label} must be a valid e-mail address!`}
        </p>
      )}
    </div>
  );
};
export default EmailInput;
