import { Style } from "svelte/types/compiler/interfaces";
import TreeItem from "../TreeItem";
import * as svelte from "svelte/compiler";
import * as vscode from "vscode";

export default function parseStyle(style: Style): TreeItem {
  let root: TreeItem | undefined;

  svelte.walk(style, {
    enter(node: TreeItem, parent: TreeItem, key: string, index: number) {

      switch (node.type) {
        case "Style":
          node.label = "Style";
          node.iconPath = new vscode.ThemeIcon("symbol-color");
          node.collapsibleState = node.children && node.children.length > 0 ? vscode.TreeItemCollapsibleState.Expanded : vscode.TreeItemCollapsibleState.None;
          break;
        case "Rule":
          console.log(node);
          
          node.label = "Prelude";
          node.iconPath = new vscode.ThemeIcon("symbol-color");
          node.children = (node as any).prelude.children;
          node.collapsibleState = vscode.TreeItemCollapsibleState.Expanded;

          node.children?.forEach(prelude => {
            prelude.label = (prelude.children?.at(0) as any).name;
          });
          break;
        default:
          node.label = node.type;
          break;
      }
      if (!root) root = node;
    },
    leave(node: TreeItem, parent: TreeItem, key: string, index: number) {},
  });

  return root!;
}
