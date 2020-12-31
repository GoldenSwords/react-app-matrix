import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

import DefaultApp from 'src/component/App';
import CanvasExport from 'src/component/Canvas/CanvasExport';

interface IAppRouterProps {
}

const AppRouter: React.FC<IAppRouterProps> = (props: IAppRouterProps) => {
  return (
    <Switch>
      <Route exact path="/app/imageExport" render={() => <CanvasExport />} />
      <Route exact path="/app/:appID" render={() => <DefaultApp />} />
    </Switch>
  );
};

export default AppRouter;
