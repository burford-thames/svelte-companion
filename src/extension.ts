import * as vscode from "vscode";
import TreeDataProvider from "./layouttree/TreeDataProvider";

export function activate(context: vscode.ExtensionContext) {
  let tree = new TreeDataProvider();
  let layoutTree = vscode.window.registerTreeDataProvider("svelteLayout", tree);

  let refreshCommand = vscode.commands.registerCommand("svelte-companion.refreshLayoutTree", () => {
    tree.refresh();
  });

  // Fire the refresh command when the active text editor changes
  vscode.window.onDidChangeActiveTextEditor(() => {
    vscode.commands.executeCommand("svelte-companion.refreshLayoutTree");
  });

  // Fire the refresh command when text changes
  vscode.workspace.onDidChangeTextDocument(() => {
    vscode.commands.executeCommand("svelte-companion.refreshLayoutTree");
  });

  context.subscriptions.push(layoutTree);
  context.subscriptions.push(refreshCommand);
}

// This method is called when your extension is deactivated
export function deactivate() {}
