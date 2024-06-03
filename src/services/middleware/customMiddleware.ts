import { ActionCreatorWithPayload, ActionCreatorWithoutPayload } from '@reduxjs/toolkit';
import type { ActionCreator, Middleware, MiddlewareAPI, AnyAction} from 'redux';
import { RootState } from '../../store';

export type TwsActionsTypes = {
  wsConnect: ActionCreatorWithPayload<string>;
  wsDisconnect: ActionCreatorWithoutPayload;
  wsSendMessage?: ActionCreatorWithPayload<any>;
  wsConnecting: ActionCreatorWithoutPayload;
  onOpen: ActionCreatorWithoutPayload;
  onClose: ActionCreatorWithPayload<string>;
  onError: ActionCreatorWithPayload<string>;
  onMessage: ActionCreatorWithPayload<any>;
};


export const socketMiddleware = (wsActions: TwsActionsTypes): Middleware => {
  return ((store: MiddlewareAPI) => {
    let socket: WebSocket | null = null;
    return next => (action: AnyAction) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsConnect, wsDisconnect, wsSendMessage, wsConnecting, onOpen, onClose, onError, onMessage } = wsActions;
      if (wsConnect.match(action)) {
        socket = new WebSocket(payload);
      }
      if (socket) {
        socket.onopen = event => {
          dispatch(onOpen());
        };

        socket.onerror = event => {
          dispatch(onError(event.toString()));
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);

          dispatch(onMessage(parsedData));
        };

        socket.onclose = event => {
          dispatch(onClose(event.code.toString()));
        };

        if (wsSendMessage?.match(action)) {
          socket.send(JSON.stringify(action.payload));
        }
        if (wsDisconnect.match(action)) {
          socket.close(1000);
          dispatch(onClose('1000'));
        }
      }

      next(action);
    };
  }) as Middleware;
};
