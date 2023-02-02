import * as svelte from "svelte/compiler";
import { Element, MustacheTag, TemplateNode, Text } from "svelte/types/compiler/interfaces";
import * as vscode from "vscode";
import { TreeItem, Node } from "../LayoutTreeTypes";

// Parse the html code
export default function parseTemplate(html: TemplateNode): TreeItem {
  let root: TreeItem | undefined;

  svelte.walk(html, {
    enter(node: Node, parent: Node, key: string, index: number) {
      // Create treeitem
      const treeItem: TreeItem = {
        label: node.type,
        children: [],
        collapsibleState: vscode.TreeItemCollapsibleState.None,
        start: node.start,
        end: node.end,
      };

      // Associate tree item with node
      node.treeItem = treeItem;

      // Set parent's tree's children
      if (parent && parent.treeItem) {
        parent.treeItem.children?.push(treeItem);
        parent.treeItem.collapsibleState = vscode.TreeItemCollapsibleState.Expanded;
      }
      // node.collapsibleState = node.children && node.children.length > 0 ? vscode.TreeItemCollapsibleState.Expanded : vscode.TreeItemCollapsibleState.None;

      // switch (node.type) {
      //   case "Fragment":
      //     node.label = "Template";
      //     node.iconPath = new vscode.ThemeIcon("vm");
      //     break;
      //   case "EachBlock":
      //     node.label = "Each";
      //     node.iconPath = new vscode.ThemeIcon("repo-sync");
      //     break;
      //   case "IfBlock":
      //     node.label = "If";
      //     node.iconPath = new vscode.ThemeIcon("repo-sync"); // TODO: Change
      //     break;
      //   case "Element":
      //     node.label = (node as Element).name;
      //     node.iconPath = new vscode.ThemeIcon("symbol-class");
      //     break;
      //   case "Text":
      //     node.label = (node as Text).data.trim();
      //     node.iconPath = new vscode.ThemeIcon("symbol-string");
      //     break;
      //   case "MustacheTag":
      //     const editor = vscode.window.activeTextEditor;
      //     const expression = (node as MustacheTag).expression;
      //     const start = expression.loc?.start ?? { line: 0, column: 0 };
      //     const end = expression.loc?.end ?? { line: 0, column: 0 };

      //     const text = editor?.document.getText(new vscode.Range(start.line - 1, start.column, end.line - 1, end.column));
      //     node.label = text;
      //     node.iconPath = new vscode.ThemeIcon("symbol-variable");
      //     break;

      //   default:
      //     node.label = node.type;
      //     node.iconPath = new vscode.ThemeIcon("folder");
      //     break;
      // }

      if (!root) root = treeItem;
    },
    leave(node: Node, parent: Node, key: string, index: number) {},
  });

  return root!;
}
