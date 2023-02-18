import * as vscode from "vscode";
import { TreeItem } from "../../types/LayoutTreeTypes";
import { getEditorSpacing, getElementSpacing, getLastAttributePosition } from "../../utils/GettingPositionUtil";
import { globalAttributes, specificAttributes } from "../attributeData";

export function addAttribute(item: TreeItem): void {
  const insertPosition = getLastAttributePosition(item);

  // Create quick pick
  const quickPick = vscode.window.createQuickPick();
  const specificAttributesForThisElement = specificAttributes.get(item.label as string) ?? [];
  quickPick.items = [...specificAttributesForThisElement, ...globalAttributes];

  // Show quick pick
  quickPick.show();

  // On selection
  quickPick.onDidChangeSelection((selection) => {
    const selectedAttribute = selection[0].label;
    let attribute: string;

    // If the element and the attribute are on the same line, add a space before the attribute
    const itemPosition = item.start ?? new vscode.Position(0, 0);
    if (itemPosition.line === insertPosition.line) {
      attribute = ` ${selectedAttribute}=""`;
    } else {
      // If the element and the attribute are on different lines, add a new line before the attribute
      const editorSpacing = getEditorSpacing();
      const elementSpacing = getElementSpacing(item);
      attribute = `\n${elementSpacing + editorSpacing}${selectedAttribute}=""`;
    }

    // Insert attribute
    vscode.window.activeTextEditor?.edit((editBuilder) => {
      editBuilder.insert(insertPosition, attribute);
    });
    vscode.window.activeTextEditor?.document.save();

    // Hide quick pick
    quickPick.hide();
  });
}
