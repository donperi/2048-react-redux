import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import invariant from 'redux-immutable-state-invariant'
import boardReducer from './reducers/boardReducer';

const logger = createLogger({ 
  collapsed: true,
});

const middlewaresArray = [
  invariant(),
  thunk,
  process.env.NODE_ENV !== 'test' && logger
].filter(Boolean);

const store = createStore(
  boardReducer,
  applyMiddleware(...middlewaresArray)
);

export  default store;
