import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
// import { renderRoutes } from 'react-router-config';
import "./App.scss";

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
);

// Containers
const Main = React.lazy(() => import("./components/Main.js"));

class App extends Component {
  render() {
    return (
      <HashRouter>
        <React.Suspense fallback={loading()}>
          <Switch>
            <Route path="/" name="Home" render={(props) => <Main />} />
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
