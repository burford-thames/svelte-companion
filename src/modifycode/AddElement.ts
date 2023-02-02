import * as vscode from "vscode";
import { TreeItem } from "../layouttree/LayoutTreeTypes";

export default function addElement(item: TreeItem) {
  // Toggle the hidden property of secondary children
  item.children?.forEach((childItem) => {
    if (childItem.isSecondary) {
      childItem.hidden = !childItem.hidden;
    }
  });

  // If the item has no visible children, then set its collapsibleState to None
  if (item.children?.every((childItem) => childItem.hidden)) {
    item.collapsibleState = vscode.TreeItemCollapsibleState.None;
  } else {
    item.collapsibleState = vscode.TreeItemCollapsibleState.Expanded;
  }
}
