import * as svelte from "svelte/compiler";
import { Attribute, Element, MustacheTag, TemplateNode, Text } from "svelte/types/compiler/interfaces";
import EventHandler from "svelte/types/compiler/compile/nodes/EventHandler";
import * as vscode from "vscode";
import { TreeItem, Node } from "../../types/LayoutTreeTypes";
import Binding from "svelte/types/compiler/compile/nodes/Binding";
import Animation from "svelte/types/compiler/compile/nodes/Animation";
import Transition from "svelte/types/compiler/compile/nodes/Transition";
import { getCodeAtPositionFromNode } from "../../utils/GettingCodeUtil";
import { getPositionFromAbsPosition } from "../../utils/GettingPositionUtil";

// Parse the html code
export default function parseTemplate(html: TemplateNode): TreeItem {
  let root: TreeItem | undefined;

  svelte.walk(html, {
    enter(node: Node, parent: Node, key: string, index: number) {
      // Create treeitem with defaults
      const treeItem: TreeItem = {
        label: node.type,
        isSecondary: false,
        children: [],
        start: getPositionFromAbsPosition(node.start),
        end: getPositionFromAbsPosition(node.end),
      };

      // Associate tree item with node
      node.treeItem = treeItem;

      // Set parent's tree's children
      if (parent && parent.treeItem) {
        parent.treeItem.children?.push(treeItem);
        treeItem.parent = parent.treeItem;
      }

      switch (node.type) {
        case "Fragment":
          treeItem.label = "Template";
          treeItem.iconPath = new vscode.ThemeIcon("vm");
          treeItem.contextValue = "template";
          break;
        case "EachBlock":
          treeItem.label = "Each";
          treeItem.iconPath = new vscode.ThemeIcon("repo-sync");
          treeItem.contextValue = "logic";
          break;
        case "IfBlock":
          treeItem.label = "If";
          treeItem.iconPath = new vscode.ThemeIcon("question");
          treeItem.contextValue = "logic";
          break;
        case "ElseBlock":
          treeItem.label = "Else";
          treeItem.iconPath = new vscode.ThemeIcon("arrow-right");
          treeItem.contextValue = "logic";
          break;
        case "AwaitBlock":
          treeItem.label = "Await";
          treeItem.iconPath = new vscode.ThemeIcon("watch");
          treeItem.contextValue = "logic";
          break;
        case "PendingBlock":
          treeItem.label = "Pending";
          treeItem.iconPath = new vscode.ThemeIcon("watch");
          treeItem.contextValue = "logic";
          break;
        case "ThenBlock":
          treeItem.label = "Then";
          treeItem.iconPath = new vscode.ThemeIcon("arrow-right");
          treeItem.contextValue = "logic";
          break;
        case "CatchBlock":
          treeItem.label = "Catch";
          treeItem.iconPath = new vscode.ThemeIcon("arrow-right");
          treeItem.contextValue = "logic";
          break;
        case "Element":
          treeItem.label = (node as Element).name;
          treeItem.contextValue = "element";
          treeItem.iconPath = new vscode.ThemeIcon("symbol-class");
          break;
        case "Text":
          treeItem.label = (node as Text).data.trim();
          treeItem.iconPath = new vscode.ThemeIcon("symbol-string");
          treeItem.contextValue = "text";
          if (parent.type === "Attribute") {
            // If parent is an attribute, then parent's label is the value of the attributes
            parent.treeItem!.description = treeItem.label;
            if (parent.treeItem!.label !== "class") {
              break;
            }

            // Split the attribute value into multiple tree items for "class"
            const split = treeItem.label.split(" ");
            parent.treeItem!.children = split.map((s) => {
              const position = (treeItem.label as string).search(new RegExp("\\b" + s + "\\b"));
              return {
                label: s,
                type: "Class",
                iconPath: new vscode.ThemeIcon("symbol-string"),
                isSecondary: false,
                collapsibleState: vscode.TreeItemCollapsibleState.None,
                start: getPositionFromAbsPosition(node.start! + position + 1),
                end: getPositionFromAbsPosition(node.start! + position + s.length),
              };
            });

            // Hide the attribute's value
            treeItem.label = "";
          }
          break;
        case "MustacheTag":
          const expression = (node as MustacheTag).expression;
          const text = getCodeAtPositionFromNode(expression);
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
          treeItem.isSecondary = true;
          treeItem.collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
          treeItem.contextValue = "attribute";
          break;
        case "EventHandler":
          treeItem.label = (node as EventHandler).name + " " + Array.from((node as EventHandler).modifiers).join(", ");
          treeItem.iconPath = new vscode.ThemeIcon("symbol-event");
          treeItem.contextValue = "event";
          treeItem.isSecondary = true;
          treeItem.collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
          break;
        case "CallExpression":
          treeItem.label = "Call expression";
          treeItem.iconPath = new vscode.ThemeIcon("symbol-function");
          treeItem.collapsibleState = vscode.TreeItemCollapsibleState.None;
          treeItem.isSecondary = true;
          break;
        case "Binding":
          treeItem.label = (node as Binding).name;
          treeItem.iconPath = new vscode.ThemeIcon("key");
          treeItem.isSecondary = true;
          treeItem.collapsibleState = vscode.TreeItemCollapsibleState.None;
          break;
        case "Transition":
          treeItem.label = (node as Transition).name;
          treeItem.iconPath = new vscode.ThemeIcon("pulse");
          treeItem.isSecondary = true;
          treeItem.collapsibleState = vscode.TreeItemCollapsibleState.None;
          break;
        case "Animation":
          treeItem.label = (node as Animation).name;
          treeItem.iconPath = new vscode.ThemeIcon("pulse");
          treeItem.isSecondary = true;
          treeItem.collapsibleState = vscode.TreeItemCollapsibleState.None;
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
