import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

import DefaultApp from 'src/component/App';
import CanvasExport from 'src/component/Canvas/CanvasExport';
import Translate from 'src/component/Canvas/Translate';
import TranslateMatrix from 'src/component/Canvas/Translate/Translate';
import MouseTranslate from 'src/component/Canvas/Translate/MouseTranslate';
import Image from 'src/component/Canvas/Image';
import TextAnimation from 'src/component/Canvas/TextAnimation';


import Color from 'src/component/SVG/Color';

interface IAppRouterProps {
}

const AppRouter: React.FC<IAppRouterProps> = (props: IAppRouterProps) => {
  return (
    <Switch>
      <Route exact path="/app/imageExport" render={() => <CanvasExport />} />
      <Route exact path="/app/translate" render={() => <Translate />} />
      <Route exact path="/app/TranslateMatrix" render={() => <TranslateMatrix />} />
      <Route exact path="/app/MouseTranslate" render={() => <MouseTranslate />} />
      <Route exact path="/app/image" render={() => <Image />} />
      <Route exact path="/app/text" render={() => <TextAnimation />} />
      <Route exact path="/app" render={() => <DefaultApp />} />
    </Switch>
  );
};

export default AppRouter;
