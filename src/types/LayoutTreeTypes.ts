import { BaseNode } from 'estree-walker';
import * as vscode from 'vscode';

export type TreeItem = vscode.TreeItem & {
  children?: TreeItem[];
  parent?: TreeItem;
  isSecondary: boolean;
  start?: vscode.Position;
  end?: vscode.Position;
};

export type Node = BaseNode & {
  treeItem?: TreeItem;
  children?: Node[];
  start?: number;
  end?: number;
};
