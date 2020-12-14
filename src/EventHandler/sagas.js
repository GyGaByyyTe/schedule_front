import {eventChannel} from "redux-saga";
import {call, cancel, fork, put, select, take} from "redux-saga/effects";
import io from "socket.io-client";
import {eventChangeSocketAction, eventExecuteAction, EventHandlerActions, eventSocketDisconnect,} from "./actions";
import {getSocketActionByEvent, SocketEvents} from "./reducer";

function connect() {
  return new Promise(resolve => {
    const socket = io();
    socket.on("connect", () => resolve(socket));
    socket.on("connect_error", () => resolve(socket));
  })
}

function subscribe(client) {
  return eventChannel(emit => {
    client.on(SocketEvents.UPDATE, body => emit(eventExecuteAction({
      event: SocketEvents.UPDATE,
      data: JSON.parse(body)
    })));
    return () => {
      client.offAny(() => emit(eventSocketDisconnect()));
    };
  });
}

function* read(socket) {
  const channel = yield call(subscribe, socket);
  while (true) {
    try {
      const action = yield take(channel);
      yield put(action);
    } catch (err) {
      console.error("socket error:", err);
      channel.close();
    }
  }
}

function* handleIO(socket) {
  yield fork(read, socket);

  while (true) {
    const { payload } = yield take(EventHandlerActions.NOTIFY);
    const actions = yield select(getSocketActionByEvent, payload);

    if (actions?.length) {
      for (let i = 0; i < actions.length; i += 1) {
        yield call(actions[i], payload);
      }
    } else if (actions && !Array.isArray(actions)) {
      yield call(actions, payload);
    }
  }
}

export function* eventHandlerSaga() {
  while (true) {
    yield take(EventHandlerActions.SOCKET_CONNECT);
    const client = yield call(connect);
    if (client.connected) {
      yield put({ type: EventHandlerActions.SOCKET_CONNECT_SUCCESS, payload: {} });
      yield put(eventChangeSocketAction({ status: true }));
      const task = yield fork(handleIO, client);

      yield take(EventHandlerActions.SOCKET_DISCONNECT);
      yield put(eventChangeSocketAction({ status: false }));
      yield cancel(task);
    }
  }
}
