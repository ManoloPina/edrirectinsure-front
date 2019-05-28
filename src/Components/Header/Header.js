import React from 'react';
import classes from './Header.module.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../Store/Actions/AuthAction';

const Header = (props) => {


  const MenuAuth = () => {
    return (
      <ul>
        <li><a onClick={props.logout}>Logout</a></li>
      </ul>
    )
  }


  return (
    <div className={classes.Header}>
      <div className={classes.Menu}>
        <ul>
          <li>
            <Link to='/'>{props.auth.name ? props.auth.name : 'EDirectInsure To Do List'}</Link>
          </li>
        </ul>
        {props.auth.token ? <MenuAuth /> : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
