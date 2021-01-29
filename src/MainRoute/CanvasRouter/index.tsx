import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

import DefaultApp from 'src/component/App';
import CanvasStoryboard from 'src/component/Canvas/CanvasStoryboard';
import ImageContainer from 'src/component/Canvas/ImageContainer';

interface IAppRouterProps {
}

const CanvasRouter: React.FC<IAppRouterProps> = (props: IAppRouterProps) => {
  return (
    <Switch>
      <Route exact path="/canvas/painter" render={() => <CanvasStoryboard />} />
      <Route exact path="/canvas/ImageContainer" render={() => <ImageContainer />} />
      <Route exact path="/canvas" render={() => <DefaultApp />} />
    </Switch>
  );
};

export default CanvasRouter;
