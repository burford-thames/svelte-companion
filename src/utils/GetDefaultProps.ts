import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
import * as util from "util";

// Check the .vscode/props-default.json file for default props
// If it exists, use it to populate the props object
// If it doesn't exist, use an empty object
export function getComponentDefaultProps(componentFilePath: string): string {

  // Read contents of the .vscode/props-default.json file
  const propsDefaultFile = vscode.Uri.file(path.join(vscode.workspace.workspaceFolders![0].uri.fsPath, ".vscode", "prop-defaults.json"));
  // Check if propsDefaultFile exists
  if (!fs.existsSync(propsDefaultFile.fsPath)) {
    return "{}";
  }
  // If it exists, read the file
  const propsDefaultFileContent = fs.readFileSync(propsDefaultFile.fsPath, "utf-8");
  // Get the component config from the .vscode/props-default.json file
  const componentFileName = path.basename(componentFilePath, ".svelte");
  const componentConfig = JSON.parse(propsDefaultFileContent)?.[componentFileName];

  // If the component config exists, use it to populate the props object
  if (!componentConfig) {
    return "{}";
  }

  return util.inspect(componentConfig);
}
