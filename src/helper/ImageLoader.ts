import { treeNode } from "src/model/tree";
import { dataURLToImage, fileOrBlobToDataURL } from "./FileTransfer";

export const loader = (imgOpt: string | File | string[]): Promise<HTMLImageElement | Error | HTMLImageElement[]> => {
  return new Promise((resolve, reject) => {
    if (!imgOpt) {
      reject(new Error('not a image url'));
    }
    if (typeof imgOpt === 'string') {
      dataURLToImage(imgOpt).then(resolve).catch(reject);
    } else if (imgOpt instanceof Array) {
      Promise.all(imgOpt.map(img => loader(img))).then((res: HTMLImageElement[]) => resolve(res)).catch(reject);
    } else {
      fileOrBlobToDataURL(imgOpt).then((res: string) => {
        dataURLToImage(res).then(resolve).catch(reject);
      }).catch(reject);
    }
  });
}

export const flatTree = (tree: treeNode[]) => {
  let treeNode: treeNode[] = [];
  tree.map((node: treeNode) => {
    treeNode.push(node);
    if (node.children) {
      treeNode = treeNode.concat(flatTree(node.children));
    }
  });
  return treeNode
}

export const replaceTree = (tree: treeNode[], placeNode: treeNode) => {
  return tree.map((node: treeNode) => {
    if (placeNode.id === node.id) {
      return placeNode;
    }
    if (node.children) {
      node.children = replaceTree(node.children, placeNode);
    }
    return node;
  });
}