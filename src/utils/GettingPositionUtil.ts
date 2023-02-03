import * as vscode from 'vscode';
import { TreeItem } from '../layouttree/LayoutTreeTypes';

export function getInnerHtmlStartingPosition(item: TreeItem) {
  const document = vscode.window.activeTextEditor?.document;
  const elementEndPosition = document?.positionAt(item.end || 0) || new vscode.Position(0, 0);
  let innerHtmlStart: vscode.Position;

  // If the element has elements inside it, the inner html starts at the first child
  if (item.children && item.children.length > 0) {
    const firstChild = item.children[0];
    innerHtmlStart = document?.positionAt(firstChild.start || 0) || new vscode.Position(0, 0);
  } else {
    innerHtmlStart = elementEndPosition.translate(0, - (item.label as string).length - 3);
  }
  return innerHtmlStart;
}

export function getElementSpacing(item: TreeItem) {
  const document = vscode.window.activeTextEditor?.document;
  const elementStartPosition = document?.positionAt(item.start || 0) || new vscode.Position(0, 0);
  const line = document?.lineAt(elementStartPosition.line).text || '';
  const spacing = line.substring(0, elementStartPosition.character);
  return spacing;
}

export function getEditorSpacing() {
  const tabSize = vscode.workspace.getConfiguration('editor').get('tabSize') as number;
  const insertSpaces = vscode.workspace.getConfiguration('editor').get('insertSpaces') as boolean;
  const elementSpacing = insertSpaces ? ' '.repeat(tabSize) : '\t';
  return elementSpacing;
}