import * as React from 'react';
import { ImageLoader } from '@/helper';
import './index.scss';
interface ICanvasProps {
  imageSrc?: string;
}
interface ICanvasStates {
  accept: string[];
}

class CanvasExport extends React.Component<ICanvasProps, ICanvasStates> {
  canvasRef: React.RefObject<HTMLCanvasElement> = React.createRef();

  constructor(props: ICanvasProps) {
    super(props);
    this.state = {
      accept: [
        'image/jpeg',
        'image/png',
        'image/webp'
      ]
    };
  }

  onPickFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files.length) {
      ImageLoader.loader(files[0]).then((image: HTMLImageElement) => {
        const { width, height } = image;
        this.canvasRef.current?.getContext('2d').drawImage(image, 0, 0, width, height);
      }).catch((error: Error) => {
        console.log(error);
      });
    }
  }

  render() {
    const { accept } = this.state;
    return (
      <div className="canvas-export-container">
        <canvas ref={this.canvasRef}/>
        <div className="image-picker">
          <input type="file" accept={accept.join(',')} onChange={this.onPickFile} />
        </div>
      </div>
    );
  }
}

export default CanvasExport;
