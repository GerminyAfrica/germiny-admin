import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import Login from "./components/auth/Login";
import Profile from "./components/auth/Profile";
import "./App.css";
import "./theme/theme.css";
import Dashboard from "./components/Dashboard";
import PractitionerView from "./components/PractitionerView";
import PractitionerList from "./components/PractitionerList";
import PatientView from "./components/PatientView";
import PatientList from "./components/PatientList";
import FieldList from "./components/FieldList"
import EmailList from "./components/EmailList"
import routes from "./routes";
import Layout from "./components/layout/Layout";
import ThemeProvider from "./theme/ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} /> 
          <Route exact path="/" component={Login} />         
          <Layout>
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/practitioner" component={PractitionerList} />
            <Route exact path="/practitioner/:id/view" component={PractitionerView} />
            <Route exact path="/user" component={PatientList} />
            <Route exact path="/user/:id/view" component={PatientView} />
            <Route exact path="/field" component={FieldList} />
            <Route exact path="/email" component={EmailList} />
            <Route exact path="/profile" component={Profile} />
          </Layout>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
