import React from 'react';
import './App.css';
import Routes from './components/Routes';
import { Provider as ReduxProvider } from 'react-redux';
import store from './appRedux/store'



function App() {
  return (
    // <div className="App" >
    <ReduxProvider store={store}>
      <Routes />
    </ReduxProvider>
  );
}

export default App;
