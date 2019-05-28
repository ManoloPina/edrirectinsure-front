import React, { Component } from 'react';
import classes from './App.module.scss';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Header from './Components/Header/Header';
import { connect } from 'react-redux';
import SignUp from './Containers/SignUp/SignUp';
import Login from './Containers/Login/Login';
import { authStart } from './Store/Actions/AuthAction';
import Projects from './Containers/Projects/Projects';

class App extends Component {

  constructor(props) {
    super(props);
  }


  componentDidMount = () => {
    this.props.authStart();
  }

  render() {

    let routes = (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/sign-up" component={SignUp} />
        <Redirect to="/login" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/project" component={Projects} />
          <Redirect to="/project" />
        </Switch>
      );
    }

    return (
      <BrowserRouter>
        <Header />
        <div className={classes.MainContainer}>
          {routes}
        </div>
      </BrowserRouter>
    );
  }
}


const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null
});

const mapDispatchToProps = dispatch => ({
  authStart: () => dispatch(authStart())
});


export default connect(mapStateToProps, mapDispatchToProps)(App);