import TreeItem from "./TreeItem";
import * as svelte from "svelte/compiler";
import * as vscode from "vscode";
import { Script, Style, TemplateNode } from "svelte/types/compiler/interfaces";

export function parseCurrentFile(): TreeItem[] {
  let data: TreeItem[] = [];

  // Get the active text editor
  const editor = vscode.window.activeTextEditor;
  if (!editor) return [];
  const source = editor.document.getText();

  const ast = svelte.parse(source, { filename: editor.document.fileName });
  // if (ast.module) data.push(parseScript(ast.module));
  if (ast.instance) data.push(parseScript(ast.instance));
  data.push(parseHtml(ast.html));
  if (ast.css) data.push(parseStyle(ast.css));

  return data;
}

// Parse the html code
function parseHtml(html: TemplateNode): TreeItem {
  let root: TreeItem | undefined;

  svelte.walk(html, {
    enter(node: TreeItem, parent: TreeItem, key: string, index: number) {
      node.label = node.type;
      node.collapsibleState = node.children && node.children.length > 0 ? vscode.TreeItemCollapsibleState.Expanded : vscode.TreeItemCollapsibleState.None;

      if (!root) root = node;
    },
    leave(node: TreeItem, parent: TreeItem, key: string, index: number) {},
  });

  return root!;
}

function parseScript(script: Script): TreeItem {
  let root: TreeItem | undefined;

  svelte.walk(script, {
    enter(node: TreeItem, parent: TreeItem, key: string, index: number) {
      node.label = node.type;
      node.collapsibleState = node.children && node.children.length > 0 ? vscode.TreeItemCollapsibleState.Expanded : vscode.TreeItemCollapsibleState.None;

      if (!root) root = node;
    },
    leave(node: TreeItem, parent: TreeItem, key: string, index: number) {},
  });

  return root!;
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
