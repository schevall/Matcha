import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const style = {
  margin: 12,
};

const SignUpComponent = props => (
  <form onSubmit={props.handleSubmit}>
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
      name="firstname"
      hintText="First Name"
      floatingLabelText="First Name"
      value={props.firstname}
      onChange={props.handleChange}
      errorText={props.errorFirstname}
      required
    />
    <TextField
      style={style}
      name="lastname"
      hintText="Last Name"
      floatingLabelText="Last Name"
      value={props.lastname}
      onChange={props.handleChange}
      errorText={props.errorLastname}
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
      value={props.genderValue}
      onChange={props.handleGenderChange}
      required
    >
      <MenuItem value={1} primaryText="male" />
      <MenuItem value={2} primaryText="female" />
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
      required
    />
    <RaisedButton
      style={style}
      type="submit"
      label="SIGN UP"
      primary
    />
  </form>
);

export default SignUpComponent;
