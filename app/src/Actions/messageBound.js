import * as A from './messageAction';

function messageSendingBound(messageObject) {
  // console.log('in messageSendingBound messageObject = ', messageObject);
  return (dispatch) => {
    dispatch(A.messageSending(messageObject));
  };
}

function errorSendingBound(messageObject) {
  // console.log('in error SendingBound messageObject = ', messageObject);
  return (dispatch) => {
    dispatch(A.errorSending(messageObject));
  };
}

export { messageSendingBound, errorSendingBound };
