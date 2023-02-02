import { BaseNode } from 'estree-walker';
import * as vscode from 'vscode';

export type TreeItem = vscode.TreeItem & {
  children?: TreeItem[];
  hidden?: boolean;
  isSecondary: boolean;
  start?: number;
  end?: number;
};

export type Node = BaseNode & {
  treeItem?: TreeItem;
  children?: Node[];
  start?: number;
  end?: number;
};
