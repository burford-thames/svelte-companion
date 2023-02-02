import * as svelte from "svelte/compiler";
import { Script } from "svelte/types/compiler/interfaces";
import * as vscode from "vscode";
import { Node, TreeItem } from "../LayoutTreeTypes";

export default function parseScript(script: Script): TreeItem {
  let root: TreeItem;
  let variables: TreeItem[] = [];
  let functions: TreeItem[] = [];

  svelte.walk(script, {
    enter(node: Node, parent: Node, key: string, index: number) {
      // node.label = node.type;
      // node.collapsibleState = node.children && node.children.length > 0 ? vscode.TreeItemCollapsibleState.Expanded : vscode.TreeItemCollapsibleState.None;
      if (node.type === "VariableDeclarator") {
        variables.push({
          label: (node as any).id.name,
          description: "?",
          iconPath: new vscode.ThemeIcon("symbol-variable"),
          collapsibleState: vscode.TreeItemCollapsibleState.None,
        });
      } else if (node.type === "FunctionDeclaration") {
        functions.push({
          label: (node as any).id.name,
          iconPath: new vscode.ThemeIcon("symbol-function"),
          collapsibleState: vscode.TreeItemCollapsibleState.None,
        });
      }
    },
    leave(node: Node, parent: Node, key: string, index: number) {},
  });

  root = {
    label: "Script",
    iconPath: new vscode.ThemeIcon("code"),
    children: [
      {
        label: "Variables",
        iconPath: new vscode.ThemeIcon("symbol-variable"),
        children: variables,
        collapsibleState: variables.length > 0 ? vscode.TreeItemCollapsibleState.Expanded : vscode.TreeItemCollapsibleState.None,
      },
      {
        label: "Functions",
        iconPath: new vscode.ThemeIcon("symbol-function"),
        children: functions,
        collapsibleState: functions.length > 0 ? vscode.TreeItemCollapsibleState.Expanded : vscode.TreeItemCollapsibleState.None,
      },
    ],
    collapsibleState: vscode.TreeItemCollapsibleState.Expanded,
  };

  return root;
}
