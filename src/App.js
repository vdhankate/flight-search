import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import Index from './components/Index';
import './App.css';

function App() {
  return (
    <Router>
      <div>
       <Fragment>
          <div className="container">
            <Switch>
              <Route exact path="/" component={Index} />
            </Switch>
          </div>
       </Fragment> 
      </div>
     </Router>
  );
}

export default App;
