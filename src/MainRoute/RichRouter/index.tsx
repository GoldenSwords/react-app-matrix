import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

import DefaultApp from 'src/component/Rich';

interface IRouterProps {
}

const RichRouter: React.FC<IRouterProps> = (props: IRouterProps) => {
  return (
    <Switch>
      <Route exact path="/rich" render={() => <DefaultApp />} />
    </Switch>
  );
};

export default RichRouter;
