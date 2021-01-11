import * as React from 'react';
import { ImageLoader } from '@/helper';
import './index.scss';
interface ICanvasProps {
  imageSrc?: string;
}
interface ICanvasStates {
  accept: string[];
  show: boolean;
  rotate:number;
  offsetX:number;
  offsetY:number;
  scale:number;
  waterFollow:boolean;
  lv: boolean;
  drawCircle: boolean;
}

class CanvasExport extends React.Component<ICanvasProps, ICanvasStates> {
  canvasRef: React.RefObject<HTMLCanvasElement> = React.createRef();
  ctx: CanvasRenderingContext2D;
  image: HTMLImageElement;
  constructor(props: ICanvasProps) {
    super(props);
    this.state = {
      waterFollow: false,
      show: true,
      lv: false,
      rotate:0,
      drawCircle: false,
      offsetX:0,
      offsetY:0,
      scale:1,
      accept: [
        'image/jpeg',
        'image/png',
        'image/webp'
      ]
    };
  }

  componentDidMount() {
    if(this.canvasRef.current) {
      this.canvasRef.current.width = window.innerWidth
      this.canvasRef.current.height = window.innerHeight
      this.ctx = this.canvasRef.current.getContext('2d')
    }
  }

  onPickFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files.length) {
      ImageLoader.loader(files[0]).then((image: HTMLImageElement) => {
        this.image = image;
        const { width, height } = image;
        this.canvasRef.current?.getContext('2d').drawImage(image, 0, 0, width, height);
      }).catch((error: Error) => {
        console.log(error);
      });
    }
    this.setState({
      show: false
    })
  }


  rotate = (rotate:number) => {
    this.ctx.translate(-this.image.width/2,-this.image.height/2)
    this.ctx.rotate(rotate  * Math.PI/180);
  }

  scale = (scale:number) => {
    this.ctx.scale(scale,scale);
  }
  
  offset = (offset:number,type:string) => {
    const { offsetX, offsetY} = this.state;
    switch(type){
      case 'x': 
      this.ctx.translate(offset,offsetY)
      break;
      default: 
      this.ctx.translate(offsetX,offset)
      break;
    }
  }

  waterFollow = () => {
    this.ctx.font = "20px serif";
    this.ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    this.ctx.fillText("这是水印", 0, 20);
  }

  draw = () => {
    console.log(100)
    const {rotate,scale,offsetX,waterFollow,lv} = this.state;
    this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);
    this.ctx.beginPath();
    this.ctx.save();
    this.offset(offsetX,'x')
    this.rotate(rotate)
    this.scale(scale)
    this.canvasRef.current?.getContext('2d').drawImage(this.image, 0, 0, this.image.width, this.image.height);
    if(waterFollow){
      this.waterFollow();
    }
    if(lv){
      this.lj();
    }
    this.ctx.restore();
  }

  componentDidUpdate(preProps:ICanvasProps,preState:ICanvasStates) {
    const {rotate,scale,offsetX,offsetY} = this.state;
    if(preState.rotate !== rotate||
      preState.scale !== scale||
      preState.offsetX !== offsetX||
      preState.offsetY !== offsetY||
      preState.rotate !== rotate){
      this.draw()
    }
  }

  onRotate = (e: React.ChangeEvent) => {
    const rotate = Number(e.target.value);
    this.setState({
      rotate,
    })
  }


  lj = () => {
  //先从第一个context中获取图片信息
  var imageData = this.ctx.getImageData(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  var pxData = imageData.data;

  //canvas区域的长为1000，宽为667
  for(var i = 0; i < 1000 * 667; i++) {
      //分别获取rgb的值(a代表透明度，在此处用不上)
      var r = pxData[4 * i];
      var g = pxData[4 * i + 1];
      var b = pxData[4 * i + 2];

      //运用图像学公式，设置灰度值
      var grey = r * 0.3 + g * 0.59 + b * 0.11;

      //将rgb的值替换为灰度值
      pxData[4 * i] = grey;
      pxData[4 * i + 1] = grey;
      pxData[4 * i + 2] = grey;
    }

    //将改变后的数据重新展现在canvas上
    this.ctx.putImageData(imageData, 0, 0, 0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  onScale = (e: React.ChangeEvent) => {
    const scale = Number(e.target.value);
    this.setState({
      scale,
    })
  }
  
  onOffset = (e: React.ChangeEvent,type: string) => {
    const offset = Number(e.target.value);
    switch(type){
      case 'x': 
      this.setState({
        offsetX:offset,
      })
      break;
      default: 
      this.setState({
        offsetY:offset,
      })
      break;
    }
  }

  people = () => {
    
  }

  render() {
    const { accept, show, waterFollow, lv } = this.state;
    return (
      <div className="canvas-export-container">
        <canvas id="canvas"/>
        <canvas ref={this.canvasRef}/>
        {show && <div className="image-picker">
          <input type="file" accept={accept.join(',')} onChange={this.onPickFile} />
        </div>}
        {!show&&<div style={{position:'absolute',right:0,top:0}}>
          <div>旋转<input type="range" max={360} onChange={this.onRotate}/></div>
          <div>平移X<input type="range" max={window.innerWidth} onChange={(e) => {
            this.onOffset(e, 'x')
          }}/></div>
          <div>平移Y<input type="range" max={window.innerHeight} onChange={(e) => {
            this.onOffset(e, 'y')
          }}/></div>
          <div>缩放<input type="range" max={3} step={0.1} onChange={this.onScale}/></div>
          <div><button onClick={()=>{
            this.setState({
              waterFollow: !waterFollow
            },this.draw)
          }}>水印</button></div>
          <div><button onClick={()=>{
            this.setState({
              lv: !lv
            },this.draw)
          }}>滤镜</button></div>
          
          <div><button onClick={()=>{
            this.setState({
              drawCircle: true
            },this.draw)
          }}>圆形</button></div>
        </div>}
      </div>
    );
  }
}

export default CanvasExport;
