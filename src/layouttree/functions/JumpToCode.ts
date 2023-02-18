import * as vscode from "vscode";
import { TreeItem } from "../../types/LayoutTreeTypes";

export default function jumpToCode(item: TreeItem) {
  // Get the column and line number of the destination
  const editor = vscode.window.activeTextEditor;
  const document = editor?.document;
  const position = item.start;
  
  // Jump to the destination
  editor?.revealRange(new vscode.Range(position!, position!));

  // Focus cursor
  editor!.selection = new vscode.Selection(position!, position!);

  // Focus the editor
  vscode.window.showTextDocument(document!);
  
}
