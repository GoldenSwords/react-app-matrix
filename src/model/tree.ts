export interface treeNode {
  text: string;
  id: string;
  type: treeNodeType;
  checked?: boolean;
  disabled?: boolean;
  children?: treeNode[];
}

export enum treeNodeType {
  page ='page',
  jurisdiction = 'jurisdiction',
  interface = 'interface', 
}

export enum treeDataType {
  jurisdiction = 'jurisdiction'
}