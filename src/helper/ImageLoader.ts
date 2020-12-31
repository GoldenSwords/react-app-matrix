import { dataURLToImage, fileOrBlobToDataURL } from "./FileTransfer";

export const loader = (imgOpt: string | File): Promise<HTMLImageElement | Error> => {
  return new Promise((resolve, reject) => {
    if (!imgOpt) {
      reject(new Error('not a image url'));
    }
    if (typeof imgOpt === 'string') {
      dataURLToImage(imgOpt).then(resolve).catch(reject);
    } else {
      fileOrBlobToDataURL(imgOpt).then((res: string) => {
        dataURLToImage(res).then(resolve).catch(reject);
      }).catch(reject);
    }
  });
}