import * as vscode from "vscode";
import { TreeItem } from "../../types/LayoutTreeTypes";
import { emptyTags, globalTags } from "../elementData";

export function addElementToTemplate(item: TreeItem) {
  const document = vscode.window.activeTextEditor?.document;
  const insertPosition = item.end ?? document?.positionAt(document.getText().length) ?? new vscode.Position(0, 0);
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
      element = `\n<${selectedElement}/>`;
    } else {
      element = `\n<${selectedElement}></${selectedElement}>`;
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
