import React from 'react';
import './App.css';
import Navigation from './components/Navigation';
import PremiseForm from './components/premise/PremiseForm';
import ListAllPremises from './components/premise/ListAllPremises';
import LoginForm from './components/login/LoginForm';
import Home from './components/Home';
import Brand from './components/Brand';

import { BrowserRouter as Router, Switch, Route,} from 'react-router-dom';

function App() {
  return (
      <div className="container">
        <Router>
          <Brand/>
          <Navigation/> 
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/addPremise" component={PremiseForm} />
            <Route path="/listPremises" component={ListAllPremises} />
            <Route path="/viewPremise/:premiseId" component={PremiseForm} />
            <Route path="/login"  component={LoginForm} />
          </Switch>
        </Router>
      </div>
    
  );
}

// better one: https://www.sitepoint.com/react-router-complete-guide/
// decent vid for routing https://www.youtube.com/watch?v=Law7wfdg_ls 
export default App;
