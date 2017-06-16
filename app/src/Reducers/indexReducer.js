import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import messageReducer from './messageReducer';
import signinErrorReducer from './signinErrorReducer';


const rootReducer = combineReducers({
  loginReducer,
  messageReducer,
  signinErrorReducer,
});

export default rootReducer;
