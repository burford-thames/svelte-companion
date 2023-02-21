import * as vscode from "vscode";
import { TreeItem } from "../../types/LayoutTreeTypes";

export default function deleteElement(item: TreeItem) {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    return;
  }

  // Get the selection of the tree item
  const selectionOfElement = new vscode.Selection(item.start!, item.end!);
  const endOfElement = editor.document.lineAt(selectionOfElement.end.line).range.end;
  let selectionToBeDeleted: vscode.Selection;

  // Delete whole line if the selection is at the end of the line
  if (selectionOfElement.end.isEqual(endOfElement)) {
    // Delete whole lines
    const startOfElementLine = editor.document.lineAt(selectionOfElement.start.line).range.start;
    const startOfAfterElementLine = editor.document.lineAt(selectionOfElement.end.line).range.start.translate(1, 0);
    selectionToBeDeleted = new vscode.Selection(startOfElementLine, startOfAfterElementLine);
  } else if (item.contextValue === "text") {
    // Delete the selection
    selectionToBeDeleted = selectionOfElement;
  } 
  else {
    // Delete the selection and the previous whitespace
    selectionToBeDeleted = new vscode.Selection(selectionOfElement.start.translate(0, -1), selectionOfElement.end);
  }

  editor.edit((editBuilder) => {
    editBuilder.delete(selectionToBeDeleted);
  });
  vscode.window.activeTextEditor?.document.save();
}
