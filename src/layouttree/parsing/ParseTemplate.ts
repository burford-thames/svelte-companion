import * as svelte from "svelte/compiler";
import { Element, MustacheTag, TemplateNode, Text } from "svelte/types/compiler/interfaces";
import * as vscode from "vscode";
import TreeItem from "../TreeItem";

// Parse the html code
// This need a rewrite, but it works for now
export default function parseTemplate(html: TemplateNode): TreeItem {
  let root: TreeItem | undefined;

  svelte.walk(html, {
    enter(node: TreeItem, parent: TreeItem, key: string, index: number) {
      node.collapsibleState = node.children && node.children.length > 0 ? vscode.TreeItemCollapsibleState.Expanded : vscode.TreeItemCollapsibleState.None;

      switch (node.type) {
        case "Fragment":
          node.label = "Template";
          node.iconPath = new vscode.ThemeIcon("vm");
          break;
        case "EachBlock":
          node.label = "Each";
          node.iconPath = new vscode.ThemeIcon("repo-sync");
          break;
        case "IfBlock":
          node.label = "If";
          node.iconPath = new vscode.ThemeIcon("repo-sync"); // TODO: Change
          break;
        case "Element":
          node.label = (node as Element).name;
          node.iconPath = new vscode.ThemeIcon("symbol-class");
          break;
        case "Text":
          node.label = (node as Text).data.trim();
          node.iconPath = new vscode.ThemeIcon("symbol-string");
          break;
        case "MustacheTag":
          const editor = vscode.window.activeTextEditor;
          const expression = (node as MustacheTag).expression;
          const start = expression.loc?.start ?? { line: 0, column: 0 };
          const end = expression.loc?.end ?? { line: 0, column: 0 };

          const text = editor?.document.getText(new vscode.Range(start.line - 1, start.column, end.line - 1, end.column));
          node.label = text;
          node.iconPath = new vscode.ThemeIcon("symbol-variable");
          break;

        default:
          node.label = node.type;
          node.iconPath = new vscode.ThemeIcon("folder");
          break;
      }

      if (!root) root = node;
    },
    leave(node: TreeItem, parent: TreeItem, key: string, index: number) {},
  });

  return root!;
}
