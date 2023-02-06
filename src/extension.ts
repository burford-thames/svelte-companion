import * as vscode from "vscode";
import jumpToCode from "./modifycode/JumpToCode";
import TreeDataProvider from "./layouttree/TreeDataProvider";
import { TreeItem } from "./layouttree/LayoutTreeTypes";
import addElement from "./modifycode/AddElement";
import deleteElement from "./modifycode/DeleteElement";

export function activate(context: vscode.ExtensionContext) {
  // Register the tree data provider
  let tree = new TreeDataProvider();
  let layoutTree = vscode.window.registerTreeDataProvider("svelteLayout", tree);

  let refreshCommand = vscode.commands.registerCommand("svelte-companion.refreshLayoutTree", () => {
    tree.refresh();
  });

  // Fire the refresh command when the active text editor changes
  const onDidChangeActiveTextEditor = vscode.window.onDidChangeActiveTextEditor(() => {
    vscode.commands.executeCommand("svelte-companion.refreshLayoutTree");
  });

  // Fire the refresh command when text changes
  const onDidChangeTextDocument = vscode.workspace.onDidChangeTextDocument(() => {
    vscode.commands.executeCommand("svelte-companion.refreshLayoutTree");
  });

  // Register command that open preview panel to the side
  let openPreviewCommand = vscode.commands.registerCommand("svelte-companion.showPreview", () => {
    // Split and Open the preview panel to the side
    // vscode.commands.executeCommand("vscode.openWith", vscode.window.activeTextEditor?.document.uri, "svelte-companion.previewPanel", { viewColumn: vscode.ViewColumn.Beside });
    
    // Open simple vscode browser preview to the side
    vscode.commands.executeCommand("simpleBrowser.show", vscode.Uri.parse("https://svelte.dev/repl/"));
  });

  // Register command that will be called when the user clicks on the tree item
  let jumpToCodeCommand = vscode.commands.registerCommand("svelte-companion.jumpToCode", (item: TreeItem) => {
    jumpToCode(item);
  });

  let toggleSecondaryCommand = vscode.commands.registerCommand("svelte-companion.toggleSecondary", () => {
    tree.hideSecondaryNode = !tree.hideSecondaryNode;
    tree.refresh();
  });

  let addElementCommand = vscode.commands.registerCommand("svelte-companion.addElement", (item: TreeItem) => {
    addElement(item);
    tree.refreshElement(item);
  });

  let addElementPropertiesCommand = vscode.commands.registerCommand("svelte-companion.addElementProperties", (item: TreeItem) => {
    vscode.window.showInformationMessage("Add element properties");
  });

  let deleteElementCommand = vscode.commands.registerCommand("svelte-companion.deleteElement", (item: TreeItem) => {
    deleteElement(item);
  });

  context.subscriptions.push(layoutTree);
  context.subscriptions.push(refreshCommand);
  context.subscriptions.push(jumpToCodeCommand);
  context.subscriptions.push(addElementCommand);
  context.subscriptions.push(addElementPropertiesCommand);
  context.subscriptions.push(deleteElementCommand);
  context.subscriptions.push(toggleSecondaryCommand);
  context.subscriptions.push(onDidChangeActiveTextEditor);
  context.subscriptions.push(onDidChangeTextDocument);
  context.subscriptions.push(openPreviewCommand);

}

// This method is called when your extension is deactivated
export function deactivate() {}
