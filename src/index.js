import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ParallaxProvider } from 'react-scroll-parallax';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    {/* <ParallaxProvider> */}
      <App />
    {/* </ParallaxProvider> */}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
