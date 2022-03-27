import React, { Fragment } from "react"
import './App.css';

//components
import ListTodos from "./components/ListTodos";

const App = () => {
  return (
    <Fragment>
       <div className="container">
          <ListTodos />
        </div>
    </Fragment>
  );
}

export default App;
