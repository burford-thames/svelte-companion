import * as vscode from "vscode";

export function injectSveltePreview() {
  // Get the root path of the workspace
  const workspaceRoot = vscode.workspace.workspaceFolders?.[0].uri.fsPath;

  // Create a new folder named svelte-companion in root of the workspace
  const svelteCompanionFolder = vscode.Uri.file(`${workspaceRoot}/svelte-companion`);
  vscode.workspace.fs.createDirectory(svelteCompanionFolder);

  // Create a new file named index.html in the svelte-companion folder
  const svelteCompanionIndex = vscode.Uri.file(`${workspaceRoot}/svelte-companion/index.html`);
  const svelteCompanionIndexContent = Buffer.from(
    `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Svelte Companion</title>
    </head>
  <body>
    <div id="svelte"></div>
    <script src="main.js"></script>
  </body>
</html>`,
    "utf-8"
  );
  vscode.workspace.fs.writeFile(svelteCompanionIndex, svelteCompanionIndexContent);

  // Create a new file named main.js in the svelte-companion folder
  const svelteCompanionMain = vscode.Uri.file(`${workspaceRoot}/svelte-companion/main.js`);
  // Get the active file path
  const activeFilePath = vscode.window.activeTextEditor?.document.uri.fsPath;
  // Get the active file name
  const activeFileName = vscode.window.activeTextEditor?.document.fileName;
  // If the active file is a .svelte file, import it
  if (activeFilePath?.endsWith(".svelte")) {
    console.log("Active file is a .svelte file");
  }

  const svelteCompanionMainContent = Buffer.from(
    `import App from "./App.svelte";
    
const app = new App({
  target: document.getElementById("svelte"),
  props: {
    name: "world",
  },
});

export default app;`,
    "utf-8"
  );
  vscode.workspace.fs.writeFile(svelteCompanionMain, svelteCompanionMainContent);

  vscode.window.showInformationMessage("Svelte Companion preview code injected");
}

export function disposeSveltePreview() {
  const workspaceRoot = vscode.workspace.workspaceFolders?.[0].uri.fsPath;
  const svelteCompanionFolder = vscode.Uri.file(`${workspaceRoot}/svelte-companion`);

  // Delete the svelte-companion folder
  vscode.workspace.fs.delete(svelteCompanionFolder, { recursive: true, useTrash: true });
}