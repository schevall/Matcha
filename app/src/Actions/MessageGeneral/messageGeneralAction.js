import * as T from './messageGeneralTypes';

function messageGeneralSending(message) {
  return {
    type: T.MESSAGE_GENERAL_SENT,
    format: 'MessageBarSuccess',
    message,
  };
}

function errorGeneralSending(message) {
  return {
    type: T.ERROR_GENERAL_SENT,
    format: 'MessageBarError',
    message,
  };
}

function eraseGeneralMessage() {
  return {
    type: T.ERASE_GENERAL_MESSAGE,
    format: '',
    message: '',
  };
}

export { messageGeneralSending, errorGeneralSending, eraseGeneralMessage };
