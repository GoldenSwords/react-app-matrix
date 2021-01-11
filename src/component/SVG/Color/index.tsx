import * as React from 'react';
import './index.scss';
interface ICanvasProps {
  imageSrc?: string;
}
interface ICanvasStates {
  matrix: string;
  value: number[];
}

class CanvasExport extends React.Component<ICanvasProps, ICanvasStates> {
  constructor(props: ICanvasProps) {
    super(props);
    this.state = {
      matrix:`
        1 0 0 0 0
        0 1 0 0 0
        0 0 1 0 0
        0 0 0 1 0
      `,
      value:[
        1, 0, 0, 0, 0,
        0, 1, 0, 0, 0,
        0, 0, 1, 0, 0,
        0, 0, 0, 1, 0,
      ]
    };
  }

  componentDidUpdate(preProps: ICanvasProps, preState: ICanvasStates) {
    const {matrix} = this.state;
    if (matrix !== preState.matrix) {
      const value = matrix.split(' ').filter(value => value.trim() !== '').map(o=>Number(o));
      if (value.length === 20)
      this.setState({
        value
      })
    }
  }

  render() {
    const {matrix, value} = this.state;
    return (
      <div className="canvas-export-container">
        <textarea rows={10} cols={20} value={matrix} onChange={e => {
          this.setState({
            matrix: e.target.value
          })
        }}/>
        <svg width="100%" height="100%" viewBox="0 0 150 120" preserveAspectRatio="xMidYMid meet">
        <filter id="colorMatrix">
            <feColorMatrix in="SourceGraphic" type="matrix" values={value.join(' ')} />
        </filter>
        <g filter="">
            <circle cx="30" cy="30" r="20" fill="red" fill-opacity="0.5" />
        </g>
        <g filter="url(#colorMatrix)">
            <circle cx="80" cy="30" r="20" fill="red" fill-opacity="0.5" />
        </g>
      </svg>
      </div>
    );
  }
}

export default CanvasExport;