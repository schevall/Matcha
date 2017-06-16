import * as A from './messageGeneralAction';

function messageGeneralSendingBound(messageObject) {
  // console.log('in messageSendingBound messageObject = ', messageObject);
  return (dispatch) => {
    dispatch(A.messageGeneralSending(messageObject));
  };
}

function errorGeneralSendingBound(messageObject) {
  // console.log('in error SendingBound messageObject = ', messageObject);
  return (dispatch) => {
    dispatch(A.errorGeneralSending(messageObject));
  };
}

function eraseGeneralMessageBound() {
  return (dispatch) => {
    dispatch(A.eraseGeneralMessage());
  };
}


export { messageGeneralSendingBound, errorGeneralSendingBound, eraseGeneralMessageBound };
