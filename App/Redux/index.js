import {combineReducers} from 'redux'
import {persistReducer} from 'redux-persist'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'
import ReduxPersist from '../Config/ReduxPersist'

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
    config: require('./ConfigRedux').reducer,
    user: require('./UserRedux').reducer,
    calendar: require('./CalendarRedux').reducer,
    family: require('./FamilyRedux').reducer,
    folder: require('./FolderRedux').reducer,
    route: require('./RouteRedux').reducer,
    budget: require('./BudgetRedux').reducer,
    locator: require('./LocatorRedux').reducer,
})

export default () => {
    let finalReducers = reducers
    // If rehydration is on use persistReducer otherwise default combineReducers
    if (ReduxPersist.active) {
        const persistConfig = ReduxPersist.storeConfig
        finalReducers = persistReducer(persistConfig, reducers)
    }

    let {store, sagasManager, sagaMiddleware} = configureStore(finalReducers, rootSaga)

    if (module.hot) {
        module.hot.accept(() => {
            const nextRootReducer = require('./').reducers
            store.replaceReducer(nextRootReducer)

            const newYieldedSagas = require('../Sagas').default
            sagasManager.cancel()
            sagasManager.done.then(() => {
                sagasManager = sagaMiddleware.run(newYieldedSagas)
            })
        })
    }

    return store
}
