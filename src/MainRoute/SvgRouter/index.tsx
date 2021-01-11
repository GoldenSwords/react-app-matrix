import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

import Color from 'src/component/SVG/Color';

interface IAppRouterProps {
}

const AppRouter: React.FC<IAppRouterProps> = (props: IAppRouterProps) => {
  return (
    <Switch>
      <Route exact path="/svg/color" render={() => <Color />} />
    </Switch>
  );
};

export default AppRouter;
