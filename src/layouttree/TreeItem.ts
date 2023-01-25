import { Node } from 'estree';
import { BaseNode } from 'estree-walker';
import * as vscode from 'vscode';

type TreeItem = vscode.TreeItem & BaseNode & {
  children?: TreeItem[];
  content?: [Node];
  start?: number;
  end?: number;
};

export default TreeItem;