import React from 'react';
import Client from './components/ClientTable';
import Dashboard from './components/DashboardTable';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
  return (
    <Router>
      <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Navbar</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link active">
                  Dashboard
                </Link> 
              </li>
              <li className="nav-item">
                <Link to="/client" className="nav-link">
                  Client
                </Link> 
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Switch>
        <Route patch="/client" exact>
            <Client />    
        </Route>
        <Route patch="/" exact>
            <Dashboard />    
        </Route>
      </Switch>  
      </div>
    </Router>
    
  );
}

export default App;
