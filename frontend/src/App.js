import React, { useState, createContext } from 'react';
import './App.css';
import Routes from './Routes';
import LogSign from './pages/LogSign';

export const isLoging_Context = createContext();

function App() {

  const [isLoging, set_isLoging] = useState(!!localStorage.getItem('token'));

  return(
    <div className="app">
    <isLoging_Context.Provider value={set_isLoging} >
    {
      isLoging ? <Routes /> : <LogSign />
    }
    </isLoging_Context.Provider>
    </div>
  )

}

export default App;
