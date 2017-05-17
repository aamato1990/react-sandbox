import React from 'react';
import {Route, Link} from "react-router-dom";
import {AppRoot} from "./AppRoot";
import {ToDoList} from "../to-do-list/ToDoList";
import {StocksView} from "../stocks/StocksView";
import logo from './logo.svg';
import './style.css';

class App extends React.Component {

    render() {
      return(
      <AppRoot>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Link to={"/Stocks"}>Stocks</Link>
          <Link to={"/To-Do"}>To Do List</Link>
        </div>
        <Route path={"/Stocks"} component={StocksView} />
        <Route path={"/To-Do"} component={ToDoList} />
      </AppRoot>
      
      )
  }
}

export default App;
