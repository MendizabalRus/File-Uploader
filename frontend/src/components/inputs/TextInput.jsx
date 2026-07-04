// packages
import { useState } from 'react';

// style
import style from '../../style/inputs/TextInput.module.css';

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

  const isValid = value === '' || validate(value);

  // clase según el estado: sin tocar -> neutro, tocado -> válido/inválido
  const statusClass = !touched
    ? style.neutral
    : isValid
      ? style.valid
      : style.invalid;

  return (
    <div className={style.field} >
      <input
        type="text"
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
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
          {label} must only contain letters!
        </p>
      )}
    </div>
  );
};
export default TextInput;
