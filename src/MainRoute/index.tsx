import * as React from 'react';
import { HashRouter as Routers, Switch, Route } from 'react-router-dom';

import AppRouter from './AppRouter';
import SvgRouter from './SvgRouter';
import SystemRoute from './System';
import CommonErrorPage from 'src/component/System/CommonErrorPage';


import './index.scss';
interface IRouterProps {
}

const Router: React.FC<IRouterProps> = (props: IRouterProps) => {
  return (
    <Routers>
      <CommonErrorPage />
      <Switch>
        <Route path="/app" render={() => <AppRouter />} />
        <Route path="/svg" render={() => <SvgRouter />} />
        <Route path="/system" render={() => <SystemRoute />} />
        {/* <Route component={NotFound} /> */}
      </Switch>
    </Routers>
  );
};

export default Router;
