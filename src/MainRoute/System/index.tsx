import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import Jurisdiction from 'src/component/System/Jurisdiction';

interface IAppRouterProps {
}

const SystemRoute: React.FC<IAppRouterProps> = (props: IAppRouterProps) => {
  return (
    <Switch>
      <Route exact path="/system/jurisdiction" render={() => <Jurisdiction />} />
    </Switch>
  );
};

export default SystemRoute;
