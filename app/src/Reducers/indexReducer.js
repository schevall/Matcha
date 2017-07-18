import { combineReducers } from 'redux';
import { reducer as notifications } from 'react-notification-system-redux';
import loginReducer from './loginReducer.js';
import signinErrorReducer from './signinErrorReducer.js';


const rootReducer = combineReducers({
  loginReducer,
  signinErrorReducer,
  notifications,
});

export default rootReducer;
