import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger'
import createSageMiddleware from 'redux-saga'
import {takeLatest, put, take} from 'redux-saga/effects'
import axios from 'axios';

import App from './App';

// this startingPlantArray should eventually be removed
// const startingPlantArray = [
//   { id: 1, name: 'Rose' },
//   { id: 2, name: 'Tulip' },
//   { id: 3, name: 'Oak' }
// ];

const sagaMiddleware = createSageMiddleware();



function* rootSaga(){
  yield takeLatest('GET_PLANTS', getPlants)
  yield takeLatest('PLANT', addPlants)
}

function* addPlants(action){
  yield axios.post('/api/plant', action.payload)
  yield put({type:'GET_PLANTS'})
}

function* getPlants(action){
  const plants = yield axios.get('/api/plant')
  console.log('data:', plants.data[0].name)
  yield put({type:'ADD_PLANT', payload: plants.data})
}


const plantList = (state = 0, action) => {
  console.log('payload:', action.payload)
  switch (action.type) {
    case 'ADD_PLANT':
      return action.payload
    default:
      return state;
  }
};

const store = createStore(
  combineReducers({ 
    plantList 
  }),
  applyMiddleware(
    logger,
    sagaMiddleware
  ),
);


sagaMiddleware.run(rootSaga);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);