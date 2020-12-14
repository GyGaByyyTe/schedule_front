import {EventHandlerActions} from "./actions";

export const SocketEvents = {
  UPDATE: "updated"
}

export const initialEventHandler = {
  subscribers: {}, //{ [event:string]: { actions: (data) => void | ((data) => void)[] } }
  socket: false
};

export const eventHandler = (state = initialEventHandler, action) => {
  switch (action.type) {
    case EventHandlerActions.ADD_LISTENER: {
      const { event, handler } = action.payload;
      return {
        ...state,
        subscribers: {
          ...state.subscribers,
          [event]: { actions: handler },
        },
      };
    }
    case EventHandlerActions.REMOVE_LISTENER: {
      const { event } = action.payload;

      let withoutListener = {};
      withoutListener = { ...state.subscribers };
      delete withoutListener[event];

      return { ...state, subscribers: withoutListener };
    }
    case EventHandlerActions.SOCKET_CHANGE:
      return { ...state, socket: (action.payload).status }
    default:
      return { ...state };
  }
}

export const getEventHandler = (state) => state.eventHandler;
export const getSocketActionByEvent = (state, payload) => {
  const subscribers = getEventHandler(state).subscribers;

  let resultActions = [];

  const event = subscribers[payload.event];
  const actions = event?.actions;
  if (actions) {
    if (Array.isArray(actions)) {
      resultActions = resultActions.concat(actions);
    } else {
      resultActions.push(actions);
    }
  }

  return resultActions;
}
export const getSocketStatus = (state) => getEventHandler(state).socket;