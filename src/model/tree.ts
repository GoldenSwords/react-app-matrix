export interface treeNode {
  text: string;
  id: string;
  checked?: boolean;
  disabled?: boolean;
  children?: treeNode[];
}