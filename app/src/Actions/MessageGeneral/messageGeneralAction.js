import * as T from './messageGeneralTypes';

function messageGeneralSending(message) {
  return {
    type: T.MESSAGE_GENERAL_SENT,
    format: 'info',
    message,
  };
}

function errorGeneralSending(message) {
  return {
    type: T.ERROR_GENERAL_SENT,
    format: 'danger',
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
