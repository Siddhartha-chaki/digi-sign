import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from "react-router";
import Home from "./home";
import CompanyHome from "./company_home";
import CreateAccount from "./createaccount";
import CertificateVerification from "./verification";
// to not get confused with the History component in react-router.

const Main = () => (
  <Router>
    <Switch>
    <Route exact path="/sign" component={CompanyHome} />
    <Route exact path="/create_account" component={CreateAccount} />
    <Route exact path="/verification" component={CertificateVerification} />
      <Route exact path="/" component={Home} />
      
    </Switch>
  </Router>
);

export default Main;
