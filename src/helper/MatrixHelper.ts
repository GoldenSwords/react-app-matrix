//获得transform属性对应的矩阵形式
export const getTransformMatrix = (transform: string) => {
  var $div = document.createElement('div');
  $div.style.visibility = 'hidden';
  $div.style.position = 'fixed';

  //处理transform属性的兼容性
  var transformProperty = 'transform';
  if('transform' in $div.style){
      transformProperty='transform'
  } else if( 'WebkitTransform' in $div.style ){
      transformProperty='webkitTransform'
  } else if('MozTransform' in $div.style){
      transformProperty='MozTransform'
  } else if('OTransform' in $div.style){
      transformProperty='OTransform'
  }

  $div.style[transformProperty] = transform;
  document.body.appendChild($div);

  var style = window.getComputedStyle($div);
  var matrix = style[transformProperty];

  document.body.removeChild($div);

  return matrix;
}

export const matrixArrayToCssMatrix = (array: number[]) => {
  return "matrix3d(" + array.join(',') + ")";
}
export const multipleMatrix = (matrixA: number[], matrixB: number[]) => {
  let res = [];
  let b = 0;
  for (let k = 0; k < 16; k++) {
      let a = Math.floor(k / 4);
      let n = 0;

      for (let j = 0; j < 16; j += 4) {
          n += matrixA[a + j] * matrixB[b + j];
      }
      b++;
      if (b == 4) b = 0;
      res.push(n)
  }
  return res;
}
const translation = (tx:number,ty:number,tz:number) => {
  return [
    1,0,0,0,
    0,1,0,0,
    0,0,1,0,
    tx,ty,tz,1
  ]
}

const scale = (tx:number,ty:number,tz:number) => {
  return [
    tx,0,0,0,
    0,ty,0,0,
    0,0,tz,0,
    0,0,0,1
  ]
}

export const scale2d = (tx:number,ty:number, matrix: number[] = scale(1,1,1)) => {
  return multipleMatrix( matrix, scale(tx,ty,1));
}

export const scale3d = (tx:number,ty:number,tz:number, matrix: number[] = scale(1,1,1)) => {
  return multipleMatrix( matrix, scale(tx,ty,tz));
}

export const translate2d = (x:number = 0, y:number = 0, matrix: number[] = translation(0,0,0)) => {
  return multipleMatrix( matrix, translation(x,y,0));
}

export const translate3d = (x:number = 0, y:number = 0, z:number = 0,matrix:number[] = translation(0,0,0)) => {
  return multipleMatrix( matrix, translation(x,y,z));
}