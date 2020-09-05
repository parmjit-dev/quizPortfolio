// store.js
import React, { createContext, useReducer } from 'react';

const initialState = { state: {loggedIn: false} };
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state = initialState, action) => {
    switch (action.type) {
      case 'SET_CURRENT_USER':
        const newState = { state: action.user };
        return newState;
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
