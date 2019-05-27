import React from 'react';
import classes from './Header.module.scss';
import { Link } from 'react-router-dom';

const Header = (props) => {
  return (
    <div className={classes.Header}>
      <ul>
        <li>
          <Link to='/'>Username</Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
