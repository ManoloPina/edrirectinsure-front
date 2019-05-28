import React, { Component } from 'react';
import Content from '../../Components/Content/Content';
import Title from '../../Components/Title/Title';
import * as Constants from '../../Constants';
import Input from '../../Components/Input/Input';
import classes from './Login.module.scss';
import Button from '../../Components/Button/Button';
import validator from 'validator';
import axios from 'axios';
import { connect } from 'react-redux';
import { authSuccess } from '../../Store/Actions/AuthAction';

class Login extends Component {

  state = {
    email: null,
    emailError: null,
    password: null,
    passwordError: null
  }

  render() {
    return (
      <div className={classes.Login}>
        <Title type={Constants.TITLE_TYPES.MAIN}>Login</Title>
        <Content>
          <form>
            <div className={classes.Row}>
              <label>Email:</label>
              <Input name="email" 
                placeholder="E-mail" 
                onChange={this.handleChagne} />
            </div>
            <div className={classes.Row}>
              <label>Password:</label>
              <Input name="password" 
                type="password" 
                placeholder="Password" 
                onChange={this.handleChagne} />
            </div>
            <div className={`${classes.Row} ${classes.Buttons}`}>
              <div className={classes.Col}>
                <Button onClick={this.handleLogin}
                  disabled={this.isInvalid()}>Login</Button>
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

  handleLogin = (event) => {
    
    event.preventDefault();

    const { email, password } = this.state;

    axios.post(`${Constants.API}/login`, {email, password})
      .then(res => {  
        const { token } = res.data;
        const { id, name} = res.data.user;
        this.props.authSuccess(token, id, res.data.user.email, name);
      })
      .catch(error => console.error('Error on login:', error));

  }

  handleChagne = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]: value}, () => this.validate(name));
  }

  validate = (fieldName) => {

    let errors = {
      nameError: '',
      passwordError: ''
    };

    const { email, password } = this.state;

    if (fieldName === 'email' && ( validator.isEmpty(email) || !validator.isEmail(email)) ) {
      errors.emailError = 'This field is required';
    }

    if (fieldName === 'password'
      && (password || password.length < 6)) {
      errors.passwordError = 'This fied is required and must be greater than 5';
    }

    this.setState(errors);

  }

  isInvalid = () => {

    const { email, password} = this.state;

    if (!email || (email && !validator.isEmail(email))) {
      return true;
    }

    if (!password || (password && password.length < 6)) {
      return true;
    }

    return false;
  }

}

// const mapStateToProps = state => ({
// });

const mapDispatchToProps = dispatch => ({
  authSuccess: (token, id, email, name) => dispatch(authSuccess(token, id, email, name))
});

export default connect(null, mapDispatchToProps)(Login);