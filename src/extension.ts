import * as vscode from "vscode";
import jumpToCode from "./modifycode/JumpToCode";
import TreeDataProvider from "./layouttree/TreeDataProvider";
import { TreeItem } from "./layouttree/LayoutTreeTypes";
import { addCode } from "./modifycode/AddCode";
import addElement from "./modifycode/AddElement";

export function activate(context: vscode.ExtensionContext) {
  // Register the tree data provider
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

  // Register command that will be called when the user clicks on the tree item
  let jumpToCodeCommand = vscode.commands.registerCommand("svelte-companion.jumpToCode", (item: TreeItem) => {
    jumpToCode(item.start || 0);
  });

  let addCodeCommand = vscode.commands.registerCommand("svelte-companion.addCode", (item: TreeItem) => {
    // Insert the text at the current cursor position
    addCode(item.start || 0, item.end || 0);
  });

  let addElementCommand = vscode.commands.registerCommand("svelte-companion.addElement", (item: TreeItem) => {
    addElement(item);
    tree.refreshElement(item);
  });

  let addElementPropertiesCommand = vscode.commands.registerCommand("svelte-companion.addElementProperties", (item: TreeItem) => {
    vscode.window.showInformationMessage("Add element properties");
  });

  let deleteElementCommand = vscode.commands.registerCommand("svelte-companion.deleteElement", (item: TreeItem) => {
    vscode.window.showInformationMessage("Delete element");
  });

  context.subscriptions.push(layoutTree);
  context.subscriptions.push(refreshCommand);
  context.subscriptions.push(addCodeCommand);
  context.subscriptions.push(jumpToCodeCommand);
  context.subscriptions.push(addElementCommand);
  context.subscriptions.push(addElementPropertiesCommand);
  context.subscriptions.push(deleteElementCommand);
}

// This method is called when your extension is deactivated
export function deactivate() {}
