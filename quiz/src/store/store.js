// store.js
import React, { createContext, useReducer } from 'react';

const initialState = {
  loggedin: null,
  currentUser: null,
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state = initialState, action) => {
    switch (action.type) {
      case 'SET_CURRENT_USER':
        const newState = {initialState:action.user};
        return newState;
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
