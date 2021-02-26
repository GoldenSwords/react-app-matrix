import * as React from 'react';
import './index.scss';
interface IProps {
}
interface IStates {
}

class Rich extends React.Component<IProps, IStates> {
  constructor(props: IProps) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="rich-container">
      </div>
    );
  }
}

export default Rich;