import React from 'react';
import './App.css';
import Navigation from './components/Navigation';
import PremiseForm from './components/PremiseForm';
import LoginForm from './components/LoginForm';
import Home from './components/Home';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <Navigation/>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/addPremise" component={PremiseForm} />
          <Route path="/login" component={LoginForm} />
        </Switch>
      </Router>
    </div>
  );
}
// decent vid for routing https://www.youtube.com/watch?v=Law7wfdg_ls 
export default App;
