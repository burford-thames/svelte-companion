import * as vscode from "vscode";
import { TreeItem } from "../../types/LayoutTreeTypes";
import { getEditorSpacing, getElementSpacing, getLastAttributePosition } from "../../utils/GettingPositionUtil";
import { globalAttributes, specificAttributes, values } from "../attributeData";

export function addAttribute(item: TreeItem): void {
  // Create quick pick
  const quickPick = vscode.window.createQuickPick();
  quickPick.title = "Select an attribute";
  const specificAttributesForThisElement = specificAttributes.get(item.label as string) ?? [];
  quickPick.items = [...specificAttributesForThisElement, ...globalAttributes];

  // Show quick pick
  quickPick.show();

  // On selection
  quickPick.onDidChangeSelection((selection) => {
    const selectedAttribute = selection[0].label;
    promptForValueAndInsertAttribute(selectedAttribute, item);

    // Hide quick pick
    quickPick.hide();
  });
}

function promptForValueAndInsertAttribute(selectedAttribute: string, item: TreeItem): void {
  const possibleValues = values.get(selectedAttribute);
  let attributeString: string;

  if (!possibleValues) {
    const inputBox = vscode.window.createInputBox();
    inputBox.title = "Enter a value";
    inputBox.show();
    inputBox.onDidAccept(() => {
      attributeString = `${selectedAttribute}="${inputBox.value}"`;
      insertAttributeString(item, attributeString);
      inputBox.hide();
    });
    return;
  }

  switch (possibleValues?.type) {
    case "empty":
      attributeString = selectedAttribute;
      insertAttributeString(item, attributeString);
      break;
    case "input":
      const inputBox = vscode.window.createInputBox();
      inputBox.title = "Enter a value";
      inputBox.show();
      inputBox.onDidAccept(() => {
        attributeString = `${selectedAttribute}="${inputBox.value}"`;
        insertAttributeString(item, attributeString);
        inputBox.hide();
      });
      break;
    case "single-select":
      const quickPick2 = vscode.window.createQuickPick();
      quickPick2.title = "Select a value";
      quickPick2.items = possibleValues.values!;
      quickPick2.show();
      quickPick2.onDidChangeSelection((selection2) => {
        attributeString = `${selectedAttribute}="${selection2[0].label}"`;
        insertAttributeString(item, attributeString);
        quickPick2.hide();
      });
      break;
    case "multi-select":
      const quickPick3 = vscode.window.createQuickPick();
      quickPick3.title = "Select values";
      quickPick3.items = possibleValues.values!;
      quickPick3.canSelectMany = true;
      quickPick3.show();
      quickPick3.onDidAccept(() => {
        attributeString = `${selectedAttribute}="${quickPick3.selectedItems.map((item) => item.label).join(" ")}"`;
        insertAttributeString(item, attributeString);
        quickPick3.hide();
      });
      break;
  }
}

function insertAttributeString(item: TreeItem, attributeString: string): void {
  const insertPosition = getLastAttributePosition(item);

  // If the element and the attribute are on the same line, add a space before the attribute
  const itemPosition = item.start ?? new vscode.Position(0, 0);
  let paddedAttribute: string;
  if (itemPosition.line === insertPosition.line) {
    paddedAttribute = ` ${attributeString}`;
  } else {
    // If the element and the attribute are on different lines, add a new line before the attribute
    const editorSpacing = getEditorSpacing();
    const elementSpacing = getElementSpacing(item);
    paddedAttribute = `\n${elementSpacing + editorSpacing}${attributeString}`;
  }

  // Insert attribute
  vscode.window.activeTextEditor?.edit((editBuilder) => {
    editBuilder.insert(insertPosition, paddedAttribute);
  });
  vscode.window.activeTextEditor?.document.save();
}
