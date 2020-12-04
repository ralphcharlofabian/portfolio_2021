import {createStore, applyMiddleware, compose} from 'redux';
//import createSagaMiddleware from 'redux-saga';

import rootReducer from '../reducers'  // all Reducer
//import rootSaga from '../sagas' // all saga

const configureStore = () => {
    //const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        rootReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__(),

        // window.__REDUX_DEVTOOLS_EXTENSION__ ?
        //   compose (
        //       applyMiddleware(sagaMiddleware),
        //       window.__REDUX_DEVTOOLS_EXTENSION__(),
        //   ): applyMiddleware(sagaMiddleware),
    );

    //sagaMiddleware.run(rootSaga);

    //store.dispatch({type:'Hello'});
    return store;
}

const store = configureStore();

export default store;