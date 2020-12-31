// canvas转dataURL：canvas对象、转换格式、图像品质
export const canvasToDataURL = (canvas: HTMLCanvasElement, format?: string, quality?: number) => {
  return canvas.toDataURL(format||'image/jpeg', quality||1.0);
}


// DataURL转canvas
export const dataURLToCanvas = (dataUrl: string) => {
  return new Promise((resolve, reject) => {
    if(!dataUrl) {
      reject(new Error('dataUrl length error'));
    }
    const element: HTMLElement = document.createElement('CANVAS');
    const canvas = element as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    dataURLToImage(dataUrl).then((res: HTMLImageElement) => {
      canvas.width = res.width;
      canvas.height = res.height;
      ctx.drawImage(res, 0, 0);
      resolve(canvas);
    }).catch(reject);
  });
}

// image转canvas：图片地址
export const imageToCanvas = (src: string) => {
  return new Promise((resolve, reject) => {
    if(!src) {
      reject(new Error('dataUrl length error'));
    }
    const element: HTMLElement = document.createElement('CANVAS');
    const canvas = element as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    dataURLToImage(src).then((res: HTMLImageElement) => {
      canvas.width = res.width;
      canvas.height = res.height;
      ctx.drawImage(res, 0, 0);
      resolve(canvas);
    }).catch(reject);
  });
}

// canvas转image
export const canvasToImage = (canvas: HTMLCanvasElement) => {
  return dataURLToImage(canvas.toDataURL('image/jpeg', 1.0))
}

// File/Blob对象转DataURL
export const fileOrBlobToDataURL = (obj: File | Blob) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      resolve(e.target.result);
    };
    fileReader.onerror = (e) => {
      reject(e);
    };
    fileReader.readAsDataURL(obj);
  })
}
// DataURL转Blob对象
export const dataURLToBlob = (dataUrl: string) => {
  var arr = dataUrl.split(',');
  var mime = arr[0].match(/:(.*?);/)[1];
  var bstr = atob(arr[1]);
  var n = bstr.length;
  var u8arr = new Uint8Array(n);
  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {type:mime});
}
// Blob转image
export const blobToImage = (blob: Blob, cb: Function) => {
  return new Promise((resolve, reject) => {
    fileOrBlobToDataURL(blob).then((res: string) => {
      dataURLToImage(res).then(resolve).catch(reject);
    }).catch(reject);
  });
}
// image转Blob
export const imageToBlob = (src: string, cb: Function) => {
  return new Promise((resolve, reject) => {
    imageToCanvas(src).then((canvas: HTMLCanvasElement)=>{
      resolve(dataURLToBlob(canvasToDataURL(canvas)));
    }).catch(reject);
  });
}
// Blob转canvas
export const BlobToCanvas = (blob: Blob, cb: Function) => {
  return new Promise((resolve, reject) => {
    fileOrBlobToDataURL(blob).then((res: string) => {
      dataURLToCanvas(res).then(resolve).catch(reject);
    }).catch(reject);
  });
}
// canvas转Blob
export const canvasToBlob = (canvas: HTMLCanvasElement) => {
  return dataURLToBlob(canvasToDataURL(canvas));
}
// image转dataURL
export const imageToDataURL = (src: string) => {
  return new Promise((resolve, reject) => {
    imageToCanvas(src).then((canvas: HTMLCanvasElement) => {
      resolve(canvasToDataURL(canvas));
    }).catch(reject);
  });
}
// dataURL转image，这个不需要转，直接给了src就能用
export const dataURLToImage = (dataUrl: string) => {
  return new Promise((resolve, reject) => {
    var img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = dataUrl;
  });
}