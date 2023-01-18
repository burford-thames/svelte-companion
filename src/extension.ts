import * as vscode from "vscode";
import * as svelte from "svelte/compiler";
import { BaseNode } from "estree-walker";

export function activate(context: vscode.ExtensionContext) {
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
  let root: TreeItem | undefined;

  const ast = svelte.parse(source, { filename: "App.svelte" });
  svelte.walk(ast.html, {
    enter(node: TreeItem, parent: TreeItem, key: string, index: number) {
      // do_something(node);
      // if (should_skip_children(node)) {
      // 	this.skip();
      // }
      // console.log(padding + node.type + " " + index);
      const treeItem: TreeItem = {
        type: node.type,
        children: node.children,
        label: node.type,
        collapsibleState: node.children ? vscode.TreeItemCollapsibleState.Expanded : vscode.TreeItemCollapsibleState.None,
      };
      if (root === undefined) {
        root = treeItem;
      }
      
    },
    leave(node: any, parent: any, prop: any, index: any) {
      // do_something_else(node);
    },
  });
  console.log(root);
  

  let disposable = vscode.commands.registerCommand(
    "svelte-companion.helloWorld",
    () => {
      vscode.window.showInformationMessage(
        "Hello World from Svelte companion!"
      );
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}

interface TreeItem extends vscode.TreeItem, BaseNode {
  children?: TreeItem[];
}

interface Input {}
interface Output {}