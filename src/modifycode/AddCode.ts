import * as vscode from "vscode";

export function addCode(start: number, end: number) {
  let editor = vscode.window.activeTextEditor;
  let lineAndColumn = editor?.document.positionAt(end);

  // Create a quick pick item
  const items: vscode.QuickPickItem[] = [
    {
      label: "Hello",
      description: "World",
      detail: "\n<h1>Hello World</h1>"
    },
    {
      label: "Hello",
      description: "World",
      detail: "\n<h1>Hello World</h1>"
    }
  ];

  // Open quick pick
  vscode.window.showQuickPick(items).then((item) => {
    if (item) {
      editor?.edit((editBuilder) => {
        editBuilder.insert(lineAndColumn || new vscode.Position(0, 0), item.detail || "");
      });
    }
  });
}
