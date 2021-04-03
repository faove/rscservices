import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import clientReducer from './clientDuck'
import associateReducer from './associateDuck'
import areaReducer from './areaDuck'
import serviceReducer from './serviceDuck'
import serviceAssocReducer from './serviceAssocDuck'
import categoryReducer from './categoryDuck'
import productReducer from './productDuck'
import typestatusReducer from './typestatusDuck'

const rootReducer = combineReducers({

    client : clientReducer,
    associate : associateReducer,
    area : areaReducer,
    service : serviceReducer,
    serviceassoc : serviceAssocReducer,
    showstatus : typestatusReducer,
    category: categoryReducer,
    product : productReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore(){
    const store = createStore(rootReducer, composeEnhancers( applyMiddleware(thunk) ))
    return store;
}

