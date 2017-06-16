import React from 'react';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const style = {
  margin: 12,
};

const SignInComponent = props =>

  (<form onSubmit={props.handleSubmit}>
    <h4>Connection</h4>
    <Link to="/signup">{"Don't have an account yet ?"}</Link><br />
    <TextField
      style={style}
      name="login"
      hintText="login"
      floatingLabelText="login"
      value={props.login}
      onChange={props.handleChange}
      errorText={props.errorLogin}
      required
    /><br />
    <TextField
      style={style}
      name="password"
      type="password"
      hintText="password"
      floatingLabelText="password"
      value={props.password}
      onChange={props.handleChange}
      errorText={props.errorPassword}
      required
    /><br />
    <RaisedButton
      style={style}
      type="submit"
      label="SIGN IN"
      primary
    />
  </form>);

export default SignInComponent;
