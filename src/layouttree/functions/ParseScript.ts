import * as svelte from "svelte/compiler";
import { Script } from "svelte/types/compiler/interfaces";
import * as vscode from "vscode";
import { Node, TreeItem } from "../../types/LayoutTreeTypes";
import { getPositionFromAbsPosition } from "../../utils/GettingPositionUtil";

export default function parseScript(script: Script): TreeItem {
  let root: TreeItem;
  let variables: TreeItem[] = [];
  let functions: TreeItem[] = [];

  svelte.walk(script, {
    enter(node: Node, parent: Node, key: string, index: number) {
      if (node.type === "VariableDeclarator") {
        variables.push({
          label: (node as any).id.name,
          isSecondary: false,
          iconPath: new vscode.ThemeIcon("symbol-variable"),
          collapsibleState: vscode.TreeItemCollapsibleState.None,
          start: getPositionFromAbsPosition(node.start),
          end: getPositionFromAbsPosition(node.end),
        });
      } else if (node.type === "FunctionDeclaration") {
        functions.push({
          label: (node as any).id.name,
          iconPath: new vscode.ThemeIcon("symbol-function"),
          isSecondary: false,
          collapsibleState: vscode.TreeItemCollapsibleState.None,
          start: getPositionFromAbsPosition(node.start),
          end: getPositionFromAbsPosition(node.end),
        });
      }
    },
    leave(node: Node, parent: Node, key: string, index: number) {},
  });

  root = {
    label: "Script",
    iconPath: new vscode.ThemeIcon("code"),
    isSecondary: false,
    children: [
      {
        label: "Variables",
        iconPath: new vscode.ThemeIcon("symbol-variable"),
        isSecondary: false,
        children: variables,
        collapsibleState: variables.length > 0 ? vscode.TreeItemCollapsibleState.Expanded : vscode.TreeItemCollapsibleState.None,
        contextValue: "functions",
      },
      {
        label: "Functions",
        iconPath: new vscode.ThemeIcon("symbol-function"),
        isSecondary: false,
        children: functions,
        collapsibleState: functions.length > 0 ? vscode.TreeItemCollapsibleState.Expanded : vscode.TreeItemCollapsibleState.None,
        contextValue: "variables",
      },
    ],
    collapsibleState: vscode.TreeItemCollapsibleState.Expanded,
    start: getPositionFromAbsPosition(script.start),
    end: getPositionFromAbsPosition(script.end),
  };

  return root;
}
