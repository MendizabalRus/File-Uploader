import style from '../../../style/Button.module.css';

const Button = ({ value, type = '', onClick}) => {
  return (
    <button type={type} onClick={onClick} className={style.Button}>
      {value}
    </button>
  );
};
export default Button;
