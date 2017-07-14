import * as T from '../Actions/MessageGeneral/messageGeneralTypes';

const initial = {
  messageObject: {
    format: '',
    message: '',
  } };

function messageReducer(state = initial, action) {
  // console.log('in messageReducer, action = ', action);
  // console.log('in messageReducer, state = ', state);
  switch (action.type) {
    case T.MESSAGE_GENERAL_SENT:
      return { ...state,
        messageObject: {
          format: 'info',
          message: action.message,
        } };
    case T.ERROR_GENERAL_SENT:
      return { ...state,
        messageObject: {
          format: 'danger',
          message: action.message,
        } };
    case T.ERASE_GENERAL_MESSAGE:
      return { ...state,
        messageObject: {
          format: '',
          message: '',
        } };
    default:
      return state;
  }
}

export default messageReducer;
