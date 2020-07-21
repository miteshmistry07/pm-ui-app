import React from 'react';
import './App.css';
import Navigation from './components/Navigation';
import PremiseForm from './components/premise/PremiseForm';
import ListAllPremises from './components/premise/ListAllPremises';
import LoginForm from './components/LoginForm';
import Home from './components/Home';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <div>  
      <Router>
        <Navigation/> 
        <div className="container-fluid ">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/addPremise" component={PremiseForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/viewAllPremises" component={ListAllPremises} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}
// decent vid for routing https://www.youtube.com/watch?v=Law7wfdg_ls 
export default App;
