import { fork, all } from 'redux-saga/effects'
import storeSaga from './store.saga'

function* rootSagas() {
  yield all([
    fork(storeSaga)
  ])
}
export default rootSagas
