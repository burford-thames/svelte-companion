import * as vscode from "vscode";
import jumpToCode from "./layouttree/functions/JumpToCode";
import TreeDataProvider from "./layouttree/TreeDataProvider";
import { TreeItem } from "./types/LayoutTreeTypes";
import addElement from "./modifycode/functions/AddElement";
import deleteElement from "./modifycode/functions/DeleteElement";
import PreviewCodeInjector from "./previewpanel/PreviewCodeInjector";

export function activate(context: vscode.ExtensionContext) {
  let workspace = vscode.workspace.workspaceFolders;
  if (!workspace) {
    throw new Error("No workspace found");
  }

  //#region Tree data provider
  let tree = new TreeDataProvider();
  let layoutTree = vscode.window.registerTreeDataProvider("svelteLayout", tree);

  let refreshCommand = vscode.commands.registerCommand("svelte-companion.refreshLayoutTree", () => {
    tree.refresh();
  });

  // Register command that will be called when the user clicks on the tree item
  let jumpToCodeCommand = vscode.commands.registerCommand("svelte-companion.jumpToCode", (item: TreeItem) => {
    jumpToCode(item);
  });

  let toggleSecondaryCommand = vscode.commands.registerCommand("svelte-companion.toggleSecondary", () => {
    tree.hideSecondaryNode = !tree.hideSecondaryNode;
    tree.refresh();
  });
  //#endregion

  //#region Preview
  // Initialize the code injector
  const previewCodeInjector = new PreviewCodeInjector();

  // Register command that open preview panel to the side
  let openPreviewCommand = vscode.commands.registerCommand("svelte-companion.showPreview", () => {
    // Open simple vscode browser preview to the side
    vscode.commands.executeCommand("workbench.action.newGroupRight");
    vscode.commands.executeCommand("simpleBrowser.show", vscode.Uri.parse("http://localhost:5173/svelte-companion/index.html"));
  });

  let injectPreviewCodeCommand = vscode.commands.registerCommand("svelte-companion.injectPreviewCode", () => {
    previewCodeInjector.injectPreviewCode();
  });

  let disposePreviewCodeCommand = vscode.commands.registerCommand("svelte-companion.disposePreviewCode", () => {
    previewCodeInjector.disposePreviewCode();
  });
  //#endregion

  //#region Modify code
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
  //#endregion

  // Fire the refresh command when the active text editor changes
  const onDidChangeActiveTextEditor = vscode.window.onDidChangeActiveTextEditor(() => {
    vscode.commands.executeCommand("svelte-companion.refreshLayoutTree");
    previewCodeInjector.refreshPreviewCode();
  });

  // Fire the refresh command when text changes
  const onDidChangeTextDocument = vscode.workspace.onDidChangeTextDocument(() => {
    vscode.commands.executeCommand("svelte-companion.refreshLayoutTree");
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
  context.subscriptions.push(injectPreviewCodeCommand);
  context.subscriptions.push(disposePreviewCodeCommand);

}

// This method is called when your extension is deactivated
export function deactivate() {}
