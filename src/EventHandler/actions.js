export const EventHandlerActions = {
  ADD_LISTENER: "EVENT_HANDLER_ADD_LISTENER",
  REMOVE_LISTENER: "EVENT_HANDLER_REMOVE_LISTENER",
  NOTIFY: "EVENT_HANDLER_NOTIFY",
  SOCKET_CONNECT: "EVENT_HANDLER_SOCKET_CONNECT_BODY",
  SOCKET_CONNECT_SUCCESS: "EVENT_HANDLER_SOCKET_CONNECT_SUCCESS_OK",
  SOCKET_DISCONNECT: "EVENT_HANDLER_SOCKET_DISCONNECT",
  SOCKET_CHANGE: "EVENT_HANDLER_SOCKET_CHANGE",
}

export const eventAddListener = (payload) => {
  return { type: EventHandlerActions.ADD_LISTENER, payload };
};

export const eventRemoveListener = (payload) => {
  return { type: EventHandlerActions.REMOVE_LISTENER, payload };
};

export const eventExecuteAction = (payload) => {
  return { type: EventHandlerActions.NOTIFY, time: new Date(Date.now()), payload };
};

export const eventSocketConnect = (payload = {}) => {
  return { type: EventHandlerActions.SOCKET_CONNECT, payload };
};

export const eventSocketDisconnect = () => {
  return { type: EventHandlerActions.SOCKET_DISCONNECT, payload: {} };
};

export const eventChangeSocketAction = (payload) => {
  return { type: EventHandlerActions.SOCKET_CHANGE, payload };
};