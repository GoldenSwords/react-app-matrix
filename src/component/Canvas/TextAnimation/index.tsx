import * as React from 'react';
import { ImageLoader } from '@/helper';
import * as GIF from 'gif.js'
import './index.scss';
interface ICanvasProps {
  imageSrc?: string;
}
interface ICanvasStates {
  value: string;
  accept: string[];
  doGIF: boolean;
  valueOpt: Array<{txt:string,font:number,y:number,x:number, fallSpeed:number}>;
}

class CanvasExport extends React.Component<ICanvasProps, ICanvasStates> {
  canvasRef: React.RefObject<HTMLCanvasElement> = React.createRef();
  area: React.RefObject<HTMLTextAreaElement> = React.createRef();
  ctx: CanvasRenderingContext2D;
  header: HTMLImageElement;
  animationCount: number = 0;
  minFont: number = 40;
  randomFont: number = 40;
  fallSpeed: number = 2;
  randomSpeed: number = 4;
  gif: any;
  count: number = 0;
  maxFrame: number = 100;
  text: string[] = [
    '0101010101',
    'WSDASDW',
    'SADWD',
    '0101110011',
    '1111100001010',
    '10101',
    '0010',
    '11',
    'XCSW',
    'LYDXJ',
    'LHXSXS',
    'JWWDWDW',
    'XAZSX',
    'LUKKKK',
    '01001',
    '1110101',
    '010',
    '0001',
    '111',
    '01010101010111',
    '1100110011',
  ];
  constructor(props: ICanvasProps) {
    super(props);
    this.state = {
      accept: [
        'image/jpeg',
        'image/png',
        'image/webp'
      ],
      doGIF: false,
      valueOpt: this.text.map((txt: string)=> {
        return {
          txt,
          font:Math.round(Math.random() * this.randomFont) + this.minFont,
          y: -Math.round(Math.random() * window.innerHeight / 2),
          x: Math.round(Math.random() * window.innerWidth),
          fallSpeed: Math.round(Math.random() * this.randomSpeed) + this.fallSpeed,
        }
      }),
      value: this.text.join('\n'),
    };
  }

  componentDidMount() {
    if(this.canvasRef.current) {
      this.canvasRef.current.width = window.innerWidth
      this.canvasRef.current.height = window.innerHeight
      this.ctx = this.canvasRef.current.getContext('2d')
    }
    this.animation();
    this.gif = new GIF({
      workerScript: './gif.worker.js',
      workers: 2,//启用两个worker。
      quality: 10//图像质量
    });//创建一个GIF实例
    this.gif.on('finished', function(blob: string) {//最后生成一个blob对象
      window.open(URL.createObjectURL(blob));
    });
  }

  animation = () => {
    cancelAnimationFrame(this.animationCount);
    this.draw();
    requestAnimationFrame(this.animation);
  }

  drawText = (size:{txt:string,font:number,y:number,x:number}) => {
    const textStr = size.txt.split('');
    this.ctx.beginPath();
    this.ctx.font = size.font + 'px normal';
    this.ctx.moveTo(size.x, size.y);
    textStr.forEach((txt:string, index: number) => {
      this.ctx.fillStyle=`rgba(0,225,0,${(textStr.length - index) / textStr.length})`
      this.ctx.fillText(txt,size.x,size.y - index * size.font);
    });
  }

  addFrame = () => {
    if (this.count > this.maxFrame || !this.gif) {
      return;
    }
    this.gif.addFrame(this.ctx.canvas, {copy: true, delay: 1});
    if (this.count >= this.maxFrame) {
      this.gif.render();//开始启动
    }
    this.count += 1;
  }

  draw = () => {
    const {valueOpt} = this.state;
    const copy = [...valueOpt];
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    if (this.header) {
      const { width, height } = this.header;
      this.ctx.drawImage(this.header,( window.innerWidth - width) / 2,  (window.innerHeight - height) / 2, width, height);
    }
    copy.forEach(value => {
      const len = value.txt.split('').length * value.font;
      value.y = value.y + value.fallSpeed > window.innerHeight + len ? -Math.round(Math.random() * window.innerHeight / 2) : value.y + value.fallSpeed;
      this.drawText(value)
    });
    this.setState({
      valueOpt: copy
    });
    if (this.state.doGIF) {
      this.addFrame();
    }
  }

  onPickFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files.length) {
      ImageLoader.loader(files[0]).then((image: HTMLImageElement) => {
        this.header = image;
      }).catch((error: Error) => {
        console.log(error);
      });
    }
  }

  render() {
    const {value,accept}=this.state;
    return (
      <div className="canvas-export-container">
        <canvas ref={this.canvasRef} />
        <textarea style={{height: 'auto', position: 'absolute', right: 0, top: 0}} rows={10} ref={this.area} value={value} onChange={(e)=>{
          this.setState({
            valueOpt: e.target.value.trim().split('\n').map((txt: string)=> {
              return {
                txt,
                font: Math.round(Math.random() * this.randomFont) + this.minFont,
                y: -Math.round(Math.random() * window.innerHeight / 2),
                x: Math.round(Math.random() * window.innerWidth),
                fallSpeed: Math.round(Math.random() * this.randomSpeed) + this.fallSpeed,
              }
            }),
            value: e.target.value,
          }, this.draw)
        }}></textarea>
        <button style={{position: 'absolute', right: 0, top: 160}} onClick={() => {
          this.setState({
            doGIF: true
          })
        }}>gif</button>
        {
          !this.header && <div className="image-picker">
            <input type="file" accept={accept.join(',')} onChange={this.onPickFile} />
          </div> 
        }
      </div>
    );
  }
}

export default CanvasExport;
