import React, { Component } from 'react';
import Content from '../../Components/Content/Content';
import Auxiliary from '../../Hoc/Auxiliary/Auxiliary';
import Title from '../../Components/Title/Title';
import * as Constants from '../../Constants';
import Input from '../../Components/Input/Input';
import classes from './SignUp.module.scss';
import Button from '../../Components/Button/Button';
import validator from 'validator';
import axios from 'axios';
import {connect} from 'react-redux';
import { authSuccess } from '../../Store/Actions/AuthAction';

class SignUp extends Component {

  state = {
    name: null,
    nameError: null,
    email: null,
    emailError: null,
    password: null,
    passwordError: null
  }

  render() {
    return (
      <Auxiliary>
        <Title type={Constants.TITLE_TYPES.MAIN}>Sign Up</Title>
        <Content>
          <form>
            <div className={classes.Row}>
              <label>Name:</label>
              <Input name="name"
                placeholder="Name"
                onChange={this.handleChagne} />
            </div>
            <div className={classes.Row}>
              <label>Email:</label>
              <Input
                name="email"
                onChange={this.handleChagne}
                placeholder="E-mail" />
            </div>
            <div className={classes.Row}>
              <label>Password:</label>
              <Input name="password"
                onChange={this.handleChagne}
                type="password"
                placeholder="Password" />
            </div>
            <div className={classes.Row}>
              <div className={classes.Col}>
                <Button onClick={this.handleSignUp}
                  disabled={this.isInvalid()}>Sign-Up</Button>
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

  handleSignUp = (event) => {

    event.preventDefault();

    const { name, email, password } = this.state;


    axios.post(`${Constants.API}/signup`, {name, email, password})
      .then(res => {
        console.log('res:', res);
        const { token } = res.data;
        const { id, name } = res.data.user;
        this.props.authSuccess(token, id, res.data.user.email, name);
      })
      .catch(error => console.error('Error on login:', error));

  }

  navigateToLogin = () => {
    this.props.history.push('/login');
  }

  handleChagne = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value }, () => this.validate(name));
  }

  validate = (fieldName) => {

    let errors = {
      nameError: '',
      emailError: '',
      passwordError: ''
    };

    const { name, email, password } = this.state;

    if (fieldName === 'name' && (!name || validator.isEmpty(name))) {
      errors.nameError = 'This field is required';
    }


    if (fieldName === 'email' && (validator.isEmpty(email) || !validator.isEmail(email))) {
      errors.emailError = 'This field is required';
    }

    if (fieldName === 'password' && password.length < 5) {
      errors.passwordError = 'This fied is required and must be greater than 5';
    }

    this.setState(errors);

  }

  isInvalid = () => {

    const { email, password, name } = this.state;

    if (!name || (name && validator.isEmpty(name))) {
      return true;
    }

    if (!email || (email && !validator.isEmail(email))) {
      return true;
    }

    if (!password || (password && password.length < 5)) {
      return true;
    }

    return false;
  }


}

const mapDispatchToProps = dispatch => ({
  authSuccess: (token, id, email, name) => dispatch(authSuccess(token, id, email, name))
});

export default connect(null, mapDispatchToProps)(SignUp);