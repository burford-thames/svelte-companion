import * as vscode from "vscode";
import { TreeItem } from "../layouttree/LayoutTreeTypes";
import { getEditorSpacing, getElementSpacing, getInnerHtmlStartingPosition } from "../utils/GettingPositionUtil";

export default function addElement(item: TreeItem) {
  const innerHtmlStart = getInnerHtmlStartingPosition(item);
  const spacing = getElementSpacing(item);
  const elementSpacing = getEditorSpacing();

  // Declare list of possible elements
  const elements: string[] = ["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "p"];

  // Create quick pick
  const quickPick = vscode.window.createQuickPick();
  quickPick.items = elements.map((e) => {
    return {
      label: e,
    };
  });

  // Show quick pick
  quickPick.show();

  // On selection
  quickPick.onDidChangeSelection((selection) => {
    // Get selected element
    const selectedElement = selection[0].label;

    // Insert element
    vscode.window.activeTextEditor?.edit((editBuilder) => {
      editBuilder.insert(innerHtmlStart, `\n${spacing + elementSpacing}<${selectedElement}></${selectedElement}>\n${spacing}`);
    });

    // Hide quick pick
    quickPick.hide();
  });
}
