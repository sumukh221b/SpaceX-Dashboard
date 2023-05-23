import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import launchReducer from '../reducer/launchReducer'
import historyReducer from '../reducer/historyReducer'

const configureStore = () => {
    const store = createStore(combineReducers({
        launch : launchReducer,
        history : historyReducer
    }), applyMiddleware(thunk))
    return  store
}

export default configureStore