import { BaseNode } from 'estree-walker';
import * as vscode from 'vscode';

type TreeItem = vscode.TreeItem & BaseNode & {
  children?: TreeItem[];
  start?: number;
  end?: number;
};

export default TreeItem;