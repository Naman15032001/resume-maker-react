import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './redux/reducers/rootReducer';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore, createFirestoreInstance } from 'redux-firestore';
import {
  ReactReduxFirebaseProvider,
  getFirebase
} from 'react-redux-firebase'

const firebaseConfig = {
  apiKey: "AIzaSyBNh27M6yB2kp5zNuQz3LPetfI4mJ0qhg0",
  authDomain: "resume-builder-29005.firebaseapp.com",
  projectId: "resume-builder-29005",
  storageBucket: "resume-builder-29005.appspot.com",
  messagingSenderId: "850334449681",
  appId: "1:850334449681:web:e2d0347185f0058e2071b0"
};

firebase.initializeApp(firebaseConfig);

//firebase.auth();

firebase.firestore();

const reduxStore = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk.withExtraArgument({getFirebase,getFirestore})),reduxFirestore(firebase))) 

ReactDOM.render(

  <BrowserRouter>
    <Provider store={reduxStore}>
      <ReactReduxFirebaseProvider
        firebase={firebase}
        config={firebaseConfig}
        dispatch={reduxStore.dispatch}
        createFirestoreInstance={createFirestoreInstance}>
        <App />
      </ReactReduxFirebaseProvider>
    </Provider>
  </BrowserRouter>
  ,
  document.getElementById('root')
);