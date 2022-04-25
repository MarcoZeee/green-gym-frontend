import classes from "./Button.module.css";

const Button = ({ children, type, disabled }) => {
  return (
    <button className={classes.button} type={type} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
