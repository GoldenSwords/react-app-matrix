import * as React from 'react';
import { HashRouter as Routers, Switch, Route } from 'react-router-dom';

import AppRouter from './AppRouter';
import SvgRouter from './SvgRouter';
import CanvasRouter from './CanvasRouter';
import SystemRouter from './System';
import RichRouter from './RichRouter';
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
        <Route path="/canvas" render={() => <CanvasRouter />} />
        <Route path="/system" render={() => <SystemRouter />} />
        <Route path="/rich" render={() => <RichRouter />} />
        {/* <Route component={NotFound} /> */}
      </Switch>
    </Routers>
  );
};

export default Router;
