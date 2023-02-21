import * as vscode from "vscode";
import { ElementInsertPosition, ElementItem, ElementType } from "../../types/ElementTypes";
import { TreeItem } from "../../types/LayoutTreeTypes";
import { getInnerHtmlEndingPosition, getElementSpacing, getEditorSpacing } from "../../utils/GettingPositionUtil";
import { specificTags, globalTags } from "../elementData";

export default function addElement(item: TreeItem, position: ElementInsertPosition): void {
  const document = vscode.window.activeTextEditor?.document;

  // Create quick pick
  const quickPick = vscode.window.createQuickPick();
  quickPick.title = "Select an element";

  let specificChildElementsForThisElement: ElementItem[];
  let insertPosition: vscode.Position;
  switch (position) {
    case "last-child":
      insertPosition = getInnerHtmlEndingPosition(item);
      specificChildElementsForThisElement = specificTags.get(item.label as string) ?? [];
      break;
    case "above":
      insertPosition = item.start ?? new vscode.Position(0, 0);
      specificChildElementsForThisElement = specificTags.get(item.parent?.label as string) ?? [];
      break;
    case "below":
      insertPosition = item.end ?? new vscode.Position(0, 0);
      specificChildElementsForThisElement = specificTags.get(item.parent?.label as string) ?? [];
      break;
    case "template":
      insertPosition = item.end ?? document?.positionAt(document.getText().length) ?? new vscode.Position(0, 0);
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

    const element = createCodeSnippet(item, selectedItem!, insertPosition, position);

    // Insert element
    vscode.window.activeTextEditor?.edit((editBuilder) => {
      editBuilder.insert(insertPosition, element);
    });
    vscode.window.activeTextEditor?.document.save();

    // Hide quick pick
    quickPick.hide();
  });
}

function createCodeSnippet(item: TreeItem, selectedItem: ElementItem, insertPosition: vscode.Position, relativePosition: ElementInsertPosition): string {
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
    default:
      element = `<${selectedItem.label}></${selectedItem.label}>`;
      break;
  }

  const elementSpacing = getElementSpacing(item);
  const editorSpacing = getEditorSpacing();

  const itemPosition = item.start ?? new vscode.Position(0, 0);

  switch (relativePosition) {
    case "last-child":
      if (itemPosition.line === insertPosition.line) {
        return `\n${elementSpacing + editorSpacing}${element}\n${elementSpacing}`;
      }
      return `\n${elementSpacing + editorSpacing}${element}`;
    case "above":
      return `${element}\n${elementSpacing}`;
    case "below":
      return `\n${elementSpacing}${element}`;
    case "template":
      return `\n${element}`;
  }
}
