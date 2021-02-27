import React from "react";
import Setting from './components/Setting';
import Client from './components/Client';
import Services from './components/Services';
import Dashboard from './components/Dashboard';
import { Provider } from 'react-redux';
import generateStore from './redux/store';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function App() {

  const store = generateStore()

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
                <Link to="/services" className="nav-link active">
                  Services
                </Link> 
              </li>
              <li className="nav-item">
                <Link to="/client" className="nav-link active">
                Client
                </Link> 
              </li>
              <li className="nav-item">
                <Link to="/setting" className="nav-link">
                  Setting
                </Link> 
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Switch>
      <Provider store={store}>
        <Route path="/setting" exact>
            <Setting />
        </Route>
        <Route path="/client" exact>
            <Client />
        </Route>
        <Route path="/services" exact>
          <Services />
        </Route>
        <Route path="/" exact>
          <Dashboard />
        </Route>
        </Provider>
      </Switch>
      </div>
    </Router>
  );
}