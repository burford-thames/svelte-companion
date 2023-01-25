import * as vscode from "vscode";

export function addCode() {
  let editor = vscode.window.activeTextEditor;
  let position = editor?.selection.active;
  editor?.edit((editBuilder) => {
    editBuilder.insert(position || new vscode.Position(0, 0), "Hello World!");
  });
}
