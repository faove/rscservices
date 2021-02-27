import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import clientReducer from './clientDuck'
import associateReducer from './associateDuck'

const rootReducer = combineReducers({

    client : clientReducer,
    associate : associateReducer
    //user : userRedux
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore(){
    const store = createStore(rootReducer, composeEnhancers( applyMiddleware(thunk) ))
    return store;
}

