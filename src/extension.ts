import * as vscode from "vscode";
import jumpToCode from "./layouttree/functions/JumpToCode";
import TreeDataProvider from "./layouttree/TreeDataProvider";
import { TreeItem } from "./types/LayoutTreeTypes";
import addElementAsLastChild from "./modifycode/functions/AddElementAsLastChild";
import deleteElement from "./modifycode/functions/DeleteElement";
import PreviewCodeInjector from "./previewpanel/PreviewCodeInjector";
import { getProjectType } from "./utils/GetProjectTypeUtil";
import openPreviewPanel from "./previewpanel/functions/OpenPreviewPanel";
import { addElementAbove, addElementBelow } from "./modifycode/functions/AddElementAboveOrBelow";
import { addElementToTemplate } from "./modifycode/functions/AddElementToTemplate";
import { addAttribute } from "./modifycode/functions/AddAttribute";

let previewCodeInjector: PreviewCodeInjector;

export function activate(context: vscode.ExtensionContext) {
  const workspace = vscode.workspace.workspaceFolders;
  if (!workspace) {
    return;
  }
  
  const projectType = getProjectType();
  if (projectType === undefined) {
    return;
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
  previewCodeInjector = new PreviewCodeInjector(projectType);

  // Register command that open preview panel to the side
  let openPreviewCommand = vscode.commands.registerCommand("svelte-companion.showPreview", () => {
    // Open simple vscode browser preview to the side
    openPreviewPanel(previewCodeInjector);
  });

  let injectPreviewCodeCommand = vscode.commands.registerCommand("svelte-companion.injectPreviewCode", () => {
    previewCodeInjector.injectPreviewCode();
    // Open simple vscode browser preview to the side
    openPreviewPanel(previewCodeInjector);
  });

  let disposePreviewCodeCommand = vscode.commands.registerCommand("svelte-companion.disposePreviewCode", () => {
    previewCodeInjector.disposePreviewCode();
  });
  //#endregion

  //#region Modify code
  let addElementCommand = vscode.commands.registerCommand("svelte-companion.addElement", (item: TreeItem) => {
    addElementAsLastChild(item);
  });

  let addElementAboveCommand = vscode.commands.registerCommand("svelte-companion.addElementAbove", (item: TreeItem) => {
    addElementAbove(item);
  });

  let addElementBelowCommand = vscode.commands.registerCommand("svelte-companion.addElementBelow", (item: TreeItem) => {
    addElementBelow(item);
  });

  let addElementToTemplateCommand = vscode.commands.registerCommand("svelte-companion.addElementToTemplate", (item: TreeItem) => {
    addElementToTemplate(item);
  });

  let addAttributeCommand = vscode.commands.registerCommand("svelte-companion.addAttribute", (item: TreeItem) => {
    addAttribute(item);
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

  context.subscriptions.push(previewCodeInjector.statusBarItem);
  context.subscriptions.push(layoutTree);
  context.subscriptions.push(refreshCommand);
  context.subscriptions.push(jumpToCodeCommand);
  context.subscriptions.push(addElementCommand);
  context.subscriptions.push(addElementAboveCommand);
  context.subscriptions.push(addElementBelowCommand);
  context.subscriptions.push(addElementToTemplateCommand);
  context.subscriptions.push(addAttributeCommand);
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
