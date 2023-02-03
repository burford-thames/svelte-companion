import * as vscode from 'vscode';
import { TreeItem } from '../layouttree/LayoutTreeTypes';

export function getInnerHtmlStartingPosition(item: TreeItem) {
  const document = vscode.window.activeTextEditor?.document;
  const elementStartPosition = document?.positionAt(item.start || 0) || new vscode.Position(0, 0);
  let innerHtmlStart: vscode.Position;

  // If the element has a child that is element, then the inner html starts at the first child
  const firstElementChild = item.children?.find((child) => child.contextValue === 'element');
  if (firstElementChild) {
    innerHtmlStart = document?.positionAt(firstElementChild.start || 0) || new vscode.Position(0, 0);
  } else {
    innerHtmlStart = elementStartPosition.translate(0, (item.label as string).length + 2);
  }
  return innerHtmlStart;
}

export function getElementSpacing(item: TreeItem) {
  const document = vscode.window.activeTextEditor?.document;
  const elementStartPosition = document?.positionAt(item.start || 0) || new vscode.Position(0, 0);
  const line = document?.lineAt(elementStartPosition.line).text || '';
  const elementSpacing = line.substring(0, elementStartPosition.character);
  return elementSpacing;
}

export function getEditorSpacing() {
  const tabSize = vscode.workspace.getConfiguration('editor').get('tabSize') as number;
  const insertSpaces = vscode.workspace.getConfiguration('editor').get('insertSpaces') as boolean;
  const editorSpacing = insertSpaces ? ' '.repeat(tabSize) : '\t';
  return editorSpacing;
}