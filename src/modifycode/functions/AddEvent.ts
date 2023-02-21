import * as vscode from "vscode";
import { TreeItem } from "../../types/LayoutTreeTypes";
import { getEditorSpacing, getElementSpacing, getLastAttributePosition } from "../../utils/GettingPositionUtil";
import { globalEvents, specificEvents } from "../eventData";

export function addEvent(item: TreeItem): void {
  // Create quick pick
  const quickPick = vscode.window.createQuickPick();
  quickPick.title = "Select an event";
  const specificEventsForThisElement = specificEvents.get(item.label as string) ?? [];
  quickPick.items = [...specificEventsForThisElement, ...globalEvents];

  // Show quick pick
  quickPick.show();

  // On selection
  quickPick.onDidChangeSelection((selection) => {
    const selectedEvent = selection[0].label;
    promptForValueAndInsertAttribute(selectedEvent, item);

    // Hide quick pick
    quickPick.hide();
  });
}

function promptForValueAndInsertAttribute(selectedAttribute: string, item: TreeItem): void {
  let attributeString: string;

  const inputBox = vscode.window.createInputBox();
  inputBox.title = "Enter a value";
  inputBox.show();
  inputBox.onDidAccept(() => {
    attributeString = `${selectedAttribute}={${inputBox.value}}`;
    insertEventString(item, attributeString);
    inputBox.hide();
  });
}

function insertEventString(item: TreeItem, attributeString: string): void {
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
