import { ActionCreatorWithPayload, ActionCreatorWithoutPayload } from '@reduxjs/toolkit';
import type { ActionCreator, Middleware, MiddlewareAPI, AnyAction} from 'redux';
import { RootState } from '../../store';
import { refreshToken } from '../../utils/fetchRequest';

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


export const socketMiddleware = (wsActions: TwsActionsTypes,withTockenRefresh = false): Middleware => {
  return ((store: MiddlewareAPI) => {
    let socket: WebSocket | null = null;
    let isConnected = false;
    let reconnectTimer = 0;
    let url = '';
    return next => (action: AnyAction) => {
      const { dispatch } = store;
      const { wsConnect, wsDisconnect, wsSendMessage, onOpen, 
        onClose, onError, onMessage, wsConnecting } = wsActions;

      if (wsConnect.match(action)) {
        console.log('connect')
        url = action.payload;
        socket = new WebSocket(url);
        isConnected = true;
        dispatch(wsConnecting());
      }

      if (socket) {
        socket.onopen = () => {
          dispatch(onOpen());
        };

        socket.onerror = err  => {
          console.log(err);
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
             /*  Обновление токена  */
             if (
              withTockenRefresh &&
              parsedData.message === "Invalid or missing token"
            ) {
              refreshToken()
                .then((refreshData) => {
                  const wssUrl = new URL(url);
                  wssUrl.searchParams.set(
                    "token",
                    refreshData.accessToken.replace("Bearer ", "")
                  );
                  dispatch(wsConnecting());
                })
                .catch((err) => {
                  dispatch(onError(err));
                });
  
                dispatch(onClose('1000'));
  
              return;
            }
          dispatch(onMessage(parsedData));
        };

        socket.onclose = event => {
          if (event.code !== 1000) {
            console.log('error')
            dispatch(onError(event.code.toString()));
          }
          console.log('close')
          dispatch(onClose('1000'));

          if (isConnected) {
            dispatch(wsConnecting());
            reconnectTimer = window.setTimeout(() => {
              dispatch(wsConnect(url));
            }, 3000)
          }

        };

        if (wsSendMessage && wsSendMessage.match(action)) {
          console.log('send')
          socket.send(JSON.stringify(action.payload));
        }

        if (wsDisconnect.match(action)) {
          console.log('disconnect')
          clearTimeout(reconnectTimer)
          isConnected = false;
          reconnectTimer = 0;
          socket.close();
          dispatch(onClose('1000'));
        }
      }

      next(action);
    };
  }) as Middleware;
};
