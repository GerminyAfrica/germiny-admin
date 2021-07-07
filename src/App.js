import React, { useState } from "react";
import {
  createMuiTheme,
  CssBaseline,
  MuiThemeProvider,
} from "@material-ui/core";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import Login from "./components/auth/Login";
import Profile from "./components/auth/Profile";
import "./App.css";
import Dashboard from "./components/Dashboard";
import PractitionerView from "./components/PractitionerView";
import PractitionerList from "./components/PractitionerList";
import PatientView from "./components/PatientView";
import PatientList from "./components/PatientList";
import FieldList from "./components/FieldList"
import EmailList from "./components/EmailList"
// import EmailView from "./components/EmailView"
import routes from "./routes";
import theme from "./theme";
import Layout from "./components/layout/Layout";

function App() {
  const [theming, setTheme] = useState(theme);

  const toggleDarkTheme = () => {
    let newPaletteType = theming.palette.type === "light" ? "dark" : "light";
    setTheme({
      palette: {
        type: newPaletteType,
      },
      typography: {
        fontFamily: "Quicksand",
      },
    });
  };

  const muiTheme = createMuiTheme(theming);

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} /> 
          <Route exact path="/" component={Login} />         
          {/* <Sidebar routes={routes} /> */}
          <Layout {...{ toggleDarkTheme }}>
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/practitioner" component={PractitionerList} />
            <Route exact path="/practitioner/:id/view" component={PractitionerView} />
            <Route exact path="/user" component={PatientList} />
            <Route exact path="/user/:id/view" component={PatientView} />
            <Route exact path="/field" component={FieldList} />
            {/* <Route exact path="/field/:id/view" component={FieldView} /> */}
            {/* <Route exact path="/email/:id/view" component={EmailView} /> */}
            <Route exact path="/email" component={EmailList} />
            <Route exact path="/profile" component={Profile} />
          </Layout>
        </Switch>
        {/* <Header />
      <main className="py-3">
        <Container>
          <Route exact path="/" component={Login} />
          <Sidebar routes={routes} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/admin/practitioner" component={Practitioner} />
        </Container>
      </main>
      <Footer /> */}
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
