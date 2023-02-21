import * as vscode from "vscode";
import { TreeItem } from "../../types/LayoutTreeTypes";

export default function deleteElement(item: TreeItem) {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    return;
  }

  // Get the selection of the tree item
  const selectionOfElement = new vscode.Selection(item.start!, item.end!);
  let selectionToBeDeleted: vscode.Selection;

  switch (item.contextValue) {
    case "attribute":
    case "event":
      // Delete the selection and the previous whitespace
      selectionToBeDeleted = new vscode.Selection(selectionOfElement.start.translate(0, -1), selectionOfElement.end);
      break;
    default:
      // Check if the selection starts at the beginning of the line and ends at the end of the line
      if (elementTakeWholeLine(item)) {
        // Delete whole lines
        const startOfElementLine = editor.document.lineAt(selectionOfElement.start.line).range.start;
        const startOfAfterElementLine = editor.document.lineAt(selectionOfElement.end.line).range.start.translate(1, 0);
        selectionToBeDeleted = new vscode.Selection(startOfElementLine, startOfAfterElementLine);
      } else {
        selectionToBeDeleted = selectionOfElement;
      }
      break;
  }

  editor.edit((editBuilder) => {
    editBuilder.delete(selectionToBeDeleted);
  });
  vscode.window.activeTextEditor?.document.save();
}

function elementTakeWholeLine(item: TreeItem): boolean {
  const document = vscode.window.activeTextEditor?.document;

  // Get the string from start of line to start of element
  const startOfLine = document?.lineAt(item.start?.line!).range.start;
  const startOfElement = item.start;
  const leftRange = new vscode.Range(startOfLine!, startOfElement!);
  const leftText = document?.getText(leftRange);

  // Get the string from end of element to end of line
  const endOfLine = document?.lineAt(item.end?.line!).range.end;
  const endOfElement = item.end;
  const rightRange = new vscode.Range(endOfElement!, endOfLine!);
  const rightText = document?.getText(rightRange);

  // Check if the string is empty
  if (leftText?.trim() === "" && rightText?.trim() === "") {
    return true;
  }
  return false;
}
