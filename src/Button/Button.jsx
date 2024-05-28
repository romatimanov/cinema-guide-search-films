import classes from './button.module.css';

export function Button({ text, onClick = () => {} }) {
  return (
    <button className={classes.btn} onClick={onClick}>
      {text}
    </button>
  );
}
