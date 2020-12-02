import io from 'socket.io-client';
import {BASE_URI} from './constants';

export default function socketMiddleware() {
  const socket = io(BASE_URI,{
    reconnection: true,
    reconnectionDelay: 500,
    reconnectionDelayMax : 2000,
    reconnectionAttempts: 99999
  });

  return ({ dispatch }) => next => (action) => {
    if (typeof action === 'function') {
      return next(action);
    }

    const {
      emit,
      event,
      check,
      handle,
      payload,
      ...rest
    } = action;

    if(emit) {
      socket.emit(event, payload);
      if (typeof handle === 'string') {
        dispatch({ type: handle, payload, ...rest });
      }
    }

    if(!event) {
      return next(action);
    }

    let handleEvent = handle;
    if (typeof handleEvent === 'string') {
      handleEvent = result => dispatch({ type: handle, payload: result, ...rest });
    }

    return socket.on(event, handleEvent);
  };
}