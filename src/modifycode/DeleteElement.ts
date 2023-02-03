import * as vscode from "vscode";
import { TreeItem } from "../layouttree/LayoutTreeTypes";

export default function deleteElement(item: TreeItem) {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    return;
  }

  // Get the selection of the tree item
  const selectionOfElement = new vscode.Selection(editor.document.positionAt(item.start ?? 0), editor.document.positionAt(item.end ?? 0));
  const endOfElement = editor.document.lineAt(selectionOfElement.end.line).range.end;
  let selectionToBeDeleted: vscode.Selection;

  // Delete whole line if the selection is at the end of the line
  if (selectionOfElement.end.isEqual(endOfElement)) {
    // Delete whole lines
    const startOfElementLine = editor.document.lineAt(selectionOfElement.start.line).range.start;
    const startOfAfterElementLine = editor.document.lineAt(selectionOfElement.end.line).range.start.translate(1, 0);
    selectionToBeDeleted = new vscode.Selection(startOfElementLine, startOfAfterElementLine);
  } else {
    // Delete the selection and the previous whitespace
    selectionToBeDeleted = new vscode.Selection(selectionOfElement.start.translate(0, -1), selectionOfElement.end);
  }

  editor.edit((editBuilder) => {
    editBuilder.delete(selectionToBeDeleted);
  });
}
