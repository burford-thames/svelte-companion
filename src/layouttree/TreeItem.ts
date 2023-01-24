import * as vscode from 'vscode';

type TreeItem = vscode.TreeItem & {
  children?: TreeItem[];
};

export default TreeItem;