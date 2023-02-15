import * as vscode from "vscode";
import { TreeItem } from "../../types/LayoutTreeTypes";
import { getElementSpacing } from "../../utils/GettingPositionUtil";
import { globalTags, specificTags } from "../data";

export function addElementAbove(item: TreeItem) {
  addElementAboveOrBelow(item, "above");
}

export function addElementBelow(item: TreeItem) {
  addElementAboveOrBelow(item, "below");
}

function addElementAboveOrBelow(item: TreeItem, position: "above" | "below") {
  let insertPosition: vscode.Position;
  switch (position) {
    case "above":
      insertPosition = vscode.window.activeTextEditor?.document.positionAt(item.start ?? 0) ?? new vscode.Position(0, 0);
      break;
    case "below":
      insertPosition = vscode.window.activeTextEditor?.document.positionAt(item.end ?? 0) ?? new vscode.Position(0, 0);
      break;
  }

  // Create quick pick
  const quickPick = vscode.window.createQuickPick();

  const specificChildElementsForThisElement = specificTags.get(item.parent!.label as string) ?? [];
  quickPick.items = [...specificChildElementsForThisElement, ...globalTags];

  // Show quick pick
  quickPick.show();

  // On selection
  quickPick.onDidChangeSelection((selection) => {
    // Get selected element
    const selectedElement = selection[0].label;

    // Build element
    const element = createCodeSnippet(item, selectedElement, position);

    // Insert element
    vscode.window.activeTextEditor?.edit((editBuilder) => {
      editBuilder.insert(insertPosition, element);
    });

    // Hide quick pick
    quickPick.hide();
  });
}

function createCodeSnippet(item: TreeItem, selectedElement: string, position: "above" | "below"): string {
  let element: string;
  element = `<${selectedElement}></${selectedElement}>`;

  const elementSpacing = getElementSpacing(item);
  switch (position) {
    case "above":
      return `${element}\n${elementSpacing}`;
    case "below":
      return `\n${elementSpacing}${element}`;
  }
}
