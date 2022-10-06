import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './componets/globals/AuthProvider';
//import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

//const users = new ApolloClient({

// uri:
//    "https://jsramverk-editor-mabs21.azurewebsites.net/",
//  cache: new InMemoryCache(),

//});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode >

);

