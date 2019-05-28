import React from 'react';
import classes from './Button.module.scss';

const Button = (props) => {
  return (
    <button {...props}>
      {props.children}
    </button>
  );
}

export default Button;