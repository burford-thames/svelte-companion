import * as vscode from "vscode";

export function addCode(start: number, end: number) {
  let editor = vscode.window.activeTextEditor;
  let lineAndColumn = editor?.document.positionAt(start);

  editor?.edit((editBuilder) => {
    editBuilder.insert(lineAndColumn || new vscode.Position(0, 0), "Hello World!");
  });
}
