import * as vscode from "vscode";
import { TreeItem } from "../../types/LayoutTreeTypes";
import { getEditorSpacing, getElementSpacing, getInnerHtmlStartingPosition } from "../../utils/GettingPositionUtil";
import { globalTags, specificTags } from "../data";

export default function addElement(item: TreeItem) {
  const innerHtmlStart = getInnerHtmlStartingPosition(item);
  const elementSpacing = getElementSpacing(item);
  const editorSpacing = getEditorSpacing();

  // Create quick pick
  const quickPick = vscode.window.createQuickPick();

  const specificChildElementsForThisElement = specificTags.get(item.label as string) ?? [];
  quickPick.items = [...specificChildElementsForThisElement, ...globalTags];

  // Show quick pick
  quickPick.show();

  // On selection
  quickPick.onDidChangeSelection((selection) => {
    // Get selected element
    const selectedElement = selection[0].label;

    // Build element
    let element: string;

    // If the new element and the parent element are on the same line, add a new line
    const itemPosition = vscode.window.activeTextEditor?.document.positionAt(item.start ?? 0);
    if (itemPosition?.line === innerHtmlStart.line) {
      element = `\n${elementSpacing + editorSpacing}<${selectedElement}></${selectedElement}>\n${elementSpacing}`;
    } else {
      element = `<${selectedElement}></${selectedElement}>\n${elementSpacing + editorSpacing}`;
    }

    // Insert element
    vscode.window.activeTextEditor?.edit((editBuilder) => {
      editBuilder.insert(innerHtmlStart, element);
    });

    // Hide quick pick
    quickPick.hide();
  });
}
