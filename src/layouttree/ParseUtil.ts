import TreeItem from "./TreeItem";
import * as svelte from "svelte/compiler";
import * as vscode from "vscode";
import { MustacheTag, Script, Style, TemplateNode, Text } from "svelte/types/compiler/interfaces";

// This need a rewrite, but it works for now
export function parseCurrentFile(): TreeItem[] {
  let data: TreeItem[] = [];

  // Get the active text editor
  const editor = vscode.window.activeTextEditor;
  if (!editor) return [];
  const source = editor.document.getText();

  try {
    // Parse the svelte file
    const ast = svelte.parse(source, { filename: editor.document.fileName });
    // if (ast.module) data.push(parseScript(ast.module));
    if (ast.instance) data.push(parseScript(ast.instance));
    data.push(parseHtml(ast.html));
    if (ast.css) data.push(parseStyle(ast.css));
  } catch (error) {
    console.log("Parse error.");
  }
  return data;
}

// Parse the html code
function parseHtml(html: TemplateNode): TreeItem {
  let root: TreeItem | undefined;

  svelte.walk(html, {
    enter(node: TreeItem, parent: TreeItem, key: string, index: number) {
      node.collapsibleState = node.children && node.children.length > 0 ? vscode.TreeItemCollapsibleState.Expanded : vscode.TreeItemCollapsibleState.None;

      if (node.type === "Text") {
        node.label = (node as Text).data.trim();
      } else if (node.type === "MustacheTag") {
        const editor = vscode.window.activeTextEditor;
        const expression = (node as MustacheTag).expression;
        const start = expression.loc?.start ?? { line: 0, column: 0 };
        const end = expression.loc?.end ?? { line: 0, column: 0 };

        const text = editor?.document.getText(new vscode.Range(start.line - 1, start.column, end.line - 1, end.column));
        node.label = node.type + ": " + text;
      } else {
        node.label = node.type;
      }

      if (!root) root = node;
    },
    leave(node: TreeItem, parent: TreeItem, key: string, index: number) {},
  });

  return root!;
}

function parseScript(script: Script): TreeItem {
  let root: TreeItem;
  let variables: TreeItem[] = [];
  
  svelte.walk(script, {
    enter(node: TreeItem, parent: TreeItem, key: string, index: number) {
      // node.label = node.type;
      // node.collapsibleState = node.children && node.children.length > 0 ? vscode.TreeItemCollapsibleState.Expanded : vscode.TreeItemCollapsibleState.None;
      if (node.type === "VariableDeclarator") {
        variables.push({
          type: "Variable",
          label: (node.id as any).name,
          collapsibleState: vscode.TreeItemCollapsibleState.None,
        });
      }
    },
    leave(node: TreeItem, parent: TreeItem, key: string, index: number) {},
  });

  root = {
    type: "Script",
    label: "Script",
    children: [
      {
        type: "Variables",
        label: "Variables",
        children: variables,
        collapsibleState: variables.length > 0 ? vscode.TreeItemCollapsibleState.Expanded : vscode.TreeItemCollapsibleState.None,
      },
    ],
    collapsibleState: vscode.TreeItemCollapsibleState.Expanded,
  };

  return root;
}

function parseStyle(style: Style): TreeItem {
  let root: TreeItem | undefined;

  svelte.walk(style, {
    enter(node: TreeItem, parent: TreeItem, key: string, index: number) {
      node.label = node.type;
      node.collapsibleState = node.children && node.children.length > 0 ? vscode.TreeItemCollapsibleState.Expanded : vscode.TreeItemCollapsibleState.None;

      if (!root) root = node;
    },
    leave(node: TreeItem, parent: TreeItem, key: string, index: number) {},
  });

  return root!;
}
