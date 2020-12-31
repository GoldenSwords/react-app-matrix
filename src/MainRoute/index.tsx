import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import AppRouter from './AppRouter';
import './index.scss';
interface IRouterProps {
}

const Router: React.FC<IRouterProps> = (props: IRouterProps) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/app" render={() => <AppRouter />} />
        {/* <Route component={NotFound} /> */}
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
