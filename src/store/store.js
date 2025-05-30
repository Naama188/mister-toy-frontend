import {
    combineReducers,
    compose,
    legacy_createStore as createStore,
  } from 'redux'
  import { reviewReducer } from './reducers/review.reducer.js'
import { toyReducer } from './reducers/toy.reducer.js'
import { userReducer } from './reducers/user.reducer.js'
import { appReducer } from './reducers/app.reducer.js'
  
const rootReducer = combineReducers({
  toyModule: toyReducer,
  userModule: userReducer,
  reviewModule: reviewReducer,
  appModule: appReducer,
})
  
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  
  export const store = createStore(rootReducer, composeEnhancers())
  
  window.gStore = store
  