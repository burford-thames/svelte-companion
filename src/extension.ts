import * as vscode from "vscode";
import TreeDataProvider from "./layouttree/TreeDataProvider";

export function activate(context: vscode.ExtensionContext) {
  vscode.window.registerTreeDataProvider('svelteLayout', new TreeDataProvider());

  let disposable = vscode.commands.registerCommand(
    "svelte-companion.helloWorld",
    () => {
      vscode.window.showInformationMessage(
        "Hello World from Svelte companion!"
      );
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
