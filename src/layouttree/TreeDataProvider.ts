import * as svelte from "svelte/compiler";
import * as vscode from "vscode";
import parseTemplate from "./parsing/ParseTemplate";
import { TreeItem } from "./LayoutTreeTypes";
import parseScript from "./parsing/ParseScript";
class TreeDataProvider implements vscode.TreeDataProvider<TreeItem> {
  private _onDidChangeTreeData: vscode.EventEmitter<TreeItem | undefined> = new vscode.EventEmitter<TreeItem | undefined>();
  readonly onDidChangeTreeData: vscode.Event<TreeItem | undefined> = this._onDidChangeTreeData.event;

  data: TreeItem[] = [];

  hideSecondaryNode: boolean = false;

  constructor() {
    this.data = parseCurrentFile();
  }

  getTreeItem(element: TreeItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
    element.command = {
      command: "svelte-companion.jumpToCode",
      title: "Jump To Code",
      arguments: [element],
    };
    // If all children are secondary and hideSecondaryNode is true, then make this node collapsibleState None
    if (!element.children || (this.hideSecondaryNode && element.children.every((child) => child.isSecondary))) {
      element.collapsibleState = vscode.TreeItemCollapsibleState.None;
    } else if (element.children.length > 0 && element.collapsibleState === undefined) {
      element.collapsibleState = vscode.TreeItemCollapsibleState.Expanded;
    }

    return element;
  }

  getChildren(element?: TreeItem | undefined): vscode.ProviderResult<TreeItem[]> {
    const children = element ? element.children : this.data;

    // Filter out secondary nodes
    if (this.hideSecondaryNode) {
      return children?.filter((child) => !child.isSecondary && child.label);
    }

    // Filter out empty labels
    return children?.filter((child) => child.label);
  }

  refresh(): void {
    this.data = parseCurrentFile();
    this._onDidChangeTreeData.fire(undefined);
  }

  refreshElement(element: TreeItem): void {
    this._onDidChangeTreeData.fire(element);
  }
}

function parseCurrentFile(): TreeItem[] {
  let data: TreeItem[] = [];

  // Get the active text editor
  const editor = vscode.window.activeTextEditor;
  if (!editor) return [];
  const source = editor.document.getText();

  try {
    // Parse the svelte file
    const ast = svelte.parse(source, { filename: editor.document.fileName });
    // if (ast.module) data.push(parseScript(ast.module));
    if (ast.instance) data.push(parseScript(ast.instance));
    data.push(parseTemplate(ast.html));
    // if (ast.css) data.push(parseStyle(ast.css));
  } catch (error) {
    console.log("Parse error.");
  }
  return data;
}

export default TreeDataProvider;
