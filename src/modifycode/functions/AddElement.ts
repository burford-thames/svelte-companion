import * as vscode from "vscode";
import { ElementInsertPosition, ElementItem } from "../../types/ElementTypes";
import { TreeItem } from "../../types/LayoutTreeTypes";
import { getEditorSpacing, getElementSpacing, getInnerHtmlEndingPosition } from "../../utils/GettingPositionUtil";
import { globalTags, specificTags } from "../elementData";

export default function addElement(item: TreeItem, position: ElementInsertPosition): void {
  // Create quick pick
  const quickPick = vscode.window.createQuickPick();
  quickPick.title = "Select an element";

  let specificChildElementsForThisElement: ElementItem[];
  switch (position) {
    case "last-child":
      specificChildElementsForThisElement = specificTags.get(item.label as string) ?? [];
      break;
    case "above":
      specificChildElementsForThisElement = specificTags.get(item.parent?.label as string) ?? [];
      break;
    case "below":
      specificChildElementsForThisElement = specificTags.get(item.parent?.label as string) ?? [];
      break;
    case "template":
      specificChildElementsForThisElement = [];
      break;
  }

  const availableTags = [...specificChildElementsForThisElement, ...globalTags];
  quickPick.items = availableTags;

  // Show quick pick
  quickPick.show();

  // On selection
  quickPick.onDidChangeSelection((selection) => {
    const selectedElement = selection[0].label;

    // Find element item from element data
    const selectedItem = availableTags.find((item) => item.label === selectedElement);

    createCodeSnippetAndInsert(item, selectedItem!, position);

    // Hide quick pick
    quickPick.hide();
  });
}

function createCodeSnippetAndInsert(item: TreeItem, selectedItem: ElementItem, relativePosition: ElementInsertPosition): void {
  let element: string;
  // If selected element is an empty tag, don't add closing tag
  switch (selectedItem.type) {
    case "empty":
      element = `<${selectedItem.label}/>`;
      break;
    case "normal":
      element = `<${selectedItem.label}></${selectedItem.label}>`;
      break;
    case "raw":
      element = selectedItem.raw ?? "";
      break;
    case "input":
      // Open input box
      vscode.window.showInputBox({ prompt: "Enter input value" }).then((value) => {
        if (value) {
          element = value;
          padAndInsert(item, element, relativePosition);
        }
      });
      return;
    default:
      element = `<${selectedItem.label}></${selectedItem.label}>`;
      break;
  }

  padAndInsert(item, element, relativePosition);
}

function padAndInsert(item: TreeItem, element: string, relativePosition: ElementInsertPosition): void {
  const document = vscode.window.activeTextEditor?.document;
  let insertPosition: vscode.Position;

  const elementSpacing = getElementSpacing(item);
  const editorSpacing = getEditorSpacing();

  const itemPosition = item.start ?? new vscode.Position(0, 0);

  let paddedElement: string;
  switch (relativePosition) {
    case "last-child":
      insertPosition = getInnerHtmlEndingPosition(item);
      if (itemPosition.line === insertPosition.line) {
        paddedElement = `\n${elementSpacing + editorSpacing}${element}\n${elementSpacing}`;
      } else {
        paddedElement = `\n${elementSpacing + editorSpacing}${element}`;
      }
      break;
    case "above":
      insertPosition = item.start ?? new vscode.Position(0, 0);
      paddedElement = `${element}\n${elementSpacing}`;
      break;
    case "below":
      insertPosition = item.end ?? new vscode.Position(0, 0);
      paddedElement = `\n${elementSpacing}${element}`;
      break;
    case "template":
      insertPosition = item.end ?? document?.positionAt(document.getText().length) ?? new vscode.Position(0, 0);
      paddedElement = `\n${element}`;
      break;
  }

  // Insert element
  vscode.window.activeTextEditor?.edit((editBuilder) => {
    editBuilder.insert(insertPosition, paddedElement);
  });
  vscode.window.activeTextEditor?.document.save();
}
