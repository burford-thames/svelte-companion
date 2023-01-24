import * as vscode from "vscode";
import TreeDataProvider from "./layouttree/TreeDataProvider";

export function activate(context: vscode.ExtensionContext) {
  let tree = new TreeDataProvider();
  let layoutTree = vscode.window.registerTreeDataProvider("svelteLayout", tree);

  let disposable = vscode.commands.registerCommand("svelte-companion.helloWorld", () => {
    vscode.window.showInformationMessage("Hello World from Svelte companion!");
  });

  vscode.commands.registerCommand("svelte-companion.refreshLayoutTree", () => {
    tree.refresh();
  });

  context.subscriptions.push(disposable);
  context.subscriptions.push(layoutTree);
}

// This method is called when your extension is deactivated
export function deactivate() {}
