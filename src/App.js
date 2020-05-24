import React, { useState } from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './LogIn/Home';
import PrincipalPage from './PrincipalPage/PrincipalPage';
import MyContext from './context';
import NewToDo from './PrincipalPage/NewToDo/NewToDo';

function App() {

  const [hooksState, setHooksState] = useState({});
  //Para poder exportar el estado y la funcion que lo cambia desde cualquier componente mediante contexto:
  const stateAndFunction = {hooksState, setHooksState}; 

  return (
    <MyContext.Provider value={stateAndFunction}>
      <div className="App">
        <Router>
          <Route path="/" exact component={Home} />
          <Route path="/principalPage" component={PrincipalPage}/>
          <Route path ="/newToDo" component={NewToDo}/>
        </Router>
      </div>
    </MyContext.Provider>
  );
}

export default App;
