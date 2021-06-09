import { all } from 'redux-saga/effects';
import App from './app';
import Home from './home';

function* rootSaga(): Generator {
    yield all([
        App(),
        Home()
    ]);
}

export default rootSaga