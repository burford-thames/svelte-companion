import { BaseNode } from 'estree-walker';
import * as vscode from 'vscode';

type TreeItem = vscode.TreeItem & BaseNode & {
  children?: TreeItem[];
};

export default TreeItem;