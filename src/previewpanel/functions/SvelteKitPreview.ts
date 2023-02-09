import * as vscode from "vscode";

export function injectSvelteKitPreview(injectionFolder: vscode.Uri) {
  // Get the path to the routes folder
  const routesFolder = vscode.workspace.getConfiguration("svelte-companion").get("routesFolder") as string;
  const routesFolderPath = vscode.Uri.file(routesFolder);

  // Delete the file in the routes folder
  vscode.workspace.fs.delete(routesFolderPath);
}

export function disposeSvelteKitPreview(injectionFolder: vscode.Uri) {
  // Get the path to the routes folder
  const routesFolder = vscode.workspace.getConfiguration("svelte-companion").get("routesFolder") as string;
  const routesFolderPath = vscode.Uri.file(routesFolder);

  // Delete the file in the routes folder
  vscode.workspace.fs.delete(routesFolderPath);
}

export function refreshSvelteKitPreview(injectionFolder: vscode.Uri) {}
