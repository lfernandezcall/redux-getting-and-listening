// Library code

function createStore(reducer) {
  let state;
  let listeners = [];

  const getState = () => state;

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  };

  return {
    getState,
    subscribe,
    dispatch
  };
}

// App codea
function todos(state = [], action) {
  const actions = { 
      ADD_TODO: state.concat([action.todo]),
      REMOVE_TODO: state.filter(f => f.id !== action.todo.id),
      TOGLE_TODO: state.map(f => f.id === action.todo.id ? {...f, complete: !f.complete} : f)
 };

  return actions[action.type] || state;
}

const store = createStore(todos);

store.subscribe(() => {
  console.log('The new state is ', store.getState());
});

store.dispatch({
  type: 'ADD_TODO',
  todo: {
    id: 0,
    name: 'Learn React',
    complete: false
  }
});
