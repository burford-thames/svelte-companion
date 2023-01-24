import * as vscode from 'vscode';
import TreeItem from './TreeItem';
import * as svelte from "svelte/compiler";
import HTMLNode from './HtmlNode';

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
    let root: TreeItem | undefined;

    const ast = svelte.parse(source, { filename: "App.svelte" });
    svelte.walk(ast.html, {
      enter(node: HTMLNode, parent: HTMLNode, key: string, index: number) {
        // do_something(node);
        // if (should_skip_children(node)) {
        // 	this.skip();
        // }
        const treeItem: TreeItem = {
          children: node.children,
          label: node.type,
          collapsibleState: node.children
            ? vscode.TreeItemCollapsibleState.Expanded
            : vscode.TreeItemCollapsibleState.None,
        };

        if (root === undefined) {
          root = treeItem;
        }
        // if (data.length === 0) {
        //   data.push(treeItem);
        // }
      },
      leave(node: HTMLNode, parent: HTMLNode, key: string, index: number) {
        // do_something_else(node);
      },
    });
    console.log(root);
  }

  getTreeItem(element: TreeItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
    return element;
  }

  getChildren(element?: TreeItem | undefined): vscode.ProviderResult<TreeItem[]> {
    return element ? element.children : this.data;
  }
}

export default TreeDataProvider;