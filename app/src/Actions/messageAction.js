import * as T from './messageTypes';

function messageSending(message) {
  return {
    type: T.MESSAGE_SENT,
    format: 'message',
    message,
  };
}

function errorSending(message) {
  return {
    type: T.ERROR_SENT,
    format: 'error',
    message,
  };
}

export { messageSending, errorSending };
