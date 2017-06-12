import * as T from '../Actions/messageTypes';

const initial = {
  format: '',
  message: '',
};

function messageReducer(state = initial, action) {
  // console.log('in messageReducer, action = ', action);
  // console.log('in messageReducer, state = ', state);
  switch (action.type) {
    case T.MESSAGE_SENT:
      return Object.assign({}, state, {
        format: 'message',
        message: action.message,
      });
    case T.ERROR_SENT:
      return Object.assign({}, state, {
        format: 'error',
        message: action.message,
      });
    default:
      return state;
  }
}

export default messageReducer;
