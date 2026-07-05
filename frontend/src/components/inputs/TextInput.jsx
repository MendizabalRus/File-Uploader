// packages
import { useState } from 'react';

// style
import style from '../../style/inputs/Input.module.css';

// files
import warningSvg from '../../assets/warning.svg';

const isAlpha = (text) => /^[A-Za-zÀ-ÿ\s'-]+$/.test(text);

const TextInput = ({
  label,
  name,
  placeholder,
  value,
  onChange,
  required = true,
  id,
  validate = isAlpha,
}) => {
  const [touched, setTouched] = useState(false);

  const isValid = value === '' ? !required : validate(value);

  const statusClass = !touched
    ? style.neutral
    : isValid
      ? style.valid
      : style.invalid;

  const handleChange = (e) => {
    if (!touched) setTouched(true);
    onChange(e);
  };

  return (
    <div className={style.field}>
      <input
        type="text"
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={() => setTouched(true)}
        required={required}
        className={`${style.input} ${statusClass}`}
        id={id}
      />
      {touched && !isValid && (
        <p className={style.inputErr}>
          {' '}
          <img
            src={warningSvg}
            alt="Warning Icon"
            className={style.warningSvg}
          />
          {value === ''
            ? `${label} is required!`
            : `${label} must only contain letters!`}
        </p>
      )}
    </div>
  );
};
export default TextInput;
