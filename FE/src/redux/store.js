import { createLogicMiddleware } from 'redux-logic';
import { createStore, applyMiddleware, compose } from 'redux';
import  Logic  from './logic';
import rootReducer from './reducer';

import logger from 'redux-logger';

const logics = [
    ...Logic
];

const logicMiddleware = createLogicMiddleware( logics, {});
const middlewares = [
    logicMiddleware,
    logger
]

const enhancers = [
    applyMiddleware(...middlewares)
];

const composeEnhancers =
process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

  const store = createStore(rootReducer,
      composeEnhancers(...enhancers)
  )

  export default store;