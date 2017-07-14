import React from 'react';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const style = {
  margin: 12,
};

const SignUpComponent = props =>

  (<div className="signup_container">
    <form onSubmit={props.handleSubmit}>
      <h4 style={style} >Welcome to Matcha</h4><br />
      <Link style={style} to="/signin">{'To Signin'}</Link><br />
      <TextField
        style={style}
        name="username"
        hintText="Username"
        floatingLabelText="Username"
        value={props.username}
        onChange={props.handleChange}
        errorText={props.errorUsername}
        required
      />
      <TextField
        style={style}
        name="email"
        hintText="Email"
        floatingLabelText="Email"
        value={props.email}
        onChange={props.handleChange}
        errorText={props.errorEmail}
        required
      /> <br />
      <TextField
        style={style}
        name="password"
        type="password"
        hintText="Password"
        floatingLabelText="Password"
        value={props.password}
        onChange={props.handleChange}
        errorText={props.errorPassword}
        required
      />
      <TextField
        style={style}
        name="password2"
        type="password"
        hintText="Retype your password"
        floatingLabelText="Retype your password"
        value={props.password2}
        onChange={props.handleChange}
        errorText={props.errorPassword2}
        required
      /><br />
      <SelectField
        style={style}
        name="gender"
        floatingLabelText="Gender"
        value={props.gender}
        onChange={props.handleGenderChange}
      >
        <MenuItem value={1} primaryText="Male" />
        <MenuItem value={2} primaryText="Female" />
        <MenuItem value={3} primaryText="Transgender" />
      </SelectField>
      <br />
      <br />
      <DatePicker
        style={style}
        name="birthDate"
        hintText="Birth Date"
        locale="en-US"
        firstDayOfWeek={0}
        value={props.birthDate}
        onChange={props.handleDateChange}
        errorText={props.errorBirthDate}
      />

      <RaisedButton
        style={style}
        type="submit"
        label="SIGN UP"
        primary
      />
    </form>
  </div>);

export default SignUpComponent;
