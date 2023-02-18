import * as vscode from "vscode";
import { TreeItem } from "../types/LayoutTreeTypes";

export function getInnerHtmlStartingPosition(item: TreeItem): vscode.Position {
  const elementStartPosition = item.start;
  let innerHtmlStart: vscode.Position;

  // If the element has a child that is element, then the inner html starts at the first child
  const firstElementChild = item.children?.find((child) => child.contextValue === "element");
  if (firstElementChild) {
    innerHtmlStart = firstElementChild.start ?? new vscode.Position(0,0);
  } else {
    innerHtmlStart = elementStartPosition!.translate(0, (item.label as string).length + 2);
  }
  return innerHtmlStart;
}

export function getInnerHtmlEndingPosition(item: TreeItem): vscode.Position {
  const elementEndPosition = item.end;
  let innerHtmlEnd: vscode.Position;

  // If the element has a child that is element, then the inner html ends at the last child
  const lastElementChild = item.children?.reverse().find((child) => child.contextValue === "element");
  if (lastElementChild) {
    innerHtmlEnd = lastElementChild.end || new vscode.Position(0, 0);
  } else {
    innerHtmlEnd = elementEndPosition!.translate(0, -(item.label as string).length - 3);
  }
  return innerHtmlEnd;
}

export function getLastAttributePosition(item: TreeItem): vscode.Position {
  const elementStartPosition = item.start || new vscode.Position(0, 0);
  
  const lastAttribute = item.children?.reverse().find((child) => child.contextValue === "attribute");
  const lastAttributePosition = lastAttribute
    ? lastAttribute.end ?? new vscode.Position(0, 0)
    : elementStartPosition.translate(0, (item.label as string).length + 1);
  return lastAttributePosition;
}

export function getElementSpacing(item: TreeItem): string {
  const document = vscode.window.activeTextEditor?.document;
  const elementStartPosition = item.start || new vscode.Position(0, 0);
  const line = document?.lineAt(elementStartPosition.line).text || "";
  const elementSpacing = line.substring(0, elementStartPosition.character);
  return elementSpacing;
}

export function getEditorSpacing(): string {
  const tabSize = vscode.workspace.getConfiguration("editor").get("tabSize") as number;
  const insertSpaces = vscode.workspace.getConfiguration("editor").get("insertSpaces") as boolean;
  const editorSpacing = insertSpaces ? " ".repeat(tabSize) : "\t";
  return editorSpacing;
}

export function getPositionFromAbsPosition(absPosition?: number): vscode.Position {
  return vscode.window.activeTextEditor!.document.positionAt(absPosition ?? 0);
}