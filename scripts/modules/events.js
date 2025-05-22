const eventsMap = new Map();

function on(eventName, fn) {
  if (!eventsMap.has(eventName)) {
    eventsMap.set(eventName, []);
  }

  eventsMap.get(eventName).push(fn);
}

function off(eventName, fn) {
  if (eventsMap.has(eventName)) {
    const handlers = eventsMap.get(eventName);
    const idx = handlers.indexOf(fn);

    if (idx !== -1) {
      handlers.splice(idx, 1);
    }
  }
}

function emit(eventName, data) {
  if (eventsMap.has(eventName)) {
    eventsMap.get(eventName).forEach((fn) => fn(data));
  }
}

function log() {
  console.table(Array.from(eventsMap.entries()));
}

export const events = {
  on,
  off,
  emit,
  log,
};
