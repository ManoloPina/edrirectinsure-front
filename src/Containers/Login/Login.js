import React, { Component } from 'react';
import Content from '../../Components/Content/Content';
import Title from '../../Components/Title/Title';
import * as Constants from '../../Constants';
import Input from '../../Components/Input/Input';
import classes from './Login.module.scss';
import Button from '../../Components/Button/Button';

class Login extends Component {
  
  render() {
    return (
      <div className={classes.Login}>
        <Title type={Constants.TITLE_TYPES.MAIN}>Login</Title>
        <Content>
          <form>
            <div className={classes.Row}>
              <label>Email:</label>
              <Input name="email" placeholder="E-mail"/>
            </div>
            <div className={classes.Row}>
              <label>Password:</label>
              <Input name="password" type="password" placeholder="Password"/>
            </div>
            <div className={`${classes.Row} ${classes.Buttons}`}>
              <div className={classes.Col}>
                <Button>Login</Button>
              </div>
              <div className={classes.Col}>
                <Button onClick={this.navigateToSignUp}>Sign-Up</Button>
              </div>
            </div>
          </form>
        </Content>
      </div>
    );
  }

  navigateToSignUp = () => {
    this.props.history.push('/sign-up');
  }
}

export default Login;