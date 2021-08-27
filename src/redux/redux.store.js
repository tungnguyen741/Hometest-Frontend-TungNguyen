import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistReducer, createTransform } from 'redux-persist'
import { composeWithDevTools } from 'redux-devtools-extension'
import CryptoJS from 'crypto-js'

// import AsyncStorage from '@react-native-community/async-storage'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import createSagaMiddleware from 'redux-saga'

import { SDFASLDGAFBASFAKA } from '../configs/app.config'

import rootReducer from './reducers/index'
import rootSaga from './sagas/index'

const sagaMiddleware = createSagaMiddleware()

const encryptTransform = createTransform(
  (inboundState) => {
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(inboundState), SDFASLDGAFBASFAKA)
    return encrypted.toString()
  },
  (outboundState) => {
    const decrypted = CryptoJS.AES.decrypt(outboundState, SDFASLDGAFBASFAKA)
    return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8))
  },
  { whitelist: ['storeReducer'] },
)

const persistConfig = {
  key: 'root',
  storage,
  transforms: [encryptTransform],
  whitelist: ['storeReducer']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const configureStore = (initialState) => {
  // if (__DEV__) {
  if (process.env.NODE_ENV === 'development') {
    const store = createStore(
      persistedReducer,
      initialState,
      composeWithDevTools(
        applyMiddleware(sagaMiddleware),
      ),
    )
    sagaMiddleware.run(rootSaga)
    return store
  }

  const store = createStore(
    persistedReducer,
    initialState,
    compose(applyMiddleware(sagaMiddleware)),
  )
  sagaMiddleware.run(rootSaga)
  return store
}

const store = configureStore()
const persistor = persistStore(store)

export { store, persistor }
