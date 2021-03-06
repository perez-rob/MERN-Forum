
// import React from 'react';
// import ReactDOM from 'react-dom';
// import { BrowserRouter } from 'react-router-dom';
// import './index.css';
// import "materialize-css/dist/css/materialize.min.css";
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql
// } from '@apollo/client';

// const client = new ApolloClient({
//   uri: 'https://48p1r2roz4.sse.codesandbox.io',
//   cache: new InMemoryCache()
// });

// ReactDOM.render(
// <BrowserRouter>
//     <ApolloProvider client={client}>
//       <App />
//     </ApolloProvider>
//   </BrowserRouter>,
//   document.getElementById('root')
// );
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "materialize-css/dist/css/materialize.min.css";
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
// - If you want to start measuring performance in your app, pass a function
// - to log results (for example: reportWebVitals(console.log))
// - or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

