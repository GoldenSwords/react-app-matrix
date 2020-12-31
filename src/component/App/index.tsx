import * as React from 'react';
import classnames from 'classnames';
import './App.scss';

interface IAppProps {}

const App:React.FC<IAppProps> = (props)=> {
  const [animation, setAnimation] = React.useState(false);
  return (
    <div className="App">
      <div className={classnames('transformBox', { animation })} onClick={() => setAnimation(!animation)}></div>
      <canvas/>
    </div>
  );
}

export default App;
