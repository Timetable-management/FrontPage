import React, { useState } from 'react';
import './App.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './LogIn/Home';
import UserPage from './PrincipalPage/UserPage';
import PrincipalPage from './PrincipalPage/PrincipalPage';
import MyContext from './context';

function App() {

  const [hooksState, setHooksState] = useState({
    
  });

  const stateAndFunction = {hooksState, setHooksState}

  return (
    <MyContext.Provider value={stateAndFunction}>
      <div className="App">
        <Router>
          <Route path="/" exact component={Home} />
          <Route path="/employee" component={UserPage} />
          <Route path="/principalPage" component={PrincipalPage}/>
        </Router>
      </div>
    </MyContext.Provider>
  );
}

export default App;
