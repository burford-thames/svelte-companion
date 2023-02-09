import * as vscode from "vscode";

export default function getComponentFilePath(): string {
  // Get the relative path of the active file
  if (!vscode.window.activeTextEditor) {
    return "./App.svelte";
  }

  // Get path of the active file
  let componentFilePath = vscode.window.activeTextEditor.document.uri.path;

  // If the active file is a .svelte file, import it
  if (!componentFilePath?.endsWith(".svelte")) {
    return "./App.svelte";
  }

  return componentFilePath;
}
