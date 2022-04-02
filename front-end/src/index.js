import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import WebProvider from './context/webcontext';
import {createGlobalStyle} from "styled-components";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
}
   from "@apollo/client";
// import { Router } from 'react-router-dom';
// import generatedIntrospection from "../introspection-result";

const GlobalStyle = createGlobalStyle`
html,
body{
  margin:0;
  padding:0;
}
body{
  font-family: 'Raleway', sans-serif;
}`;

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql", // Need to replace <server URL> with server URL
  cache: new InMemoryCache()
  
});

// ReactDOM.render(
//   <React.StrictMode>
//     <ApolloProvider client={client}>
//       <Router>
//         <App />
//       </Router>
//     </ApolloProvider>
//   </React.StrictMode>,
//   document.getElementById("app")
// );

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <ApolloProvider client={client}>
      {/* <Router> */}
      <WebProvider>
        <App />
      </WebProvider>
      {/* </Router> */}
    </ApolloProvider>
  </React.StrictMode>,
  // <React.StrictMode>
  //   <GlobalStyle/>
  //   <App />
  // </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
