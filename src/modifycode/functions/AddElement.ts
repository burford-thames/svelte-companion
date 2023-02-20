import * as vscode from "vscode";
import { ElementInsertPosition } from "../../types/ElementTypes";
import { TreeItem } from "../../types/LayoutTreeTypes";
import { getInnerHtmlEndingPosition, getElementSpacing, getEditorSpacing } from "../../utils/GettingPositionUtil";
import { specificTags, globalTags, emptyTags } from "../elementData";

export default function addElement(item: TreeItem, position: ElementInsertPosition): void {
  const document = vscode.window.activeTextEditor?.document;
  let insertPosition: vscode.Position;
  switch (position) {
    case "last-child":
      insertPosition = getInnerHtmlEndingPosition(item);
      break;
    case "above":
      insertPosition = item.start ?? new vscode.Position(0, 0);
      break;
    case "below":
      insertPosition = item.end ?? new vscode.Position(0, 0);
      break;
    case "template":
      insertPosition = item.end ?? document?.positionAt(document.getText().length) ?? new vscode.Position(0, 0);
      break;
  }

  // Create quick pick
  const quickPick = vscode.window.createQuickPick();

  const specificChildElementsForThisElement = specificTags.get(item.label as string) ?? [];
  quickPick.items = [...specificChildElementsForThisElement, ...globalTags];

  // Show quick pick
  quickPick.show();

  // On selection
  quickPick.onDidChangeSelection((selection) => {
    const selectedElement = selection[0].label;
    const element = createCodeSnippet(item, selectedElement, insertPosition, position);

    // Insert element
    vscode.window.activeTextEditor?.edit((editBuilder) => {
      editBuilder.insert(insertPosition, element);
    });
    vscode.window.activeTextEditor?.document.save();

    // Hide quick pick
    quickPick.hide();
  });
}

function createCodeSnippet(item: TreeItem, selectedElement: string, insertPosition: vscode.Position, relativePosition: ElementInsertPosition): string {
  let element: string;
  // If selected element is an empty tag, don't add closing tag
  if (emptyTags.includes(selectedElement)) {
    element = `<${selectedElement}/>`;
  } else {
    element = `<${selectedElement}></${selectedElement}>`;
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
