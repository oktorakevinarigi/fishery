import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Suspense fallback={<div>Loading...</div>}>
          <Route exact path="/" component={lazy(() => import('./Home/Home'))} />
          <Route exact path="/form" component={lazy(() => import('./Home/Form'))} />
          <Route exact path="/form/:id" component={lazy(() => import('./Home/Form'))} />
        </Suspense>
      </Switch>
    </Router>
  );
};

export default Routes;
