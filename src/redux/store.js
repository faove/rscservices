import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import clientReducer from './clientDuck'
import associateReducer from './associateDuck'
import serviceReducer from './serviceDuck'
import categoryReducer from './categoryDuck'

const rootReducer = combineReducers({

    client : clientReducer,
    associate : associateReducer,
    service : serviceReducer,
    category: categoryReducer
    //user : userRedux
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore(){
    const store = createStore(rootReducer, composeEnhancers( applyMiddleware(thunk) ))
    return store;
}

