import * as vscode from "vscode";
import { TreeItem } from "../../types/LayoutTreeTypes";
import { getEditorSpacing, getElementSpacing, getInnerHtmlEndingPosition } from "../../utils/GettingPositionUtil";
import { emptyTags, globalTags, specificTags } from "../elementData";

export default function addElementAsLastChild(item: TreeItem) {
  const insertPosition = getInnerHtmlEndingPosition(item);

  // Create quick pick
  const quickPick = vscode.window.createQuickPick();

  const specificChildElementsForThisElement = specificTags.get(item.label as string) ?? [];
  quickPick.items = [...specificChildElementsForThisElement, ...globalTags];

  // Show quick pick
  quickPick.show();

  // On selection
  quickPick.onDidChangeSelection((selection) => {
    const selectedElement = selection[0].label;
    const element = createCodeSnippet(item, selectedElement, insertPosition);

    // Insert element
    vscode.window.activeTextEditor?.edit((editBuilder) => {
      editBuilder.insert(insertPosition, element);
    });
    vscode.window.activeTextEditor?.document.save();

    // Hide quick pick
    quickPick.hide();
  });
}

function createCodeSnippet(item: TreeItem, selectedElement: string, insertPosition: vscode.Position): string {
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

  if (itemPosition.line === insertPosition.line) {
    return `\n${elementSpacing + editorSpacing}${element}\n${elementSpacing}`;
  }
  return `\n${elementSpacing + editorSpacing}${element}`;
}
