import * as vscode from "vscode";
import { TreeItem } from "../../types/LayoutTreeTypes";
import { emptyTags, globalTags } from "../elementData";

export function addElementToTemplate(item: TreeItem) {
  const insertPosition = vscode.window.activeTextEditor?.document.positionAt(item.end ?? vscode.window.activeTextEditor?.document.getText().length ?? 0) ?? new vscode.Position(0, 0);

  // Create quick pick
  const quickPick = vscode.window.createQuickPick();
  quickPick.items = globalTags;

  // Show quick pick
  quickPick.show();

  // On selection
  quickPick.onDidChangeSelection((selection) => {
    const selectedElement = selection[0].label;
    let element: string;

    // If selected element is an empty tag, don't add closing tag
    if (emptyTags.includes(selectedElement)) {
      element = `<${selectedElement}/>`;
    } else {
      element = `<${selectedElement}></${selectedElement}>`;
    }

    // Insert element
    vscode.window.activeTextEditor?.edit((editBuilder) => {
      editBuilder.insert(insertPosition, element);
    });
    vscode.window.activeTextEditor?.document.save();

    // Hide quick pick
    quickPick.hide();
  });
}
