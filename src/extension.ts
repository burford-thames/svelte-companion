import * as vscode from "vscode";
import jumpToCode from "./layouttree/JumpToCode";
import TreeDataProvider from "./layouttree/TreeDataProvider";
import TreeItem from "./layouttree/TreeItem";
import { addCode } from "./modifycode/AddCode";

export function activate(context: vscode.ExtensionContext) {
  // Register command that will be called when the user clicks on the tree item
  let addCodeCommand = vscode.commands.registerCommand("svelte-companion.addCode", (item: TreeItem) => {
    // Insert the text at the current cursor position
    addCode(item.start || 0, item.end || 0);
  });

  // Register the tree data provider
  let tree = new TreeDataProvider();
  let layoutTree = vscode.window.registerTreeDataProvider("svelteLayout", tree);

  let refreshCommand = vscode.commands.registerCommand("svelte-companion.refreshLayoutTree", () => {
    tree.refresh();
  });

  let jumpToCodeCommand = vscode.commands.registerCommand("svelte-companion.jumpToCode", (item: TreeItem) => {
    jumpToCode(item.start || 0);
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
  context.subscriptions.push(addCodeCommand);
  context.subscriptions.push(jumpToCodeCommand);
}

// This method is called when your extension is deactivated
export function deactivate() {}
