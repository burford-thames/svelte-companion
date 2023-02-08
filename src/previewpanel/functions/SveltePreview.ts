import * as vscode from "vscode";

export function injectSveltePreview(workspaceRoot: string) {
  // Create a new folder named svelte-companion in root of the workspace
  const svelteCompanionFolder = vscode.Uri.file(`${workspaceRoot}/svelte-companion`);
  vscode.workspace.fs.createDirectory(svelteCompanionFolder);

  injectHtmlFile(workspaceRoot);
  injectDefaultSvelteComponentFile(workspaceRoot);
  injectMainJsFile(workspaceRoot);

  vscode.window.showInformationMessage("Svelte Companion preview code injected");
}

export function refreshSveltePreview(workspaceRoot: string) {
  updateMainJsFile(workspaceRoot);
}

export function disposeSveltePreview(workspaceRoot: string) {
  const svelteCompanionFolder = vscode.Uri.file(`${workspaceRoot}/svelte-companion`);

  // Delete the svelte-companion folder
  vscode.workspace.fs.delete(svelteCompanionFolder, { recursive: true, useTrash: true });

  vscode.window.showInformationMessage("Svelte Companion preview code disposed");
}

function injectHtmlFile(workspaceRoot: string) {
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
  <script src="main.js" type="module"></script>
</body>
</html>`,
    "utf-8"
  );
  vscode.workspace.fs.writeFile(svelteCompanionIndex, svelteCompanionIndexContent);
}

function injectDefaultSvelteComponentFile(workspaceRoot: string) {
  // Create a new default App.svelte file in the svelte-companion folder
  const svelteCompanionApp = vscode.Uri.file(`${workspaceRoot}/svelte-companion/App.svelte`);
  const svelteCompanionAppContent = Buffer.from(
    `<script>
export let name;
</script>

<h1>Hello {name}!</h1>`,
    "utf-8"
  );
  vscode.workspace.fs.writeFile(svelteCompanionApp, svelteCompanionAppContent);
}

function injectMainJsFile(workspaceRoot: string) {
  // Create a new file named main.js in the svelte-companion folder
  const svelteCompanionMain = vscode.Uri.file(`${workspaceRoot}/svelte-companion/main.js`);
  const svelteCompanionMainContent = Buffer.from(
    `import App from "${getComponentFilePathToInject()}";

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
}

function updateMainJsFile(workspaceRoot: string) {
  if (getComponentFilePathToInject() === "./App.svelte") {
    return;
  }

  injectMainJsFile(workspaceRoot);
}

function getComponentFilePathToInject(): string {
  // Get the relative path of the active file
  if (!vscode.window.activeTextEditor) {
    return "./App.svelte";
  }

  let componentFilePath = vscode.workspace.asRelativePath(vscode.window.activeTextEditor.document.uri.fsPath, false);

  // If the active file is a .svelte file, import it
  if (!componentFilePath?.endsWith(".svelte")) {
    return "./App.svelte";
  }

  return "../" + componentFilePath;
}
