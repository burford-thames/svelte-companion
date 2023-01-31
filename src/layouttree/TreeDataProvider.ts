import * as vscode from "vscode";
import TreeItem from "./TreeItem";
import * as svelte from "svelte/compiler";
import parseScript from "./parsing/ParseScript";
import parseStyle from "./parsing/ParseStyle";
import parseTemplate from "./parsing/ParseTemplate";
class TreeDataProvider implements vscode.TreeDataProvider<TreeItem> {
  private _onDidChangeTreeData: vscode.EventEmitter<TreeItem | undefined> = new vscode.EventEmitter<TreeItem | undefined>();
  readonly onDidChangeTreeData: vscode.Event<TreeItem | undefined> = this._onDidChangeTreeData.event;

  data: TreeItem[] = [];

  constructor() {
    this.data = parseCurrentFile();
  }

  getTreeItem(element: TreeItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
    element.command = {
      command: "svelte-companion.addCode",
      title: "Add Code",
      arguments: [element],
    };
    return element;
  }

  getChildren(element?: TreeItem | undefined): vscode.ProviderResult<TreeItem[]> {
    const children = element ? element.children : this.data;

    // Filter out empty labels
    return children?.filter((child) => child.label);
  }

  refresh(): void {
    this.data = parseCurrentFile();
    this._onDidChangeTreeData.fire(undefined);
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
    if (ast.css) data.push(parseStyle(ast.css));
  } catch (error) {
    console.log("Parse error.");
  }
  return data;
}

export default TreeDataProvider;
