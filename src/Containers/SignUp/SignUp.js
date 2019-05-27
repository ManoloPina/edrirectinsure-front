import React, { Component } from 'react';
import Content from '../../Components/Content/Content';
import Auxiliary from '../../Hoc/Auxiliary/Auxiliary';
import Title from '../../Components/Title/Title';
import * as Constants from '../../Constants';
import Input from '../../Components/Input/Input';
import classes from './SignUp.module.scss';
import Button from '../../Components/Button/Button';

class SignUp extends Component {
  
  render() {
    return (
      <Auxiliary>
        <Title type={Constants.TITLE_TYPES.MAIN}>Sign Up</Title>
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
            <div className={classes.Row}>
              <div className={classes.Col}>
                <Button onClick={this.handleSignUpBtn}>Sign-Up</Button>
              </div>
              <div className={classes.Col}>
                <Button onClick={this.navigateToLogin}>Or acccess with your account</Button>
              </div>
            </div>
          </form>
        </Content>
      </Auxiliary>
    );
  }

  navigateToLogin = () => {
    this.props.history.push('/login');
  }


}

export default SignUp;