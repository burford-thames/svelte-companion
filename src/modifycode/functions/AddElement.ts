import * as vscode from "vscode";
import { InsertPositionType } from "../../types/InsertPositionType";
import { TreeItem } from "../../types/LayoutTreeTypes";
import { getEditorSpacing, getElementSpacing, getInnerHtmlEndingPosition, getInnerHtmlStartingPosition } from "../../utils/GettingPositionUtil";
import { globalTags, specificTags } from "../data";

export default function addElement(item: TreeItem, type: InsertPositionType) {
  const insertPosition = getInsertPosition(item, type);

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
    const element = createCodeSnippet(item, type, selectedElement, insertPosition);

    // Insert element
    vscode.window.activeTextEditor?.edit((editBuilder) => {
      editBuilder.insert(insertPosition, element);
    });

    // Hide quick pick
    quickPick.hide();
  });
}

function createCodeSnippet(item: TreeItem, type: InsertPositionType, selectedElement: string, insertPosition: vscode.Position) {
  let element: string;
  element = `<${selectedElement}></${selectedElement}>`;

  const elementSpacing = getElementSpacing(item);
  const editorSpacing = getEditorSpacing();

  const itemPosition = vscode.window.activeTextEditor?.document.positionAt(item.start ?? 0) ?? new vscode.Position(0, 0);

  switch (type) {
    case "firstChild":
      // If the new element and the parent element are on the same line
      if (itemPosition.line === insertPosition.line) {
        return `\n${elementSpacing + editorSpacing}${element}\n${elementSpacing}`;
      }
      return `${element}\n${elementSpacing + editorSpacing}`;
    case "lastChild":
      if (itemPosition.line === insertPosition.line) {
        return `\n${elementSpacing + editorSpacing}${element}\n${elementSpacing}`;
      }
      return `\n${elementSpacing + editorSpacing}${element}`;
    default:
      throw new Error("Not implemented");
  }
}

function getInsertPosition(item: TreeItem, type: InsertPositionType) {
  if (type === "firstChild") {
    return getInnerHtmlStartingPosition(item);
  } else if (type === "lastChild") {
    return getInnerHtmlEndingPosition(item);
  } else {
    throw new Error("Not implemented");
  }
}
