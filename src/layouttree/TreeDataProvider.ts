import * as vscode from "vscode";
import TreeItem from "./TreeItem";
import * as svelte from "svelte/compiler";

const source = `<script>
import { count } from './stores.js';
  export const hello = 'Hello world';
$: bye = $count;
</script>
{@html someHTML}
<div transition:fade>
  <input on:input={(e) => console.log(e)}/>
</div>
<slot></slot>
<style>
  div.oy {
    color: red;
    padding: 0 10px 10 0;
  }
  div#a:hover {
    color: blue;
  }
</style>
`;

class TreeDataProvider implements vscode.TreeDataProvider<TreeItem> {
  private _onDidChangeTreeData: vscode.EventEmitter<TreeItem | undefined> = new vscode.EventEmitter<TreeItem | undefined>();
  readonly onDidChangeTreeData: vscode.Event<TreeItem | undefined> = this._onDidChangeTreeData.event;

  data: TreeItem[] = [];

  constructor() {
    this.data = this.parseData();
  }

  getTreeItem(element: TreeItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
    return element;
  }

  getChildren(element?: TreeItem | undefined): vscode.ProviderResult<TreeItem[]> {
    return element ? element.children : this.data;
  }

  refresh(): void {
    this.data = this.parseData();
    this._onDidChangeTreeData.fire(undefined);
  }

  private parseData(): TreeItem[] {
    let data: TreeItem[] = [];

    // Get the active text editor
    const editor = vscode.window.activeTextEditor;
    if (!editor) return [];
    const source = editor.document.getText();

    // Parse the source code
    const ast = svelte.parse(source, { filename: editor.document.fileName });
    svelte.walk(ast.html, {
      enter(node: TreeItem, parent: TreeItem, key: string, index: number) {
        // do_something(node);
        // if (should_skip_children(node)) {
        // 	this.skip();
        // }
        node.label = node.type;
        node.collapsibleState = node.children && node.children.length > 0 ? vscode.TreeItemCollapsibleState.Expanded : vscode.TreeItemCollapsibleState.None;

        if (data.length === 0) {
          data.push(node);
        }
      },
      leave(node: TreeItem, parent: TreeItem, key: string, index: number) {
        // do_something_else(node);
      },
    });

    return data;
  }
}

export default TreeDataProvider;
