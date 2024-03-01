import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import firebase from 'firebase/compat/app';

const firebaseConfig = {
  apiKey: 'AIzaSyAuqFyQxn5FXtEEnAT4lWc5_gcoLS_fCEQ',
  authDomain: 'blogify-48f1b.firebaseapp.com',
  projectId: 'blogify-48f1b',
  storageBucket: 'blogify-48f1b.appspot.com',
  messagingSenderId: '856934988427',
  appId: '1:856934988427:web:8bb1c468a39165df08328e',
  measurementId: 'G-B7ZF35XB6V',
};

firebase.initializeApp(firebaseConfig);

const root = createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <App />
    <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      transition:Bounce
    />
  </BrowserRouter>
);
