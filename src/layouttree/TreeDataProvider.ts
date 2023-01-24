import * as vscode from "vscode";
import TreeItem from "./TreeItem";
import * as svelte from "svelte/compiler";
import HTMLNode from "./HtmlNode";

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
  onDidChangeTreeData?: vscode.Event<TreeItem | undefined | null | void> | undefined;

  data: TreeItem[] = [];

  constructor() {
    const classContext = this;

    const ast = svelte.parse(source, { filename: "App.svelte" });
    svelte.walk(ast.html, {
      enter(node: TreeItem, parent: TreeItem, key: string, index: number) {
        // do_something(node);
        // if (should_skip_children(node)) {
        // 	this.skip();
        // }
        node.label = node.type;
        node.collapsibleState = node.children && node.children.length > 0
          ? vscode.TreeItemCollapsibleState.Expanded
          : vscode.TreeItemCollapsibleState.None;

        if (classContext.data.length === 0) {
          classContext.data.push(node);
        }
        
      },
      leave(node: HTMLNode, parent: HTMLNode, key: string, index: number) {
        // do_something_else(node);
      },
    });
  }

  getTreeItem(element: TreeItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
    return element;
  }

  getChildren(element?: TreeItem | undefined): vscode.ProviderResult<TreeItem[]> {
    return element ? element.children : this.data;
  }
}

export default TreeDataProvider;
