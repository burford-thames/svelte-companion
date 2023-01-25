import * as vscode from "vscode";
import { parseCurrentFile } from "./ParseUtil";
import TreeItem from "./TreeItem";

class TreeDataProvider implements vscode.TreeDataProvider<TreeItem> {
  private _onDidChangeTreeData: vscode.EventEmitter<TreeItem | undefined> = new vscode.EventEmitter<TreeItem | undefined>();
  readonly onDidChangeTreeData: vscode.Event<TreeItem | undefined> = this._onDidChangeTreeData.event;

  data: TreeItem[] = [];

  constructor() {
    this.data = parseCurrentFile();
  }

  getTreeItem(element: TreeItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
    return element;
  }

  getChildren(element?: TreeItem | undefined): vscode.ProviderResult<TreeItem[]> {
    return element ? element.children : this.data;
  }

  refresh(): void {
    this.data = parseCurrentFile();
    this._onDidChangeTreeData.fire(undefined);
  }
}

export default TreeDataProvider;
