import * as svelte from "svelte/compiler";
import { Attribute, Element, MustacheTag, TemplateNode, Text } from "svelte/types/compiler/interfaces";
import EventHandler from "svelte/types/compiler/compile/nodes/EventHandler";
import * as vscode from "vscode";
import { TreeItem, Node } from "../LayoutTreeTypes";

// Parse the html code
export default function parseTemplate(html: TemplateNode): TreeItem {
  let root: TreeItem | undefined;

  svelte.walk(html, {
    enter(node: Node, parent: Node, key: string, index: number) {
      // Create treeitem with defaults
      const treeItem: TreeItem = {
        label: node.type,
        children: [],
        start: node.start,
        end: node.end,
      };

      // Associate tree item with node
      node.treeItem = treeItem;

      // Set parent's tree's children
      if (parent && parent.treeItem) {
        parent.treeItem.children?.push(treeItem);
        // If parent's collapsibleState not set, then set it to expanded, otherwise leave it as is
        if (parent.treeItem.collapsibleState === undefined) {
          parent.treeItem.collapsibleState = vscode.TreeItemCollapsibleState.Expanded;
        }
      }

      switch (node.type) {
        case "Fragment":
          treeItem.label = "Template";
          treeItem.iconPath = new vscode.ThemeIcon("vm");
          break;
        case "EachBlock":
          treeItem.label = "Each";
          treeItem.iconPath = new vscode.ThemeIcon("repo-sync");
          break;
        case "IfBlock":
          treeItem.label = "If";
          treeItem.iconPath = new vscode.ThemeIcon("question");
          break;
        case "Element":
          treeItem.label = (node as Element).name;
          treeItem.iconPath = new vscode.ThemeIcon("symbol-class");
          break;
        case "Text":
          treeItem.label = (node as Text).data.trim();
          treeItem.iconPath = new vscode.ThemeIcon("symbol-string");
          if (parent.type === "Attribute") {
            // If parent is an attribute, then parent's label is the value of the attributes
            parent.treeItem!.description = treeItem.label;

            // Split the attribute value into multiple tree items
            const split = treeItem.label.split(" ");
            parent.treeItem!.children = split.map((s) => {
              const position = (treeItem.label as string).search(new RegExp('\\b' + s + '\\b'));
              return {
                label: s,
                iconPath: new vscode.ThemeIcon("symbol-string"),
                collapsibleState: vscode.TreeItemCollapsibleState.None,
                start: node.start! + position,
                end: node.start! + position + s.length,
              };
            });

            // Hide the attribute's value
            treeItem.label = "";
          }
          break;
        case "MustacheTag":
          const editor = vscode.window.activeTextEditor;
          const expression = (node as MustacheTag).expression;
          const start = expression.loc?.start ?? { line: 0, column: 0 };
          const end = expression.loc?.end ?? { line: 0, column: 0 };

          const text = editor?.document.getText(new vscode.Range(start.line - 1, start.column, end.line - 1, end.column));
          treeItem.label = text;
          treeItem.iconPath = new vscode.ThemeIcon("symbol-variable");
          treeItem.collapsibleState = vscode.TreeItemCollapsibleState.None;
          break;
        case "ArrowFunctionExpression":
          treeItem.label = "Arrow function";
          treeItem.iconPath = new vscode.ThemeIcon("symbol-function");
          treeItem.collapsibleState = vscode.TreeItemCollapsibleState.None;
          break;
        case "Attribute":
          treeItem.label = (node as Attribute).name;
          treeItem.iconPath = new vscode.ThemeIcon("symbol-property");
          treeItem.collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
          break;
        case "EventHandler":
          treeItem.label = (node as EventHandler).name;
          treeItem.iconPath = new vscode.ThemeIcon("symbol-event");
          treeItem.collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
          break;
        case "CallExpression":
          treeItem.label = "Call expression";
          treeItem.iconPath = new vscode.ThemeIcon("symbol-function");
          treeItem.collapsibleState = vscode.TreeItemCollapsibleState.None;
          break;
        case "Transition":
          treeItem.label = "Transition";
          treeItem.iconPath = new vscode.ThemeIcon("rocket");
          treeItem.collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
          break;

        default:
          treeItem.label = node.type;
          treeItem.iconPath = new vscode.ThemeIcon("folder");
          break;
      }

      if (!root) root = treeItem;
    },
    leave(node: Node, parent: Node, key: string, index: number) {},
  });

  return root!;
}
