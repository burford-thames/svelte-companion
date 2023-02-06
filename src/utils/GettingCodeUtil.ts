import { Node } from "estree";
import * as vscode from "vscode";
import { TreeItem } from "../layouttree/types/LayoutTreeTypes";

export function getCodeAtPosition(start: number, end: number): string {
  const editor = vscode.window.activeTextEditor;
  const document = editor?.document;
  const text = document?.getText(new vscode.Range(document.positionAt(start), document.positionAt(end)));
  return text || "";
}

export function getCodeAtPositionFromNode(node: Node): string {
  const editor = vscode.window.activeTextEditor;
  const start = node.loc?.start ?? { line: 0, column: 0 };
  const end = node.loc?.end ?? { line: 0, column: 0 };

  return editor?.document.getText(new vscode.Range(start.line - 1, start.column, end.line - 1, end.column)) ?? "";
}

export function getCodeAtPositionFromTreeItem(item: TreeItem): string {
  const editor = vscode.window.activeTextEditor;
  const document = editor?.document;
  const text = document?.getText(new vscode.Range(document.positionAt(item.start || 0), document.positionAt(item.end || 0)));
  return text || "";
}
